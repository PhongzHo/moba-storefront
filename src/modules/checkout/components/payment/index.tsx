"use client"

import { useCallback, useContext, useEffect, useMemo, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { RadioGroup } from "@headlessui/react"
import ErrorMessage from "@modules/checkout/components/error-message"
import { Cart } from "@medusajs/medusa"
import { CheckCircleSolid, CreditCard } from "@medusajs/icons"
import { Button, Container, Heading, Text, Tooltip, clx } from "@medusajs/ui"
import { CardElement } from "@stripe/react-stripe-js"
import { StripeCardElementOptions } from "@stripe/stripe-js"

import Divider from "@modules/common/components/divider"
import Spinner from "@modules/common/icons/spinner"
import PaymentContainer from "@modules/checkout/components/payment-container"
import { setPaymentMethod } from "@modules/checkout/actions"
import { paymentInfoMap } from "@lib/constants"
import { StripeContext } from "@modules/checkout/components/payment-wrapper"

const Payment = ({
    cart,
}: {
    cart: Omit<Cart, "refundable_amount" | "refunded_total"> | null
}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [cardBrand, setCardBrand] = useState<string | null>(null)
    const [cardComplete, setCardComplete] = useState(false)

    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const isOpen = searchParams.get("step") === "payment"

    const isStripe = cart?.payment_session?.provider_id === "stripe"
    const stripeReady = useContext(StripeContext)

    const paidByGiftcard =
        cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0

    const paymentReady =
        (cart?.payment_session && cart?.shipping_methods.length !== 0) ||
        paidByGiftcard

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

    const set = async (providerId: string) => {
        setIsLoading(true)
        await setPaymentMethod(providerId)
            .catch((err) => setError(err.toString()))
            .finally(() => {
                if (providerId === "paypal") return
                setIsLoading(false)
            })
    }

    const handleChange = (providerId: string) => {
        setError(null)
        set(providerId)
    }

    const handleEdit = () => {
        router.push(pathname + "?" + createQueryString("step", "payment"), {
            scroll: false,
        })
    }

    const handleSubmit = () => {
        setIsLoading(true)
        router.push(pathname + "?" + createQueryString("step", "review"), {
            scroll: false,
        })
    }

    useEffect(() => {
        setIsLoading(false)
        setError(null)
    }, [isOpen])

    return (
        <div className="bg-white">
            <div className="mb-6 flex flex-row items-center justify-between">
                <Heading
                    level="h2"
                    className={clx(
                        "text-3xl-regular flex flex-row items-baseline gap-x-2",
                        {
                            "pointer-events-none select-none opacity-50":
                                !isOpen && !paymentReady,
                        }
                    )}
                >
                    Thanh toán
                    {!isOpen && paymentReady && <CheckCircleSolid />}
                </Heading>
                {!isOpen && paymentReady && (
                    <Text>
                        <button
                            onClick={handleEdit}
                            className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover"
                            data-testid="edit-payment-button"
                        >
                            Chỉnh sửa
                        </button>
                    </Text>
                )}
            </div>
            <div>
                <div className={isOpen ? "block" : "hidden"}>
                    {!paidByGiftcard && cart?.payment_sessions?.length ? (
                        <>
                            <RadioGroup
                                value={cart.payment_session?.provider_id || ""}
                                onChange={(value: string) =>
                                    handleChange(value)
                                }
                            >
                                {cart.payment_sessions
                                    .sort((a, b) => {
                                        return a.provider_id > b.provider_id
                                            ? 1
                                            : -1
                                    })
                                    .map((paymentSession) => {
                                        return (
                                            <PaymentContainer
                                                paymentInfoMap={paymentInfoMap}
                                                paymentSession={paymentSession}
                                                key={paymentSession.id}
                                                selectedPaymentOptionId={
                                                    cart.payment_session
                                                        ?.provider_id || null
                                                }
                                            />
                                        )
                                    })}
                            </RadioGroup>
                            {isStripe && stripeReady && (
                                <div className="mt-5 transition-all duration-150 ease-in-out">
                                    <Text className="txt-medium-plus mb-1 text-ui-fg-base">
                                        Enter your card details:
                                    </Text>

                                    <CardElement
                                        options={
                                            useOptions as StripeCardElementOptions
                                        }
                                        onChange={(e) => {
                                            setCardBrand(
                                                e.brand &&
                                                    e.brand
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        e.brand.slice(1)
                                            )
                                            setError(e.error?.message || null)
                                            setCardComplete(e.complete)
                                        }}
                                    />
                                </div>
                            )}
                        </>
                    ) : paidByGiftcard ? (
                        <div className="flex w-1/3 flex-col">
                            <Text className="txt-medium-plus mb-1 text-ui-fg-base">
                                Phương thức thanh toán
                            </Text>
                            <Text
                                className="txt-medium text-ui-fg-subtle"
                                data-testid="payment-method-summary"
                            >
                                Gift card
                            </Text>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center px-4 py-16 text-ui-fg-base">
                            <Spinner />
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
                            (!cart?.payment_session && !paidByGiftcard)
                        }
                        data-testid="submit-payment-button"
                    >
                        Xem lại đơn hàng
                    </Button>
                </div>

                <div className={isOpen ? "hidden" : "block"}>
                    {cart && paymentReady && cart.payment_session ? (
                        <div className="flex w-full items-start gap-x-1">
                            <div className="flex w-1/3 flex-col">
                                <Text className="txt-medium-plus mb-1 text-ui-fg-base">
                                    Phương thức thanh toán
                                </Text>
                                <Text
                                    className="txt-medium text-ui-fg-subtle"
                                    data-testid="payment-method-summary"
                                >
                                    {paymentInfoMap[
                                        cart.payment_session.provider_id
                                    ]?.title ||
                                        cart.payment_session.provider_id}
                                </Text>
                                {process.env.NODE_ENV === "development" &&
                                    !Object.hasOwn(
                                        paymentInfoMap,
                                        cart.payment_session.provider_id
                                    ) && (
                                        <Tooltip content="You can add a user-friendly name and icon for this payment provider in 'src/modules/checkout/components/payment/index.tsx'" />
                                    )}
                            </div>
                            <div className="flex w-1/3 flex-col">
                                <Text className="txt-medium-plus mb-1 text-ui-fg-base">
                                    Thông tin chi tiết
                                </Text>
                                <div
                                    className="txt-medium flex items-center gap-2 text-ui-fg-subtle"
                                    data-testid="payment-details-summary"
                                >
                                    <Container className="flex h-7 w-fit items-center bg-ui-button-neutral-hover p-2">
                                        {paymentInfoMap[
                                            cart.payment_session.provider_id
                                        ]?.icon || <CreditCard />}
                                    </Container>
                                    <Text>
                                        {cart.payment_session.provider_id ===
                                            "stripe" && cardBrand
                                            ? cardBrand
                                            : "Another step will appear"}
                                    </Text>
                                </div>
                            </div>
                        </div>
                    ) : paidByGiftcard ? (
                        <div className="flex w-1/3 flex-col">
                            <Text className="txt-medium-plus mb-1 text-ui-fg-base">
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
