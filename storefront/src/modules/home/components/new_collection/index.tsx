import { HttpTypes } from "@medusajs/types"
import { Text, Heading, Button } from "@medusajs/ui"
import Link from "next/link"

import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"
import { getCollectionWithProductsByHandle } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

const MAX_PRODUCTS = 3 // Limit to 3 products as shown in the image

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

  // Use the first 3 products from the collection
  const products = collection.products?.slice(0, MAX_PRODUCTS) || []

  if (products.length === 0) {
    return null
  }

  return (
    <div className="bg-gray-50 py-16">
      <div className="content-container">
        <div className="flex justify-between items-center mb-10">
          <div>
            {/* <Link href={`/collections/${collection.handle}`} className="btn-primary py-2 px-4 rounded-md bg-black text-white font-medium hover:bg-gray-800 inline-flex items-center">
              Explore all
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link> */}
          </div>
        </div>
        <ul className="grid grid-cols-1 small:grid-cols-2 medium:grid-cols-3 gap-x-8 gap-y-10">
          {products.map((product) => (
            <li key={product.id} className="bg-white p-4 rounded-lg shadow-sm transition-shadow hover:shadow-md">
              <div className="aspect-[3/4] mb-4">
                <ProductPreview product={product} region={region} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
