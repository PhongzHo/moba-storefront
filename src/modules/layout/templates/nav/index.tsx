import logoMOBA from "../../../../../public/logo-moba.png"
import Image from "next/image"
import SearchNav from "./search-nav"

import { Suspense } from "react"

import { listRegions } from "@lib/data"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import { ShoppingBag } from "@medusajs/icons"
import CategoriesDropdown from "./categories-dropdown"

export default async function Nav() {
    const regions = await listRegions().then((regions) => regions)

    return (
        <>
            <div className="sticky inset-x-0 top-0 z-[50]">
                <header className="relative mx-auto h-16 items-center border-b border-ui-border-base bg-moba-green/50 backdrop-blur-sm duration-200">
                    <nav className="content-container text-small-regular txt-xsmall-plus z-[80] flex h-full pt-1 text-ui-fg-subtle">
                        {/* logo */}
                        <div className="flex h-full">
                            <LocalizedClientLink href="/">
                                <Image
                                    src={logoMOBA}
                                    width={160}
                                    height={150}
                                    alt="logo MOBA'S cửa hàng mẹ và bé"
                                />
                            </LocalizedClientLink>
                        </div>
                        <div className="flex gap-10">
                            {/* categories */}
                            <div className="flex items-center gap-2 pl-6 font-bold">
                                {/* <BarsThree />
                Danh Mục */}
                                <CategoriesDropdown />
                            </div>

                            {/* search bar */}
                            <div className="top-0 flex h-full pt-2">
                                <SearchNav />
                            </div>
                        </div>
                        {/* sign in */}
                        {/* Wish list */}

                        {/* Cart icon */}
                        <div className="flex h-full flex-1 basis-0 items-center justify-end gap-x-2">
                            <div className="flex flex-col items-center">
                                <ShoppingBag />
                                <Suspense
                                    fallback={
                                        <LocalizedClientLink
                                            className="flex gap-2 hover:text-ui-fg-base"
                                            href="/cart"
                                            data-testid="nav-cart-link"
                                        >
                                            Cart (0)
                                        </LocalizedClientLink>
                                    }
                                >
                                    <CartButton />
                                </Suspense>
                            </div>
                        </div>
                    </nav>
                </header>
            </div>
            {/* Thẻ div trên đang làm */}
            <div className="group sticky inset-x-0 top-0">
                <header className="relative mx-auto h-16 border-b border-ui-border-base bg-white duration-200">
                    <nav className="content-container text-small-regular txt-xsmall-plus flex h-full w-full items-center justify-between text-ui-fg-subtle">
                        <div className="flex h-full flex-1 basis-0 items-center">
                            <div className="h-full">
                                <SideMenu regions={regions} />
                            </div>
                        </div>

                        <div className="flex h-full items-center">
                            <LocalizedClientLink
                                href="/"
                                className="txt-compact-xlarge-plus uppercase hover:text-ui-fg-base"
                                data-testid="nav-store-link"
                            >
                                Medusa Store
                            </LocalizedClientLink>
                        </div>

                        <div className="flex h-full flex-1 basis-0 items-center justify-end gap-x-6">
                            <div className="hidden h-full items-center gap-x-6 small:flex">
                                {process.env.FEATURE_SEARCH_ENABLED && (
                                    <LocalizedClientLink
                                        className="hover:text-ui-fg-base"
                                        href="/search"
                                        scroll={false}
                                        data-testid="nav-search-link"
                                    >
                                        Search
                                    </LocalizedClientLink>
                                )}
                                <LocalizedClientLink
                                    className="hover:text-ui-fg-base"
                                    href="/account"
                                    data-testid="nav-account-link"
                                >
                                    Account
                                </LocalizedClientLink>
                            </div>
                            <Suspense
                                fallback={
                                    <LocalizedClientLink
                                        className="flex gap-2 hover:text-ui-fg-base"
                                        href="/cart"
                                        data-testid="nav-cart-link"
                                    >
                                        Cart (0)
                                    </LocalizedClientLink>
                                }
                            >
                                <CartButton />
                                <ShoppingBag />
                            </Suspense>
                        </div>
                    </nav>
                </header>
            </div>
        </>
    )
}
