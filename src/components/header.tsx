import Link from "next/link"

export function Header() {
  const links = [
    ["Buy", "/buy"],
    ["Rent", "/rent"],
    ["Areas", "/areas"],
    ["Relocation", "/relocation"],
    ["Journal", "/journal"],
    ["Favorites", "/favorites"],
  ]

  return <header className="site-header">
    <Link className="wordmark" href="/">Aurelia Estates</Link>
    <nav className="desktop-nav" aria-label="Main navigation">{links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav>
    <Link className="button small header-cta" href="/matchmaker">Find my home</Link>
    <details className="mobile-menu">
      <summary>Menu</summary>
      <nav aria-label="Mobile navigation">{links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}<Link href="/matchmaker">Find my home</Link></nav>
    </details>
  </header>
}
