"use client"

import { Heading, Text, clx } from "@medusajs/ui"

import PaymentButton from "../payment-button"
import { useSearchParams } from "next/navigation"
import { Cart } from "@medusajs/medusa"

const Review = ({
    cart,
}: {
    cart: Omit<Cart, "refundable_amount" | "refunded_total">
}) => {
    const searchParams = useSearchParams()

    const isOpen = searchParams.get("step") === "review"

    const paidByGiftcard =
        cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0

    const previousStepsCompleted =
        cart.shipping_address &&
        cart.shipping_methods.length > 0 &&
        (cart.payment_session || paidByGiftcard)

    return (
        <div className="bg-white">
            <div className="mb-6 flex flex-row items-center justify-between">
                <Heading
                    level="h2"
                    className={clx(
                        "text-3xl-regular flex flex-row items-baseline gap-x-2",
                        {
                            "pointer-events-none select-none opacity-50":
                                !isOpen,
                        }
                    )}
                >
                    Đặt hàng
                </Heading>
            </div>
            {isOpen && previousStepsCompleted && (
                <>
                    <div className="mb-6 flex w-full items-start gap-x-1">
                        <div className="w-full">
                            <Text className="txt-medium-plus mb-1 text-ui-fg-base">
                                Bằng cách nhấn vào nút đặt hàng, ba/mẹ xác nhận
                                đã đọc và hiểu các chính sách bán hàng, chính
                                sách đổi trả hàng hóa và chấp nhận cách chính
                                sách bảo mật quyền riêng tư của MOBA&apos;S.
                            </Text>
                        </div>
                    </div>
                    <PaymentButton
                        cart={cart}
                        data-testid="submit-order-button"
                    />
                </>
            )}
        </div>
    )
}

export default Review
