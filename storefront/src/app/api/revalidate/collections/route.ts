import { NextResponse } from "next/server"
import { revalidateTag } from "next/cache"

export async function POST() {
  revalidateTag("collections")
  return NextResponse.json({ revalidated: true })
}
