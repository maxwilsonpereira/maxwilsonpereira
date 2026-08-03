---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: []
---

## Scope and mode

- Primary target: `index.html`
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
| Architectural global navigation | Real routes, wordmark, language switcher, social links, full-height mobile menu | Semantic HTML/CSS/JS |
| Performance-led first viewport | Full-bleed Hebe Camargo stage image with art-directed desktop/mobile crops | Existing raster asset |
| Artist name and concert action | Dominant display hierarchy; accurate concert route and wording | Semantic HTML/CSS |
| Concert invitation | Orchestra photograph, existing concert copy, direct action | Existing raster + semantic HTML/CSS |
| Welcome film | Existing YouTube video and existing welcome text | Existing embed + semantic HTML/CSS |
| Recorded music | Real SO IN LOVE, Tenori Amici, and QUATTRO covers with existing routes | Existing raster + semantic HTML/CSS |
| Career proof montage | Fedra e Hipólito, Hebe Camargo, and orchestra imagery with factual captions only | Existing raster + semantic HTML/CSS |
| Social close and footer | Existing social destinations and primary routes | Shared semantic component |
| Motion | One stage-like reveal sequence with visible-by-default and reduced-motion states | CSS/JS |

## Constraints

- Preserve the homepage URL, localized SEO, language switching, social links, and all supported languages.
- Mobile is art-directed independently, with a deliberate image crop and immediately visible concert action.
- The interface must remain useful with reduced motion and while media is loading.

## Unresolved decisions

- The proposed display and body typefaces require implementation testing across Portuguese, English, and German.
- Final hero crop and supporting image sequence require responsive composition testing.
- CTA wording should remain accurate while no ticket or booking destination exists.
