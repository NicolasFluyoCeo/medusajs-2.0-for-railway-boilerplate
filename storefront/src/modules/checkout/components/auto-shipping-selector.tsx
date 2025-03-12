"use client"

import { useEffect, useState } from "react"
import { setShippingMethod } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { useRouter, usePathname, useSearchParams } from "next/navigation"

type AutoShippingSelectorProps = {
  cart: HttpTypes.StoreCart
  shippingMethods: HttpTypes.StoreCartShippingOption[]
}

const AutoShippingSelector = ({ cart, shippingMethods }: AutoShippingSelectorProps) => {
  const [isProcessed, setIsProcessed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const currentStep = searchParams.get("step")

  useEffect(() => {
    const autoSelectShipping = async () => {
      // Si estamos en el paso de dirección (o acabamos de completarlo) y hay métodos de envío disponibles
      if (
        (currentStep === "address" || currentStep === "payment") &&
        shippingMethods.length > 0 && 
        (!cart.shipping_methods || cart.shipping_methods.length === 0) &&
        !isProcessed &&
        !isLoading
      ) {
        setIsLoading(true)
        
        try {
          console.log("Intentando seleccionar automáticamente el método de envío:", shippingMethods[0].name)
          
          await setShippingMethod({ 
            cartId: cart.id, 
            shippingMethodId: shippingMethods[0].id 
          })
          
          console.log("Auto-selección exitosa del método de envío:", shippingMethods[0].name)
          setIsProcessed(true)
          
          // Recargar la página para asegurarse de que los cambios sean recogidos
          if (currentStep === "payment") {
            router.refresh()
          }
        } catch (error: any) {
          console.error("Error al auto-seleccionar el método de envío:", error)
          setError(error.message || "Error desconocido")
        } finally {
          setIsLoading(false)
        }
      }
    }

    autoSelectShipping()
  }, [cart.id, cart.shipping_methods, shippingMethods, isProcessed, isLoading, currentStep, router, pathname])

  // Este componente no renderiza nada visible
  return null
}

export default AutoShippingSelector 