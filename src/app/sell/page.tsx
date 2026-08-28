import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, BarChart3, Camera, Handshake, MessageSquareText } from "lucide-react"

export const metadata: Metadata = {
  title: "Sell your Marbella property",
  description: "Discreet, evidence-led representation for selling exceptional homes in Marbella and the Costa del Sol.",
}

const steps = [
  { icon: BarChart3, number: "01", title: "Position", copy: "A clear valuation, honest market context, and a strategy built around your priorities." },
  { icon: Camera, number: "02", title: "Present", copy: "Editorial imagery, precise writing, and considered materials that make the quality legible." },
  { icon: MessageSquareText, number: "03", title: "Introduce", copy: "Selective exposure to qualified buyers, trusted advisors, and the most relevant channels." },
  { icon: Handshake, number: "04", title: "Complete", copy: "Useful feedback, composed negotiation, and close coordination through completion." },
]

export default function Sell() {
  return (
    <>
      <section className="split-hero sell-hero">
        <div className="split-hero-copy"><p className="eyebrow">Private representation</p><h1>Sell with<br /><em>quiet confidence.</em></h1><p>Thoughtful positioning, selective exposure, and clear advice from the first conversation to completion.</p><Link className="button" href="/contact">Request a private appraisal <ArrowRight aria-hidden="true" /></Link></div>
        <div className="split-hero-image"><Image src="https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?auto=format&fit=crop&w=1800&q=85" alt="Elegant Mediterranean residence prepared for sale" fill priority sizes="(max-width: 850px) 100vw, 50vw" /></div>
      </section>
      <section className="sell-intro section shell"><p className="eyebrow">The Aurelia approach</p><h2>Your home deserves more than visibility. It deserves the right context.</h2><p>We begin with evidence and a candid conversation. Then we shape a presentation and sales process that protects both value and discretion.</p></section>
      <section className="process-grid section shell">{steps.map(({ icon: Icon, number, title, copy }) => <article key={number}><div><span>{number}</span><Icon aria-hidden="true" /></div><h3>{title}</h3><p>{copy}</p></article>)}</section>
      <section className="valuation-callout"><div className="valuation-image"><Image src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85" alt="Refined living room with warm natural light" fill sizes="(max-width: 850px) 100vw, 48vw" /></div><div><p className="eyebrow light">A useful first step</p><h2>A private market<br />conversation.</h2><p>Tell us about the property and your ideal timing. We will come back with the questions, evidence, and next step that matter.</p><Link className="button light-button" href="/contact">Request an appraisal <ArrowRight aria-hidden="true" /></Link></div></section>
    </>
  )
}
