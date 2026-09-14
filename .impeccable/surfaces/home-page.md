---
version: 1
slug: "home-page"
primary_target: "src/pages-content/HomePage.astro"
direction_seed: "ff292b8d"
related_targets:
  - "src/components/Header.astro"
  - "src/components/Footer.astro"
  - "src/components/ConcertAnnouncement.astro"
  - "src/styles/global.css"
---

## Scope and mode

- Primary target: `src/pages-content/HomePage.astro`
- Visitor mode: Persuade

## Audience, job, and action

Fans and prospective concertgoers should quickly understand Max Wilson Pereira as an internationally experienced Brazilian tenor whose live work joins opera, musical theatre, crossover, and emotional directness. While tickets are on sale, the primary action is to buy through Sympla for the verified Rio de Janeiro date. Concert details, music, biography, video, and social channels support that decision.

## Proof and content

- Full-viewport use of authentic live-performance photography.
- The existing artist name and tagline, reorganized without factual rewriting.
- Verified “Eternas Canções” campaign artwork, date, venue, and Sympla ticket URL.
- Existing welcome video, album catalogue, career story, and social links as supporting evidence.
- No additional date, availability, pricing, or commercial claim may be invented.

## Chosen direction

**The Voice in the Room.** The homepage should feel like entering a concert hall immediately before a performance: cinematic scale, warm stage light, editorial quiet, and direct human presence. The campaign extension adds a non-blocking stage announcement on every full homepage load, while the hero keeps the verified date and ticket action permanently visible. The announcement rises from the lower edge like a programme placed in front of the visitor, can be dismissed immediately until the next refresh, and never traps focus.

FORM inherits the approved Proscenium composition under direction seed `ff292b8d`. Approved composition: `.impeccable/mocks/homepage-proscenium.png`, with the restrained typography of the programme-folio study and the concert-scale transition of the cinematic-chapters study.

## Implementation inventory

| Visible ingredient | Required treatment | Medium |
| --- | --- | --- |
| Architectural global navigation | Real localized routes, wordmark, four-language switcher, social links, full-height mobile menu | Shared Astro component + CSS/JS |
| Performance-led first viewport | Full-bleed Hebe Camargo stage image with art-directed desktop/mobile crops | Existing optimized raster asset |
| Artist name, date, and ticket action | Dominant display hierarchy; permanent live HTML; verified Sympla URL; localized wording | Shared Astro page implementation |
| Page-load announcement | Non-modal, dismissible, campaign-art-led, shown again after a full refresh, reduced-motion safe | Shared Astro component + limited client JavaScript |
| Concert invitation | Orchestra photograph, existing concert copy, direct action | Existing optimized raster + semantic Astro markup |
| Welcome film | Existing YouTube video and existing welcome text | Existing embed + semantic Astro markup |
| Recorded music | Real SO IN LOVE, Tenori Amici, and QUATTRO covers with existing routes | Existing raster + semantic Astro markup |
| Career proof montage | Fedra e Hipólito, Hebe Camargo, and orchestra imagery with factual captions only | Existing optimized raster + semantic Astro markup |
| Social close and footer | Existing social destinations and primary localized routes | Shared Astro components |
| Motion | One stage-like reveal sequence with visible-by-default and reduced-motion states | CSS + limited client JavaScript |

## Constraints

- Preserve the homepage URLs, localized SEO, language switching, social links, and all four supported languages.
- Portuguese, English, Spanish, and German must use the same `HomePage.astro` presentation implementation.
- Mobile is art-directed independently; announcement and primary ticket action must remain usable on short viewports.
- The interface must remain useful with reduced motion, without client JavaScript, and while media is loading; the date and ticket action remain in the hero when the session announcement does not run.
- The announcement never locks page scroll or keyboard focus.
- Do not redesign inner-page layouts from this homepage brief.

## Resolved implementation decisions

- Italiana and Albert Sans have been validated with the four shipped languages.
- Responsive hero crops and the supporting image sequence are implemented in the shared CSS.
- Use the landscape campaign artwork for both the homepage announcement and concert detail page.
- Show the homepage announcement on every full page load; its close control hides it only until the next refresh.
- Keep the verified ticket action permanently visible in the homepage hero and concert page.
