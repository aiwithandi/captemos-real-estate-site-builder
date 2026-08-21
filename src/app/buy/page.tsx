import type { Metadata } from "next"
import { PropertyCard } from "@/components/property-card"
import { getProperties } from "@/lib/properties"

export const metadata: Metadata = { title: "Property for sale", description: "Explore selected homes for sale in Marbella." }

export default async function Buy({ searchParams }: { searchParams: Promise<Record<string,string|undefined>> }) {
  const params = await searchParams; const { items, source } = await getProperties(); const beds=Number(params.beds||0); const max=Number(params.max||0)
  const filtered=items.filter(p=>p.transaction==="sale"&&(!params.area||p.areaSlug===params.area)&&(!beds||p.bedrooms>=beds)&&(!max||p.price<=max))
  return <><header className="page-hero"><p className="eyebrow">Portfolio</p><h1>Homes for sale</h1><p>A concise selection of residences chosen for location, character, and enduring quality.</p></header><div className="listing-layout"><form className="filters"><select name="area" defaultValue={params.area||""} aria-label="Area"><option value="">All areas</option><option value="golden-mile">Golden Mile</option><option value="nueva-andalucia">Nueva Andalucía</option><option value="benahavis">Benahavís</option></select><select name="beds" defaultValue={params.beds||""} aria-label="Minimum bedrooms"><option value="">Any bedrooms</option><option>2</option><option>3</option><option>4</option><option>5</option></select><select name="max" defaultValue={params.max||""} aria-label="Maximum price"><option value="">Any price</option><option value="1000000">Up to €1M</option><option value="2000000">Up to €2M</option><option value="4000000">Up to €4M</option></select><button className="button">Apply</button></form><p>{filtered.length} homes · {source} feed</p><div className="property-grid">{filtered.map(p=><PropertyCard key={p.id} property={p}/>)}</div></div></>
}
