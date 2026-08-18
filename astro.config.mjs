import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const site = 'https://maxwilsonpereira.com.br';

export default defineConfig({
  site,
  output: 'static',
  build: {
    format: 'file',
  },
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('/pages/albums/so-in-love'),
      i18n: {
        defaultLocale: 'pt',
        locales: {
          pt: 'pt-BR',
          en: 'en-US',
          es: 'es-ES',
          de: 'de-DE',
        },
      },
    }),
  ],
});
