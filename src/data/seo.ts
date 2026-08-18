import { defaultSocialImage, type Locale, type RouteKey } from '@/config/site';
import { t } from '@/i18n';
import type { SeoData } from '@/types';

const seoSource: Record<RouteKey, SeoData> = {
  home: {
    title: 'Max Wilson Pereira | Tenor Brasileiro em Viena',
    description: 'Conheça Max Wilson Pereira, tenor brasileiro radicado em Viena, com uma trajetória entre ópera, crossover clássico, televisão, concertos e música gravada.',
    ogDescription: 'Tenor brasileiro em Viena. Ópera, crossover clássico, concertos e música gravada em uma trajetória guiada pela emoção da voz.',
  },
  biography: {
    title: 'Biografia | Max Wilson Pereira',
    description: 'Conheça a trajetória de Max Wilson Pereira, tenor brasileiro radicado em Viena, da formação lírica aos palcos, televisão e redes sociais.',
    ogDescription: 'A história de Max Wilson Pereira: tenor brasileiro, artista de crossover, criador digital e intérprete que une ópera, pop, humor e emoção.',
  },
  concert: {
    title: 'Concerto de Ópera e Crossover | Max Wilson Pereira',
    description: 'Descubra o concerto de Max Wilson Pereira: uma experiência íntima entre ópera, teatro musical, grandes melodias e crossover clássico, com voz e piano.',
    ogDescription: 'Uma noite íntima com voz, piano, convidados especiais, grandes melodias, teatro musical, ópera e crossover clássico.',
  },
  albums: {
    title: 'Álbuns e Música | Max Wilson Pereira',
    description: 'Ouça os álbuns de Max Wilson Pereira: SO IN LOVE, Tenori Amici e QUATTRO, entre repertório lírico, romantismo e crossover clássico.',
    ogDescription: 'Álbuns de Max Wilson Pereira: repertórios românticos, crossover clássico e gravações especiais.',
  },
  videos: {
    title: 'Vídeos | Max Wilson Pereira',
    description: 'Assista a performances, duetos e momentos especiais de Max Wilson Pereira, tenor brasileiro radicado em Viena.',
    ogDescription: 'Performances, duetos e histórias que atravessam palcos, cidades e encontros.',
    image: '/assets/optimized/fedra-e-hipolito-hipolito-kneeling-1600.webp',
    imageWidth: 1373,
    imageHeight: 867,
    imageMime: 'image/webp',
  },
  tenoriAmici: {
    title: 'Amostras do Álbum Tenori Amici | Max Wilson Pereira',
    description: 'Ouça amostras do álbum Tenori Amici - Con Amore, lançado pela Biscoito Fino, e acesse o álbum completo no Spotify.',
    ogDescription: 'Ouça amostras de Tenori Amici - Con Amore, álbum lançado pela Biscoito Fino, e acesse o álbum completo no Spotify.',
  },
  quattro: {
    title: 'Amostras do Álbum QUATTRO | Max Wilson Pereira',
    description: 'Ouça amostras do álbum QUATTRO e acesse o álbum completo no Spotify.',
    ogDescription: 'Ouça amostras de QUATTRO, projeto de 2011 da Sony Music Entertainment Brasil, e acesse o álbum completo no Spotify.',
  },
  support: {
    title: 'Apoie Minha Jornada | Max Wilson Pereira',
    description: 'Apoie a jornada artística do tenor Max Wilson Pereira via PIX. Qualquer valor é recebido de coração e reinvestido na carreira e no canto lírico.',
    ogDescription: 'Apoie o tenor Max Wilson Pereira via PIX. Seu apoio ajuda a levar o canto lírico e a cultura a mais pessoas.',
  },
  soInLovePurchase: {
    title: 'Álbum SO IN LOVE | Max Wilson Pereira',
    description: 'Compre o álbum SO IN LOVE do tenor Max Wilson Pereira via PIX. Emoção, romantismo e clássicos como Tonight, Over the Rainbow, Nessun dorma. Inclui bônus exclusivos.',
    ogDescription: 'Álbum especial do tenor Max Wilson Pereira. Emoção, romantismo e interpretações de grandes clássicos. Compre via PIX e receba bônus exclusivos.',
  },
  soInLoveDownload: {
    title: 'Baixar Álbum SO IN LOVE | Max Wilson Pereira',
    description: 'Página de download do álbum digital SO IN LOVE de Max Wilson Pereira.',
    ogDescription: 'Baixe o álbum SO IN LOVE e obrigado por apoiar a jornada artística de Max Wilson Pereira.',
    noindex: true,
  },
};

export function getSeo(route: RouteKey, locale: Locale): SeoData {
  const source = seoSource[route];
  return {
    ...source,
    title: t(locale, source.title),
    description: t(locale, source.description),
    ogDescription: t(locale, source.ogDescription ?? source.description),
    image: source.image ?? defaultSocialImage,
    imageAlt: t(locale, 'Max Wilson Pereira em apresentação ao vivo com Hebe Camargo'),
    imageWidth: source.imageWidth ?? 1200,
    imageHeight: source.imageHeight ?? 630,
    imageMime: source.imageMime ?? 'image/jpeg',
  };
}
