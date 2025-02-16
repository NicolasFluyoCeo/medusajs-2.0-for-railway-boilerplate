import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import BestSellerSection from "@modules/home/components/best-sellet-section"
import TrainingAd from "@modules/home/components/ad"
import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import NewCollection from "@modules/home/components/ new-collection"
import { getCollectionByHandle } from "@lib/data/collections"

export const metadata: Metadata = {
  title: "Medusa Next.js Starter Template",
  description:
    "A performant frontend ecommerce starter template with Next.js 14 and Medusa.",
}

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const region = await getRegion(countryCode)
  const collection = await getCollectionByHandle("/new-collection")

  return (
    <>
      <Hero />
      {region && collection && (
        <NewCollection collection={collection} region={region} />
      )}
      <TrainingAd />
      <BestSellerSection />
 
    </>
  )
}
