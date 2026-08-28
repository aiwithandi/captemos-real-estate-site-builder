export const site = {
  name: "Aurelia Estates",
  market: "Marbella & the Costa del Sol",
  email: "hello@aureliaestates.com",
  phoneDisplay: "+34 951 550 471",
  phoneHref: "+34951550471",
  address: "Marbella, Málaga, Spain",
  instagram: "https://www.instagram.com/",
}

export type Area = {
  slug: string
  name: string
  eyebrow: string
  summary: string
  description: string
  character: string[]
  image: string
  imageAlt: string
}

export const areas: Area[] = [
  {
    slug: "golden-mile",
    name: "The Golden Mile",
    eyebrow: "Beachside elegance",
    summary: "Established villas, refined apartments, and the Mediterranean within an easy stroll.",
    description: "Marbella’s most storied address balances resort ease with year-round life. Sea-facing apartments, private villas, and mature gardens sit close to the promenade, Puente Romano, and the old town.",
    character: ["Walkable coastal living", "Established addresses", "Fine dining", "Strong year-round appeal"],
    image: "https://images.unsplash.com/photo-1504512485720-7d83a16ee930?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "Mediterranean coast and mountain landscape near Marbella",
  },
  {
    slug: "nueva-andalucia",
    name: "Nueva Andalucía",
    eyebrow: "Golf valley living",
    summary: "Generous homes, international schools, and an easy social rhythm close to Puerto Banús.",
    description: "Known as Marbella’s Golf Valley, Nueva Andalucía works especially well for families and longer stays. Its neighbourhoods range from sociable, walkable pockets to peaceful elevated villas with open views.",
    character: ["Golf valley", "Family friendly", "International schools", "Everyday convenience"],
    image: "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "White Andalusian village above a green valley",
  },
  {
    slug: "benahavis",
    name: "Benahavís",
    eyebrow: "Privacy & landscape",
    summary: "Gated estates, mountain views, and exceptional space a short drive inland.",
    description: "Benahavís rises into the hills behind the coast, offering privacy, views, and some of the region’s most accomplished contemporary villas. The village retains a relaxed Andalusian identity.",
    character: ["Gated communities", "Mountain and sea views", "Contemporary villas", "Space and privacy"],
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "Sunlit Mediterranean villa in the hills",
  },
  {
    slug: "puerto-banus",
    name: "Puerto Banús",
    eyebrow: "Marina energy",
    summary: "Waterfront apartments, effortless dining, and a lively international scene.",
    description: "For buyers who want the coast at their feet, Puerto Banús offers an unmistakably cosmopolitan setting. The strongest homes combine a quieter position with direct access to the marina and beaches.",
    character: ["Marina lifestyle", "Beach access", "International dining", "Lock-up-and-leave homes"],
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "Yachts moored in a calm Mediterranean marina",
  },
  {
    slug: "marbella-east",
    name: "Marbella East",
    eyebrow: "Sand & pine",
    summary: "Low-density neighbourhoods, broad beaches, and relaxed family homes among the pines.",
    description: "East of Marbella, long beaches and protected green space create a gentler pace. Elviria, Marbesa, and Los Monteros each offer a different balance of beach access, community, and privacy.",
    character: ["Wide sandy beaches", "Low-density living", "Pine landscapes", "Relaxed communities"],
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "Quiet sandy beach edged by Mediterranean greenery",
  },
  {
    slug: "sotogrande",
    name: "Sotogrande",
    eyebrow: "Space by the sea",
    summary: "A composed coastal community shaped by sport, schools, marina life, and privacy.",
    description: "Sotogrande is a self-contained coastal world with an international school, celebrated golf, polo, and a calm marina. Homes feel generous, established, and particularly suited to family life.",
    character: ["International school", "Golf and polo", "Marina life", "Generous plots"],
    image: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "Sailboat crossing blue Mediterranean water",
  },
]

export function getArea(slug: string) {
  return areas.find((area) => area.slug === slug)
}

export type JournalPost = {
  slug: string
  category: string
  title: string
  summary: string
  date: string
  readTime: string
  image: string
  imageAlt: string
  intro: string
  sections: { heading: string; paragraphs: string[] }[]
}

export const journalPosts: JournalPost[] = [
  {
    slug: "buying-with-confidence",
    category: "Buying guide",
    title: "Buying in Marbella with confidence",
    summary: "A calm, practical framework for moving from first viewing to a well-considered purchase.",
    date: "18 August 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "Mediterranean home framed by mature gardens",
    intro: "The best purchase rarely begins with a portal search. It begins with a useful brief: how you want to live, what must stay flexible, and what would make the move genuinely worthwhile.",
    sections: [
      {
        heading: "Start with daily life",
        paragraphs: [
          "Map the routines that matter before comparing properties: school runs, airport access, walkability, privacy, community, and the amount of maintenance you genuinely want.",
          "This turns a broad search into a small number of neighbourhoods that can support the life you have in mind.",
        ],
      },
      {
        heading: "Build the right local team",
        paragraphs: [
          "Independent legal advice, clear technical checks, and an advisor who understands both sides of the market make the process more legible. Arrange them before you feel pressure to move quickly.",
          "A good team will explain what is known, what still needs verification, and which decisions can wait.",
        ],
      },
      {
        heading: "View beyond the house",
        paragraphs: [
          "Visit promising areas at different times. Traffic, light, noise, and the feel of a neighbourhood change between a quiet morning and a busy evening.",
          "First-hand context is more valuable than assumptions formed from a listing page—and often clarifies the final decision.",
        ],
      },
    ],
  },
  {
    slug: "choosing-the-right-area",
    category: "Area notes",
    title: "How to choose the right side of Marbella",
    summary: "Beach, golf, old town, or hillside: make the area decision before the property decision.",
    date: "9 August 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "White Andalusian buildings and bougainvillea",
    intro: "Marbella is not one market or one way of living. A ten-minute drive can move you from a walkable beach address to a private hillside estate—and both can be the right choice.",
    sections: [
      {
        heading: "Choose your anchor",
        paragraphs: [
          "Decide what you want to be closest to: the sea, a school, a golf club, the old town, or the road west. That anchor usually narrows the map more usefully than a long list of property features.",
        ],
      },
      {
        heading: "Be honest about the car",
        paragraphs: [
          "Many beautiful addresses depend on driving. If walking for coffee or dinner matters, test the route rather than relying on the distance shown on a map.",
          "If privacy matters more, an elevated or gated setting can offer the calm and view that justify the extra journey.",
        ],
      },
      {
        heading: "Think through the seasons",
        paragraphs: [
          "A holiday home and a year-round base ask different things of a neighbourhood. Visit outside peak season and notice which services, communities, and routines remain active.",
        ],
      },
    ],
  },
  {
    slug: "a-considered-relocation",
    category: "Relocation",
    title: "The first ninety days of a considered relocation",
    summary: "The practical sequence that helps a move to the Costa del Sol feel settled from the start.",
    date: "28 July 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "Warm evening light over a Mediterranean waterfront",
    intro: "A successful relocation is a sequence, not a single completion date. The home, school, paperwork, and everyday systems should be planned together—with room for the unexpected.",
    sections: [
      {
        heading: "Begin before the search",
        paragraphs: [
          "Clarify residency, tax, schooling, and timing with qualified specialists before committing to a property structure. Early advice prevents avoidable compromises later.",
        ],
      },
      {
        heading: "Use a temporary base well",
        paragraphs: [
          "A short rental can create breathing room. It lets you test school runs, neighbourhood rhythms, and the practical distance between the places that matter.",
        ],
      },
      {
        heading: "Plan for belonging",
        paragraphs: [
          "The move becomes real through ordinary life: familiar shops, a trusted route, sport, friends, and a sense of community. Give those details the same attention as the property itself.",
        ],
      },
    ],
  },
]

export function getJournalPost(slug: string) {
  return journalPosts.find((post) => post.slug === slug)
}
