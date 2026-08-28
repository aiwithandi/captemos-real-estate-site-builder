import type { Metadata } from "next"
import { FavoritesList } from "@/components/favorites-list"
import { getProperties } from "@/lib/properties"

export const metadata: Metadata = { title: "Saved homes", robots: { index: false, follow: false } }

export default async function Favorites() {
  const { items } = await getProperties()
  return <article className="favorites-page"><header><p className="eyebrow">Your private edit</p><h1>Saved homes.</h1><p>This shortlist lives only in this browser. Add or remove homes as your search takes shape.</p></header><FavoritesList properties={items} /></article>
}
