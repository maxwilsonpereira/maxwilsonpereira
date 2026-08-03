---
name: Max Wilson Pereira
description: A cinematic, intimate visual world for an international tenor who brings the lyrical voice close to people.
---

<!-- SEED: established with the user before implementation; re-run $impeccable document once there's code to capture the actual tokens and components. -->

# Design System: Max Wilson Pereira

## Overview

**Creative North Star: "The Voice in the Room"**

The visual world should feel like entering a concert hall moments before the first note: composed, expectant, and intimate despite the scale. Real performance photography is the principal material. The interface frames the artist and his work with the confidence of an international concert programme, then recedes.

The system moves between cinematic dark fields and quiet editorial light fields. This alternation gives the site musical pacing: intensity, breath, story, and return. It must communicate classical credibility without institutional distance and contemporary relevance without borrowing the visual language of social platforms.

Motion follows the grammar of a stage transition. Content is visible by default, images settle gently into place, and grouped elements enter in a measured sequence. Motion must never compete with the performance or prevent immediate comprehension.

**Key Characteristics:**

- Large, decisive use of authentic artist and performance imagery.
- Dramatic scale balanced by generous editorial quiet.
- Warm stage light against deep, natural darkness.
- Restrained controls with strong typography and clear actions.
- An emotional register that is elegant, open, and human.
- Mobile compositions art-directed with the same care as desktop.

## Colors

The palette is restrained and physical: the colors of a darkened hall, warm paper, formal evening dress, aged brass, and a rare note of wine red.

### Primary

- **Concert Ink** (`#10100f`): The principal dark field and the visual equivalent of the unlit auditorium. Use for immersive sections, navigation, and high-impact transitions.
- **Programme Ivory** (`#f3eee4`): The principal light field for biography, programme notes, and longer reading passages.

### Secondary

- **Aged Brass** (`#b49a62`): A restrained highlight for fine rules, active states, small labels, and moments that carry formal significance.

### Tertiary

- **Bordeaux Note** (`#6d2735`): A rare emotional accent reserved for music, performance, and selected calls to action. It must not become a general-purpose decoration.

### Neutral

- **Stage Charcoal** (`#1b1b1a`): Secondary dark surface used to distinguish adjacent dark regions without visible card shells.
- **Soft Mist** (`#aaa69f`): Supporting text and metadata on dark fields.
- **Warm Graphite** (`#302e2b`): Body text on ivory fields.
- **House White** (`#fffdf8`): High-emphasis text and controls on dark imagery.

### Named Rules

**The Stage-Light Rule.** Color appears in broad, intentional fields or in one meaningful accent; it is never scattered as decorative confetti.

**The Rare Bordeaux Rule.** Bordeaux is used sparingly enough that its appearance signals an important musical or conversion moment.

## Typography

The typography pairs an expressive, high-contrast editorial display face with a disciplined contemporary sans serif. Exact families will be resolved and tested during implementation against Portuguese, English, and German character coverage.

**Character:** Display type carries theatrical scale and emotional phrasing; supporting type remains calm, highly legible, and modern. The pairing must feel commissioned for a performing artist, not borrowed from a luxury template.

### Hierarchy

- **Display:** Large, close-set, and responsive; used for the artist name and rare act-opening statements. Line breaks are art-directed at each major breakpoint.
- **Headline:** Expressive but quieter than display; used for page and section openings.
- **Title:** Compact and confident; used for albums, programme items, and media features.
- **Body:** Comfortable reading size with open line height and a maximum measure of approximately 68 characters.
- **Label:** Small sans serif with moderate tracking; used for dates, locations, media types, navigation, and section cues. Uppercase is reserved for short labels.

### Named Rules

**The One Aria Rule.** Each viewport has one dominant typographic voice. Secondary headings support it rather than competing at the same scale.

**The Language-Coverage Rule.** No typeface is approved until its Portuguese diacritics and German glyphs match the quality of its basic Latin forms.

## Layout

The system is mobile-first. Small screens use a single decisive visual axis, edge-aware imagery, comfortable text margins, and full-width actions where clarity benefits. Desktop expands into an editorial grid with asymmetric image/text relationships; it does not merely widen the mobile stack.

Sections are composed as acts rather than repeated containers. Full-bleed image fields, constrained reading columns, split editorial features, album-art stages, and quiet programme lists share one grid but vary in density. Section spacing follows musical phrasing: more space before a new thought than after its heading, with deliberate alternation between intensity and rest.

Primary content should generally remain within an approximately 1200px stage while backgrounds and selected images may extend to the viewport edges. Long-form text remains narrow enough for comfortable reading. Exact spacing, grid, and breakpoint tokens will be extracted from the implementation in the scan-mode documentation pass.

**The No Card Parade Rule.** Do not turn consecutive sections into a vertical stack of rounded panels. Hierarchy comes from scale, fields, alignment, and spacing.

**The Art-Directed Mobile Rule.** Every major image requires a deliberate mobile crop and focal point; desktop framing is never accepted by default.

## Elevation & Depth

Depth comes primarily from photography, tonal layering, overlap, and controlled contrast. Surfaces are mostly flat. Shadows are soft, ambient, and limited to genuinely layered objects such as album artwork, an open navigation plane, or focused media—not applied to every section.

Image overlays must protect text without turning photographs muddy. Use directional tonal veils that follow the composition and subject position instead of a generic uniform black layer.

### Named Rules

**The Physical Depth Rule.** An element receives elevation only when it behaves like a physical object above another plane.

## Shapes

The dominant geometry is architectural: straight edges, full-width fields, thin rules, and purposeful cropping. Corners are square or subtly softened. Circular treatment is reserved for familiar controls such as play icons when it improves recognition.

Album artwork keeps its original square object quality and may overlap another plane with restrained depth. Buttons and inputs should feel tailored and precise, with modest corner treatment rather than pill silhouettes.

**The Programme Edge Rule.** Containers read like pages, stages, and image frames—not floating glass bubbles.

## Do's and Don'ts

### Do:

- **Do** let real photographs, album covers, recorded music, and career evidence carry the visual story.
- **Do** alternate immersive dark passages with calm light reading passages.
- **Do** use generous scale and whitespace to make the artist feel established and internationally presented.
- **Do** preserve warmth and directness in calls to action, support messaging, and biography.
- **Do** design all supported languages and reduced-motion behavior as first-class states.
- **Do** keep the visual hierarchy strong when imagery is unavailable, slow to load, or cropped narrowly.

### Don't:

- **Don't** use social-media gradients, neon glows, glassmorphism, or a link-in-bio visual language.
- **Don't** create a generic corporate, SaaS, or luxury-fashion appearance.
- **Don't** rely on repeated rounded cards, pills, or boxes to organize every content type.
- **Don't** use decorative effects that compete with the artist's face, voice, album art, or performance.
- **Don't** manufacture ticketing, press, reviews, tour dates, or booking claims that the product does not currently provide.
- **Don't** imitate Il Divo or Il Volo compositionally; their standard of photographic confidence and campaign clarity is the influence.
