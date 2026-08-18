# Max Wilson Pereira

Static multilingual artist website built with Astro, TypeScript, shared Astro components, and vanilla CSS. Portuguese is the default language; English, Spanish, and German use the same components and styling.

## Local development

The project is pinned to Node 24.19.0 in `.nvmrc`.

```bash
nvm use
npm install
npm run dev
```

Useful commands:

```bash
npm run check       # Astro and TypeScript diagnostics
npm run build       # check, static build, URL post-processing, and full validation
npm run preview     # preview the production output
npm run audit:assets
```

The deployable site is generated in `dist/`. Do not edit `dist/` or recreate generated language HTML in the repository root.

## Documentation

- [Architecture](ARCHITECTURE.md)
- [SEO implementation](SEO.md)
- [AI coding guide](AI-CODING-GUIDE.md)
- [Product direction](PRODUCT.md)
- [Design direction](DESIGN.md)

GitHub Pages deployment is defined in `.github/workflows/deploy.yml`. The custom domain is preserved through `public/CNAME`.
