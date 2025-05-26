import { HttpTypes } from "@medusajs/types"
import { Text, Heading, Button } from "@medusajs/ui"
import Link from "next/link"

import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"
import { getCollectionWithProductsByHandle } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { getProductPrice } from "@lib/util/get-product-price"

const MAX_PRODUCTS = 3

export default async function NewCollection({
  countryCode,
}: {
  countryCode: string
}) {
  const collection = await getCollectionWithProductsByHandle("fresh-collection", countryCode)
  const region = await getRegion(countryCode)

  if (!collection || !region) {
    return null
  }

  const products = collection.products?.slice(0, MAX_PRODUCTS) || []

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
