"use client"

import { useEffect, useState } from "react"
import { setShippingMethod } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"

type AutoShippingSelectorProps = {
  cart: HttpTypes.StoreCart
  shippingMethods: HttpTypes.StoreCartShippingOption[]
}

const AutoShippingSelector = ({ cart, shippingMethods }: AutoShippingSelectorProps) => {
  const [isProcessed, setIsProcessed] = useState(false)

  useEffect(() => {
    const autoSelectShipping = async () => {
      // Only auto-select if there are shipping methods and none is currently selected
      if (
        shippingMethods.length > 0 && 
        (!cart.shipping_methods || cart.shipping_methods.length === 0) &&
        !isProcessed
      ) {
        setIsProcessed(true)
        
        try {
          await setShippingMethod({ 
            cartId: cart.id, 
            shippingMethodId: shippingMethods[0].id 
          })
          console.log("Auto-selected shipping method:", shippingMethods[0].name)
        } catch (error) {
          console.error("Failed to auto-select shipping method:", error)
        }
      }
    }

    autoSelectShipping()
  }, [cart.id, cart.shipping_methods, shippingMethods, isProcessed])

  // This component doesn't render anything visible
  return null
}

export default AutoShippingSelector 