import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, SlidersHorizontal } from "lucide-react"
import { CatalogueFilters } from "@/components/catalogue-filters"
import { PropertyCard } from "@/components/property-card"
import { getProperties } from "@/lib/properties"

export const metadata: Metadata = {
  title: "Long-term rentals in Marbella",
  description: "Explore considered long-term rental homes across Marbella and the Costa del Sol.",
}

type SearchParams = Promise<Record<string, string | string[] | undefined>>

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] || "" : value || ""
}

export default async function Rent({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  const { items, source } = await getProperties()
  const beds = Number(first(params.beds) || 0)
  const max = Number(first(params.max) || 0)
  const area = first(params.area)
  const type = first(params.type).toLowerCase()
  const results = items.filter((property) => property.transaction === "rent")
    .filter((property) => !area || property.areaSlug === area)
    .filter((property) => !beds || property.bedrooms >= beds)
    .filter((property) => !max || property.price <= max)
    .filter((property) => !type || property.propertyType.toLowerCase() === type)

  return (
    <>
      <header className="page-hero catalogue-hero rent-hero">
        <div><p className="eyebrow">Long-term living</p><h1>Homes to rent<br /><em>by the coast.</em></h1></div>
        <p>Settled, well-positioned homes for making Marbella part of everyday life.</p>
      </header>
      <div className="catalogue-shell">
        <CatalogueFilters params={params} transaction="rent" />
        <div className="catalogue-toolbar">
          <p><SlidersHorizontal aria-hidden="true" /> <strong>{results.length}</strong> {results.length === 1 ? "residence" : "residences"}</p>
          <span><i className="source-dot" /> {source === "captemos" ? "Live CapteMos portfolio" : "Demonstration portfolio"}</span>
        </div>
        {results.length ? <div className="property-grid catalogue-grid">{results.map((property, index) => <PropertyCard key={property.id} property={property} priority={index < 2} />)}</div> : (
          <div className="empty-state"><p className="eyebrow">Rental search</p><h2>Nothing exact right now.</h2><p>Rental availability changes quickly. Share your timing and we will watch for the right fit.</p><div><Link className="button" href="/contact">Tell us what you need <ArrowRight aria-hidden="true" /></Link><Link className="text-link" href="/rent">Clear filters</Link></div></div>
        )}
      </div>
    </>
  )
}
