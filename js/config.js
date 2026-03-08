/**
 * Max Wilson Pereira - Shared configuration
 * Edit here to update badge, links and other texts across all pages.
 */
const MWP_CONFIG = {
  siteUrl: "https://maxwilsonpereira.com.br",

  badge: "Tenor • Ópera & Entretenimento",

  siteName: "Max Wilson Pereira",

  tagline:
    "Canto, paixão e entretenimento para alegrar o seu dia e tocar o seu coração",

  profileImage: "max-gigga.jpg",

  ogImage: "https://maxwilsonpereira.com.br/assets/max-gigga.jpg",

  socialLinks: [
    "https://www.youtube.com/maxwilsonpereira",
    "https://www.instagram.com/maxwilsonpereira/",
  ],

  seo: {
    home: {
      title: "Max Wilson Pereira | Tenor & Artista",
      description:
        "Max Wilson Pereira — tenor brasileiro. Ópera, pop, paródias e apresentações nas ruas. Canto lírico e entretenimento para tocar o seu coração.",
      path: "/",
      ogDescription:
        "Tenor brasileiro. Ópera, pop, paródias e apresentações ao vivo. Apoie e conheça o álbum SO IN LOVE.",
      jsonLd: {
        "@type": "Person",
        name: "Max Wilson Pereira",
        url: "https://maxwilsonpereira.com.br",
        description:
          "Tenor brasileiro. Ópera, pop, paródias e apresentações ao vivo nas ruas.",
        image: "https://maxwilsonpereira.com.br/assets/max-gigga.jpg",
        jobTitle: "Tenor",
        knowsAbout: [
          "Ópera",
          "Canto lírico",
          "Música clássica",
          "Entretenimento",
        ],
      },
    },
    apoioPix: {
      title: "Apoie Minha Jornada | Max Wilson Pereira",
      description:
        "Apoie a jornada artística do tenor Max Wilson Pereira via PIX. Qualquer valor é recebido de coração e reinvestido na carreira e no canto lírico.",
      path: "/pages/apoio-pix.html",
      ogDescription:
        "Apoie o tenor Max Wilson Pereira via PIX. Seu apoio ajuda a levar o canto lírico e a cultura a mais pessoas.",
      jsonLd: {
        "@type": "WebPage",
        name: "Apoie Minha Jornada | Max Wilson Pereira",
        description:
          "Apoie a jornada artística do tenor Max Wilson Pereira via PIX.",
        url: "https://maxwilsonpereira.com.br/pages/apoio-pix.html",
        mainEntity: { "@type": "Person", name: "Max Wilson Pereira" },
      },
    },
    soInLovePix: {
      title: "Álbum SO IN LOVE | Max Wilson Pereira",
      description:
        "Compre o álbum SO IN LOVE do tenor Max Wilson Pereira via PIX. Emoção, romantismo e clássicos como Tonight, Over the Rainbow, Nessun dorma. Inclui bônus exclusivos.",
      path: "/pages/so-in-love-pix.html",
      ogDescription:
        "Álbum especial do tenor Max Wilson Pereira. Emoção, romantismo e interpretações de grandes clássicos. Compre via PIX e receba bônus exclusivos.",
      jsonLd: {
        "@type": "WebPage",
        name: "Álbum SO IN LOVE | Max Wilson Pereira",
        description:
          "Álbum SO IN LOVE do tenor Max Wilson Pereira. Compre via PIX com bônus exclusivos.",
        url: "https://maxwilsonpereira.com.br/pages/so-in-love-pix.html",
        mainEntity: { "@type": "Person", name: "Max Wilson Pereira" },
      },
    },
  },

  links: [
    {
      href: "pages/apoio-pix.html",
      text: "Apoie Minha Jornada (PIX)",
      external: false,
    },
    {
      href: "https://apoia.se/maxwilsonpereira?v=1.0.1",
      text: "Apoie Minha Jornada (APOIE.se)",
      external: true,
    },
    {
      href: "pages/so-in-love-pix.html",
      text: "Álbum SO IN LOVE + Bônus (PIX)",
      external: false,
    },
    {
      href: "https://maxwilsonpereira.hotmart.host/max-wilson-pereira-so-in-love-03d7467a-d750-40dd-8138-d69e1fcf0670?v=1.0.1",
      text: "Álbum SO IN LOVE + Bônus (HOTMART)",
      external: true,
    },
  ],
};
