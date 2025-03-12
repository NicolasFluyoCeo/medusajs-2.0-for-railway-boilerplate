import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"
import Link from "next/link"
import ProductPreview from "@modules/products/components/product-preview"

export default async function FeaturedProducts({
  collections,
  region,
}: {
  collections: HttpTypes.StoreCollection[]
  region: HttpTypes.StoreRegion
}) {
  // Extraer todos los productos de todas las colecciones
  const allProducts = collections.flatMap((collection) => collection.products || []);
  
  if (allProducts.length === 0) {
    return null;
  }

  return (
    <div className="content-container py-8 small:py-16">
      <div className="flex justify-between items-center mb-6">
        <Text className="text-3xl font-bold">All Products</Text>
        <div className="flex items-center gap-4">
          
          <Link href="/store" className="btn-primary py-2 px-4 rounded-md bg-black text-white font-medium hover:bg-gray-800 inline-flex items-center">
            Explore all
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
      <div className="overflow-hidden">
        <ul className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
          {allProducts.map((product) => (
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
