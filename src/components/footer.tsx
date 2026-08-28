import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { BrandMark } from "@/components/brand-mark"
import { site } from "@/data/site"

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-lead">
        <p className="eyebrow light">A more considered move</p>
        <h2>Let&apos;s find your place<br />in the sun.</h2>
        <Link className="text-link light" href="/contact">Begin a conversation <ArrowUpRight /></Link>
      </div>
      <div className="footer-main">
        <div className="footer-brand">
          <BrandMark footer />
          <p>Independent property advice for buying, selling, and living well in Marbella.</p>
        </div>
        <nav className="footer-links" aria-label="Property services">
          <p>Property</p>
          <Link href="/buy">Homes to buy</Link>
          <Link href="/rent">Homes to rent</Link>
          <Link href="/sell">Sell with Aurelia</Link>
          <Link href="/favorites">Saved homes</Link>
        </nav>
        <nav className="footer-links" aria-label="Aurelia information">
          <p>Discover</p>
          <Link href="/areas">Area guides</Link>
          <Link href="/relocation">Relocation</Link>
          <Link href="/journal">Journal</Link>
          <Link href="/matchmaker">Private Matchmaker</Link>
        </nav>
        <address className="footer-contact">
          <p>Visit &amp; contact</p>
          <span>{site.address}</span>
          <a href={`tel:${site.phoneHref}`}>{site.phoneDisplay}</a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </address>
      </div>
      <div className="footer-bottom">
        <small>© {new Date().getFullYear()} {site.name}. Demonstration portal.</small>
        <small>Property details are illustrative and subject to verification.</small>
      </div>
    </footer>
  )
}
