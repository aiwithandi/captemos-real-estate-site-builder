import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Bath, BedDouble, Maximize2 } from "lucide-react"
import { FavoriteButton } from "@/components/favorite-button"
import { bypassImageOptimization, formatPrice } from "@/lib/property-format"
import type { Property } from "@/types/property"

export function PropertyCard({ property, priority = false }: { property: Property; priority?: boolean }) {
  return (
    <article className="property-card">
      <Link href={`/properties/${property.slug}`} aria-label={`View ${property.title}`}>
        <div className="card-image">
          <Image src={property.images[0].src} alt={property.images[0].alt} fill sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw" priority={priority} unoptimized={bypassImageOptimization(property.images[0].src)} />
          <span className="card-status">{property.transaction === "rent" ? "Long-term rent" : "For sale"}</span>
          <span className="card-view" aria-hidden="true"><ArrowUpRight /></span>
        </div>
        <div className="card-copy">
          <div className="card-meta"><p>{property.location}</p><span>{property.propertyType}</span></div>
          <h3>{property.title}</h3>
          <p className="price">{formatPrice(property)}</p>
          <div className="facts">
            <span><BedDouble aria-hidden="true" /> {property.bedrooms} beds</span>
            <span><Bath aria-hidden="true" /> {property.bathrooms} baths</span>
            <span><Maximize2 aria-hidden="true" /> {property.builtArea} m²</span>
          </div>
        </div>
      </Link>
      <FavoriteButton id={property.id} />
    </article>
  )
}
