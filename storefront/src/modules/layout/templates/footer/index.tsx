import { Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  return (
    <footer className="border-t border-ui-border-base w-full bg-black text-white">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-6 xsmall:flex-row items-start justify-between py-12">
          <div className="flex-1">
            <LocalizedClientLink href="/" className="text-2xl uppercase flex flex-col gap-4 w-fit">
              <span>NG Soccer Gloves</span>
              <img 
                src="/footer/icononglvoes.png" 
                alt="NG Soccer Gloves Logo" 
                className="h-24 w-auto object-contain"
                style={{ imageRendering: 'crisp-edges' }}
              />
            </LocalizedClientLink>
          </div>

          <div className="text-small-regular grid grid-cols-3 gap-x-16">
            {/* Menu 1 */}
            <div className="flex flex-col gap-y-2">
              <span className="txt-small-plus">Home</span>
              <ul className="grid grid-cols-1 gap-y-2">
                <li>
                  <LocalizedClientLink href="/" className="hover:text-gray-400">
                    Intro
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>

            {/* Menu 2 */}
            <div className="flex flex-col gap-y-2">
              <span className="txt-small-plus">Products</span>
              <ul className="grid grid-cols-1 gap-y-2">
                <li>
                  <LocalizedClientLink href="/store" className="hover:text-gray-400">
                    Gloves
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/store" className="hover:text-gray-400">
                    Sweatshirts
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/store" className="hover:text-gray-400">
                    Jackets
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>

            {/* Menu 3 */}
            <div className="flex flex-col gap-y-2">
              <span className="txt-small-plus">Contact</span>
              <ul className="grid grid-cols-1 gap-y-2">
                <li>
                  <LocalizedClientLink href="/about" className="hover:text-gray-400">
                    About Us
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/refund" className="hover:text-gray-400">
                    Refund Policy
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/contact" className="hover:text-gray-400">
                    Contacts
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex w-full mb-16 justify-between items-center border-t border-gray-800 pt-6">
          <div className="flex items-center gap-4">
            <Text className="txt-compact-small text-gray-400">
              © {new Date().getFullYear()} NG Soccer Gloves
            </Text>
          </div>
        </div>
      </div>
    </footer>
  )
}
