import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"

export const metadata: Metadata = {
  title: "Relocating to Marbella",
  description: "A considered property search connected to schools, areas, specialist advice, and everyday life in Marbella.",
}

export default function Relocation() {
  return (
    <>
      <section className="split-hero relocation-hero">
        <div className="split-hero-image"><Image src="https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&w=1800&q=85" alt="Family walking beside the Mediterranean coast" fill priority sizes="(max-width: 850px) 100vw, 50vw" /></div>
        <div className="split-hero-copy"><p className="eyebrow">Relocation, considered</p><h1>Move well.<br /><em>Live fully.</em></h1><p>A home search connected to schools, neighbourhoods, specialist advice, and the realities of daily life.</p><Link className="button" href="/matchmaker">Plan my move <ArrowRight aria-hidden="true" /></Link></div>
      </section>
      <section className="relocation-intro section shell"><div><p className="eyebrow">More than an address</p><h2>The whole move,<br />held together.</h2></div><div><p>Relocating well is a sequence of connected decisions. We help you understand the area, shape a precise property brief, and build the right local network around it.</p><ul><li><Check aria-hidden="true" />Area and lifestyle orientation</li><li><Check aria-hidden="true" />School and commute mapping</li><li><Check aria-hidden="true" />Independent specialist introductions</li><li><Check aria-hidden="true" />Property search and viewing days</li><li><Check aria-hidden="true" />Arrival and settling-in guidance</li></ul></div></section>
      <section className="relocation-steps"><div className="section shell"><p className="eyebrow light">A clear sequence</p><div className="relocation-step-grid"><article><span>01</span><h3>Listen</h3><p>We map the life you want, the constraints that matter, and the questions still to answer.</p></article><article><span>02</span><h3>Orient</h3><p>We compare areas in context and arrange a useful discovery visit before the search narrows.</p></article><article><span>03</span><h3>Find</h3><p>We curate homes, coordinate viewings, and keep each option connected to the original brief.</p></article><article><span>04</span><h3>Settle</h3><p>We help the practical pieces land in the right order, with trusted expertise where needed.</p></article></div></div></section>
      <section className="relocation-note section shell"><div className="relocation-note-image"><Image src="https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1800&q=85" alt="Family home opening to a sunny garden" fill sizes="(max-width: 850px) 100vw, 42vw" /></div><div><p className="eyebrow">Private Matchmaker</p><h2>Begin with five useful answers.</h2><p>Share your budget, preferred lifestyle, household, intended use, and timing. We will turn them into a focused first conversation.</p><Link className="button" href="/matchmaker">Create my relocation brief <ArrowRight aria-hidden="true" /></Link></div></section>
    </>
  )
}
