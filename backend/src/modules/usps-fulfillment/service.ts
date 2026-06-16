import { AbstractFulfillmentProviderService, MedusaError } from '@medusajs/framework/utils'
import { Logger } from '@medusajs/framework/types'
import {
  CalculatedShippingOptionPrice,
  CalculateShippingOptionPriceDTO,
  CreateShippingOptionDTO,
  FulfillmentOption,
} from '@medusajs/framework/types'
import { UspsClient } from './client'

export interface UspsFulfillmentOptions {
  /** USPS consumer key. */
  clientId: string
  /** USPS consumer secret. */
  clientSecret: string
  /** ZIP code packages are shipped from. */
  originZip: string
  /** RETAIL (no account needed) or COMMERCIAL. Defaults to RETAIL. */
  priceType?: string
  /** Unit the variant `weight` is stored in: 'g' | 'oz' | 'lb'. Defaults to 'g'. */
  weightUnit?: 'g' | 'oz' | 'lb'
  /**
   * Default weight per item (in `weightUnit`) used when a variant has no weight
   * of its own. Scales with quantity (2 items => 2x). Lets a catalog where every
   * product weighs the same skip per-variant weight setup.
   */
  defaultItemWeight?: number
  /** Override the USPS API base URL (e.g. for sandbox). */
  baseUrl?: string
  /** Mail classes offered as shipping options. Defaults to Ground Advantage. */
  mailClasses?: Array<{ id: string; name: string; mailClass: string }>
  /** Default package dimensions in inches, used when a variant has none. */
  packageDimensions?: { length: number; width: number; height: number }
}

type InjectedDependencies = {
  logger: Logger
}

interface OptionData {
  mailClass: string
  name: string
}

const DEFAULT_MAIL_CLASSES = [
  { id: 'usps-ground-advantage', name: 'USPS Ground Advantage', mailClass: 'USPS_GROUND_ADVANTAGE' },
]
const DEFAULT_PACKAGE_DIMENSIONS = { length: 6, width: 6, height: 6 }
// USPS requires a positive weight; fall back to 1 lb when nothing is known.
const FALLBACK_WEIGHT_LB = 1

const WEIGHT_TO_LB: Record<string, number> = {
  g: 1 / 453.59237,
  oz: 1 / 16,
  lb: 1,
}

/**
 * Fulfillment provider that calculates live USPS domestic shipping rates.
 *
 * Register it on the Fulfillment module with the USPS credentials, then create
 * a *calculated* shipping option in the admin using one of the fulfillment
 * options this provider exposes (e.g. "USPS Ground Advantage").
 */
class UspsFulfillmentProviderService extends AbstractFulfillmentProviderService {
  static identifier = 'usps'

  protected readonly logger_: Logger
  protected readonly options_: UspsFulfillmentOptions
  protected readonly client_: UspsClient

  constructor({ logger }: InjectedDependencies, options: UspsFulfillmentOptions) {
    super()

    this.logger_ = logger
    this.options_ = options
    this.client_ = new UspsClient(
      {
        clientId: options.clientId,
        clientSecret: options.clientSecret,
        baseUrl: options.baseUrl,
      },
      logger,
    )
  }

  async getFulfillmentOptions(): Promise<FulfillmentOption[]> {
    const classes = this.options_.mailClasses ?? DEFAULT_MAIL_CLASSES
    return classes.map((c) => ({
      id: c.id,
      name: c.name,
      mailClass: c.mailClass,
    }))
  }

  async validateFulfillmentData(
    optionData: Record<string, unknown>,
    data: Record<string, unknown>,
    _context: Record<string, unknown>,
  ): Promise<any> {
    return { ...data }
  }

  async validateOption(data: Record<string, unknown>): Promise<boolean> {
    return typeof data?.mailClass === 'string'
  }

  async canCalculate(_data: CreateShippingOptionDTO): Promise<boolean> {
    // Every USPS option is priced live at checkout.
    return true
  }

  async calculatePrice(
    optionData: CalculateShippingOptionPriceDTO['optionData'],
    _data: CalculateShippingOptionPriceDTO['data'],
    context: CalculateShippingOptionPriceDTO['context'],
  ): Promise<CalculatedShippingOptionPrice> {
    const option = optionData as unknown as OptionData
    const mailClass = option?.mailClass

    if (!mailClass) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        'USPS shipping option is missing a mailClass.',
      )
    }

    const destinationZip = context?.shipping_address?.postal_code
    if (!destinationZip) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        'A destination postal code is required to calculate USPS shipping.',
      )
    }

    const weight = this.computeWeightLb(context?.items)
    const dimensions = this.options_.packageDimensions ?? DEFAULT_PACKAGE_DIMENSIONS

    const price = await this.client_.getLowestRate({
      originZIPCode: this.options_.originZip,
      destinationZIPCode: String(destinationZip).slice(0, 5),
      weight,
      length: dimensions.length,
      width: dimensions.width,
      height: dimensions.height,
      mailClass,
      priceType: this.options_.priceType ?? 'RETAIL',
      mailingDate: this.today(),
    })

    if (price === null) {
      throw new MedusaError(
        MedusaError.Types.NOT_ALLOWED,
        `USPS has no ${mailClass} rate available for ${destinationZip}.`,
      )
    }

    return {
      calculated_amount: price,
      // USPS rates do not include tax.
      is_calculated_price_tax_inclusive: false,
    }
  }

  /**
   * Marks a shipment as fulfilled. We do NOT purchase a USPS label here yet —
   * that requires a USPS EPS payment account — so this is a no-op that simply
   * lets staff mark orders fulfilled in the admin. Returning `labels: []`
   * satisfies Medusa's create-fulfillment workflow without crashing.
   * (When EPS is set up, buy the label here and return it in `labels`.)
   */
  async createFulfillment(
    _data: any,
    _items: any,
    _order: any,
    _fulfillment: any,
  ): Promise<any> {
    return { data: {}, labels: [] }
  }

  /** No external label to cancel yet, so cancelling is a safe no-op. */
  async cancelFulfillment(_data: any): Promise<any> {
    return {}
  }

  private computeWeightLb(items: CalculateShippingOptionPriceDTO['context']['items']): number {
    const factor = WEIGHT_TO_LB[this.options_.weightUnit ?? 'g']
    const defaultItemWeight = Number(this.options_.defaultItemWeight)
    const hasDefault = Number.isFinite(defaultItemWeight) && defaultItemWeight > 0
    let total = 0

    for (const item of items ?? []) {
      const quantity = Number((item as any)?.quantity ?? 1)
      // Coerce first: variant weight can arrive as a numeric string ("250"),
      // which would otherwise be dropped. Number.isFinite still rejects
      // null/undefined/NaN/0/negatives.
      let unitWeight = Number((item as any)?.variant?.weight)
      if (!(Number.isFinite(unitWeight) && unitWeight > 0) && hasDefault) {
        // No usable variant weight — use the configured per-item default so a
        // catalog of same-weight products prices correctly (and scales with qty).
        unitWeight = defaultItemWeight
      }
      if (Number.isFinite(unitWeight) && unitWeight > 0) {
        total += unitWeight * factor * quantity
      }
    }

    return total > 0 ? Number(total.toFixed(4)) : FALLBACK_WEIGHT_LB
  }

  private today(): string {
    return new Date().toISOString().slice(0, 10)
  }
}

export default UspsFulfillmentProviderService
