# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Prospective virtual pilots discovering EAVG for the first time. They arrive from IFC (Infinite Flight Community) threads, Discord invitations, or Star Alliance Virtual partner referrals. They are Infinite Flight players—typically Grade 3+ on the Expert Server—looking for a structured virtual airline experience to give their sim flying purpose, progression, and community. The site is their first impression of the VA and must earn the application.

Secondary: existing EAVG pilots referencing operational data (routes, fleet, ranks, roster) and staff managing recruitment approvals via the IFC redirect workflow.

## Product Purpose

The EAVG website is the public-facing front door for EgyptAir Virtual Group—a volunteer-run virtual airline simulating EgyptAir operations within Infinite Flight. Its primary job is to convert curious visitors into pilot applicants by communicating the VA's identity, professionalism, and community in the time it takes to scroll a landing page. Its secondary job is housing operational reference material (route network, fleet specs, rank progression, pilot roster, codeshare partners) that supports both recruitment and day-to-day pilot needs.

Success means a prospective pilot arrives, understands what EAVG is, feels the quality and seriousness of the operation, and submits an application—all in one session.

## Positioning

Three things a competing VA cannot truthfully copy:

1. **EgyptAir identity** — the only VA faithfully simulating Egypt's flag carrier, its routes from Cairo (HECA), its fleet, and its liveries. The Egyptian aviation heritage is the brand, not a theme applied on top.
2. **Star Alliance Virtual membership** — access to a codeshare network of ~21 partner VAs, letting pilots fly routes far beyond EAVG's own network under a single callsign.
3. **Operational depth** — a structured rank system (Cadet → Legend, 10 tiers), organized events, Pilot of the Month recognition, a defined code of conduct, and a clear career arc that makes flying feel consequential.

## Operating Context

- Pilots fly on Infinite Flight (mobile/desktop sim) on the Expert Server and log flights via a Crew Center (transitioning from Digital Crew to Atlas).
- Recruitment flow: applicant fills the website form → Discord webhook notifies staff → staff uses `/approve?username=` redirect to send IFC acceptance message → pilot is onboarded.
- Routes and codeshare partner data are managed in Airtable and fetched at runtime.
- Pilot roster, staff directory, fleet specs, ranks, news, and events are currently hardcoded and will eventually connect to a centralized database.
- All external community interaction happens on IFC (community.infiniteflight.com) and Discord.

## Capabilities and Constraints

**Live:**
- Application form (4-step wizard → Discord webhook → `/api/apply`)
- Contact form (→ Discord webhook)
- Route network (fetched from Airtable, paginated, searchable)
- Codeshare partners and shared routes (fetched from Airtable)
- Fleet overview with specs and livery vote links
- Rank progression reference (10 tiers, hour thresholds, unlocked features)
- Staff directory (Directors + Staff, some positions vacant)
- Pilot roster (live data from Atlas API, cached via Next.js)
- Events page (structure exists, events array currently empty)
- News and Pilot of the Month archive
- Getting Started onboarding guide
- Staff approval redirect (`/approve`)

**Technical constraints:**
- No authentication system—the site is fully public. The `/approve` route relies on obscurity via Discord notification links, not access control.
- No database—staff, fleet, ranks, news, and events are hardcoded inline. Pilot roster is fetched live from the Atlas external API (`https://atlas.va-center.com/api/external`) with server-side caching. A full database integration is planned but not yet built.
- External images hosted on PostImg, Unsplash, Discord CDN, and IFC CDN—no local image assets.
- Airtable API keys are exposed client-side (`NEXT_PUBLIC_` prefix).

**Undecided:**
- Database integration timeline and platform (mentioned as future work).
- Atlas API integration for pilot roster is live; remaining data (staff, fleet, ranks) still hardcoded pending future database.

## Brand Commitments

- **Name:** EgyptAir Virtual Group (EAVG). Non-negotiable.
- **Logo:** Current logos hosted on PostImg (`whitelogo.png`, `logo.png`). Non-negotiable identity; files may move but the marks stay.
- **Brand color:** `#042C64` (deep navy blue). Locked as the primary brand color across all surfaces.
- **Body/dark tone:** `#06080F` used as the root background. The site is a dark-theme-first experience.
- **Font:** Inter (Google Fonts, latin).
- **Voice:** Professional but approachable—serious about aviation simulation without being stiff. The CEO's message sets the tone: welcoming, aspirational, community-first.
- **Callsign format:** `MSR###VG` (ICAO code for EgyptAir + Virtual Group suffix).
- **Alliance:** Star Alliance Virtual member—this affiliation is a key brand asset.

## Evidence on Hand

- **Real pilot roster:** 17 active pilots with callsigns, ranks, hours, locations, and IFC profiles.
- **Real route network:** Managed in Airtable with flight numbers, ICAO codes, aircraft assignments, durations, and distances.
- **Real codeshare partnerships:** ~21 partner VAs with per-partner shared route data in Airtable.
- **Real fleet:** 10 aircraft types with accurate EgyptAir fleet counts and specifications.
- **Pilot of the Month archive:** Monthly recognition data from October 2025 through 2026.
- **Staff directory:** Named individuals with Discord avatars and IFC profiles (some positions vacant).
- **Rank badge images:** Custom badge artwork for all 10 rank tiers.
- **No fabricated content:** Testimonials, external press coverage, and third-party endorsements do not exist and must not be invented.

## Product Principles

1. **First impression is the product** — the site exists to convert a curious visitor into an applicant. Every page should reinforce that EAVG is worth joining.
2. **Real over aspirational** — show the actual operation (real pilots, real routes, real fleet) rather than making promises. The VA's credibility is in its data.
3. **Aviation-grade seriousness** — the interface should feel like it belongs to a real airline's digital presence, not a hobbyist forum. Professionalism earns trust.
4. **Community is the retention layer** — recruitment gets pilots in the door; the sense of belonging, progression, and recognition keeps them flying.
5. **Operational transparency** — routes, ranks, partners, and roster are public by design. Openness signals confidence.
