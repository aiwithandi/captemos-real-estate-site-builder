import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, SlidersHorizontal } from "lucide-react"
import { CatalogueFilters } from "@/components/catalogue-filters"
import { PropertyCard } from "@/components/property-card"
import { getProperties } from "@/lib/properties"

export const metadata: Metadata = {
  title: "Property for sale in Marbella",
  description: "Explore selected villas, apartments, penthouses, and private homes for sale in Marbella and the Costa del Sol.",
}

type SearchParams = Promise<Record<string, string | string[] | undefined>>

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] || "" : value || ""
}

export default async function Buy({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  const { items, source } = await getProperties()
  const beds = Number(first(params.beds) || 0)
  const max = Number(first(params.max) || 0)
  const area = first(params.area)
  const type = first(params.type).toLowerCase()
  const results = items.filter((property) => property.transaction === "sale")
    .filter((property) => !area || property.areaSlug === area)
    .filter((property) => !beds || property.bedrooms >= beds)
    .filter((property) => !max || property.price <= max)
    .filter((property) => !type || property.propertyType.toLowerCase() === type)

  return (
    <>
      <header className="page-hero catalogue-hero">
        <div><p className="eyebrow">The sales collection</p><h1>Homes to buy<br /><em>in Marbella.</em></h1></div>
        <p>Selected for architecture, location, and the quality of life they make possible.</p>
      </header>
      <div className="catalogue-shell">
        <CatalogueFilters params={params} transaction="sale" />
        <div className="catalogue-toolbar">
          <p><SlidersHorizontal aria-hidden="true" /> <strong>{results.length}</strong> {results.length === 1 ? "residence" : "residences"}</p>
          <span><i className="source-dot" /> {source === "captemos" ? "Live CapteMos portfolio" : "Demonstration portfolio"}</span>
        </div>
        {results.length ? <div className="property-grid catalogue-grid">{results.map((property, index) => <PropertyCard key={property.id} property={property} priority={index < 2} />)}</div> : (
          <div className="empty-state"><p className="eyebrow">A more personal search</p><h2>No exact matches yet.</h2><p>Widen the filters or share your brief. Some of the most relevant homes are introduced privately.</p><div><Link className="button" href="/matchmaker">Create a private brief <ArrowRight aria-hidden="true" /></Link><Link className="text-link" href="/buy">Clear filters</Link></div></div>
        )}
      </div>
    </>
  )
}
