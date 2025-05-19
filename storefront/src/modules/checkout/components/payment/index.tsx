"use client"

import { useCallback, useContext, useEffect, useMemo, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { RadioGroup } from "@headlessui/react"
import ErrorMessage from "@modules/checkout/components/error-message"
import { CheckCircleSolid, CreditCard } from "@medusajs/icons"
import { Button, Container, Heading, Text, Tooltip, clx } from "@medusajs/ui"
import { CardElement, PaymentRequestButtonElement, useStripe } from "@stripe/react-stripe-js"
import { StripeCardElementOptions, PaymentRequest } from "@stripe/stripe-js"

import Divider from "@modules/common/components/divider"
import PaymentContainer from "@modules/checkout/components/payment-container"
import { isStripe as isStripeFunc, paymentInfoMap } from "@lib/constants"
import { StripeContext } from "@modules/checkout/components/payment-wrapper"
import { initiatePaymentSession } from "@lib/data/cart"

const Payment = ({
  cart,
  availablePaymentMethods,
}: {
  cart: any
  availablePaymentMethods: any[]
}) => {
  const activeSession = cart.payment_collection?.payment_sessions?.find(
    (paymentSession: any) => paymentSession.status === "pending"
  )

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cardBrand, setCardBrand] = useState<string | null>(null)
  const [cardComplete, setCardComplete] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    activeSession?.provider_id ?? ""
  )
  const [hasInitiatedPayment, setHasInitiatedPayment] = useState(false)

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "payment"

  const isStripe = isStripeFunc(activeSession?.provider_id)
  const stripeReady = useContext(StripeContext)

  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0

  const paymentReady =
    (activeSession && cart?.shipping_methods.length !== 0) || paidByGiftcard

  const stripe = stripeReady ? useStripe() : null;
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(null);

  const useOptions: StripeCardElementOptions = useMemo(() => {
    return {
      style: {
        base: {
          fontFamily: "Inter, sans-serif",
          color: "#424270",
          "::placeholder": {
            color: "rgb(107 114 128)",
          },
        },
      },
      classes: {
        base: "pt-3 pb-1 block w-full h-11 px-4 mt-0 bg-ui-bg-field border rounded-md appearance-none focus:outline-none focus:ring-0 focus:shadow-borders-interactive-with-active border-ui-border-base hover:bg-ui-bg-field-hover transition-all duration-300 ease-in-out",
      },
    }
  }, [])

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const handleEdit = () => {
    router.push(pathname + "?" + createQueryString("step", "payment"), {
      scroll: false,
    })
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      if (!activeSession && isStripeFunc(selectedPaymentMethod)) {
        await initiatePaymentSession(cart, {
          provider_id: selectedPaymentMethod,
        })
      }

      return router.push(
        pathname + "?" + createQueryString("step", "review"),
        {
          scroll: false,
        }
      )
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setError(null)
  }, [isOpen])

  useEffect(() => {
    if (stripe && isStripe && stripeReady) {
      const pr = stripe.paymentRequest({
        country: 'US',
        currency: cart.region?.currency_code?.toLowerCase() || 'usd',
        total: {
          label: 'Total',
          amount: Math.round((cart.total || 0) * 100),
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      pr.canMakePayment()
        .then((result) => {
          if (result) {
            pr.on('paymentmethod', async (ev) => {
              try {
                if (!activeSession?.data?.client_secret) {
                  throw new Error('Missing client secret for payment confirmation.');
                }

                const { error: confirmError } = await stripe.confirmCardPayment(
                  activeSession.data.client_secret as string,
                  {
                    payment_method: ev.paymentMethod.id,
                  },
                  {
                    handleActions: false,
                  }
                );

                if (confirmError) {
                  ev.complete('fail');
                  setError(confirmError.message);
                  return;
                }

                ev.complete('success');

                router.push(
                  pathname + '?' + createQueryString('step', 'review'),
                  { scroll: false }
                );
              } catch (err: any) {
                ev.complete('fail');
                setError(err.message);
              }
            });

            setPaymentRequest(pr);
          }
        })
        .catch(() => {
          // Silenciamos errores de canMakePayment
        });
    }
  }, [stripe, isStripe, stripeReady, cart.total, cart.region?.currency_code]);

  useEffect(() => {
    const stripeMethod = availablePaymentMethods.find(
      (method) => isStripeFunc(method.id)
    );
    
    if (stripeMethod && !selectedPaymentMethod) {
      setSelectedPaymentMethod(stripeMethod.id);
    }
  }, [availablePaymentMethods, selectedPaymentMethod]);

  useEffect(() => {
    const shouldInitiate = isOpen && 
      availablePaymentMethods?.length > 0 && 
      !activeSession && 
      !isLoading &&
      !hasInitiatedPayment;
    
    if (shouldInitiate) {
      const initializePayment = async () => {
        setIsLoading(true);
        setHasInitiatedPayment(true);
        try {
          const stripeMethod = availablePaymentMethods.find(
            (method) => isStripeFunc(method.id)
          );
          
          if (stripeMethod) {
            setSelectedPaymentMethod(stripeMethod.id);
            await initiatePaymentSession(cart, {
              provider_id: stripeMethod.id,
            });
          }
        } catch (err: any) {
          console.error("Error initializing payment:", err);
          setError(err.message);
          setHasInitiatedPayment(false);
        } finally {
          setIsLoading(false);
        }
      };
      
      initializePayment();
    }
  }, [isOpen, availablePaymentMethods, activeSession, isLoading, hasInitiatedPayment]);

  return (
    <div className="bg-white">
      <div className="flex flex-row items-center justify-between mb-6">
        <Heading
          level="h2"
          className={clx(
            "flex flex-row text-3xl-regular gap-x-2 items-baseline",
            {
              "opacity-50 pointer-events-none select-none":
                !isOpen && !paymentReady,
            }
          )}
        >
          Payment
          {!isOpen && paymentReady && <CheckCircleSolid />}
        </Heading>
        {!isOpen && paymentReady && (
          <Text>
            <button
              onClick={handleEdit}
              className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover"
              data-testid="edit-payment-button"
            >
              Edit
            </button>
          </Text>
        )}
      </div>
      <div>
        <div className={isOpen ? "block" : "hidden"}>
          {!paidByGiftcard && availablePaymentMethods?.length && (
            <>
              {isLoading ? (
                <div className="flex items-center justify-center py-4">
                  <div className="w-8 h-8 border-2 border-ui-border-interactive rounded-full border-t-transparent animate-spin"></div>
                  <span className="ml-2">Loading payment options...</span>
                </div>
              ) : error ? (
                <div className="mb-4">
                  <ErrorMessage error={error} />
                  <Button 
                    variant="secondary"
                    className="mt-4"
                    onClick={() => {
                      setError(null);
                      setHasInitiatedPayment(false);
                    }}
                  >
                    Retry
                  </Button>
                </div>
              ) : null}

              {!isLoading && isStripe && stripeReady && (
                <div className="mt-5 transition-all duration-150 ease-in-out">
                  {paymentRequest && (
                    <div className="mb-5">
                      <Text className="txt-medium-plus text-ui-fg-base mb-1">
                        Express Checkout:
                      </Text>
                      <PaymentRequestButtonElement 
                        options={{ 
                          paymentRequest,
                          style: {
                            paymentRequestButton: {
                              type: 'buy',
                              theme: 'dark'
                            }
                          }
                        }} 
                      />
                    </div>
                  )}
                  
                  <Text className="txt-medium-plus text-ui-fg-base mb-1">
                    Enter your card details:
                  </Text>

                  <CardElement
                    options={useOptions as StripeCardElementOptions}
                    onChange={(e) => {
                      setCardBrand(
                        e.brand &&
                          e.brand.charAt(0).toUpperCase() + e.brand.slice(1)
                      )
                      setError(e.error?.message || null)
                      setCardComplete(e.complete)
                    }}
                  />
                </div>
              )}
              
              {!activeSession && !isLoading && !isStripe && (
                <div className="mb-4">
                  <Text className="mb-2">
                    Click to show payment options:
                  </Text>
                  <Button 
                    variant="secondary"
                    onClick={() => {
                      setHasInitiatedPayment(false);
                    }}
                  >
                    Show payment options
                  </Button>
                </div>
              )}
              
              <div className="hidden">
                <RadioGroup
                  value={selectedPaymentMethod}
                  onChange={(value: string) => setSelectedPaymentMethod(value)}
                >
                  {availablePaymentMethods
                    .sort((a, b) => {
                      return a.provider_id > b.provider_id ? 1 : -1
                    })
                    .map((paymentMethod) => {
                      return (
                        <PaymentContainer
                          paymentInfoMap={paymentInfoMap}
                          paymentProviderId={paymentMethod.id}
                          key={paymentMethod.id}
                          selectedPaymentOptionId={selectedPaymentMethod}
                        />
                      )
                    })}
                </RadioGroup>
              </div>
            </>
          )}

          {paidByGiftcard && (
            <div className="flex flex-col w-1/3">
              <Text className="txt-medium-plus text-ui-fg-base mb-1">
                Payment method
              </Text>
              <Text
                className="txt-medium text-ui-fg-subtle"
                data-testid="payment-method-summary"
              >
                Gift card
              </Text>
            </div>
          )}

          <ErrorMessage
            error={error}
            data-testid="payment-method-error-message"
          />

          <Button
            size="large"
            className="mt-6"
            onClick={handleSubmit}
            isLoading={isLoading}
            disabled={
              (isStripe && !cardComplete) ||
              (!selectedPaymentMethod && !paidByGiftcard)
            }
            data-testid="submit-payment-button"
          >
            Continue to review
          </Button>
        </div>

        <div className={isOpen ? "hidden" : "block"}>
          {cart && paymentReady && activeSession ? (
            <div className="flex items-start gap-x-1 w-full">
              <div className="flex flex-col w-1/3">
                <Text className="txt-medium-plus text-ui-fg-base mb-1">
                  Payment method
                </Text>
                <Text
                  className="txt-medium text-ui-fg-subtle"
                  data-testid="payment-method-summary"
                >
                  {paymentInfoMap[selectedPaymentMethod]?.title ||
                    selectedPaymentMethod}
                </Text>
              </div>
              <div className="flex flex-col w-1/3">
                <Text className="txt-medium-plus text-ui-fg-base mb-1">
                  Payment details
                </Text>
                <div
                  className="flex gap-2 txt-medium text-ui-fg-subtle items-center"
                  data-testid="payment-details-summary"
                >
                  <Container className="flex items-center h-7 w-fit p-2 bg-ui-button-neutral-hover">
                    {paymentInfoMap[selectedPaymentMethod]?.icon || (
                      <CreditCard />
                    )}
                  </Container>
                  <Text>
                    {isStripeFunc(selectedPaymentMethod) && cardBrand
                      ? cardBrand
                      : "Another step will appear"}
                  </Text>
                </div>
              </div>
            </div>
          ) : paidByGiftcard ? (
            <div className="flex flex-col w-1/3">
              <Text className="txt-medium-plus text-ui-fg-base mb-1">
                Payment method
              </Text>
              <Text
                className="txt-medium text-ui-fg-subtle"
                data-testid="payment-method-summary"
              >
                Gift card
              </Text>
            </div>
          ) : null}
        </div>
      </div>
      <Divider className="mt-8" />
    </div>
  )
}

export default Payment
