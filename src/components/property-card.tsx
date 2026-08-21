import Image from "next/image"
import Link from "next/link"
import { Bath, BedDouble, Maximize2 } from "lucide-react"
import { FavoriteButton } from "@/components/favorite-button"
import { formatPrice } from "@/lib/properties"
import type { Property } from "@/types/property"

export function PropertyCard({ property, priority = false }: { property: Property; priority?: boolean }) {
  return <article className="property-card"><Link href={`/properties/${property.slug}`}><div className="card-image"><Image src={property.images[0].src} alt={property.images[0].alt} fill sizes="(max-width: 760px) 100vw, 33vw" priority={priority}/><span>{property.transaction === "rent" ? "For rent" : "For sale"}</span></div><div className="card-copy"><p className="eyebrow">{property.location}</p><h3>{property.title}</h3><p className="price">{formatPrice(property)}</p><div className="facts"><span><BedDouble/> {property.bedrooms}</span><span><Bath/> {property.bathrooms}</span><span><Maximize2/> {property.builtArea} m²</span></div></div></Link><FavoriteButton id={property.id}/></article>
}
