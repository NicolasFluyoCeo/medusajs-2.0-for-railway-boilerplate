import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import NewCollection from "@modules/home/components/new_collection"
import Hero from "@modules/home/components/hero"
import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

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
    </>
  )
}
