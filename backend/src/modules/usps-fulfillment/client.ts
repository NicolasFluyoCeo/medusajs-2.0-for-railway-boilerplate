import { Logger } from '@medusajs/framework/types'

export interface UspsClientOptions {
  clientId: string
  clientSecret: string
  /** Base URL of the USPS APIs. Defaults to production. */
  baseUrl?: string
}

export interface UspsRateRequest {
  originZIPCode: string
  destinationZIPCode: string
  /** Weight in pounds (lbs). */
  weight: number
  length: number
  width: number
  height: number
  /** e.g. USPS_GROUND_ADVANTAGE, PRIORITY_MAIL */
  mailClass: string
  /** RETAIL or COMMERCIAL */
  priceType: string
  /** ISO date (YYYY-MM-DD) the package is mailed. */
  mailingDate: string
}

const DEFAULT_BASE_URL = 'https://apis.usps.com'
// USPS access tokens last ~8h; refresh a bit early to avoid races.
const TOKEN_SAFETY_WINDOW_S = 60

/**
 * Thin client over the USPS v3 REST APIs.
 *
 * - OAuth2 client-credentials: POST /oauth2/v3/token
 * - Domestic prices:           POST /prices/v3/total-rates/search
 *
 * `total-rates/search` is used instead of `base-rates/search` because it
 * returns every eligible rate option for a package without us having to guess
 * the per-class `rateIndicator`. We then pick the cheapest option.
 */
export class UspsClient {
  private readonly clientId: string
  private readonly clientSecret: string
  private readonly baseUrl: string
  private readonly logger: Logger

  private accessToken: string | null = null
  private tokenExpiresAt = 0

  constructor(options: UspsClientOptions, logger: Logger) {
    this.clientId = options.clientId
    this.clientSecret = options.clientSecret
    this.baseUrl = (options.baseUrl || DEFAULT_BASE_URL).replace(/\/$/, '')
    this.logger = logger
  }

  private async getToken(): Promise<string> {
    const now = Math.floor(Date.now() / 1000)
    if (this.accessToken && now < this.tokenExpiresAt - TOKEN_SAFETY_WINDOW_S) {
      return this.accessToken
    }

    const res = await fetch(`${this.baseUrl}/oauth2/v3/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: this.clientId,
        client_secret: this.clientSecret,
        grant_type: 'client_credentials',
      }),
    })

    if (!res.ok) {
      const detail = await res.text().catch(() => '')
      throw new Error(`USPS OAuth failed (${res.status}): ${detail}`)
    }

    const json = (await res.json()) as { access_token: string; expires_in: number }
    this.accessToken = json.access_token
    this.tokenExpiresAt = now + (json.expires_in ?? 3600)
    return this.accessToken
  }

  /**
   * Returns the lowest total price (in USD) for the given package, or `null`
   * if USPS returns no eligible rate options.
   */
  async getLowestRate(req: UspsRateRequest): Promise<number | null> {
    const token = await this.getToken()

    const res = await fetch(`${this.baseUrl}/prices/v3/total-rates/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(req),
    })

    if (!res.ok) {
      const detail = await res.text().catch(() => '')
      throw new Error(`USPS rate request failed (${res.status}): ${detail}`)
    }

    const json = (await res.json()) as UspsTotalRatesResponse
    const options = json.rateOptions ?? []

    let lowest: number | null = null
    for (const opt of options) {
      const price = opt.totalPrice ?? opt.totalBasePrice
      if (typeof price === 'number' && (lowest === null || price < lowest)) {
        lowest = price
      }
    }

    if (lowest === null) {
      this.logger.warn(
        `USPS returned no rate options for ${req.mailClass} ${req.originZIPCode}->${req.destinationZIPCode}`,
      )
    }

    return lowest
  }
}

interface UspsTotalRatesResponse {
  rateOptions?: Array<{
    totalBasePrice?: number
    totalPrice?: number
  }>
}
