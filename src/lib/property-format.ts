import type { Property } from "@/types/property"

export function formatPrice(property: Property) {
  return `${new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(property.price)}${property.priceSuffix || ""}`
}

export function bypassImageOptimization(src: string) {
  if (src.startsWith("/")) return false
  try { return new URL(src).hostname !== "images.unsplash.com" } catch { return true }
}
