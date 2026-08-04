/**
 * Max Wilson Pereira - Shared configuration
 * Edit here to update badge, links and other texts across all pages.
 */
const MWP_CONFIG = {
  siteUrl: 'https://maxwilsonpereira.com.br',

  badge: 'Tenor • Ópera & Entretenimento',

  siteName: 'Max Wilson Pereira',

  tagline:
    'Canto, paixão e entretenimento para alegrar o seu dia e tocar o seu coração',

  profileImage: 'max-gigga.jpg',

  ogImage: 'https://maxwilsonpereira.com.br/assets/optimized/og-max-wilson.jpg',

  socialLinks: [
    'https://www.youtube.com/maxwilsonpereira',
    'https://www.instagram.com/maxwilsonpereira/',
  ],

  seo: {
    home: {
      title: 'Max Wilson Pereira | Tenor Brasileiro em Viena',
      description:
        'Conheça Max Wilson Pereira, tenor brasileiro radicado em Viena, com uma trajetória entre ópera, crossover clássico, televisão, concertos e música gravada.',
      path: '/',
      ogDescription:
        'Tenor brasileiro em Viena. Ópera, crossover clássico, concertos e música gravada em uma trajetória guiada pela emoção da voz.',
      jsonLd: {
        '@type': 'Person',
        name: 'Max Wilson Pereira',
        url: 'https://maxwilsonpereira.com.br',
        description:
          'Tenor brasileiro radicado em Viena, com trajetória em ópera, crossover clássico, televisão, concertos e música gravada.',
        image: 'https://maxwilsonpereira.com.br/assets/max-gigga.jpg',
        jobTitle: 'Tenor',
        knowsAbout: [
          'Ópera',
          'Canto lírico',
          'Música clássica',
          'Entretenimento',
        ],
      },
    },
    biografia: {
      title: 'Biografia | Max Wilson Pereira',
      description:
        'Conheça a trajetória de Max Wilson Pereira, tenor brasileiro radicado em Viena, da formação lírica aos palcos, televisão e redes sociais.',
      path: '/pages/biografia.html',
      ogDescription:
        'A história de Max Wilson Pereira: tenor brasileiro, artista de crossover, criador digital e intérprete que une ópera, pop, humor e emoção.',
      jsonLd: {
        '@type': 'ProfilePage',
        name: 'Biografia | Max Wilson Pereira',
        description:
          'Biografia de Max Wilson Pereira, tenor brasileiro radicado em Viena.',
        url: 'https://maxwilsonpereira.com.br/pages/biografia.html',
        mainEntity: {
          '@type': 'Person',
          name: 'Max Wilson Pereira',
          jobTitle: 'Tenor',
          birthPlace: 'São Paulo, Brasil',
          homeLocation: 'Viena, Áustria',
        },
      },
    },
    concerto: {
      title: 'Concerto de Ópera e Crossover | Max Wilson Pereira',
      description:
        'Descubra o concerto de Max Wilson Pereira: uma experiência íntima entre ópera, teatro musical, grandes melodias e crossover clássico, com voz e piano.',
      path: '/pages/concerto.html',
      ogDescription:
        'Uma noite íntima com voz, piano, convidados especiais, grandes melodias, teatro musical, ópera e crossover clássico.',
      jsonLd: {
        '@type': 'WebPage',
        name: 'Concerto de Ópera e Crossover | Max Wilson Pereira',
        description:
          'Concerto íntimo de Max Wilson Pereira com repertório de Broadway, musicais, ópera, clássicos populares e crossover.',
        url: 'https://maxwilsonpereira.com.br/pages/concerto.html',
        mainEntity: {
          '@type': 'Person',
          name: 'Max Wilson Pereira',
          jobTitle: 'Tenor',
        },
      },
    },
    apoioPix: {
      title: 'Apoie Minha Jornada | Max Wilson Pereira',
      description:
        'Apoie a jornada artística do tenor Max Wilson Pereira via PIX. Qualquer valor é recebido de coração e reinvestido na carreira e no canto lírico.',
      path: '/pages/apoio-pix.html',
      ogDescription:
        'Apoie o tenor Max Wilson Pereira via PIX. Seu apoio ajuda a levar o canto lírico e a cultura a mais pessoas.',
      jsonLd: {
        '@type': 'WebPage',
        name: 'Apoie Minha Jornada | Max Wilson Pereira',
        description:
          'Apoie a jornada artística do tenor Max Wilson Pereira via PIX.',
        url: 'https://maxwilsonpereira.com.br/pages/apoio-pix.html',
        mainEntity: { '@type': 'Person', name: 'Max Wilson Pereira' },
      },
    },
    soInLovePix: {
      title: 'Álbum SO IN LOVE | Max Wilson Pereira',
      description:
        'Compre o álbum SO IN LOVE do tenor Max Wilson Pereira via PIX. Emoção, romantismo e clássicos como Tonight, Over the Rainbow, Nessun dorma. Inclui bônus exclusivos.',
      path: '/pages/albums/so-in-love-pix.html',
      ogDescription:
        'Álbum especial do tenor Max Wilson Pereira. Emoção, romantismo e interpretações de grandes clássicos. Compre via PIX e receba bônus exclusivos.',
      jsonLd: {
        '@type': 'WebPage',
        name: 'Álbum SO IN LOVE | Max Wilson Pereira',
        description:
          'Álbum SO IN LOVE do tenor Max Wilson Pereira. Compre via PIX com bônus exclusivos.',
        url: 'https://maxwilsonpereira.com.br/pages/albums/so-in-love-pix.html',
        mainEntity: { '@type': 'Person', name: 'Max Wilson Pereira' },
      },
    },
    albums: {
      title: 'Álbuns e Música | Max Wilson Pereira',
      description:
        'Ouça os álbuns de Max Wilson Pereira: SO IN LOVE, Tenori Amici e QUATTRO, entre repertório lírico, romantismo e crossover clássico.',
      path: '/pages/albums.html',
      ogDescription:
        'Álbuns de Max Wilson Pereira: repertórios românticos, crossover clássico e gravações especiais.',
      jsonLd: {
        '@type': 'CollectionPage',
        name: 'Álbuns e Música | Max Wilson Pereira',
        description:
          'Coleção de álbuns de Max Wilson Pereira, tenor brasileiro.',
        url: 'https://maxwilsonpereira.com.br/pages/albums.html',
        mainEntity: { '@type': 'Person', name: 'Max Wilson Pereira' },
      },
    },
    download: {
      title: 'Baixar Álbum SO IN LOVE | Max Wilson Pereira',
      description:
        'Página de download do álbum digital SO IN LOVE de Max Wilson Pereira.',
      path: '/pages/albums/so-in-love.html',
      ogDescription:
        'Baixe o álbum SO IN LOVE e obrigado por apoiar a jornada artística de Max Wilson Pereira.',
      jsonLd: {
        '@type': 'WebPage',
        name: 'Baixar Álbum SO IN LOVE | Max Wilson Pereira',
        description: 'Página de download do álbum digital SO IN LOVE.',
        url: 'https://maxwilsonpereira.com.br/pages/albums/so-in-love.html',
        mainEntity: { '@type': 'Person', name: 'Max Wilson Pereira' },
      },
    },
    quattroSonyDownload: {
      title: 'Amostras do Álbum QUATTRO | Max Wilson Pereira',
      description:
        'Ouça amostras do álbum QUATTRO e acesse o álbum completo no Spotify.',
      path: '/pages/albums/quattro-sony.html',
      ogDescription:
        'Ouça amostras de QUATTRO, projeto de 2011 da Sony Music Entertainment Brasil, e acesse o álbum completo no Spotify.',
      jsonLd: {
        '@type': 'WebPage',
        name: 'Amostras do Álbum QUATTRO | Max Wilson Pereira',
        description:
          'Ouça amostras do álbum QUATTRO e acesse o álbum completo no Spotify.',
        url: 'https://maxwilsonpereira.com.br/pages/albums/quattro-sony.html',
        mainEntity: { '@type': 'Person', name: 'Max Wilson Pereira' },
      },
    },
    tenoriAmiciSamples: {
      title: 'Amostras do Álbum Tenori Amici | Max Wilson Pereira',
      description:
        'Ouça amostras do álbum Tenori Amici - Con Amore, lançado pela Biscoito Fino, e acesse o álbum completo no Spotify.',
      path: '/pages/albums/tenori-amici.html',
      ogDescription:
        'Ouça amostras de Tenori Amici - Con Amore, álbum lançado pela Biscoito Fino, e acesse o álbum completo no Spotify.',
      jsonLd: {
        '@type': 'WebPage',
        name: 'Amostras do Álbum Tenori Amici | Max Wilson Pereira',
        description:
          'Ouça amostras do álbum Tenori Amici - Con Amore, lançado pela Biscoito Fino, e acesse o álbum completo no Spotify.',
        url: 'https://maxwilsonpereira.com.br/pages/albums/tenori-amici.html',
        mainEntity: { '@type': 'Person', name: 'Max Wilson Pereira' },
      },
    },
  },

  links: [
    {
      href: 'pages/biografia.html',
      text: 'BIOGRAFIA',
      external: false,
      visible: true,
    },
    {
      href: 'pages/concerto.html',
      text: 'CONCERTO',
      external: false,
      visible: true,
    },
    {
      href: 'pages/albums.html',
      text: 'ÁLBUMS',
      external: false,
      visible: true,
    },
    {
      href: 'pages/apoio-pix.html',
      text: 'APOIO',
      external: false,
      visible: false, // hidden from navigation by default
    },
  ],
  // Note: visibility of links is controlled per-link via the `visible` property above.
};
