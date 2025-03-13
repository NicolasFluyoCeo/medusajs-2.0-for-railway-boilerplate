import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"
import { dancingScript, montserrat, kaushanScript, fugazOne } from "./fonts"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light" className={`${dancingScript.variable} ${montserrat.variable} ${kaushanScript.variable} ${fugazOne.variable}`}>
      <body>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
