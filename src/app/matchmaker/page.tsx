import type { Metadata } from "next"
import { Matchmaker } from "@/components/matchmaker"

export const metadata: Metadata = {
  title: "Private property Matchmaker",
  description: "Turn five useful answers into a focused Marbella property brief and a more relevant private shortlist.",
}

export default function MatchmakerPage() {
  return (
    <article className="matchmaker-page">
      <header><p className="eyebrow">Private Matchmaker</p><h1>Less scrolling.<br /><em>More relevance.</em></h1><p>Five useful answers give us enough context to begin a focused, personal search.</p></header>
      <Matchmaker />
      <footer><span>01 · Private</span><span>02 · Personal</span><span>03 · No pressure</span></footer>
    </article>
  )
}
