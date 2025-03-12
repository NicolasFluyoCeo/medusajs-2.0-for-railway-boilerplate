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

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-md">
      <div className="flex justify-between items-center mb-2">
        <Text className="font-bold">Depurador de Checkout</Text>
        <Button 
          variant="secondary" 
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Ocultar" : "Mostrar"} detalles
        </Button>
      </div>

      <div className={clx("transition-all duration-300", {
        "max-h-0 overflow-hidden": !isExpanded,
        "max-h-96 overflow-auto": isExpanded
      })}>
        <div className="space-y-2 mt-2">
          <div className="flex justify-between">
            <Text>ID del carrito:</Text>
            <Text className="font-mono text-xs">{cart.id}</Text>
          </div>
          
          <div className="flex justify-between">
            <Text>Tiene dirección de envío:</Text>
            <Text className={hasShippingAddress ? "text-green-500" : "text-red-500"}>
              {hasShippingAddress ? "Sí" : "No"}
            </Text>
          </div>
          
          <div className="flex justify-between">
            <Text>Tiene dirección de facturación:</Text>
            <Text className={hasBillingAddress ? "text-green-500" : "text-red-500"}>
              {hasBillingAddress ? "Sí" : "No"}
            </Text>
          </div>
          
          <div className="flex justify-between">
            <Text>Tiene método de envío:</Text>
            <Text className={hasShippingMethods ? "text-green-500" : "text-red-500"}>
              {hasShippingMethods ? "Sí" : "No"}
            </Text>
          </div>

          {cart.shipping_methods && cart.shipping_methods.length > 0 && (
            <div className="mt-2">
              <Text className="font-semibold">Métodos de envío seleccionados:</Text>
              <ul className="list-disc pl-5">
                {cart.shipping_methods.map((method, index) => (
                  <li key={index} className="text-sm">
                    {method.shipping_option?.name || "Desconocido"} (ID: {method.shipping_option_id})
                  </li>
                ))}
              </ul>
            </div>
          )}

          {!hasShippingMethods && (
            <div className="mt-2">
              <Button 
                variant="primary" 
                size="small"
                className="w-full"
                isLoading={isFixingShipping}
                onClick={fixShippingMethod}
              >
                Aplicar método de envío
              </Button>
              {message && (
                <Text className="text-sm mt-2">{message}</Text>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CartDebug 