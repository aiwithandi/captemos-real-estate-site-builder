"use client"

import { Heart } from "lucide-react"
import { useEffect, useState } from "react"

const KEY = "aurelia_favorites"
function readIds(): string[] { try { const value=JSON.parse(localStorage.getItem(KEY)||"[]"); return Array.isArray(value)?value.filter(item=>typeof item==="string"):[] } catch { return [] } }
export function FavoriteButton({ id }: { id: string }) { const [saved,setSaved]=useState(false); useEffect(()=>{const sync=()=>setSaved(readIds().includes(id));sync();window.addEventListener("aurelia:favorites",sync);window.addEventListener("storage",sync);return()=>{window.removeEventListener("aurelia:favorites",sync);window.removeEventListener("storage",sync)}},[id]); function toggle(){const ids=readIds();const next=ids.includes(id)?ids.filter(item=>item!==id):[...ids,id];localStorage.setItem(KEY,JSON.stringify(next));window.dispatchEvent(new Event("aurelia:favorites"));setSaved(next.includes(id))} return <button className={`favorite-button ${saved?"saved":""}`} type="button" onClick={toggle} aria-pressed={saved} aria-label={saved?"Remove from favorites":"Save to favorites"}><Heart fill={saved?"currentColor":"none"}/></button> }
