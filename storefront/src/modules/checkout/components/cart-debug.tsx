"use client"

import { useEffect, useState } from "react"
import { HttpTypes } from "@medusajs/types"
import { Text, Button, clx } from "@medusajs/ui"
import { setShippingMethod } from "@lib/data/cart"

interface CartDebugProps {
  cart: HttpTypes.StoreCart
}

const CartDebug = ({ cart }: CartDebugProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isFixingShipping, setIsFixingShipping] = useState(false)
  const [message, setMessage] = useState("")

  const hasShippingMethods = cart.shipping_methods && cart.shipping_methods.length > 0
  const hasShippingAddress = !!cart.shipping_address
  const hasBillingAddress = !!cart.billing_address

  // Función para arreglar el método de envío manualmente
  const fixShippingMethod = async () => {
    if (!cart.id) return

    setIsFixingShipping(true)
    setMessage("Intentando aplicar un método de envío...")

    try {
      // Obtener métodos de envío disponibles
      const response = await fetch(`/api/shipping-options?cartId=${cart.id}`)
      const data = await response.json()
      
      if (data.shipping_options && data.shipping_options.length > 0) {
        // Aplicar el primer método de envío disponible
        await setShippingMethod({
          cartId: cart.id,
          shippingMethodId: data.shipping_options[0].id
        })
        
        setMessage("¡Método de envío aplicado correctamente! Recargando página...")
        
        // Recargar para ver los cambios
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      } else {
        setMessage("No se encontraron métodos de envío disponibles")
      }
    } catch (error) {
      setMessage(`Error al aplicar el método de envío: ${error}`)
      console.error("Error al aplicar el método de envío:", error)
    } finally {
      setIsFixingShipping(false)
    }
  }

  return null
}

export default CartDebug 