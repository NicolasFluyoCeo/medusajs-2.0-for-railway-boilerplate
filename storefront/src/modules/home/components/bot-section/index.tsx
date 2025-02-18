import { Text } from "@medusajs/ui"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { getProductByHandle } from "@lib/data/products"

export default async function BotSection({
  region,
}: {
  region: HttpTypes.StoreRegion
}) {
  // Obtener los productos por sus handles
  const glove1 = await getProductByHandle("g01", region.id)
  const glove2 = await getProductByHandle("g02", region.id)
  const glove3 = await getProductByHandle("g03", region.id)

  const gloves = [glove1, glove2, glove3].filter(Boolean)

  return (
    <div className="content-container py-12 small:py-24">
      <div className="grid grid-cols-3 gap-4">
        {gloves.map((glove) => (
          <LocalizedClientLink 
            key={glove.id}
            href={`/products/${glove.handle}`}
            className="relative group h-[300px] overflow-hidden"
          >
            <div className="w-full h-full">
              <img
                src={glove.thumbnail || ""}
                alt={glove.title}
                className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 flex flex-col justify-end p-4">
                <h3 className="text-white text-xl font-bold">{glove.title}</h3>
                <p className="text-white/90">{glove.description?.split('.')[0]}</p>
              </div>
            </div>
          </LocalizedClientLink>
        ))}
      </div>
    </div>
  )
}
