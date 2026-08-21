import { createClient } from "@supabase/supabase-js"

type SubmissionTable = "inquiries" | "matchmaker_submissions"

export type SubmissionMode = "stored" | "demo"

export class SubmissionConfigurationError extends Error {}
export class SubmissionStorageError extends Error {}

const buckets = new Map<string, { count: number; resetAt: number }>()

export function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin")
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host")
  if (!origin || !host) return true

  try {
    return new URL(origin).host === host
  } catch {
    return false
  }
}

export function isRequestTooLarge(request: Request, maximumBytes = 20_000) {
  const length = Number(request.headers.get("content-length") || 0)
  return Number.isFinite(length) && length > maximumBytes
}

export function isRateLimited(request: Request, namespace: string) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
  const address = forwarded || request.headers.get("x-real-ip") || "local"
  const key = `${namespace}:${address}`
  const now = Date.now()
  const current = buckets.get(key)

  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + 60_000 })
    return false
  }

  current.count += 1
  if (buckets.size > 10_000) buckets.clear()
  return current.count > 5
}

export async function storeSubmission(table: SubmissionTable, values: Record<string, unknown>): Promise<SubmissionMode> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const ownerId = process.env.SITE_OWNER_ID

  if (!url && !serviceKey && !ownerId) return "demo"

  if (!url || !serviceKey || !ownerId || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(ownerId)) {
    throw new SubmissionConfigurationError("The private lead-storage configuration is incomplete.")
  }

  const supabase = createClient(url, serviceKey, { auth: { persistSession: false } })
  const { error } = await supabase.from(table).insert({ ...values, owner_id: ownerId })

  if (error) throw new SubmissionStorageError("The lead could not be stored.")
  return "stored"
}
