import type { MetadataRoute } from "next"
import { getProperties } from "@/lib/properties"
export default async function sitemap():Promise<MetadataRoute.Sitemap>{const base=process.env.NEXT_PUBLIC_SITE_URL||"http://localhost:3000";const staticRoutes=["","/buy","/rent","/sell","/areas","/relocation","/journal","/matchmaker","/contact"];const {items}=await getProperties();return [...staticRoutes.map(route=>({url:`${base}${route}`,lastModified:new Date()})),...items.map(p=>({url:`${base}/properties/${p.slug}`,lastModified:new Date()}))]}
