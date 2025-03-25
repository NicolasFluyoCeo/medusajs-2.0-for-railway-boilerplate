"use client"

import { Stripe, StripeElementsOptions } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { HttpTypes } from "@medusajs/types"

type StripeWrapperProps = {
  paymentSession: HttpTypes.StorePaymentSession
  stripeKey?: string
  stripePromise: Promise<Stripe | null> | null
  children: React.ReactNode
}

const StripeWrapper: React.FC<StripeWrapperProps> = ({
  paymentSession,
  stripeKey,
  stripePromise,
  children,
}) => {
  if (!stripeKey) {
    throw new Error(
      "Stripe key is missing. Set NEXT_PUBLIC_STRIPE_KEY environment variable."
    )
  }

  if (!stripePromise) {
    throw new Error(
      "Stripe promise is missing. Make sure you have provided a valid Stripe key."
    )
  }

  // Configure Stripe Elements options
  const options: StripeElementsOptions = {
    // Only include client_secret if it exists - this makes it work with both Payment Elements and Payment Request Button
    ...(paymentSession?.data?.client_secret && {
      clientSecret: paymentSession.data.client_secret as string
    }),
    // Ensure appearance is consistent
    appearance: {
      theme: 'stripe',
    },
  }

  return (
    <Elements options={options} stripe={stripePromise}>
      {children}
    </Elements>
  )
}

export default StripeWrapper
