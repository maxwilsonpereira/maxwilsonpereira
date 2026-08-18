# Project Instructions

## Product and Design Sources

- Treat [`PRODUCT.md`](PRODUCT.md) as the source of truth for product goals, artist positioning, content priorities, and redesign scope.
- Treat [`DESIGN.md`](DESIGN.md) as the source of truth for approved colors, typography, spacing, components, responsive behavior, motion, accessibility, and visual rules.
- For homepage-specific decisions, also consult [`.impeccable/surfaces/home-page.md`](.impeccable/surfaces/home-page.md).
- The approved redesign currently covers the global foundation and homepage. Do not redesign other page layouts by inference; preserve their content and behavior until their page-specific direction is approved.

## Astro Architecture

- This is an Astro 7 static-output site. It has no backend, database, server-side session, SPA runtime, or client-side router.
- Keep reusable UI in `src/components/`, the shared document shell in `src/layouts/`, and shared localized implementations in `src/pages-content/`.
- Route entry files in `src/pages/` should stay thin and delegate presentation to shared page implementations.
- Treat `public/` as pass-through static assets only. Never edit generated files in `dist/`; rebuild them from source.
- Use the Node 24 toolchain and project npm scripts. Run `npm run build` for the complete type, route, SEO, reference, sitemap, and output validation pipeline.

## Frontend Standards

- Always build mobile-first and fully responsive layouts.
- Check breakpoint-specific styles and overrides whenever you modify navigation, overlays, animations, typography, layout, or other responsive elements.
- Follow the existing visual design before introducing new styles.
- Prefer reusable components over duplicated markup.
- Prefer reusable utility/classes over one-off CSS.
- Keep spacing, typography, colors, and interaction states consistent.
- Apply webpage changes consistently across all supported languages.

## Code Standards

- Match the existing project structure.
- Use semantic HTML where possible.
- Keep accessibility in mind: labels, alt text, focus states, contrast.
- Update and improve SEO whenever necessary and possible, including localized SEO metadata where relevant.

## CSS & Styling Changes

When modifying CSS, styles, or class behavior, **avoid adding overrides at the bottom of the file or introducing higher-specificity rules just to force the desired result**.

Always investigate the existing styling hierarchy and identify the **root cause** of the issue first. Prefer changing the original/shared style, component, selector, variable, or design rule responsible for the behavior so that the fix is applied consistently everywhere that style or class is used.

Before making a CSS change:

* Find where the affected class/style is originally defined and how it is inherited or composed.
* Check all relevant components and pages that depend on it.
* **Check all available languages/localized versions of the website and ensure the change is applied consistently across every language.**
* Verify that translated/localized pages reuse the same shared styles and components whenever possible instead of maintaining separate language-specific styling.
* When a styling change is intended to be global, confirm that it works correctly in **all supported languages**, not only the currently tested language.
* Prefer fixing the shared/root implementation when the desired behavior should be consistent across usages.
* Avoid duplicate declarations, unnecessary overrides, `!important`, or increasingly specific selectors unless there is a clear architectural reason.
* Only introduce a page-specific, component-specific, or language-specific override when the behavior is intentionally different for that context.

The goal is to make **structural, maintainable CSS fixes rather than local patches that hide the underlying problem**, while ensuring that global design changes remain consistent across **all pages, components, and available languages of the website**.

## Localization and SEO Workflow

- All languages use the shared page implementations in `src/pages-content/`; never create locale-specific presentation copies.
- Locale and route configuration lives in `src/config/site.ts`, translations in `src/i18n/translations.json`, and localized metadata in `src/data/seo.ts`.
- Portuguese is the default locale at the site root. Preserve the public URL map documented in `ARCHITECTURE.md`.
- After changing public content, metadata, images, routes, or local links, run `npm run build`.
- Keep canonical URLs, reciprocal `hreflang`, JSON-LD, and the generated sitemap aligned across Portuguese, English, Spanish, and German.
