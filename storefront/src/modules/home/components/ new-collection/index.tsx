import { Text } from "@medusajs/ui"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductPreview from "@modules/products/components/product-preview"
import { getProductsList } from "@lib/data/products"

export default async function NewCollection({
  collection,
  region,
}: {
  collection: HttpTypes.StoreCollection | null
  region: HttpTypes.StoreRegion
}) {
  let products = collection?.products

  // Si la colección no trae productos, se realiza una consulta adicional
  if ((!products || products.length === 0) && collection?.id) {
    // Se asume que la propiedad 'iso_2' está disponible en el objeto region, de lo contrario sustituirla por el countryCode que corresponda
    const { response } = await getProductsList({
      queryParams: { collection_id: [collection.id] } as any,
      countryCode: region.iso_2
    })
    products = response.products
  }

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
        {products?.map((product) => (
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