import { ModuleProviderExports } from '@medusajs/framework/types'
import UspsFulfillmentProviderService from './service'

const services = [UspsFulfillmentProviderService]

const providerExport: ModuleProviderExports = {
  services,
}

export default providerExport
