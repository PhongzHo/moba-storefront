import logoMOBA from "../../../../../public/logo-moba.png"
import Image from "next/image"
import SearchNav from "./search-nav"

import { Suspense } from "react"

// import { listRegions } from "@lib/data"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
// import SideMenu from "@modules/layout/components/side-menu"
import CategoriesDropdown from "./categories-dropdown"
import MiniNav from "./mini-nav"


export default async function Nav() {
  // const regions = await listRegions().then((regions) => regions)

  return (
    <div className="top-0 inset-x-0 z-[50] sticky my-1">
      <header className="border-b duration-200 bg-white backdrop-blur-sm border-ui-border-base">
        <nav className="content-container txt-xsmall-plus text-ui-fg-subtle h-fit text-small-regular pt-1">
          <div className="flex justify-between items-center">
            <div className="z-[80] pb-8">
              <CategoriesDropdown />
            </div>
            <div className="pl-14">
              <LocalizedClientLink href="/">
                <Image src={logoMOBA} width={130} height={150} alt="logo MOBA'S cửa hàng mẹ và bé" />
              </LocalizedClientLink>
            </div>
            <div className="flex flex-row items-center pt-4">
              <Suspense
                fallback={
                  <LocalizedClientLink
                    className="hover:text-ui-fg-base gap-2"
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
          <div className="flex-1">
            <SearchNav />
          </div>
        </nav>
      </header>
    </div>
  )
}
{/* Wish list */ }
{/* ______ MINI NAV ________ */ }
{/* <MiniNav /> */ }

{/* Thẻ div trên đang làm */ }
{/* <div className="sticky top-0 inset-x-0 group">
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
      </div> */}