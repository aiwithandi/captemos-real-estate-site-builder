import Link from "next/link"

export function BrandMark({ footer = false }: { footer?: boolean }) {
  return (
    <Link className={`brand-mark${footer ? " brand-mark-footer" : ""}`} href="/" aria-label="Aurelia Estates home">
      <span className="brand-monogram" aria-hidden="true">A</span>
      <span className="brand-copy">
        <strong>Aurelia</strong>
        <small>Estates · Marbella</small>
      </span>
    </Link>
  )
}
