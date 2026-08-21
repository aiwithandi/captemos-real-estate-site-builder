"use client"

import { FormEvent, useState } from "react"

const steps=[{key:"budget",title:"What is your budget?",options:["Under €1M","€1M–€2M","€2M–€4M","€4M+"]},{key:"lifestyle",title:"What should life feel like?",options:["Walkable and social","Golf and space","Beachside","Private and peaceful"]},{key:"family",title:"Who is moving?",options:["Just me","A couple","Young family","Extended family"]},{key:"use",title:"How will you use the home?",options:["Primary residence","Seasonal home","Investment","Not sure yet"]},{key:"timeframe",title:"When would you like to move?",options:["Immediately","Within 3 months","3–6 months","Just exploring"]}] as const
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

  if (state === "stored") return <div className="form-success" role="status"><h2>Your brief is ready.</h2><p>Your answers were stored securely for an advisor to review.</p></div>
  if (state === "demo") return <div className="form-success" role="status"><h2>Demo complete.</h2><p>This public starter did not store your details. Connect Supabase to enable live briefs.</p></div>

  if (step < steps.length) return <section className="matchmaker-card"><p className="eyebrow">Step {step + 1} of {steps.length}</p><h2>{current.title}</h2><div className="match-options">{current.options.map(option => <button key={option} type="button" onClick={() => choose(option)}>{option}</button>)}</div>{step > 0 && <button className="text-link back" type="button" onClick={() => setStep(step - 1)}>Back</button>}</section>

  return <form className="inquiry-form" onSubmit={submit}><div className="full"><p className="eyebrow">Your brief</p><h2>Where should we send your shortlist?</h2></div><div className="field"><label htmlFor="match-name">Name</label><input id="match-name" name="name" required maxLength={80}/></div><div className="field"><label htmlFor="match-email">Email</label><input id="match-email" name="email" type="email" required maxLength={160}/></div><div className="field hidden-field" aria-hidden="true"><label>Company<input name="company" tabIndex={-1} autoComplete="off"/></label></div><button className="button" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Submit private brief"}</button>{state === "error" && <p role="alert">Please try again.</p>}</form>
}
