import { Suspense } from "react"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import NavWrapper from "@modules/layout/components/nav-wrapper"
import dynamic from "next/dynamic"
import { fugazOne } from "app/fonts"

// Importamos el componente de forma dinámica para evitar problemas de SSR
const SearchInput = dynamic(
  () => import("@modules/layout/components/search-input"),
  { ssr: false }
)

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <NavWrapper>
      <nav className="content-container txt-xsmall-plus text-white flex items-center justify-between w-full h-full text-small-regular">
        <div className="flex-1 basis-0 h-full flex items-center">
          <div className="h-full">
            <SideMenu regions={regions} />
          </div>
        </div>

        <div className="flex items-center h-full">
          <LocalizedClientLink
            href="/"
            className={`text-3xl md:text-4xl lg:text-4xl text-white hover:text-gray-300 uppercase ${fugazOne.className}`} 
            data-testid="nav-store-link"
          >
            NG Soccer Gloves
          </LocalizedClientLink>
        </div>

        <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
          <div className="hidden small:flex items-center gap-x-6 h-full">
            {/* Enlace de búsqueda solo se muestra si el input de búsqueda no está visible */}
            {process.env.NEXT_PUBLIC_FEATURE_SEARCH_ENABLED && (
              <LocalizedClientLink
                className="text-white hover:text-gray-300 md:hidden"
                href="/search"
                scroll={false}
                data-testid="nav-search-link"
              >
                Search
              </LocalizedClientLink>
            )}
            <LocalizedClientLink
              className="text-white hover:text-gray-300"
              href="/account"
              data-testid="nav-account-link"
            >
              Account
            </LocalizedClientLink>
          </div>
          
          {/* Input de búsqueda */}
          {/* <div className="hidden md:block mr-2">
            <SearchInput />
          </div> */}
          
          <Suspense
            fallback={
              <LocalizedClientLink
                className="text-white hover:text-gray-300 flex gap-2"
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
    </NavWrapper>
  )
}
