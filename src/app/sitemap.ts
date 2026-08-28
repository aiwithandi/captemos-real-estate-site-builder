import type { MetadataRoute } from "next"
import { areas, journalPosts } from "@/data/site"
import { getProperties } from "@/lib/properties"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  const staticRoutes = ["", "/buy", "/rent", "/sell", "/areas", "/relocation", "/journal", "/matchmaker", "/contact"]
  const { items } = await getProperties()
  const now = new Date()

  return [
    ...staticRoutes.map((route) => ({ url: `${base}${route}`, lastModified: now, changeFrequency: route === "" ? "weekly" as const : "monthly" as const })),
    ...areas.map((area) => ({ url: `${base}/areas/${area.slug}`, lastModified: now, changeFrequency: "monthly" as const })),
    ...journalPosts.map((post) => ({ url: `${base}/journal/${post.slug}`, lastModified: new Date(post.date), changeFrequency: "yearly" as const })),
    ...items.map((property) => ({ url: `${base}/properties/${property.slug}`, lastModified: now, changeFrequency: "weekly" as const })),
  ]
}
