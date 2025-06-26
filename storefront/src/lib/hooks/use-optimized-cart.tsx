"use client"

import { useState, useCallback, useRef } from "react"
import { addToCart } from "@lib/data/cart"

interface UseOptimizedCartProps {
  onSuccess?: () => void
  onError?: (error: Error) => void
}

export function useOptimizedCart({ onSuccess, onError }: UseOptimizedCartProps = {}) {
  const [isAdding, setIsAdding] = useState(false)
  const abortControllerRef = useRef<AbortController | null>(null)

  const optimizedAddToCart = useCallback(
    async ({
      variantId,
      quantity,
      countryCode,
    }: {
      variantId: string
      quantity: number
      countryCode: string
    }) => {
      // Prevent duplicate requests
      if (isAdding) return

      // Cancel any ongoing request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }

      // Create new abort controller for this request
      abortControllerRef.current = new AbortController()

      setIsAdding(true)

      try {
        await addToCart({ variantId, quantity, countryCode })
        onSuccess?.()
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Error adding to cart:', error)
          onError?.(error)
        }
      } finally {
        setIsAdding(false)
        abortControllerRef.current = null
      }
    },
    [isAdding, onSuccess, onError]
  )

  // Cleanup on unmount
  const cleanup = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
  }, [])

  return {
    optimizedAddToCart,
    isAdding,
    cleanup,
  }
} 