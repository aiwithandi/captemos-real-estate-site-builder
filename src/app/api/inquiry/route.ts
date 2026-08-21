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
  phone: z.string().trim().max(40).optional(),
  message: z.string().trim().min(5).max(2000),
  company: z.string().max(200).optional(),
  propertyId: z.string().trim().max(100).optional(),
})

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Origin not allowed" }, { status: 403 })
  if (isRequestTooLarge(request)) return NextResponse.json({ error: "Request too large" }, { status: 413 })
  if (isRateLimited(request, "inquiry")) return NextResponse.json({ error: "Please wait before trying again" }, { status: 429 })

  const parsed = schema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: "Please check the enquiry details" }, { status: 400 })

  // Honeypot: return a normal response without storing automated submissions.
  if (parsed.data.company) return NextResponse.json({ ok: true, mode: "demo" }, { status: 201 })

  try {
    const mode = await storeSubmission("inquiries", {
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      message: parsed.data.message,
      property_external_id: parsed.data.propertyId || null,
    })
    return NextResponse.json({ ok: true, mode }, { status: 201 })
  } catch (error) {
    const status = error instanceof SubmissionConfigurationError ? 503 : 500
    return NextResponse.json({ error: "The enquiry could not be stored" }, { status })
  }
}
