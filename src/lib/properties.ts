import demoFeed from "@/data/demo-feed.json"
import type { FeedSource, Property } from "@/types/property"

type UnknownRow = Record<string, unknown>

function text(row: UnknownRow, ...keys: string[]) {
  for (const key of keys) if (typeof row[key] === "string" && row[key]) return row[key] as string
  return ""
}

function number(row: UnknownRow, ...keys: string[]) {
  for (const key of keys) {
    const value = Number(row[key])
    if (Number.isFinite(value)) return value
  }
  return 0
}

function normalize(row: UnknownRow): Property | null {
  const id = text(row, "id", "property_code")
  const title = text(row, "title", "name")
  if (!id || !title) return null
  const rawImages = Array.isArray(row.gallery_images) ? row.gallery_images : Array.isArray(row.images) ? row.images : []
  const images = rawImages.map((item) => typeof item === "string" ? { src: item, alt: title } : item).filter((item): item is { src: string; alt: string } => Boolean(item && typeof item === "object" && typeof (item as { src?: unknown }).src === "string"))
  const cover = text(row, "main_image", "image", "image_url")
  if (!images.length && cover) images.push({ src: cover, alt: title })
  if (!images.length) return null
  const slug = text(row, "slug") || `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}-${id.slice(0, 6)}`
  const operation = text(row, "transaction", "operation", "listing_type").toLowerCase()
  return {
    id,
    slug,
    transaction: operation.includes("rent") ? "rent" : "sale",
    title,
    location: text(row, "location", "area", "city") || "Marbella",
    areaSlug: text(row, "area_slug") || "marbella",
    propertyType: text(row, "property_type", "type") || "Residence",
    price: number(row, "price", "sale_price", "rental_price"),
    priceSuffix: operation.includes("rent") ? "/month" : undefined,
    bedrooms: number(row, "bedrooms", "beds"),
    bathrooms: number(row, "bathrooms", "baths"),
    builtArea: number(row, "built_area", "builtArea", "square_meters"),
    description: text(row, "description") || "Contact our advisors for full details.",
    features: Array.isArray(row.features) ? row.features.filter((item): item is string => typeof item === "string") : [],
    images,
    featured: Boolean(row.featured),
  }
}

export async function getProperties(): Promise<{ items: Property[]; source: FeedSource }> {
  const apiKey = process.env.CAPTEMOS_API_KEY
  const baseUrl = process.env.CAPTEMOS_BASE_URL || "https://captemos2.vercel.app"
  if (apiKey) {
    try {
      const response = await fetch(`${baseUrl.replace(/\/$/, "")}/api/properties/list`, {
        headers: { Authorization: `Bearer ${apiKey}` },
        cache: "no-store",
      })
      if (response.ok) {
        const payload = await response.json() as { items?: UnknownRow[] }
        const items = Array.isArray(payload.items) ? payload.items.map(normalize).filter((item): item is Property => Boolean(item)) : []
        if (items.length) return { items, source: "captemos" }
      }
    } catch { /* Demo fallback is intentional. */ }
  }
  return { items: demoFeed as Property[], source: "demo" }
}

export async function getProperty(slug: string) {
  const feed = await getProperties()
  return { item: feed.items.find((property) => property.slug === slug) ?? null, source: feed.source }
}

export function formatPrice(property: Property) {
  return `${new Intl.NumberFormat("en-GB", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(property.price)}${property.priceSuffix || ""}`
}
