import { NextResponse } from "next/server"
import { z } from "zod"
import {
  isRateLimited,
  isRequestTooLarge,
  isSameOrigin,
  storeSubmission,
  SubmissionConfigurationError,
} from "@/lib/submissions"

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  company: z.string().max(200).optional(),
  budget: z.string().trim().max(80),
  lifestyle: z.string().trim().max(120),
  family: z.string().trim().max(120),
  intendedUse: z.string().trim().max(120),
  timeframe: z.string().trim().max(120),
})

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Origin not allowed" }, { status: 403 })
  if (isRequestTooLarge(request)) return NextResponse.json({ error: "Request too large" }, { status: 413 })
  if (isRateLimited(request, "matchmaker")) return NextResponse.json({ error: "Please wait before trying again" }, { status: 429 })

  const parsed = schema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: "Please check the buyer brief" }, { status: 400 })
  if (parsed.data.company) return NextResponse.json({ ok: true, mode: "demo" }, { status: 201 })

  try {
    const mode = await storeSubmission("matchmaker_submissions", {
      name: parsed.data.name,
      email: parsed.data.email,
      budget: parsed.data.budget,
      lifestyle: [parsed.data.lifestyle],
      family_profile: parsed.data.family,
      intended_use: parsed.data.intendedUse,
      timeframe: parsed.data.timeframe,
    })
    return NextResponse.json({ ok: true, mode }, { status: 201 })
  } catch (error) {
    const status = error instanceof SubmissionConfigurationError ? 503 : 500
    return NextResponse.json({ error: "The buyer brief could not be stored" }, { status })
  }
}
