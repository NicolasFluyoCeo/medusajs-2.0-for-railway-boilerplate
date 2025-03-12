import { HttpTypes } from "@medusajs/types"
import { Text, Heading, Button } from "@medusajs/ui"
import Link from "next/link"

import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"
import { getCollectionWithProductsByHandle } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

const MAX_PRODUCTS = 3

export default async function NewCollection({
  countryCode,
}: {
  countryCode: string
}) {
  const collection = await getCollectionWithProductsByHandle("new-collection", countryCode)
  const region = await getRegion(countryCode)

  if (!collection || !region) {
    return null
  }

  const products = collection.products?.slice(0, MAX_PRODUCTS) || []

  if (products.length === 0) {
    return null
  }

  return (
    <div className="bg-gray-50 py-8">
      <div className="content-container">
        <div className="flex justify-between items-center mb-6">
          <div>
          </div>
        </div>
        <ul className="grid grid-cols-3 gap-x-4">
          {products.map((product) => (
            <li key={product.id} className="bg-white rounded-lg shadow-sm transition-shadow hover:shadow-md">
              <div className="aspect-[16/9] w-full">
                <ProductPreview product={product} region={region} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
