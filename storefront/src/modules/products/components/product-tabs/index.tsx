"use client"

import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"

import Accordion from "./accordion"
import { HttpTypes } from "@medusajs/types"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const tabs = [
    {
      label: "Product Information",
      component: <ProductInfoTab product={product} />,
    }
  ]

  return (
    <div className="w-full">
      <Accordion type="multiple">
        {tabs.map((tab, i) => (
          <Accordion.Item
            key={i}
            title={tab.label}
            headingSize="medium"
            value={tab.label}
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

const ProductInfoTab = ({ product }: ProductTabsProps) => {
  return (
    <div className="text-small-regular py-8">
      <div className="flex flex-col gap-y-6">
        <h3 className="font-semibold text-base">GLOVE SIZES</h3>
        <p className="mb-4">Please measure the circumference of your hand at its widest point (excluding the thumb) to find your perfect size:</p>
        
        <div className="grid grid-cols-3 gap-x-4 gap-y-2">
          <div className="font-semibold">Size</div>
          <div className="font-semibold">Centimeters</div>
          <div className="font-semibold">Inches</div>
          
          <div>5</div>
          <div>15.3 - 16.0 cm</div>
          <div>6.0" - 6.3"</div>
          
          <div>6</div>
          <div>16.1 - 16.8 cm</div>
          <div>6.3" - 6.6"</div>
          
          <div>7</div>
          <div>16.9 - 17.6 cm</div>
          <div>6.7" - 6.9"</div>
          
          <div>8</div>
          <div>17.7 - 18.4 cm</div>
          <div>7.0" - 7.2"</div>
          
          <div>9</div>
          <div>18.5 - 19.2 cm</div>
          <div>7.3" - 7.6"</div>
          
          <div>10</div>
          <div>19.3 - 20.0 cm</div>
          <div>7.6" - 7.9"</div>
        </div>
        
        <p className="mt-2">Measuring tip: Use a soft measuring tape around your dominant hand at its widest point (excluding thumb). If between sizes, we recommend choosing the larger size for a more comfortable fit.</p>
      </div>
    </div>
  )
}

const ShippingInfoTab = () => {
  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-1 gap-y-8">
        <div className="flex items-start gap-x-2">
          <FastDelivery />
          <div>
            <span className="font-semibold">Fast delivery</span>
            <p className="max-w-sm">
              Your package will arrive in 3-5 business days at your pick up
              location or in the comfort of your home.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Refresh />
          <div>
            <span className="font-semibold">Simple exchanges</span>
            <p className="max-w-sm">
              Is the fit not quite right? No worries - we&apos;ll exchange your
              product for a new one.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Back />
          <div>
            <span className="font-semibold">Easy returns</span>
            <p className="max-w-sm">
              Just return your product and we&apos;ll refund your money. No
              questions asked – we&apos;ll do our best to make sure your return
              is hassle-free.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTabs
