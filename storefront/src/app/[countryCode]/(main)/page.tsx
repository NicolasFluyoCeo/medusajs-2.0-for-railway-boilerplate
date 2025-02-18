import { Metadata } from "next"

import Hero from "@modules/home/components/hero"
import TrainingAd from "@modules/home/components/ad"
import { getRegion } from "@lib/data/regions"
import { getCollectionByHandle } from "@lib/data/collections"
import NewCollection from "@modules/home/components/new-collection"
import BotSection from "@modules/home/components/bot-section"
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
  const collection = await getCollectionByHandle("new-collection")
  const botCollection = await getCollectionByHandle("bot-section")
  return (
    <>
      <Hero />
      {region && collection && (
        <NewCollection collection={collection} region={region} />
      )}
      <TrainingAd />
      {region && botCollection && (
        <BotSection collection={botCollection} region={region} />
      )}
    </>
  )
}
