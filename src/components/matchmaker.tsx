"use client"

import { FormEvent, useState } from "react"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"

const steps = [
  { key: "budget", label: "Budget", title: "What feels like the right investment?", note: "An indication is enough—we can refine this together.", options: ["Under €1M", "€1M–€2M", "€2M–€4M", "€4M+"] },
  { key: "lifestyle", label: "Lifestyle", title: "What should everyday life feel like?", note: "Choose the rhythm that matters most.", options: ["Walkable and social", "Golf and space", "Beachside", "Private and peaceful"] },
  { key: "family", label: "Household", title: "Who are we finding a home for?", note: "This helps us think about space, schools, and community.", options: ["Just me", "A couple", "Young family", "Extended family"] },
  { key: "use", label: "Use", title: "How will you use the home?", note: "Your pattern of use shapes the location and property type.", options: ["Primary residence", "Seasonal home", "Investment", "Not sure yet"] },
  { key: "timeframe", label: "Timing", title: "When would you like to move?", note: "There is no pressure—good planning starts early.", options: ["Immediately", "Within 3 months", "3–6 months", "Just exploring"] },
] as const

export function Matchmaker() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [state, setState] = useState<"idle" | "sending" | "stored" | "demo" | "error">("idle")
  const current = steps[step]

  function choose(value: string) {
    setAnswers({ ...answers, [current.key]: value })
    setStep(step + 1)
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setState("sending")
    const data = new FormData(event.currentTarget)
    const response = await fetch("/api/matchmaker", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.get("name"),
        email: data.get("email"),
        company: data.get("company"),
        budget: answers.budget,
        lifestyle: answers.lifestyle,
        family: answers.family,
        intendedUse: answers.use,
        timeframe: answers.timeframe,
      }),
    })
    const result = await response.json().catch(() => null) as { mode?: "stored" | "demo" } | null
    setState(response.ok ? result?.mode === "stored" ? "stored" : "demo" : "error")
  }

  if (state === "stored" || state === "demo") return (
    <div className="form-success matchmaker-success" role="status">
      <span><Check aria-hidden="true" /></span>
      <h2>{state === "stored" ? "Your private brief is ready." : "Your demo brief is complete."}</h2>
      <p>{state === "stored" ? "Your answers were stored securely for an Aurelia advisor to review." : "No personal details were stored because this preview is using the safe Supabase demo fallback."}</p>
    </div>
  )

  if (step < steps.length) return (
    <section className="matchmaker-card">
      <div className="match-progress" aria-label={`Step ${step + 1} of ${steps.length}`}>
        {steps.map((item, index) => (
          <span key={item.key} className={index <= step ? "active" : ""}>
            <i aria-hidden="true" />{item.label}
          </span>
        ))}
      </div>
      <div className="match-question">
        <p className="eyebrow">Question {step + 1} of {steps.length}</p>
        <h2>{current.title}</h2>
        <p>{current.note}</p>
        <div className="match-options">
          {current.options.map((option, index) => (
            <button key={option} type="button" onClick={() => choose(option)}>
              <span>0{index + 1}</span>{option}<ArrowRight aria-hidden="true" />
            </button>
          ))}
        </div>
        {step > 0 && <button className="match-back" type="button" onClick={() => setStep(step - 1)}><ArrowLeft aria-hidden="true" /> Previous question</button>}
      </div>
    </section>
  )

  return (
    <form className="inquiry-form match-contact" onSubmit={submit}>
      <div className="full">
        <p className="eyebrow">Your brief is complete</p>
        <h2>Where should we send your private shortlist?</h2>
        <p>We will review your answers personally and reply with a useful first step.</p>
      </div>
      <div className="field"><label htmlFor="match-name">Name</label><input id="match-name" name="name" required maxLength={80} autoComplete="name" placeholder="Your name" /></div>
      <div className="field"><label htmlFor="match-email">Email</label><input id="match-email" name="email" type="email" required maxLength={160} autoComplete="email" placeholder="you@example.com" /></div>
      <div className="field hidden-field" aria-hidden="true"><label htmlFor="match-company">Company</label><input id="match-company" name="company" tabIndex={-1} autoComplete="off" /></div>
      <div className="form-footer full">
        <button className="match-back" type="button" onClick={() => setStep(steps.length - 1)}><ArrowLeft aria-hidden="true" /> Review answers</button>
        <button className="button" type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending…" : <>Submit private brief <ArrowRight aria-hidden="true" /></>}</button>
      </div>
      {state === "error" && <p className="form-error full" role="alert">We couldn&apos;t send the brief. Please check your details and try again.</p>}
    </form>
  )
}
