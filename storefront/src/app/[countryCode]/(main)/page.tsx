import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import NewCollection from "@modules/home/components/new_collection"
import Hero from "@modules/home/components/hero"
import SaveSpot from "@modules/home/components/save-spot"
import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "NG Soccer Gloves - Professional Goalkeeper Equipment",
  description:
    "Discover premium goalkeeper gloves designed for ultimate performance and protection. Our professional-grade gloves feature advanced grip technology, impact protection, and durable materials to help you make those game-changing saves. Shop our collection of high-quality goalkeeper equipment trusted by professionals worldwide.",
}

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      <NewCollection countryCode={countryCode} />
      <div className="py-12">
        <FeaturedProducts collections={collections} region={region} />
      </div>
      <SaveSpot />
    </>
  )
}
