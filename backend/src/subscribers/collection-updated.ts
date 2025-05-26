import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { STOREFRONT_URL } from "../lib/constants"

/**
 * Triggers storefront cache revalidation when collections or related products are updated.
 */
export default async function collectionUpdatedSubscriber({ container }: SubscriberArgs) {
  const url = STOREFRONT_URL

  try {
    await fetch(`${url}/api/revalidate/collections`, { method: "POST" })
  } catch (err) {
    container.logger?.error(`Failed to revalidate collections tag: ${err}`)
  }
}

export const config: SubscriberConfig = {
  event: ["product.updated", "collection.updated"],
}
