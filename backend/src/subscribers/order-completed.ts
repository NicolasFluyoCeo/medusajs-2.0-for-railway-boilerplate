import { Modules } from '@medusajs/framework/utils'
import { IOrderModuleService } from '@medusajs/framework/types'
import { SubscriberArgs, SubscriberConfig } from '@medusajs/medusa'

// ID of the customer group "Sin Ordenes"
const SIN_ORDENES_GROUP_ID = "cusgroup_01JR9P1PG156BRDRCJSHKXGA66"

export default async function orderCompletedHandler({
  event: { data },
  container,
}: SubscriberArgs<any>) {
  const orderModuleService: IOrderModuleService = container.resolve(Modules.ORDER)
  
  try {
    // Get the order details including customer information
    const order = await orderModuleService.retrieveOrder(data.id)
    
    if (order.customer_id) {
      // Get the customer group service
      const customerGroupService = container.resolve("customerGroupService")
      
      // Remove the customer from the "Sin Ordenes" group using type assertion
      await (customerGroupService as any).removeCustomers(SIN_ORDENES_GROUP_ID, {
        customer_ids: [{ id: order.customer_id }]
      })
      
      console.log(`Removed customer ${order.customer_id} from "Sin Ordenes" group after completing an order`)
    }
  } catch (error) {
    console.error('Error removing customer from "Sin Ordenes" group:', error)
  }
}

export const config: SubscriberConfig = {
  event: 'order.completed'
}
