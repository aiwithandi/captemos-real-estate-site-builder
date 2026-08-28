import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { PropertyCard } from "@/components/property-card"
import { areas, getArea } from "@/data/site"
import { getProperties } from "@/lib/properties"

export function generateStaticParams() {
  return areas.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const area = getArea((await params).slug)
  if (!area) return { title: "Area not found" }
  return { title: `${area.name} property & area guide`, description: area.summary, openGraph: { images: [area.image] } }
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const area = getArea((await params).slug)
  if (!area) notFound()
  const { items } = await getProperties()
  const results = items.filter((property) => property.areaSlug === area.slug)

  return (
    <>
      <section className="area-detail-hero">
        <Image src={area.image} alt={area.imageAlt} fill priority sizes="100vw" />
        <div className="area-detail-shade" />
        <Link className="area-back" href="/areas"><ArrowLeft aria-hidden="true" /> All areas</Link>
        <div><p className="eyebrow light">Area guide · Marbella</p><h1>{area.name}</h1><p>{area.summary}</p></div>
      </section>
      <section className="area-story section shell">
        <div><p className="eyebrow">Life in {area.name}</p><h2>A place with<br />its own rhythm.</h2></div>
        <div><p className="area-lede">{area.description}</p><ul>{area.character.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul></div>
      </section>
      <section className="area-properties">
        <div className="section shell">
          <div className="section-head compact"><div><p className="eyebrow">The local edit</p><h2>Homes in {area.name}.</h2></div><Link className="text-link" href={`/buy?area=${area.slug}`}>Search this area <ArrowRight aria-hidden="true" /></Link></div>
          {results.length ? <div className="property-grid">{results.slice(0, 3).map((property) => <PropertyCard key={property.id} property={property} />)}</div> : <div className="empty-area"><p>There are no public listings here in the current portfolio. Private opportunities may be available around a qualified brief.</p><Link className="button" href="/contact">Ask about {area.name} <ArrowRight aria-hidden="true" /></Link></div>}
        </div>
      </section>
    </>
  )
}
