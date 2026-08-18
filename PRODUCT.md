# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary visitors are fans and prospective concertgoers in Brazil, Austria, and the wider international audience reached through Max Wilson Pereira's social channels. They arrive to discover his voice and story, listen to recordings, follow the developing concert project, and support his artistic work.

## Product Purpose

The website is Max Wilson Pereira's official artist home: a place to experience his music and career, follow the concert project, explore albums, and access direct artist-support and music-purchase flows. Success is measured first by sustained interest in the concert, then by meaningful discovery of music and social channels.

## Positioning

Max Wilson Pereira is a Brazilian tenor based in Vienna whose work joins rigorous lyrical and operatic training with musical theatre, crossover, television, humor, and direct digital performance—bringing a formally trained voice into emotionally immediate, everyday contexts.

## Operating Context

Visitors often arrive from short-form social video, YouTube, Instagram, search, or a shared link. They need a mobile-first path into concert information, recorded music, biography, and support. The concert currently has no published booking or ticket destination; it communicates planned presentations in Austria and Brazil and an intended Brazilian tour from 2027.

## Capabilities and Constraints

- Astro 7 statically renders the site from shared Astro components, TypeScript configuration/data, shared CSS, and limited client-side JavaScript.
- Portuguese is the default language; English, Spanish, and German are generated as crawlable localized routes from the same implementations in `src/pages-content/`.
- Preserve the established `.html` public URL map. The site has no backend, database, server-side session, or client-side router.
- Preserve all existing routes, media, downloads, Spotify links, YouTube embeds, PIX payment/support instructions, social links, and localized SEO behavior.
- PIX support and purchase flows remain client-side and trust-based; the site does not verify payments on a server.
- Do not add ticketing, contact, availability, dates, testimonials, or commercial claims that are not supported by the current site.
- Homepage priority confirmed by the user: concert interest.

## Brand Commitments

- Artist name: Max Wilson Pereira.
- Preserve the artist's authentic voice: emotionally generous, elegant, accessible, and never distant or corporate.
- The user named Il Divo and Il Volo as inspiration for premium international artist presentation, not as templates to copy.
- Important artist identity: Brazilian tenor, based in Vienna; opera, crossover, musical theatre, popular repertoire, humor, and social connection.

## Evidence on Hand

- Full biography and embedded performances: `src/pages-content/BiographyPage.astro`.
- Concert concept, rehearsal video, repertoire, and stated future context: `src/pages-content/ConcertPage.astro`.
- Album collection and listening/purchase/download flows: `src/pages-content/AlbumsPage.astro`, the album page implementations, and `src/data/media.ts`.
- Local photography: optimized concert, operetta, television, orchestra, costume, and artist imagery under `public/assets/optimized/`.
- Album artwork and audio: `public/assets/so-in-love/`, `public/assets/tenori-amici/`, and `public/assets/quattro-sony/`.
- Routes and locale behavior: `src/config/site.ts` and `src/i18n/translations.json`.
- Metadata and JSON-LD: `src/data/seo.ts` and `src/utils/structured-data.ts`.

## Product Principles

1. Let the voice, live performance, and real career evidence lead.
2. Make concert interest the clearest next step while retaining music discovery and support paths.
3. Treat opera and crossover as connected, welcoming parts of one artistic identity.
4. Preserve the artist's factual story and make it easier to explore.
5. Deliver a polished international experience without inventing career claims or ticketing details.

## Accessibility & Inclusion

The site must remain mobile-first, keyboard-usable, readable at high contrast, and respectful of reduced-motion preferences. All visual redesign work must preserve or improve meaningful headings, alt text, labels, focus states, touch target sizes, and media accessibility.
