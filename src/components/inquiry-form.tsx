"use client"

import { FormEvent, useState } from "react"

export function InquiryForm({ propertyId }: { propertyId?: string }) {
  const [state, setState] = useState<"idle" | "sending" | "stored" | "demo" | "error">("idle")
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setState("sending")
    const form = new FormData(event.currentTarget)
    const response = await fetch("/api/inquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: form.get("name"), email: form.get("email"), phone: form.get("phone"), message: form.get("message"), company: form.get("company"), propertyId }) })
    const result = await response.json().catch(() => null) as { mode?: "stored" | "demo" } | null
    setState(response.ok ? result?.mode === "stored" ? "stored" : "demo" : "error")
  }
  if (state === "stored") return <div className="form-success" role="status"><h3>Thank you</h3><p>Your enquiry was stored securely. An advisor will be in touch shortly.</p></div>
  if (state === "demo") return <div className="form-success" role="status"><h3>Demo complete</h3><p>This public starter did not store your details. Connect Supabase to enable live enquiries.</p></div>
  return <form className="inquiry-form" onSubmit={submit}><div className="field"><label htmlFor={`name-${propertyId || "general"}`}>Name</label><input id={`name-${propertyId || "general"}`} name="name" required maxLength={80}/></div><div className="field"><label htmlFor={`email-${propertyId || "general"}`}>Email</label><input id={`email-${propertyId || "general"}`} name="email" type="email" required maxLength={160}/></div><div className="field"><label htmlFor={`phone-${propertyId || "general"}`}>Phone</label><input id={`phone-${propertyId || "general"}`} name="phone" autoComplete="tel" maxLength={40}/></div><div className="field hidden-field" aria-hidden="true"><label>Company<input name="company" tabIndex={-1}/></label></div><div className="field full"><label htmlFor={`message-${propertyId || "general"}`}>How can we help?</label><textarea id={`message-${propertyId || "general"}`} name="message" required maxLength={2000}/></div><button className="button" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send enquiry"}</button>{state === "error" && <p role="alert">Please try again.</p>}</form>
}
