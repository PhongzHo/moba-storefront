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
      <div className="top-0 inset-x-0 z-[50] sticky ">
        <header className="relative items-center h-16 mx-auto border-b duration-200 bg-moba-green/50 backdrop-blur-sm border-ui-border-base">
          <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex h-full text-small-regular pt-1 z-[80]">
            {/* logo */}
            <div className="h-full flex">
              <LocalizedClientLink href="/">
                <Image src={logoMOBA} width={160} height={150} alt="logo MOBA'S cửa hàng mẹ và bé" />
              </LocalizedClientLink>
            </div>
            <div className="gap-10 flex">
              {/* categories */}
              <div className="flex items-center gap-2 pl-6 font-bold ">
                {/* <BarsThree />
                Danh Mục */}
                <CategoriesDropdown />
              </div>

              {/* search bar */}
              <div className="flex h-full top-0 pt-2">
                <SearchNav />
              </div>
            </div>
            {/* sign in */}

            {/* Wish list */}

            {/* Cart icon */}
            <div className="flex items-center gap-x-2 h-full flex-1 basis-0 justify-end">
              <div className="flex flex-col items-center">
                <ShoppingBag />
                <Suspense
                  fallback={
                    <LocalizedClientLink
                      className="hover:text-ui-fg-base flex gap-2"
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
      <div className="sticky top-0 inset-x-0 group">
        <header className="relative h-16 mx-auto border-b duration-200 bg-white border-ui-border-base">
          <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
            <div className="flex-1 basis-0 h-full flex items-center">
              <div className="h-full">
                <SideMenu regions={regions} />
              </div>
            </div>

            <div className="flex items-center h-full">
              <LocalizedClientLink
                href="/"
                className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase"
                data-testid="nav-store-link"
              >
                Medusa Store
              </LocalizedClientLink>
            </div>

            <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
              <div className="hidden small:flex items-center gap-x-6 h-full">
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
                    className="hover:text-ui-fg-base flex gap-2"
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
          </nav>
        </header>
      </div>
    </>
  )
}
