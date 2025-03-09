import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SearchBar from "@modules/layout/components/nav-search/search-bar"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="fixed top-0 inset-x-0 z-50 group bg-black">
      <header className="relative h-16 mx-auto">
        <nav className="content-container txt-xsmall-plus text-white flex items-center justify-between w-full h-full text-small-regular">
          {/* Left section - Logo and Categories */}
          <div className="flex items-center h-full gap-x-6">
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus hover:text-gray-300 mr-6"
              data-testid="nav-store-link"
            >
              <img 
                src="/footer/icononglvoes.png" 
                alt="Store logo" 
                className="h-10 w-auto rounded-lg"
              />
            </LocalizedClientLink>
            <LocalizedClientLink href="/men" className="hover:text-gray-300">Men</LocalizedClientLink>
            <LocalizedClientLink href="/women" className="hover:text-gray-300">Women</LocalizedClientLink>
            <LocalizedClientLink href="/kids" className="hover:text-gray-300">Kids</LocalizedClientLink>
            <LocalizedClientLink href="/contacts" className="hover:text-gray-300">Contacts</LocalizedClientLink>
          </div>

          {/* Right section - Search, Account, Cart */}
          <div className="flex items-center gap-x-6 h-full justify-end">
            <SearchBar />
            <LocalizedClientLink href="/account" className="hover:text-gray-300">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </LocalizedClientLink>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-gray-300"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 11V7C16 5.93913 15.5786 4.92172 14.8284 4.17157C14.0783 3.42143 13.0609 3 12 3C10.9391 3 9.92172 3.42143 9.17157 4.17157C8.42143 4.92172 8 5.93913 8 7V11M5 9H19L20 21H4L5 9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
            
          </div>
        </nav>
      </header>
    </div>
  )
}
