import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"
import Link from "next/link"

import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"

export default function ProductRail({
  collection,
  region,
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}) {
  const { products } = collection

  if (!products) {
    return null
  }

  return (
    <div className="content-container py-8 small:py-16">
      <div className="flex justify-between items-center mb-6">
        <Text className="text-3xl font-bold">{collection.title}</Text>
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 6L15 12L9 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <Link href={`/collections/${collection.handle}`} className="btn-primary py-2 px-4 rounded-md bg-black text-white font-medium hover:bg-gray-800 inline-flex items-center">
            Explore all
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
      <div className="overflow-hidden">
        <ul className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
          {products &&
            products.map((product) => (
              <li key={product.id} className="flex-none w-[200px] snap-start">
                <div className="aspect-square">
                  {/* @ts-ignore */}
                  <ProductPreview product={product} region={region} isFeatured />
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}
