import type { Metadata } from "next"
import { Cormorant_Garamond, Inter } from "next/font/google"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import "./globals.css"

const serif = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-serif", weight: ["500", "600"] })
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = { metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"), title: { default: "Aurelia Estates | Property in Marbella", template: "%s | Aurelia Estates" }, description: "Exceptional homes and considered property advice in Marbella." }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${serif.variable} ${sans.variable}`}><a className="skip" href="#content">Skip to content</a><Header/><main id="content">{children}</main><Footer/></body></html>
}
