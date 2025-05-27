import { HttpTypes } from "@medusajs/types"
import { Text, Heading, Button } from "@medusajs/ui"
import Link from "next/link"

import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"
import { getProductByHandle } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
// import { getProductPrice } from "@lib/util/get-product-price"

// const MAX_PRODUCTS = 3

const productHandles = [
  "phantom-pink-gloves",
  "infierno-gloves",
  "tp-gloves",
]

export default async function NewCollection({
  countryCode,
}: {
  countryCode: string
}) {
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  // Fetch all products in parallel
  const productPromises = productHandles.map((handle) =>
    getProductByHandle(handle, region.id).catch((e) => {
      console.error(`Failed to fetch product with handle ${handle}:`, e)
      return null // Return null if a product fetch fails
    })
  )
  
  const fetchedProducts = await Promise.all(productPromises)
  
  // Filter out any nulls from failed fetches and ensure type correctness
  const products = fetchedProducts.filter(
    (product): product is HttpTypes.StoreProduct => product !== null
  )

  if (products.length === 0) {
    return null
  }

  return (
    <div className="bg-gray-50 py-6">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <div>
          </div>
        </div>
        <ul className="grid grid-cols-3 gap-x-6 gap-y-2">
          {products.map((product) => (
            <li key={product.id} className="bg-white h-[300px]">
              <ProductPreview product={product} region={region} isFeatured />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
