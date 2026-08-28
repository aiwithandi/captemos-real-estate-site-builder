import type { Metadata } from "next"
import { Clock3, Mail, MapPin, Phone } from "lucide-react"
import { InquiryForm } from "@/components/inquiry-form"
import { site } from "@/data/site"

export const metadata: Metadata = { title: "Contact", description: "Begin a private property or relocation conversation with Aurelia Estates in Marbella." }

export default function Contact() {
  return (
    <article className="contact-page">
      <header><p className="eyebrow light">Contact Aurelia</p><h1>Begin a<br /><em>conversation.</em></h1><p>Tell us what you are considering. We will listen carefully and reply with a useful next step.</p></header>
      <div className="contact-layout">
        <div className="contact-details"><p className="eyebrow">Marbella, personally</p><h2>We&apos;re here to help you move well.</h2><p>Whether you are ready to view, planning from abroad, or simply deciding where to begin, a short conversation can make the next step clearer.</p><address><a href={`mailto:${site.email}`}><Mail aria-hidden="true" /><span><small>Email</small>{site.email}</span></a><a href={`tel:${site.phoneHref}`}><Phone aria-hidden="true" /><span><small>Telephone</small>{site.phoneDisplay}</span></a><div><MapPin aria-hidden="true" /><span><small>Based in</small>{site.address}</span></div><div><Clock3 aria-hidden="true" /><span><small>Advisory hours</small>Monday–Friday, 09:00–18:00</span></div></address></div>
        <div className="contact-form-wrap"><p className="eyebrow">Your enquiry</p><h2>How can we help?</h2><InquiryForm /></div>
      </div>
    </article>
  )
}
