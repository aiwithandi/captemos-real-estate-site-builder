import Link from "next/link"
import { Heart, Menu, X } from "lucide-react"
import { BrandMark } from "@/components/brand-mark"

export function Header() {
  const links = [
    ["Buy", "/buy"], ["Rent", "/rent"], ["Sell", "/sell"], ["Areas", "/areas"],
    ["Relocation", "/relocation"], ["Journal", "/journal"],
  ]

  return (
    <>
      <div className="announcement">
        <p>Private property search &amp; relocation in Marbella</p>
        <Link href="/contact">Speak with an advisor <span aria-hidden="true">↗</span></Link>
      </div>
      <header className="site-header">
        <BrandMark />
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
        <div className="header-actions">
          <Link className="favorites-link" href="/favorites" aria-label="View saved homes"><Heart aria-hidden="true" /></Link>
          <Link className="button small header-cta" href="/matchmaker">Find my home</Link>
        </div>
        <details className="mobile-menu">
          <summary><Menu className="menu-open" aria-hidden="true" /><X className="menu-close" aria-hidden="true" /><span className="sr-only">Toggle navigation</span></summary>
          <nav aria-label="Mobile navigation">
            {links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
            <Link href="/favorites">Saved homes</Link>
            <Link className="button" href="/matchmaker">Find my home</Link>
          </nav>
        </details>
      </header>
    </>
  )
}
