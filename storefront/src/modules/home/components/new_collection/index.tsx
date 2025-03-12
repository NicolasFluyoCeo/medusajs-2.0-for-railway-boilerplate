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
  const collection = await getCollectionWithProductsByHandle("new-collection", countryCode)
  const region = await getRegion(countryCode)

  if (!collection || !region) {
    return null
  }

  const products = collection.products?.slice(0, MAX_PRODUCTS) || []

  if (products.length === 0) {
    return null
  }

  // Creando un componente wrapper personalizado para controlar el tamaño
  const SmallProductCard = ({ product }: { product: HttpTypes.StoreProduct }) => {
    return (
      <div style={{ maxHeight: "320px" }}>
        <div style={{ 
          display: "flex", 
          flexDirection: "column",
          height: "100%"
        }}>
          <div style={{ 
            height: "230px", 
            position: "relative",
            overflow: "hidden"
          }}>
            <img 
              src={product.thumbnail || ""} 
              alt={product.title || "Product"} 
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                padding: "12px",
                borderRadius: "16px"
              }}
            />
          </div>
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between",
            padding: "12px 16px"
          }}>
            <Text className="text-ui-fg-subtle text-sm truncate" style={{ maxWidth: "70%" }}>
              {product.title}
            </Text>
            <Text className="text-ui-fg-base text-sm font-medium">
              $100.00
            </Text>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 py-6">
      <div className="content-container">
        <div className="flex justify-between items-center mb-4">
          <div>
          </div>
        </div>
        <ul className="grid grid-cols-3 gap-x-6 gap-y-2">
          {products.map((product) => (
            <li key={product.id} className="bg-white">
              <Link href={`/products/${product.handle}`}>
                <SmallProductCard product={product} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
