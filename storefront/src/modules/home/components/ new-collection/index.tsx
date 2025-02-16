import { Text } from "@medusajs/ui"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductPreview from "@modules/products/components/product-preview"

export default async function NewCollection({
  collection,
  region,
}: {
  collection?: HttpTypes.StoreCollection | null
  region: HttpTypes.StoreRegion
}) {
  return (
    <div className="content-container py-12 small:py-24">
      <div className="flex justify-between mb-8">
        <Text className="txt-xlarge">Hurricane New Collection</Text>
        {collection && (
          <LocalizedClientLink 
            href={`/collections/${collection.handle}`}
            className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover"
          >
            Explore all
          </LocalizedClientLink>
        )}
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-8">
        {collection?.products?.slice(0, 3).map((product) => (
          <li key={product.id}>
            <ProductPreview 
              product={product} 
              region={region} 
              isFeatured
            />
          </li>
        ))}
      </ul>
    </div>
  )
}