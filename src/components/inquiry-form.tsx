"use client"

import { FormEvent, useState } from "react"
import { ArrowRight, Check } from "lucide-react"

export function InquiryForm({ propertyId, defaultMessage }: { propertyId?: string; defaultMessage?: string }) {
  const [state, setState] = useState<"idle" | "sending" | "stored" | "demo" | "error">("idle")

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setState("sending")
    const form = new FormData(event.currentTarget)
    const response = await fetch("/api/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"), email: form.get("email"), phone: form.get("phone"),
        message: form.get("message"), company: form.get("company"), propertyId,
      }),
    })
    const result = await response.json().catch(() => null) as { mode?: "stored" | "demo" } | null
    setState(response.ok ? result?.mode === "stored" ? "stored" : "demo" : "error")
  }

  if (state === "stored" || state === "demo") return (
    <div className="form-success" role="status">
      <span><Check aria-hidden="true" /></span>
      <h3>{state === "stored" ? "Thank you. We’ll be in touch." : "Your demo enquiry is complete."}</h3>
      <p>{state === "stored" ? "Your enquiry was stored securely for an Aurelia advisor." : "No personal details were stored because this preview is using the safe Supabase demo fallback."}</p>
    </div>
  )

  const id = propertyId || "general"
  return (
    <form className="inquiry-form" onSubmit={submit}>
      <div className="field">
        <label htmlFor={`name-${id}`}>Name</label>
        <input id={`name-${id}`} name="name" required maxLength={80} autoComplete="name" placeholder="Your name" />
      </div>
      <div className="field">
        <label htmlFor={`email-${id}`}>Email</label>
        <input id={`email-${id}`} name="email" type="email" required maxLength={160} autoComplete="email" placeholder="you@example.com" />
      </div>
      <div className="field full">
        <label htmlFor={`phone-${id}`}>Phone <small>Optional</small></label>
        <input id={`phone-${id}`} name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="+34" />
      </div>
      <div className="field hidden-field" aria-hidden="true">
        <label htmlFor={`company-${id}`}>Company</label><input id={`company-${id}`} name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="field full">
        <label htmlFor={`message-${id}`}>How can we help?</label>
        <textarea id={`message-${id}`} name="message" required maxLength={2000} defaultValue={defaultMessage} placeholder="Tell us a little about what you are looking for." />
      </div>
      <div className="form-footer full">
        <p>By sending this form, you agree to be contacted about your enquiry.</p>
        <button className="button" type="submit" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : <>Send enquiry <ArrowRight aria-hidden="true" /></>}
        </button>
      </div>
      {state === "error" && <p className="form-error full" role="alert">We couldn&apos;t send your enquiry. Please check the details and try again.</p>}
    </form>
  )
}
