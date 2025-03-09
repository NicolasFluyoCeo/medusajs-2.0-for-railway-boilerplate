import { Text } from "@medusajs/ui"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductPreview from "@modules/products/components/product-preview"
import { getProductsList } from "@lib/data/products"

export default async function HorizontalProducts({
  region,
}: {
  region: HttpTypes.StoreRegion
}) {
  const { response: { products } } = await getProductsList({
    queryParams: { limit: 10 },
    countryCode: region.countries?.[0]?.iso_2 || "us"
  })

  return (
    <div className="content-container py-12 small:py-24">
      <div className="flex justify-between mb-8">
        <Text className="text-4xl font-normal">Featured Products</Text>
        <LocalizedClientLink 
          href="/store"
          className="px-4 py-2 rounded-full border border-gray-200 text-sm hover:bg-gray-50"
        >
          View all
        </LocalizedClientLink>
      </div>
      <div className="relative">
        <div className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar">
          {products.map((product) => (
            <div 
              key={product.id}
              className="flex-none w-[250px] transition-transform duration-300 hover:scale-105"
            >
              <LocalizedClientLink 
                href={`/products/${product.handle}`}
                className="block"
              >
                <div className="aspect-[1/1] relative mb-2">
                  <img
                    src={product.thumbnail || ""}
                    alt={product.title}
                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-base-regular text-gray-700">
                    {product.title}
                  </span>
                  <span className="text-base-regular text-gray-900">
                    ${product.variants?.[0]?.calculated_price?.calculated_amount || 0}
                  </span>
                </div>
              </LocalizedClientLink>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
