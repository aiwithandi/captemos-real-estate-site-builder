import { FavoritesList } from "@/components/favorites-list"
import { getProperties } from "@/lib/properties"
export default async function Favorites(){const {items}=await getProperties();return <article className="content-page favorites-page"><p className="eyebrow">Saved homes</p><h1>Your favorites.</h1><p>Your shortlist is private to this browser.</p><FavoritesList properties={items}/></article>}
