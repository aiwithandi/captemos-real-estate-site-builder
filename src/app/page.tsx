import Image from "next/image"
import Link from "next/link"
import { ArrowDown, ArrowRight, ArrowUpRight, Compass, KeyRound, MapPin, MoveRight } from "lucide-react"
import { PropertyCard } from "@/components/property-card"
import { areas, journalPosts } from "@/data/site"
import { getProperties } from "@/lib/properties"
import { bypassImageOptimization } from "@/lib/property-format"

export default async function Home() {
  const { items, source } = await getProperties()
  const hero = items.find((item) => item.featured) || items[0]

  return (
    <>
      <section className="home-hero">
        <Image src={hero.images[0].src} alt={hero.images[0].alt} fill priority sizes="100vw" unoptimized={bypassImageOptimization(hero.images[0].src)} />
        <div className="hero-wash" />
        <div className="home-hero-copy">
          <p className="eyebrow light">Aurelia Estates · Marbella</p>
          <h1>Live beautifully<br /><em>by the Mediterranean.</em></h1>
          <p>Exceptional homes, local intelligence, and a more personal way to move to southern Spain.</p>
          <div className="hero-actions">
            <Link className="button light-button" href="/buy">Explore the collection <ArrowRight aria-hidden="true" /></Link>
            <Link className="text-link light" href="/matchmaker">Create a private brief <ArrowUpRight aria-hidden="true" /></Link>
          </div>
        </div>
        <div className="hero-property">
          <span>Featured residence</span>
          <Link href={`/properties/${hero.slug}`}><strong>{hero.title}</strong><small>{hero.location}</small></Link>
        </div>
        <a className="hero-scroll" href="#welcome"><ArrowDown aria-hidden="true" /><span>Discover Aurelia</span></a>
      </section>

      <section className="search-panel" aria-label="Property search">
        <form action="/buy">
          <label><span>Where</span><select name="area" defaultValue=""><option value="">All Marbella areas</option>{areas.slice(0, 4).map((area) => <option value={area.slug} key={area.slug}>{area.name}</option>)}</select></label>
          <label><span>Property</span><select name="type" defaultValue=""><option value="">Any type</option><option value="villa">Villa</option><option value="apartment">Apartment</option><option value="penthouse">Penthouse</option><option value="townhouse">Townhouse</option></select></label>
          <label><span>Bedrooms</span><select name="beds" defaultValue=""><option value="">Any</option><option value="2">2+</option><option value="3">3+</option><option value="4">4+</option><option value="5">5+</option></select></label>
          <label><span>Up to</span><select name="max" defaultValue=""><option value="">No maximum</option><option value="1000000">€1 million</option><option value="2000000">€2 million</option><option value="4000000">€4 million</option><option value="6000000">€6 million</option></select></label>
          <button className="search-submit" aria-label="Search properties"><ArrowRight aria-hidden="true" /></button>
        </form>
      </section>

      <section className="welcome section" id="welcome">
        <div className="welcome-aside">
          <p className="eyebrow">Property, personally</p>
          <span className="sun-mark" aria-hidden="true" />
        </div>
        <div className="welcome-copy">
          <h2>A home here is more than a place. It&apos;s a different rhythm of life.</h2>
          <div className="welcome-detail">
            <p>Aurelia is an independent property and relocation studio for Marbella. We combine a selective portfolio with the local context you need to make a confident move.</p>
            <Link className="text-link" href="/relocation">Our approach <ArrowRight aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="portfolio-section">
        <div className="section shell">
          <div className="section-head">
            <div><p className="eyebrow">The Aurelia collection</p><h2>Homes with<br />a sense of place.</h2></div>
            <div className="section-head-note"><p>A concise edit of villas, apartments, and private opportunities chosen for enduring quality.</p><Link className="text-link" href="/buy">View all homes <ArrowRight aria-hidden="true" /></Link></div>
          </div>
          <div className="property-grid">{items.slice(0, 3).map((property, index) => <PropertyCard key={property.id} property={property} priority={index === 0} />)}</div>
          <p className="source-note"><span className="source-dot" /> {source === "captemos" ? "Live portfolio connected through CapteMos" : "Curated demonstration portfolio"}</p>
        </div>
      </section>

      <section className="areas-showcase section shell">
        <div className="areas-intro">
          <p className="eyebrow">Find your Marbella</p>
          <h2>One coast.<br />Many ways to live.</h2>
          <p>From the social ease of the Golden Mile to the privacy of Benahavís, the right address begins with how you want your days to feel.</p>
          <Link className="button outline-button" href="/areas">Explore the area guides <ArrowRight aria-hidden="true" /></Link>
        </div>
        <div className="area-cards">
          {areas.slice(0, 3).map((area, index) => (
            <Link className={`area-card area-card-${index + 1}`} href={`/areas/${area.slug}`} key={area.slug}>
              <Image src={area.image} alt={area.imageAlt} fill sizes="(max-width: 850px) 100vw, 35vw" />
              <span className="area-card-shade" />
              <span className="area-card-number">0{index + 1}</span>
              <span className="area-card-copy"><small>{area.eyebrow}</small><strong>{area.name}</strong><ArrowUpRight aria-hidden="true" /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="services-section">
        <div className="services-image"><Image src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=85" alt="Sunlit Mediterranean interior with natural textures" fill sizes="(max-width: 850px) 100vw, 48vw" /></div>
        <div className="services-copy">
          <p className="eyebrow light">Beyond the listing</p>
          <h2>Your move,<br /><em>thought through.</em></h2>
          <p>We connect the property search to the practical and personal details that turn an address into a life.</p>
          <div className="service-list">
            <Link href="/buy"><Compass aria-hidden="true" /><span><strong>Private property search</strong><small>On-market and discreet opportunities, filtered around your brief.</small></span><MoveRight aria-hidden="true" /></Link>
            <Link href="/relocation"><MapPin aria-hidden="true" /><span><strong>Relocation guidance</strong><small>Areas, schools, trusted specialists, and an organised arrival.</small></span><MoveRight aria-hidden="true" /></Link>
            <Link href="/sell"><KeyRound aria-hidden="true" /><span><strong>Thoughtful representation</strong><small>Positioning, presentation, negotiation, and clear advice.</small></span><MoveRight aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="matchmaker-callout section shell">
        <div>
          <p className="eyebrow">Private Matchmaker</p>
          <h2>Less searching.<br /><em>More belonging.</em></h2>
        </div>
        <div>
          <p>Tell us about your budget, lifestyle, family, and timing. We will turn five useful answers into a focused brief and a shortlist with a point of view.</p>
          <Link className="button" href="/matchmaker">Create my brief <ArrowRight aria-hidden="true" /></Link>
        </div>
      </section>

      <section className="journal-preview">
        <div className="section shell">
          <div className="section-head compact">
            <div><p className="eyebrow">The Aurelia journal</p><h2>Notes from the coast.</h2></div>
            <Link className="text-link" href="/journal">Read all stories <ArrowRight aria-hidden="true" /></Link>
          </div>
          <div className="journal-grid">
            {journalPosts.slice(0, 3).map((post, index) => (
              <article className="journal-card" key={post.slug}>
                <Link className="journal-image" href={`/journal/${post.slug}`}><Image src={post.image} alt={post.imageAlt} fill sizes="(max-width: 760px) 100vw, 33vw" /><span>0{index + 1}</span></Link>
                <div><p>{post.category} · {post.readTime}</p><h3><Link href={`/journal/${post.slug}`}>{post.title}</Link></h3><Link className="text-link" href={`/journal/${post.slug}`}>Read the story <ArrowRight aria-hidden="true" /></Link></div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
