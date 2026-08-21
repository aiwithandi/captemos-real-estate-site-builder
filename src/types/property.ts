export type Property = {
  id: string
  slug: string
  transaction: "sale" | "rent"
  title: string
  location: string
  areaSlug: string
  propertyType: string
  price: number
  priceSuffix?: string
  bedrooms: number
  bathrooms: number
  builtArea: number
  description: string
  features: string[]
  images: { src: string; alt: string }[]
  featured?: boolean
}

export type FeedSource = "captemos" | "demo"
