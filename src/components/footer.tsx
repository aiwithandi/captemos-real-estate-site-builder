import Link from "next/link"

export function Footer() {
  return <footer><div><span className="wordmark">Aurelia Estates</span><p>Considered property advice in Marbella.</p></div><div className="footer-links"><Link href="/buy">Buy</Link><Link href="/rent">Rent</Link><Link href="/sell">Sell</Link><Link href="/contact">Contact</Link></div><small>© {new Date().getFullYear()} Aurelia Estates. Demo portal.</small></footer>
}
