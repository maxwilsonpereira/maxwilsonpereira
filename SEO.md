# SEO implementation

## Shared metadata

`src/layouts/BaseLayout.astro` emits a self-referencing canonical, localized title and description, explicit index/preview directives, Open Graph and Twitter metadata, favicon links, and JSON-LD. Page-specific localized values and accurate social-image dimensions are supplied by `src/data/seo.ts`; do not duplicate `<head>` markup in page components.

Translated page sets emit reciprocal alternates for `pt-BR`, `en-US`, `es-ES`, and `de-DE`, plus `x-default` pointing to Portuguese. Portuguese-only pages do not claim translations that do not exist.

## Structured data

`src/utils/structured-data.ts` builds a factual `@graph` around the official `WebSite`, `Person`, current `WebPage`, breadcrumbs, and relevant album/video entities. The current locale is supplied through `inLanguage`. Add facts only when they are verified.

## Crawling and discovery

- `public/robots.txt` allows general crawling, explicitly allows OpenAI search/user crawlers, and identifies the sitemap.
- `scripts/postbuild.mjs` creates `sitemap.xml` from the canonicals and alternate links in the generated HTML.
- `public/llms.txt` provides a concise factual site map for search and AI agents.
- The private SO IN LOVE download page emits `noindex, nofollow, noarchive, nosnippet` and is excluded from the sitemap.

## Validation

Always run `npm run build` after changing routes, localized content, metadata, media, or internal links. Inspect representative PT, EN, ES, and DE output when changing shared SEO behavior. Never canonicalize translated pages to Portuguese; each translation is independently canonical.
