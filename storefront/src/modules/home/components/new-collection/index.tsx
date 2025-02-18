import { Text } from "@medusajs/ui"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductPreview from "@modules/products/components/product-preview"
import { getProductsList } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"

export default async function NewCollection({
  collection,
  region,
}: {
  collection: HttpTypes.StoreCollection | null
  region: HttpTypes.StoreRegion
}) {
  let products = collection?.products


  if ((!products || products.length === 0) && collection?.id) {
    const { response } = await getProductsList({
      queryParams: { collection_id: [collection.id] } as any,
      countryCode: region.iso_2
    })
    products = response.products
  }

  return (
    <div className="content-container py-12 small:py-24">
      <div className="flex justify-between mb-8">
        <Text className="text-4xl font-normal">Hurricane New Collection</Text>
        {collection && (
          <LocalizedClientLink 
            href={`/collections/${collection.handle}`}
            className="px-4 py-2 rounded-full border border-gray-200 text-sm hover:bg-gray-50"
          >
            Explore all
          </LocalizedClientLink>
        )}
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-8">
        {products?.map((product) => {
          const { cheapestPrice } = getProductPrice({ product })
          
          return (
            <li key={product.id}>
              <div>
                <ProductPreview 
                  product={product} 
                  region={region} 
                  isFeatured
                />
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
