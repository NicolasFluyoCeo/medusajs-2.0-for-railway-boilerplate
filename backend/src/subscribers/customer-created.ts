import { Modules } from '@medusajs/framework/utils'
import { SubscriberArgs, SubscriberConfig } from '@medusajs/medusa'

// ID of the customer group "Sin Ordenes"
const SIN_ORDENES_GROUP_ID = "cusgroup_01JR9P1PG156BRDRCJSHKXGA66"

export default async function customerCreatedHandler({
  event: { data },
  container,
}: SubscriberArgs<any>) {
  try {
    // Get the customer service from the container with proper type casting
    const customerGroupService = container.resolve("customerGroupService")
    
    // Add the new customer to the "Sin Ordenes" group using type assertion
    await (customerGroupService as any).addCustomers(SIN_ORDENES_GROUP_ID, {
      customer_ids: [{ id: data.id }]
    })
    
    console.log(`Added customer ${data.id} to "Sin Ordenes" group`)
  } catch (error) {
    console.error(`Error adding customer ${data.id} to "Sin Ordenes" group:`, error)
  }
}

export const config: SubscriberConfig = {
  event: 'customer.created'
}
