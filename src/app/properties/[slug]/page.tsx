import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, Bath, BedDouble, Check, MapPin, Maximize2 } from "lucide-react"
import { FavoriteButton } from "@/components/favorite-button"
import { InquiryForm } from "@/components/inquiry-form"
import { getProperty } from "@/lib/properties"
import { bypassImageOptimization, formatPrice } from "@/lib/property-format"

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { item } = await getProperty((await params).slug)
  return item ? {
    title: `${item.title} in ${item.location}`,
    description: item.description,
    openGraph: { type: "website", images: [{ url: item.images[0].src, alt: item.images[0].alt }] },
  } : { title: "Property not found" }
}

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { item, source } = await getProperty((await params).slug)
  if (!item) notFound()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Residence",
    name: item.title,
    description: item.description,
    image: item.images.map((image) => image.src),
    address: { "@type": "PostalAddress", addressLocality: item.location, addressRegion: "Málaga", addressCountry: "ES" },
    numberOfBedrooms: item.bedrooms,
    numberOfBathroomsTotal: item.bathrooms,
    floorSize: { "@type": "QuantitativeValue", value: item.builtArea, unitCode: "MTK" },
    offers: { "@type": "Offer", price: item.price, priceCurrency: "EUR", availability: "https://schema.org/InStock" },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <section className="property-detail-hero">
        <Image src={item.images[0].src} alt={item.images[0].alt} fill priority sizes="100vw" unoptimized={bypassImageOptimization(item.images[0].src)} />
        <div className="property-detail-shade" />
        <Link className="property-back" href={item.transaction === "rent" ? "/rent" : "/buy"}><ArrowLeft aria-hidden="true" /> Back to collection</Link>
        <div className="property-title-block">
          <p className="eyebrow light">{item.propertyType} · {item.transaction === "rent" ? "Long-term rent" : "For sale"}</p>
          <h1>{item.title}</h1>
          <p><MapPin aria-hidden="true" /> {item.location}</p>
        </div>
        <div className="property-hero-price"><span>Guide price</span><strong>{formatPrice(item)}</strong></div>
      </section>

      <section className="property-facts-bar">
        <div><BedDouble aria-hidden="true" /><span><strong>{item.bedrooms}</strong> Bedrooms</span></div>
        <div><Bath aria-hidden="true" /><span><strong>{item.bathrooms}</strong> Bathrooms</span></div>
        <div><Maximize2 aria-hidden="true" /><span><strong>{item.builtArea}</strong> Built m²</span></div>
        <div className="detail-favorite"><FavoriteButton id={item.id} /><span>Save this home</span></div>
      </section>

      <section className="property-content section shell">
        <article className="property-description">
          <p className="eyebrow">The residence</p>
          <h2>A home shaped around<br />the Mediterranean.</h2>
          <p className="property-lede">{item.description}</p>
          <p>Every detail shown here is intended as a useful introduction. We will confirm specifications, availability, and supporting documentation before arranging a private viewing.</p>
          <div className="property-features">
            <h3>Features &amp; details</h3>
            <ul>{item.features.map((feature) => <li key={feature}><Check aria-hidden="true" />{feature}</li>)}</ul>
          </div>
          <p className="source-note"><span className="source-dot" /> Portfolio source: {source === "captemos" ? "Live CapteMos feed" : "Demonstration feed"}</p>
        </article>
        <aside className="property-enquiry">
          <p className="eyebrow">Arrange a private viewing</p>
          <h2>Experience {item.title}.</h2>
          <p>Share your preferred timing and an Aurelia advisor will reply with availability and the next useful detail.</p>
          <InquiryForm propertyId={item.id} defaultMessage={`I would like to arrange a private viewing of ${item.title}.`} />
        </aside>
      </section>

      <section className="property-next">
        <div><p className="eyebrow light">Still exploring?</p><h2>Let the right brief<br />lead the search.</h2></div>
        <Link className="button light-button" href="/matchmaker">Create my private brief <ArrowRight aria-hidden="true" /></Link>
      </section>
    </>
  )
}
