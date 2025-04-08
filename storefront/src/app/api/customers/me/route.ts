import { getCustomer } from "@lib/data/customer"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const customer = await getCustomer()
    
    return NextResponse.json({ 
      customer 
    }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ 
      error: "Not authenticated or error fetching customer" 
    }, { status: 401 })
  }
} 