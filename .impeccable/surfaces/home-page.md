---
version: 1
slug: "home-page"
primary_target: "src/pages-content/HomePage.astro"
related_targets:
  - "src/components/Header.astro"
  - "src/components/Footer.astro"
  - "src/styles/global.css"
---

## Scope and mode

- Primary target: `src/pages-content/HomePage.astro`
- Visitor mode: Persuade

## Audience, job, and action

Fans and prospective concertgoers should quickly understand Max Wilson Pereira as an internationally experienced Brazilian tenor whose live work joins opera, musical theatre, crossover, and emotional directness. The primary action is to explore the existing concert page and follow the project's development. Music, biography, video, and social channels support that decision.

## Proof and content

- Full-viewport use of authentic live-performance photography.
- The existing artist name and tagline, reorganized without factual rewriting.
- The existing concert concept and route as the primary destination.
- Existing welcome video, album catalogue, career story, and social links as supporting evidence.
- No ticketing, booking, dates, waitlist, or contact claim may be invented.

## Chosen direction

**The Voice in the Room.** The homepage should feel like entering a concert hall immediately before a performance: cinematic scale, warm stage light, editorial quiet, and direct human presence. The memorable moment is the first encounter with Max already performing, followed by a clear invitation to enter the concert story.

Approved composition: `.impeccable/mocks/homepage-proscenium.png`, with the restrained typography of the programme-folio study and the concert-scale transition of the cinematic-chapters study.

## Implementation inventory

| Visible ingredient | Required treatment | Medium |
| --- | --- | --- |
| Architectural global navigation | Real localized routes, wordmark, four-language switcher, social links, full-height mobile menu | Shared Astro component + CSS/JS |
| Performance-led first viewport | Full-bleed Hebe Camargo stage image with art-directed desktop/mobile crops | Existing optimized raster asset |
| Artist name and concert action | Dominant display hierarchy; accurate localized concert route and wording | Shared Astro page implementation |
| Concert invitation | Orchestra photograph, existing concert copy, direct action | Existing optimized raster + semantic Astro markup |
| Welcome film | Existing YouTube video and existing welcome text | Existing embed + semantic Astro markup |
| Recorded music | Real SO IN LOVE, Tenori Amici, and QUATTRO covers with existing routes | Existing raster + semantic Astro markup |
| Career proof montage | Fedra e Hipólito, Hebe Camargo, and orchestra imagery with factual captions only | Existing optimized raster + semantic Astro markup |
| Social close and footer | Existing social destinations and primary localized routes | Shared Astro components |
| Motion | One stage-like reveal sequence with visible-by-default and reduced-motion states | CSS + limited client JavaScript |

## Constraints

- Preserve the homepage URLs, localized SEO, language switching, social links, and all four supported languages.
- Portuguese, English, Spanish, and German must use the same `HomePage.astro` presentation implementation.
- Mobile is art-directed independently, with a deliberate image crop and immediately visible concert action.
- The interface must remain useful with reduced motion, without client JavaScript, and while media is loading.
- Do not redesign inner-page layouts from this homepage brief.

## Resolved implementation decisions

- Italiana and Albert Sans have been validated with the four shipped languages.
- Responsive hero crops and the supporting image sequence are implemented in the shared CSS.
- The concert CTA remains informational while there is no ticket or booking destination.
