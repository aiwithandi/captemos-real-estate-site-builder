"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { PropertyCard } from "@/components/property-card"
import type { Property } from "@/types/property"

export function FavoritesList({ properties }: { properties: Property[] }) { const [ids,setIds]=useState<string[]>([]); useEffect(()=>{const sync=()=>{try{const parsed=JSON.parse(localStorage.getItem("aurelia_favorites")||"[]");setIds(Array.isArray(parsed)?parsed:[])}catch{setIds([])}};sync();window.addEventListener("aurelia:favorites",sync);return()=>window.removeEventListener("aurelia:favorites",sync)},[]); const items=properties.filter(property=>ids.includes(property.id)); if(!items.length)return <div><p>Your shortlist is empty. Save a home to see it here.</p><Link className="button" href="/buy">Explore homes</Link></div>; return <div className="property-grid">{items.map(property=><PropertyCard key={property.id} property={property}/>)}</div> }
