# AI coding guide

This is one multilingual Astro website, not four parallel sites.

## Before changing anything

Inspect `PRODUCT.md`, `DESIGN.md`, `AGENTS.md`, and the existing shared components. Ask whether a shared component or data source already owns the requested behavior.

## Architecture rules

- Reuse `BaseLayout.astro`, `Header.astro`, `Footer.astro`, and the page implementations in `src/pages-content/`.
- Keep locale and route behavior in `src/config/site.ts`.
- Put translated UI/content strings in `src/i18n/translations.json` and localized metadata in `src/data/seo.ts`.
- Do not create locale-specific copies of components, layouts, CSS, navigation, or metadata infrastructure.
- Do not edit generated `dist/` output.
- Preserve the public URL map in `ARCHITECTURE.md`.

## CSS rules

Before adding CSS, identify which existing component or shared rule owns the styling. Design tokens live in `src/styles/tokens.css`; shared rules live in `src/styles/global.css`.

Do not append corrective overrides, duplicate selectors, or use `!important`. Repair the original rule and test the affected pattern across Portuguese, English, Spanish, German, mobile, tablet, and desktop.

## Dependencies and JavaScript

Before adding a dependency, ask whether Astro, semantic HTML, native browser APIs, or CSS already solve the requirement. Keep content server-rendered and use client JavaScript only for genuine interaction. Do not introduce React, a client router, a database, or a backend without a concrete approved requirement.

## Content and SEO changes

Use semantic headings, descriptive alt text, direct crawlable links, and verified facts. Update localized metadata and structured data when relevant. Never fabricate schema claims or create language alternates for pages that do not exist.

Finish every public-page change with `npm run build`. The build is the required cross-route SEO and link regression check.
