"use client"

import { useEffect, useState } from "react"
import { HttpTypes } from "@medusajs/types"

/**
 * Custom hook to fetch customer data on the client side.
 * This replaces the deprecated useMeCustomer from medusa-react.
 */
export function useCustomer() {
  const [customer, setCustomer] = useState<HttpTypes.StoreCustomer | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/customers/me", {
          credentials: "include",
        })
        
        if (!response.ok) {
          setCustomer(null)
          return
        }
        
        const data = await response.json()
        setCustomer(data.customer)
      } catch (error) {
        console.error("Error fetching customer data:", error)
        setCustomer(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCustomer()
  }, [])

  return { customer, isLoading }
} 