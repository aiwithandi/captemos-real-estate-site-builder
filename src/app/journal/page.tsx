import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { journalPosts } from "@/data/site"

export const metadata: Metadata = {
  title: "Journal",
  description: "Practical property guidance, Marbella area notes, and considered perspectives on living along the Costa del Sol.",
}

export default function Journal() {
  const [featured, ...posts] = journalPosts
  return (
    <>
      <header className="page-hero journal-hero"><div><p className="eyebrow">The Aurelia journal</p><h1>Local perspective,<br /><em>beautifully useful.</em></h1></div><p>Property guidance, area notes, and thoughtful ways to make a life on the Costa del Sol.</p></header>
      <section className="featured-story section shell"><Link className="featured-story-image" href={`/journal/${featured.slug}`}><Image src={featured.image} alt={featured.imageAlt} fill priority sizes="(max-width: 850px) 100vw, 60vw" /></Link><div><p className="eyebrow">{featured.category} · {featured.readTime}</p><h2><Link href={`/journal/${featured.slug}`}>{featured.title}</Link></h2><p>{featured.summary}</p><Link className="text-link" href={`/journal/${featured.slug}`}>Read the story <ArrowRight aria-hidden="true" /></Link></div></section>
      <section className="journal-index section shell">{posts.map((post, index) => <article className="journal-index-card" key={post.slug}><Link className="journal-index-image" href={`/journal/${post.slug}`}><Image src={post.image} alt={post.imageAlt} fill sizes="(max-width: 760px) 100vw, 45vw" /><span>0{index + 2}</span></Link><div><p>{post.category} · {post.date}</p><h2><Link href={`/journal/${post.slug}`}>{post.title}</Link></h2><p>{post.summary}</p><Link className="text-link" href={`/journal/${post.slug}`}>Read article <ArrowRight aria-hidden="true" /></Link></div></article>)}</section>
    </>
  )
}
