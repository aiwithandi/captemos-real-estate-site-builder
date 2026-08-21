---
name: captemos-real-estate-site-builder
description: Configure, customize, verify, and deploy the Aurelia Estates Next.js starter with demo data, a server-only CapteMos property feed, and protected Supabase lead storage.
---

# CapteMos Real Estate Site Builder

Use this skill inside a clone of the public Aurelia Estates starter. Preserve its secure demo-first architecture while adapting the brand and connecting user-approved services.

## Workflow

1. Inspect the repository, its `AGENTS.md`, current Git state, and existing environment-variable names.
2. Ask only for business details that cannot be inferred: brand, market, contact details, CapteMos availability, Supabase project, and deployment target.
3. Keep the site fully usable with its bundled demo feed when external services are missing.
4. Customize the visual tokens, original copy, location taxonomy, demo inventory, metadata, and contact details. Never copy another agency’s identity, images, or protected listing content.
5. Read `references/captemos.md` before connecting CapteMos. Keep `CAPTEMOS_API_KEY` server-only and verify the live source indicator.
6. Read `references/database.md` before changing or applying Supabase SQL. Apply schema only to a verified user-selected development or empty project.
7. Store credentials only in ignored `.env.local` or deployment-provider secret settings. Never print, echo, commit, screenshot, or expose them through `NEXT_PUBLIC_*` variables.
8. Run `npm run check` and `npm run build`.
9. Start the site and inspect `/`, `/buy`, one `/properties/[slug]` page, `/favorites`, `/matchmaker`, and `/contact` at desktop and 390-pixel widths.
10. Verify a clearly labelled test enquiry and Matchmaker brief. Confirm whether the result is `stored` or `demo`; never claim a demo response created a real lead.
11. Before publishing, inspect staged files, scan for secrets, confirm the public repository contains no customer data, and use a preview deployment before production DNS.

## Required outcome

- Original premium identity with accessible desktop and mobile navigation.
- Home, Buy, Rent, Sell, Areas, Area detail, Relocation, Journal, Article, Matchmaker, Favorites, Property detail, and Contact routes.
- URL-based catalogue filters and browser-local Favorites.
- CapteMos `/api/properties/list` feed authenticated with a server-only bearer key.
- Safe local demo fallback when CapteMos is missing or unavailable.
- Supabase storage for enquiries and structured Matchmaker submissions with RLS.
- Honest demo-mode form responses that explicitly say data was not stored.
- Metadata, sitemap, robots, factual alt text, production build, and visual verification.

## Safety boundaries

- Do not mutate a production database, submit a live customer lead, change DNS, activate a paid service, or publish to production without explicit authorization.
- Never use the Supabase service-role key in a Client Component.
- Never seed a remote Supabase project unless the user verifies it is a development target and explicitly enables the remote-seed guard.
- Never remove the demo fallback or the form disclosure merely to make a preview appear live.
