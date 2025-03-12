"use client"

import { Heading, Text, clx } from "@medusajs/ui"
import { useEffect, useState } from "react"
import PaymentButton from "../payment-button"
import { useSearchParams } from "next/navigation"
import { setShippingMethod } from "@lib/data/cart"

const Review = ({ cart }: { cart: any }) => {
  const searchParams = useSearchParams()
  const [debugInfo, setDebugInfo] = useState<string>("")

  const isOpen = searchParams.get("step") === "review"

  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0

  const shippingMethodSelected = cart.shipping_methods && cart.shipping_methods.length > 0
  const hasShippingAddress = !!cart.shipping_address
  const hasPayment = !!(cart.payment_collection || paidByGiftcard)

  const previousStepsCompleted =
    hasShippingAddress &&
    shippingMethodSelected &&
    hasPayment

  useEffect(() => {
    // Si estamos en review y no hay método de envío seleccionado, intentamos seleccionar uno
    const autoSelectShippingIfNeeded = async () => {
      if (isOpen && !shippingMethodSelected && cart.id) {
        try {
          // Obtener los métodos de envío disponibles
          const response = await fetch(`/api/shipping-options?cartId=${cart.id}`)
          const data = await response.json()
          
          if (data.shipping_options && data.shipping_options.length > 0) {
            setDebugInfo("Intentando seleccionar automáticamente el método de envío en review...")
            
            await setShippingMethod({
              cartId: cart.id,
              shippingMethodId: data.shipping_options[0].id
            })
            
            setDebugInfo("Método de envío seleccionado correctamente. Actualizando la página...")
            
            // Forzar recarga para actualizar el estado del carrito
            window.location.reload()
          } else {
            setDebugInfo("No se encontraron métodos de envío disponibles")
          }
        } catch (error) {
          setDebugInfo(`Error al intentar seleccionar método de envío: ${error}`)
          console.error("Error al seleccionar el método de envío:", error)
        }
      }
    }

    autoSelectShippingIfNeeded()
  }, [isOpen, shippingMethodSelected, cart.id])

  return (
    <div className="bg-white">
      <div className="flex flex-row items-center justify-between mb-6">
        <Heading
          level="h2"
          className={clx(
            "flex flex-row text-3xl-regular gap-x-2 items-baseline",
            {
              "opacity-50 pointer-events-none select-none": !isOpen,
            }
          )}
        >
          Review
        </Heading>
      </div>

      {isOpen && !previousStepsCompleted && (
        <div className="p-4 border border-red-500 rounded mb-4 text-red-500">
          <Text className="text-red-500 font-medium">
            Hay pasos del checkout incompletos:
          </Text>
          <ul className="list-disc ml-5 mt-2">
            {!hasShippingAddress && <li>Falta la dirección de envío</li>}
            {!shippingMethodSelected && <li>No se ha seleccionado el método de envío</li>}
            {!hasPayment && <li>El pago no está completo</li>}
          </ul>
          <Text className="mt-2 text-sm">{debugInfo}</Text>
        </div>
      )}

      {isOpen && previousStepsCompleted && (
        <>
          <div className="flex items-start gap-x-1 w-full mb-6">
            <div className="w-full">
              <Text className="txt-medium-plus text-ui-fg-base mb-1">
                By clicking the Place Order button, you confirm that you have read, understand and accept
                our Terms of Use, Terms of Sale and Return Policy, and acknowledge that you have read
                the  Store Privacy Policy.
              </Text>
            </div>
          </div>
          <PaymentButton cart={cart} data-testid="submit-order-button" />
        </>
      )}
    </div>
  )
}

export default Review
