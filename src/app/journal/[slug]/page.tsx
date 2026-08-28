import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { getJournalPost, journalPosts } from "@/data/site"

export function generateStaticParams() { return journalPosts.map(({ slug }) => ({ slug })) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getJournalPost((await params).slug)
  return post ? { title: post.title, description: post.summary, openGraph: { type: "article", images: [{ url: post.image, alt: post.imageAlt }] } } : { title: "Article not found" }
}

export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const post = getJournalPost((await params).slug)
  if (!post) notFound()
  return (
    <article className="article-page">
      <header className="article-header"><Link href="/journal"><ArrowLeft aria-hidden="true" /> Journal</Link><p className="eyebrow">{post.category} · {post.readTime}</p><h1>{post.title}</h1><p>{post.summary}</p><span>{post.date}</span></header>
      <div className="article-hero"><Image src={post.image} alt={post.imageAlt} fill priority sizes="100vw" /></div>
      <div className="article-body"><aside><p>Aurelia Estates</p><span>Property and relocation notes from Marbella.</span></aside><div><p className="article-intro">{post.intro}</p>{post.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}</div></div>
      <div className="article-cta"><p className="eyebrow">Put the context to work</p><h2>Planning a move to Marbella?</h2><Link className="button" href="/matchmaker">Create a private brief <ArrowRight aria-hidden="true" /></Link></div>
    </article>
  )
}
