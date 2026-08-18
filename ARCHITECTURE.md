# Architecture

## Runtime model

Astro 7 statically renders every page as useful HTML. There is no SPA framework, backend, database, server-side session, or client-side router. JavaScript is limited to the shared mobile navigation, homepage reveal behavior, audio controls, the Portuguese support dialog, and the protected album-download experience.

## Source layout

```text
src/
  components/       shared UI and media components
  config/           locales, routes, navigation, and site constants
  data/             SEO and media data
  i18n/             localized string dictionaries
  layouts/          the shared document shell and metadata
  pages/            Astro route entry points
  pages-content/    shared page implementations for every locale
  styles/           design tokens and shared responsive CSS
  utils/            structured-data generation
public/              static media, CNAME, robots.txt, and llms.txt
scripts/             build post-processing and validation
```

`BaseLayout.astro` owns the document head, header, footer, fonts, metadata, and structured data. `PageRenderer.astro` maps a typed route key to one page implementation. Localized pages pass a locale into that same implementation; they do not duplicate presentation code. `SoInLoveSupportDialog.astro` owns the Portuguese post-PIX acknowledgement and its before-first-paint native-dialog upgrade.

## Localization

Supported locale keys are `pt`, `en`, `es`, and `de`. Portuguese is the default and has no URL prefix. Locale configuration and route mappings live in `src/config/site.ts`. Existing translated text lives in `src/i18n/translations.json`; metadata lives in `src/data/seo.ts`.

To add a fifth language, add its locale configuration, translation dictionary, metadata, and localized homepage route. Shared page types will then render from the existing route generator.

## Preserved URL map

| Page type | Portuguese | Localized equivalents | Action |
| --- | --- | --- | --- |
| Home | `/` | `/en/`, `/es/`, `/de/` | Preserved |
| Biography | `/pages/biografia.html` | `/{locale}/pages/biografia.html` | Preserved |
| Concert | `/pages/concerto.html` | `/{locale}/pages/concerto.html` | Preserved |
| Albums | `/pages/albums.html` | `/{locale}/pages/albums.html` | Preserved |
| Videos | `/pages/videos.html` | `/{locale}/pages/videos.html` | Preserved |
| Tenori Amici | `/pages/albums/tenori-amici.html` | `/{locale}/pages/albums/tenori-amici.html` | Preserved |
| QUATTRO | `/pages/albums/quattro-sony.html` | `/{locale}/pages/albums/quattro-sony.html` | Preserved |
| Support | `/pages/apoio-pix.html` | Portuguese only | Preserved |
| SO IN LOVE purchase | `/pages/albums/so-in-love-pix.html` | Portuguese only | Preserved |
| SO IN LOVE download | `/pages/albums/so-in-love.html` | `/{locale}/pages/albums/so-in-love.html` | Protected/noindex |

Astro's file output keeps the legacy `.html` pages. `scripts/postbuild.mjs` places localized homepages at `/{locale}/index.html` and creates the exact canonical sitemap.

## Build safeguards

`npm run build` runs localization checks, Astro diagnostics, static generation, URL-sensitive post-processing, and validation of 35 HTML documents. Validation covers required routes, titles, descriptions, canonicals, language tags, reciprocal hreflang, one H1, alt text, JSON-LD, local references, the support dialog's first-paint ordering, public control files, and sitemap coverage.
