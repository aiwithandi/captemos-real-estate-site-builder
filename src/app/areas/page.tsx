import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { areas } from "@/data/site"

export const metadata: Metadata = {
  title: "Marbella area guides",
  description: "Compare Marbella's most desirable neighbourhoods, from the Golden Mile and Nueva Andalucía to Benahavís and the coast.",
}

export default function Areas() {
  return (
    <>
      <header className="page-hero area-index-hero">
        <div><p className="eyebrow">Local intelligence</p><h1>Find your side<br /><em>of Marbella.</em></h1></div>
        <p>The right home begins with the right rhythm. Explore the coastline, communities, and everyday character of each area.</p>
      </header>
      <section className="area-index section shell">
        {areas.map((area, index) => (
          <article className="area-index-card" key={area.slug}>
            <Link className="area-index-image" href={`/areas/${area.slug}`}>
              <Image src={area.image} alt={area.imageAlt} fill sizes="(max-width: 850px) 100vw, 54vw" priority={index < 2} />
              <span>0{index + 1}</span>
            </Link>
            <div>
              <p className="eyebrow">{area.eyebrow}</p>
              <h2><Link href={`/areas/${area.slug}`}>{area.name}</Link></h2>
              <p>{area.summary}</p>
              <ul>{area.character.slice(0, 3).map((item) => <li key={item}>{item}</li>)}</ul>
              <Link className="text-link" href={`/areas/${area.slug}`}>Explore the area <ArrowUpRight aria-hidden="true" /></Link>
            </div>
          </article>
        ))}
      </section>
      <section className="area-advice">
        <div><p className="eyebrow light">Not sure where to begin?</p><h2>Let daily life<br />shape the map.</h2></div>
        <div><p>Tell us about schools, work, weekends, privacy, and the places you want within easy reach. We will turn them into a useful area shortlist.</p><Link className="button light-button" href="/matchmaker">Create my brief <ArrowRight aria-hidden="true" /></Link></div>
      </section>
    </>
  )
}
