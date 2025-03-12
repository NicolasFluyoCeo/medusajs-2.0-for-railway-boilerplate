import { sdk } from "@lib/config"
import { getAuthHeaders } from "@lib/data/cookies"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const cartId = url.searchParams.get("cartId")

  if (!cartId) {
    return NextResponse.json(
      { error: "cartId is required" },
      { status: 400 }
    )
  }

  try {
    const { shipping_options } = await sdk.store.cart
      .listShippingOptions(cartId, {}, getAuthHeaders())
      .then((response) => response)
      .catch((error) => {
        console.error("Error fetching shipping options:", error)
        throw error
      })

    return NextResponse.json({ shipping_options })
  } catch (error) {
    console.error("Error in shipping options API route:", error)
    return NextResponse.json(
      { error: "Failed to fetch shipping options" },
      { status: 500 }
    )
  }
} 