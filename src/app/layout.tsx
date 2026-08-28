import type { Metadata } from "next"
import { Cormorant_Garamond, Inter } from "next/font/google"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { site } from "@/data/site"
import "./globals.css"

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600"],
  display: "swap",
})
const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Aurelia Estates | Exceptional homes in Marbella",
    template: "%s | Aurelia Estates",
  },
  description: "Private property search, sales, and relocation advice across Marbella and the Costa del Sol.",
  keywords: ["Marbella property", "luxury homes Marbella", "Costa del Sol real estate", "Marbella relocation"],
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: site.name,
    title: "Aurelia Estates | Exceptional homes in Marbella",
    description: "Private property search, sales, and relocation advice across Marbella and the Costa del Sol.",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${serif.variable} ${sans.variable}`}>
        <a className="skip" href="#content">Skip to content</a>
        <Header />
        <main id="content">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
