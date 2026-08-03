---
name: Max Wilson Pereira
description: A cinematic, intimate visual system that brings an international tenor and his live voice close to people.
colors:
  concert-ink: "#10100f"
  stage-charcoal: "#1b1b1a"
  programme-ivory: "#f3eee4"
  house-white: "#fffdf8"
  aged-brass: "#b49a62"
  bordeaux-note: "#6d2735"
  warm-graphite: "#302e2b"
  soft-mist: "#aaa69f"
  line-dark: "rgba(255, 253, 248, 0.18)"
  line-light: "rgba(48, 46, 43, 0.2)"
typography:
  display:
    fontFamily: '"Italiana", "Times New Roman", serif'
    fontSize: "clamp(3.8rem, 9vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.88
    letterSpacing: "-0.035em"
  headline:
    fontFamily: '"Italiana", "Times New Roman", serif'
    fontSize: "clamp(2.7rem, 6vw, 5.4rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  title:
    fontFamily: '"Italiana", "Times New Roman", serif'
    fontSize: "clamp(1.3rem, 3vw, 2.15rem)"
    fontWeight: 400
  body:
    fontFamily: '"Albert Sans", Arial, sans-serif'
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: '"Albert Sans", Arial, sans-serif'
    fontSize: "0.72rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "0.12em"
rounded:
  control: "0.25rem"
  md: "0.5rem"
  lg: "0.75rem"
  circle: "50%"
spacing:
  1: "0.25rem"
  2: "0.5rem"
  3: "0.75rem"
  4: "1rem"
  5: "1.5rem"
  6: "2rem"
  7: "3rem"
  8: "4rem"
  9: "6rem"
  10: "8rem"
  page-gutter: "clamp(1.25rem, 4vw, 4.5rem)"
components:
  button-primary:
    backgroundColor: "{colors.aged-brass}"
    textColor: "{colors.concert-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0.9rem 1.35rem"
    height: "3.25rem"
  button-primary-hover:
    backgroundColor: "{colors.bordeaux-note}"
    textColor: "{colors.house-white}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0.9rem 1.35rem"
    height: "3.25rem"
  button-dark:
    backgroundColor: "{colors.concert-ink}"
    textColor: "{colors.house-white}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0.9rem 1.35rem"
    height: "3.25rem"
  button-light:
    backgroundColor: "{colors.programme-ivory}"
    textColor: "{colors.concert-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0.9rem 1.35rem"
    height: "3.25rem"
---

# Design System: Max Wilson Pereira

## Overview

**Creative North Star: "The Voice in the Room"**

The shipped system feels like entering a concert hall moments before the first note: composed, expectant, and intimate despite its scale. Authentic performance photography is the principal material. The interface frames Max Wilson Pereira and his work with the confidence of an international concert programme, then recedes.

The visual rhythm alternates cinematic dark fields with quiet editorial ivory fields. Architectural edges, decisive typography, and restrained brass and bordeaux accents communicate classical credibility without institutional distance. Motion behaves like a stage transition: content remains available by default, then settles into place only when enhancement is supported.

This document is authoritative for the approved global foundation (tokens, typography, navigation, footer, focus behavior, and localization conventions), the homepage, and the public biography, concert, album collection, album, and support routes. These routes share a full-bleed chapter system while preserving their page-specific content and interactions.

**Key Characteristics:**

- Authentic artist, performance, and album imagery at decisive scale.
- Concert ink and programme ivory alternating as broad visual acts.
- Italiana display type paired with disciplined Albert Sans support type.
- Architectural, mostly square geometry with restrained physical depth.
- Mobile compositions independently art-directed from desktop.
- Concert discovery remains the homepage's clearest action.

## Colors

The palette uses the physical colors of a darkened hall, warm paper, formal evening dress, aged brass, and one rare wine-red note. The normative values live in the frontmatter and the matching CSS custom properties.

### Primary

- **Concert Ink:** Principal dark field for the page, navigation, footer, hero veils, and immersive sections.
- **Programme Ivory:** Principal light field for concert invitation, career story, and social close.

### Secondary

- **Aged Brass:** Formal highlight for labels, active navigation, focus outlines, rules, and the primary action.

### Tertiary

- **Bordeaux Note:** Rare emotional and interaction accent for selected hover states and editorial links.

### Neutral

- **Stage Charcoal:** Secondary dark passage, especially the welcome-film section and image placeholders.
- **House White:** High-emphasis text and controls on dark fields.
- **Warm Graphite:** Body text on ivory fields.
- **Soft Mist:** Supporting copy, metadata, and footer text on dark fields.
- **Dark and light rules:** Low-contrast dividers appropriate to their surrounding field.

### Named Rules

**The Stage-Light Rule.** Color appears in broad, intentional fields or as one meaningful accent; it is never scattered as decoration.

**The Rare Bordeaux Rule.** Bordeaux signals a musical or conversion moment and does not become a general-purpose accent.

## Typography

**Display Font:** Italiana, falling back to Times New Roman and serif.

**Body and Label Font:** Albert Sans, falling back to Arial and sans-serif.

**Character:** Italiana supplies theatrical scale and editorial phrasing; Albert Sans keeps navigation, actions, captions, and reading copy contemporary and highly legible. Both families are loaded from Google Fonts with the shipped weights and support the Portuguese, English, and German experience.

### Hierarchy

- **Display:** The homepage artist name uses the frontmatter display token; below 48rem it changes to `clamp(3.45rem, 17vw, 5.4rem)` for an art-directed mobile composition and remains constrained to about eight characters per line.
- **Headline:** Homepage section openings use the frontmatter headline token with balanced wrapping and short measures of roughly 11–12 characters where the composition calls for it.
- **Title:** Album names use the frontmatter title role; the footer identity uses a related responsive display size.
- **Body:** Reading copy is generally 1rem with 1.7–1.75 line-height, short 34–36rem measures, and a global reading ceiling of 68ch.
- **Label:** Roles, buttons, navigation, captions, and metadata use bold Albert Sans, uppercase where brief labels benefit, with 0.08–0.18em tracking depending on scale.

### Named Rules

**The One Aria Rule.** Each viewport has one dominant typographic voice; supporting headings do not compete at the same scale.

**The Language-Coverage Rule.** Type, wrapping, and label spacing must remain usable in Portuguese, English, and German.

## Layout

The system is mobile-first. The shared page gutter is fluid, the principal stage is capped at 76rem, and long-form text is capped at 68ch. The header is 4.25rem below 48rem and 4.75rem above it. Full-bleed fields and images may extend to the viewport while their content returns to the shared stage.

The homepage is organized as distinct acts: a performance-led full-viewport hero; an ivory concert split; a charcoal welcome-film passage; an ivory career montage; an ink album stage; an ivory social close; and the shared ink footer. Public inner pages use the same sequence logic: full-bleed hero or opening field, alternating ivory and charcoal reading chapters, content held within the shared stage, and the shared ink footer meeting the viewport edge. The vintage microphone may appear as one restrained full-width interlude between major chapters, moving only slightly on capable devices and remaining still when reduced motion is preferred.

At 48rem, the career montage becomes a three-column editorial grid, music becomes a heading-plus-album split, album covers use a 1.35/0.8/0.8 composition, and the footer becomes three columns. At 60rem, navigation becomes an inline desktop bar, the hero reserves its right side for the performer, concert and welcome sections become asymmetric two-column layouts, and the hero scroll cue appears.

Major imagery is cropped deliberately: the hero uses a 60% horizontal focal point on larger screens and 66% below 48rem, with a stronger bottom-to-top mobile veil. Concert, career, and album imagery preserve their own object-position and aspect treatments rather than accepting one universal crop.

**The No Card Parade Rule.** Hierarchy comes from scale, fields, alignment, and spacing, not a repeated stack of rounded panels.

**The Art-Directed Mobile Rule.** Desktop framing is never accepted as the mobile crop by default.

## Elevation & Depth

The system is flat by default. Depth comes from photography, tonal alternation, directional hero overlays, image cropping, and genuine object overlap. The welcome video uses a soft `0 2rem 5rem rgba(0, 0, 0, 0.28)` shadow. Album artwork uses `0 1.5rem 3rem rgba(0, 0, 0, 0.3)`, strengthening to `0 2rem 4rem rgba(0, 0, 0, 0.42)` as it lifts on hover or keyboard focus. Navigation and content sections do not use decorative elevation.

**The Physical Depth Rule.** An element receives elevation only when it behaves like a physical object above another plane.

## Shapes

The dominant geometry is architectural: straight section edges, square media, thin rules, and purposeful cropping. Buttons use a restrained 0.25rem corner. Compatibility radii of 0.5rem and 0.75rem remain available to older subpages but do not define the homepage composition. Social icon controls are circular because the shape aids recognition; text links, navigation planes, media, and section containers remain square.

**The Programme Edge Rule.** Containers read like pages, stages, and image frames, not floating glass bubbles.

## Components

### Buttons and Links

- **Base button:** Inline-flex, minimum 3.25rem high, 0.9rem by 1.35rem padding, 0.25rem radius, uppercase Albert Sans label, and a 1px transparent border. Hover lifts by 2px over 180ms.
- **Primary:** Brass on ink, changing to bordeaux with house-white text on hover and focus.
- **Dark and light:** Ink or ivory fields respectively; both change to bordeaux with house-white text on hover and focus.
- **Text action:** Transparent, square, and underlined by a subtle bottom border; brass supplies its hover/focus state.
- **Editorial link:** Bordeaux with a current-color underline on ivory, changing to ink on hover/focus.

### Navigation

The fixed header uses the artist wordmark, real routes, language switcher, and social destinations. At the top of the homepage it is a transparent ink-to-clear veil; after 24px of scroll it resolves to an opaque ink plane with a low-contrast bottom rule. At 60rem and wider, navigation is centered, uppercase, and compact with a brass active/hover rule.

Below 60rem, the 2.75rem menu toggle opens a full-viewport ink navigation plane. Links become large Italiana lines separated by subtle rules; language and social controls sit below. Opening locks body scroll, moves focus to the first link, traps Tab focus within the menu and toggle, supports Escape, restores focus to the toggle, and keeps `aria-expanded` and localized open/close labels synchronized.

### Footer and Social Close

The shared footer uses the 76rem stage, an Italiana identity, localized route list, real social icons, and a restrained uppercase legal row. The homepage social close is an ivory editorial list rather than a card grid: square rows, thin rules, graphite text, and bordeaux interaction states.

### Homepage Sections and Image Treatment

The hero, concert invitation, welcome film, career montage, music catalogue, and social close each use semantic landmarks and labelled headings. Images are authentic local assets with descriptive alternative text; supporting media uses lazy loading, while the first-viewport performance image loads immediately. Photography is slightly restrained through saturation/contrast adjustments, protected by directional overlays where text shares the frame, and allowed only subtle scale or lift interactions.

### Motion, Accessibility, and Localization

Stage easing is `cubic-bezier(0.16, 1, 0.3, 1)` with 180ms state transitions and 760ms section reveals. The hero settles over 1.4s and its copy enters over 980ms after a 120ms delay. Reveal content is visible by default; JavaScript adds the concealed ready state only when IntersectionObserver is available, and unsupported browsers immediately expose all items.

Reduced-motion preference removes hero entrance animation, reveal transitions, image zooms, and album lift transitions. Keyboard focus uses a 2px aged-brass outline with a 4px offset on links, buttons, and inputs. Buttons provide at least 3.25rem height, the menu toggle is 2.75rem square, and social icon controls are 2.5rem square on mobile.

Portuguese is the source language. Public English and German pages are generated as crawlable `/en/` and `/de/` routes with self-canonical metadata, reciprocal `hreflang`, localized JSON-LD, and statically translated primary content. Client-side translation remains as progressive enhancement for shared components and legacy download flows. Language links use real localized routes, preserve the selection in local storage, and omit unavailable support routes outside Portuguese. Layouts must tolerate all three languages without clipping or collapsing the established hierarchy.

## Do's and Don'ts

### Do:

- **Do** let real photographs, album covers, recorded music, and factual career evidence carry the story.
- **Do** alternate immersive dark passages with calm ivory reading passages.
- **Do** keep concert exploration the clearest homepage action without implying ticketing or booking.
- **Do** preserve semantic headings, descriptive alt text, visible focus, useful no-motion states, and progressive enhancement.
- **Do** validate every shared change in Portuguese, English, and German.
- **Do** reuse the shared navigation, footer, token, button, spacing, focus, and full-bleed chapter foundations across the public site.

### Don't:

- **Don't** use social-media gradients, neon glows, glassmorphism, or a link-in-bio visual language in the approved system.
- **Don't** turn sections into repeated rounded cards, pills, or floating shells.
- **Don't** let decoration compete with the artist's face, voice, album art, or performance.
- **Don't** manufacture tickets, bookings, dates, press, reviews, testimonials, or commercial claims.
- **Don't** imitate Il Divo or Il Volo compositionally; only their standard of photographic confidence and campaign clarity informs the work.
- **Don't** turn long-form page content into floating card stacks or reintroduce page-edge gaps around the shared footer.
