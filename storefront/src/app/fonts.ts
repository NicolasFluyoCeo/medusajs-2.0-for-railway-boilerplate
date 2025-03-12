import { Dancing_Script, Montserrat, Kaushan_Script, Fugaz_One } from 'next/font/google'

export const dancingScript = Dancing_Script({
  weight: ['400', '700'],  // Available weights for Dancing Script
  subsets: ['latin'],      // Available subsets for this font
  variable: '--font-dancing-script', // CSS variable for styling
  display: 'swap',
}) 

export const montserrat = Montserrat({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const kaushanScript = Kaushan_Script({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-kaushan-script',
  display: 'swap',
})

export const fugazOne = Fugaz_One({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-fugaz-one',
  display: 'swap',
})