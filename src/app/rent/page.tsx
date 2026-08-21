import type { Metadata } from "next"
import { PropertyCard } from "@/components/property-card"
import { getProperties } from "@/lib/properties"
export const metadata: Metadata={title:"Property to rent"}
export default async function Rent(){const {items,source}=await getProperties();const results=items.filter(p=>p.transaction==="rent");return <><header className="page-hero"><p className="eyebrow">Long-term living</p><h1>Homes to rent</h1><p>Considered rentals for a confident move to Marbella.</p></header><div className="listing-layout"><p>{results.length} homes · {source} feed</p><div className="property-grid">{results.map(p=><PropertyCard key={p.id} property={p}/>)}</div></div></>}
