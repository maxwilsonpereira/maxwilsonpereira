/**
 * Max Wilson Pereira - Web Components
 * Reusable custom elements (vanilla JS, no React)
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Web_components
 */

function getBasePath() {
  const path = window.location.pathname;
  if (path === '/' || path === '/index.html') return '';
  if (/^\/(?:en|de|es)\/?$/u.test(path)) return '../';
  const pathParts = path.split('/').filter(Boolean);
  const directories = pathParts.slice(0, -1);
  return '../'.repeat(directories.length);
}

const MWP_LANGUAGES = {
  pt: { code: 'pt', htmlLang: 'pt-BR', flag: '🇧🇷', name: 'Português' },
  en: { code: 'en', htmlLang: 'en-US', flag: '🇺🇸', name: 'English (USA)' },
  de: { code: 'de', htmlLang: 'de-DE', flag: '🇩🇪', name: 'Deutsch' },
  es: { code: 'es', htmlLang: 'es-ES', flag: '🇪🇸', name: 'Español' },
};

const MWP_TEXT_TRANSLATIONS = {
  en: {
    'A voz continua': 'The voice continues',
    'Uma pausa antes da próxima canção': 'A pause before the next song',
    'Canções que permanecem': 'Songs that remain',
    'Escolher idioma': 'Choose language',
    'Mudar idioma para': 'Change language to',
    'Seguir Max Wilson Pereira no': 'Follow Max Wilson Pereira on',
    'Max Wilson Pereira em apresentação no DVD de Hebe Camargo':
      'Max Wilson Pereira performing on Hebe Camargo’s DVD',
    'Max Wilson Pereira em apresentação de opereta':
      'Max Wilson Pereira performing operetta',
    'Max Wilson Pereira em traje formal':
      'Max Wilson Pereira in formal attire',
    'Destaques da carreira': 'Career highlights',
    'Max Wilson Pereira no Taneyevsky Festival 2017':
      'Max Wilson Pereira at the Taneyevsky Festival 2017',
    'Max Wilson Pereira em apresentação para redes sociais':
      'Max Wilson Pereira performing for social media',
    'Max Wilson Pereira levando o canto lírico para novos públicos':
      'Max Wilson Pereira bringing classical singing to new audiences',
    'Fechar aviso': 'Close notice',
    'Tenor • Ópera & Entretenimento': 'Tenor • Opera & Entertainment',
    'Tenor • Artista': 'Tenor • Artist',
    'Tenor brasileiro': 'Brazilian Tenor',
    'Álbum digital': 'Digital album',
    'Álbum digital liberado': 'Digital album',
    'Álbuns': 'Albums',
    'Três momentos da minha trajetória em música gravada, reunidos para você conhecer cada projeto pelo clima, pela capa e pela história sonora.':
      'Three moments from my recorded music journey, gathered so you can discover each project through its mood, cover, and musical story.',
    'Coleção de álbuns': 'Album collection',
    'Ir para o álbum': 'Go to Album',
    'Botão do álbum SO IN LOVE': 'SO IN LOVE album button',
    'Botão do álbum Tenori Amici': 'Tenori Amici album button',
    'Botão do álbum QUATTRO': 'QUATTRO album button',
    'Capas do álbum Tenori Amici': 'Album covers for Tenori Amici',
    'Capa do álbum Tenori Amici': 'Front cover of Tenori Amici',
    'Contracapa do álbum Tenori Amici': 'Back cover of Tenori Amici',
    'Capas do álbum SO IN LOVE': 'SO IN LOVE album covers',
    'Capa do álbum SO IN LOVE': 'SO IN LOVE front cover',
    'Contracapa do álbum SO IN LOVE': 'SO IN LOVE back cover',
    'Capas do álbum QUATTRO': 'QUATTRO album covers',
    'Capa do álbum QUATTRO': 'QUATTRO front cover',
    'Contracapa do álbum QUATTRO': 'QUATTRO back cover',
    'Clássicos românticos, cinema, teatro musical e faixas bônus em uma seleção íntima e emocionante.':
      'Romantic classics, cinema, musical theater, and bonus tracks in an intimate and moving selection.',
    'Um encontro de vozes, amizade e repertório lírico em uma gravação especial.':
      'A meeting of voices, friendship, and lyrical repertoire in a special recording.',
    'Projeto crossover gravado com o grupo Quattro, unindo grandes canções internacionais e intensidade vocal.':
      'A crossover project recorded with the group Quattro, bringing together great international songs and vocal intensity.',
    'Canto, paixão e entretenimento para alegrar o seu dia e tocar o seu coração':
      'Singing, passion, and entertainment to brighten your day and touch your heart',
    HOME: 'HOME',
    BIOGRAFIA: 'BIOGRAPHY',
    CONCERTO: 'CONCERT',
    ÁLBUM: 'ALBUM',
    ÁLBUMS: 'ALBUMS',
    APOIO: 'SUPPORT',
    'Abrir menu': 'Open menu',
    'Fechar menu': 'Close menu',
    'Navegação principal': 'Main navigation',
    'Redes sociais': 'Social media',
    'Redes sociais de Max Wilson Pereira': 'Max Wilson Pereira social media',
    'Links principais': 'Main links',
    'Siga nas redes sociais': 'Follow on social media',
    'Bem-vindo': 'Welcome',
    'Que alegria ter você aqui': 'I am so happy you are here',
    'Este espaço reúne um pouco da minha voz, da minha história e da minha paixão pela música: da tradição lírica às canções que atravessam gerações, sempre com o desejo de tocar o coração de quem escuta.':
      'This space brings together a little of my voice, my story, and my passion for music: from the lyrical tradition to songs that cross generations, always with the desire to touch the heart of those who listen.',
    'Assista ao vídeo e seja muito bem-vindo ao meu mundo musical.':
      'Watch the video and feel warmly welcomed into my musical world.',
    'Mensagem em vídeo de Max Wilson Pereira':
      'Video message from Max Wilson Pereira',
    Voltar: 'Back',
    'Vídeo de Max Wilson Pereira': 'Video by Max Wilson Pereira',
    Biografia: 'Biography',
    'Uma trajetória entre ópera, televisão, crossover e redes sociais, levando a força do canto lírico para cada vez mais pessoas.':
      'A journey through opera, television, crossover, and social media, bringing the power of classical singing to more and more people.',
    'é um tenor brasileiro radicado em Viena, artista de presença cênica marcante e voz construída entre a tradição lírica e a comunicação direta com o público. Além da técnica operística, dedicou anos ao estudo do canto musical, desenvolvendo também o domínio de uma emissão mais suave, íntima e expressiva. Nascido em São Paulo e criado no Rio de Janeiro, descobriu a paixão pelo canto aos 18 anos, ao ouvir Luciano Pavarotti, e desde então transformou essa inspiração em uma carreira que atravessa palcos, televisão, gravações e plataformas digitais.':
      'is a Brazilian tenor based in Vienna, an artist with a striking stage presence and a voice shaped by both lyrical tradition and direct communication with the audience. Beyond operatic technique, he dedicated years to musical theater singing, also developing command of a softer, more intimate, expressive sound. Born in São Paulo and raised in Rio de Janeiro, he discovered his passion for singing at age 18 after hearing Luciano Pavarotti, and since then has turned that inspiration into a career spanning stages, television, recordings, and digital platforms.',
    'anos de trajetória artística entre Brasil, Estados Unidos e Europa':
      'years of artistic work across Brazil, the United States, and Europe',
    'seguidores no Instagram acompanhando sua arte e seu humor':
      'Instagram followers enjoying his art and humor',
    'base artística e musical de uma carreira internacional':
      'artistic and musical base for an international career',
    'Formação e Primeiros Passos': 'Training and Early Steps',
    'Ainda jovem, Max iniciou seus estudos com o tenor Eduardo Alvares enquanto cursava a CAL, Casa das Artes de Laranjeiras, onde concluiu o Curso Profissionalizante de Ator. A formação teatral se tornou uma parte essencial de sua identidade artística: não apenas cantar, mas contar uma história, ocupar o palco e criar uma conexão viva com quem assiste.':
      'While still young, Max began studying with tenor Eduardo Alvares while attending CAL, Casa das Artes de Laranjeiras, where he completed the Professional Acting Program. Theater training became an essential part of his artistic identity: not only singing, but telling a story, inhabiting the stage, and creating a living connection with the audience.',
    'Após anos de estudo em canto lírico, teoria musical e piano, seguiu para Nova York em 2005, onde estudou com Evelyn La Quaif. No ano seguinte, foi convidado pelo professor Sebastian Vittucci para estudar em Viena, na Áustria, frequentando a Konservatorium Wien Privatuniversität em canto lírico e opereta. Também estudou na Vienna Konservatorium com o tenor Agim Hushi, instituição onde obteve seu bacharelado como solista de ópera.':
      'After years of study in classical singing, music theory, and piano, he moved to New York in 2005, where he studied with Evelyn La Quaif. The following year, Professor Sebastian Vittucci invited him to study in Vienna, Austria, where he attended Konservatorium Wien Privatuniversität for classical singing and operetta. He also studied at Vienna Konservatorium with tenor Agim Hushi, where he earned his bachelor’s degree as an opera soloist.',
    'Palcos, Ópera e Televisão': 'Stages, Opera, and Television',
    'Na Áustria, Max participou de concertos, óperas e operetas, destacando-se em papéis como Nemorino, em':
      'In Austria, Max performed in concerts, operas, and operettas, standing out in roles such as Nemorino in',
    ', de Donizetti, e Herzog von Urbino, em':
      'by Donizetti, and Herzog von Urbino in',
    ', de Johann Strauss. Em 2007, cantou no Gran Concerto Lírico di Ferragosto, interpretando árias italianas diante de um público exigente.':
      'by Johann Strauss. In 2007, he sang at the Gran Concerto Lírico di Ferragosto, performing Italian arias for a discerning audience.',
    'Entre os momentos importantes de sua trajetória internacional, foi convidado a cantar na Rússia em duas ocasiões. Uma dessas apresentações aconteceu no':
      'Among the important moments in his international journey, he was invited to sing in Russia on two occasions. One of those performances took place at the',
    ', com a Vladimir Governor Symphony Orchestra sob regência do maestro Artiom Markin.':
      'with the Vladimir Governor Symphony Orchestra conducted by Maestro Artiom Markin.',
    'Depois de três anos em Viena, retornou ao Brasil a convite da Sony Music para integrar o grupo Quattro e gravar um CD. Em 2009, apresentou-se no oratório':
      'After three years in Vienna, he returned to Brazil at Sony Music’s invitation to join the group Quattro and record a CD. In 2009, he performed in the oratorio',
    ', de Carlos Gomes, no Theatro Municipal do Rio de Janeiro. Em 2010, participou da gravação do DVD de Hebe Camargo, interpretando':
      'by Carlos Gomes at Theatro Municipal do Rio de Janeiro. In 2010, he took part in Hebe Camargo’s DVD recording, performing',
    'no Credicard Hall, em São Paulo, e também apareceu na novela':
      'at Credicard Hall in São Paulo, and also appeared in the soap opera',
    ', em uma cena de': 'in a scene from',
    'ao lado de Alessandra Maestrini.': 'alongside Alessandra Maestrini.',
    'Sua trajetória inclui ainda trabalhos com nomes como Bibi Ferreira, participação na minissérie':
      'His career also includes work with names such as Bibi Ferreira, participation in the miniseries',
    ', estreia mundial da ópera': ', the world premiere of the opera',
    ', no Palácio das Artes, e atuação como preparador vocal no':
      'at Palácio das Artes, and work as a vocal coach on',
    ', auxiliando Jonatas Faro no quadro Artista Completão.':
      ', assisting Jonatas Faro in the Artista Completão segment.',
    'Crossover, Humor e Público Digital':
      'Crossover, Humor, and Digital Audience',
    'Nos últimos anos, Max passou a levar sua voz para um público ainda maior nas redes sociais. Misturando técnica lírica, música pop, paródias criativas e performances de rua, criou uma linguagem própria: sofisticada sem ser distante, divertida sem perder a emoção, popular sem abandonar a excelência vocal.':
      'In recent years, Max has brought his voice to an even wider audience on social media. Blending classical technique, pop music, creative parodies, and street performances, he created a language of his own: sophisticated without being distant, fun without losing emotion, popular without abandoning vocal excellence.',
    'Seus vídeos já ultrapassaram a marca de 1 milhão de visualizações, e sua comunidade digital reúne mais de 200 mil seguidores no Instagram e milhares de inscritos no YouTube. Com carisma, humor e uma voz de formação clássica, Max aproxima a ópera de quem talvez nunca tivesse imaginado se emocionar com ela.':
      'His videos have already surpassed 1 million views, and his digital community brings together more than 200,000 Instagram followers and thousands of YouTube subscribers. With charisma, humor, and a classically trained voice, Max brings opera closer to people who may never have imagined being moved by it.',
    'O Momento Atual': 'The Current Moment',
    'Hoje, Max Wilson Pereira dedica grande parte de sua energia à construção de uma presença digital cada vez mais forte, criando vídeos que aproximam a ópera, o canto lírico e o crossover de públicos que talvez nunca tivessem imaginado se emocionar com esse repertório. Radicado em Viena e profundamente conectado ao Brasil, ele transforma ruas, praias, estações, casas e situações cotidianas em pequenos palcos, onde a técnica vocal encontra a surpresa, a emoção e o humor.':
      'Today, Max Wilson Pereira dedicates much of his energy to building an ever stronger digital presence, creating videos that bring opera, classical singing, and crossover to audiences who may never have imagined being moved by this repertoire. Based in Vienna and deeply connected to Brazil, he turns streets, beaches, stations, homes, and everyday situations into small stages where vocal technique meets surprise, emotion, and humor.',
    'Seu trabalho nas redes nasce do desejo de mostrar que a voz lírica não precisa viver distante das pessoas. Em performances emocionantes, paródias musicais, interações com desconhecidos e vídeos bem-humorados, Max leva a ópera para novos contextos, despertando curiosidade, risadas e reações espontâneas. É nesse encontro entre excelência artística e comunicação direta que ele segue criando novos caminhos para compartilhar sua arte com quem já o acompanha e com quem ainda vai descobri-lo.':
      'His work online comes from the desire to show that the lyrical voice does not need to live far from people. Through moving performances, musical parodies, interactions with strangers, and humorous videos, Max takes opera into new contexts, sparking curiosity, laughter, and spontaneous reactions. In this meeting between artistic excellence and direct communication, he continues creating new ways to share his art with those who already follow him and those who are still discovering him.',
    'Apoie Minha Jornada': 'Support My Journey',
    'Se você está aqui, tudo indica que você':
      'If you are here, it probably means that you',
    'admira o meu trabalho': 'admire my work',
    e: 'and',
    'tem carinho por mim e pela minha carreira': 'care about me and my career',
    '. Isso, por si só, já me enche de alegria. ❤️❤️❤️':
      '. That alone already fills me with joy. ❤️❤️❤️',
    'PIX para Apoio': 'PIX for Support',
    'Qualquer valor': 'Any amount',
    'será recebido de coração — como um ingresso para meu espetáculo, ópera ou musical. Você acompanha meu trabalho de graça nas redes; este é um gesto de apoio real.':
      'will be received from the heart, like a ticket to my show, opera, or musical. You follow my work for free on social media; this is a gesture of real support.',
    'Fico muito feliz em saber que está considerando me apoiar. Seu gesto significa muito para o caminho que estou construindo como artista.':
      'I am very happy to know that you are considering supporting me. Your gesture means a lot for the path I am building as an artist.',
    'Muito obrigado, de coração.': 'Thank you very much, from the heart.',
    'Nos últimos anos, investi tempo, energia e recursos na produção e divulgação do meu trabalho. Para seguir em frente — levando o canto lírico a quem talvez nunca o tenha ouvido —':
      'In recent years, I have invested time, energy, and resources into producing and sharing my work. To keep moving forward, bringing classical singing to people who may never have heard it before,',
    'sua ajuda é fundamental': 'your help is essential',
    '.': '.',
    'Este espaço representa um': 'This space represents a',
    'gesto de carinho e apoio real': 'gesture of affection and real support',
    'à minha jornada como artista. Se você acredita no meu trabalho, este é o lugar certo. Ficarei eternamente grato.':
      'for my journey as an artist. If you believe in my work, this is the right place. I will be forever grateful.',
    'O apoio recebido será, em grande parte,':
      'The support received will largely be',
    'reinvestido na minha carreira': 'reinvested in my career',
    ', para levar minha arte e o canto lírico cada vez mais longe.':
      ', so I can take my art and classical singing farther and farther.',
    'Receber seu apoio neste momento será um grande motivo de alegria e orgulho para mim.':
      'Receiving your support at this moment will be a great source of joy and pride for me.',
    'Álbum SO IN LOVE + Bônus': 'SO IN LOVE Album + Bonus',
    '- álbum digital': '- digital album',
    'Muito obrigado pelo seu interesse no meu trabalho! ❤️❤️❤️':
      'Thank you very much for your interest in my work! ❤️❤️❤️',
    'Álbum digital em formato MP3': 'Digital album in MP3 format',
    'do tenor brasileiro Max Wilson Pereira, trazendo emoção, romantismo e interpretações marcantes de grandes clássicos.':
      'by Brazilian tenor Max Wilson Pereira, bringing emotion, romance, and memorable interpretations of great classics.',
    'Atenção: este é um produto digital. Você não receberá um CD físico, apenas arquivos para download.':
      'Please note: this is a digital product. You will not receive a physical CD, only files to download.',
    'Como comprar via PIX': 'How to buy with PIX',
    'Faça um PIX de': 'Send a PIX payment of',
    'para:': 'to:',
    'Depois de fazer o PIX, digite abaixo o nome que aparece no pagamento (nome do titular da conta que fez o PIX) e clique no botão para continuar.':
      'After making the PIX payment, type below the name that appears on the payment (the account holder’s name) and click the button to continue.',
    'Digite aqui o nome usado no PIX':
      'Type the name used for the PIX payment here',
    CONTINUAR: 'CONTINUE',
    Repertório: 'Repertoire',
    'Músicas eternas, entre elas:': 'Timeless songs, including:',
    'Bônus Exclusivo': 'Exclusive Bonus',
    'Além do álbum, você recebe clássicos cantados com toda a alma:':
      'In addition to the album, you receive classics sung with all my soul:',
    'Volta ao Meu Mundo (música inédita)':
      'Volta ao Meu Mundo (unreleased song)',
    'Primadonna (música inédita)': 'Primadonna (unreleased song)',
    'Obrigado pelo seu apoio': 'Thank you for your support',
    'Se você efetuou o': 'If you made the',
    ', muito obrigado! Seu interesse e seu apoio ao meu trabalho':
      ', thank you very much! Your interest and support for my work',
    'significam muito para mim': 'mean a lot to me',
    'Quero te dizer algo com toda sinceridade: eu optei por':
      'I want to tell you something with complete sincerity: I chose',
    'não bloquear o download': 'not to block the download',
    ', mesmo antes de conferir o pagamento. Eu escolho':
      ', even before checking the payment. I choose to',
    'confiar em você': 'trust you',
    ', que me acompanha e apoia minha jornada com carinho e respeito, e ficarei muito feliz quando perceber que você fez o PIX, ao ver o seu nome nos recebimentos na minha conta.':
      ', because you follow me and support my journey with affection and respect, and I will be very happy when I see that you made the PIX payment by seeing your name in my account receipts.',
    'Se ainda não fez o pagamento, peço com todo respeito que':
      'If you have not made the payment yet, I respectfully ask that you',
    'só faça o download depois de ter efetuado o pagamento':
      'only download after you have made the payment',
    'Vou ficar muito feliz se escolher uma das músicas e':
      'I will be very happy if you choose one of the songs and',
    'compartilhar um story no Instagram me marcando':
      'share an Instagram story tagging me',
    'Você pode escrever algo simples como:':
      'You can write something simple like:',
    '"Comprei o álbum SO IN LOVE do @maxwilsonpereira e estou adorando! 🎶"':
      '"I bought the SO IN LOVE album by @maxwilsonpereira and I am loving it! 🎶"',
    '"Estou ouvindo SO IN LOVE do tenor @maxwilsonpereira e estou adorando! 🎶"':
      '"I am listening to SO IN LOVE by tenor @maxwilsonpereira and I am loving it! 🎶"',
    'Isso ajuda': 'This helps',
    'muito mais pessoas': 'many more people',
    'a descobrirem minha música.': 'discover my music.',
    'Projeto de 2011 da Sony Music Entertainment Brasil com o Grupo Quattro, revisitando grandes canções internacionais em formato crossover vocal.':
      'A 2011 Sony Music Entertainment Brasil project with Grupo Quattro, revisiting major international songs in a vocal crossover format.',
    'Álbum lançado pela gravadora Biscoito Fino, reunindo repertório clássico e popular em formato crossover vocal.':
      'An album released by the Biscoito Fino record label, bringing classical and popular repertoire together in a vocal crossover format.',
    'Lançado pela gravadora Biscoito Fino em 2017, Con Amore reúne o Tenori Amici em repertório clássico e popular com espírito crossover.':
      'Released by the Biscoito Fino record label in 2017, Con Amore brings Tenori Amici together in classical and popular repertoire with a crossover spirit.',
    'O álbum completo está disponível no Spotify.':
      'The full album is available on Spotify.',
    'Ouvir no Spotify': 'Listen on Spotify',
    'Ouvir o álbum QUATTRO completo no Spotify':
      'Listen to the full QUATTRO album on Spotify',
    'Ouvir Tenori Amici no Spotify': 'Listen to Tenori Amici on Spotify',
    'Baixar todas as músicas': 'Download all songs',
    '13 faixas': '13 tracks',
    '11 faixas': '11 tracks',
    '11 amostras': '11 samples',
    'Suas músicas': 'Your songs',
    Amostras: 'Samples',
    'Prévia MP3': 'MP3 preview',
    'Seu navegador não suporta reprodução de áudio.':
      'Your browser does not support audio playback.',
    Baixar: 'Download',
    Play: 'Play',
    'Ouvir amostra': 'Play sample',
    Pausar: 'Pause',
    'Preparando downloads...': 'Preparing downloads...',
    'Faixas Bônus': 'Bonus Tracks',
    'Max Wilson Pereira | Tenor Brasileiro em Viena':
      'Max Wilson Pereira | Brazilian Tenor in Vienna',
    'Biografia | Max Wilson Pereira': 'Biography | Max Wilson Pereira',
    'Concerto de Ópera e Crossover | Max Wilson Pereira':
      'Opera &amp; Classical Crossover Concert | Max Wilson Pereira',
    'Apoie Minha Jornada | Max Wilson Pereira':
      'Support My Journey | Max Wilson Pereira',
    'Álbum SO IN LOVE | Max Wilson Pereira':
      'SO IN LOVE Album | Max Wilson Pereira',
    'Álbuns e Música | Max Wilson Pereira':
      'Albums &amp; Music | Max Wilson Pereira',
    'Baixar Álbum SO IN LOVE | Max Wilson Pereira':
      'Download SO IN LOVE Album | Max Wilson Pereira',
    'Baixar Álbum QUATTRO | Max Wilson Pereira':
      'Download QUATTRO Album | Max Wilson Pereira',
    'Baixar Album QUATTRO | Max Wilson Pereira':
      'Download QUATTRO Album | Max Wilson Pereira',
    'Amostras do Álbum QUATTRO | Max Wilson Pereira':
      'QUATTRO Album Samples | Max Wilson Pereira',
    'Amostras do Álbum Tenori Amici | Max Wilson Pereira':
      'Tenori Amici Album Samples | Max Wilson Pereira',
    'Conheça Max Wilson Pereira, tenor brasileiro radicado em Viena, com uma trajetória entre ópera, crossover clássico, televisão, concertos e música gravada.':
      'Meet Max Wilson Pereira, a Brazilian tenor based in Vienna whose career spans opera, classical crossover, television, concerts, and recorded music.',
    'Tenor brasileiro em Viena. Ópera, crossover clássico, concertos e música gravada em uma trajetória guiada pela emoção da voz.':
      'Brazilian tenor in Vienna. Opera, classical crossover, concerts, and recorded music in a career guided by the emotion of the voice.',
    'Ouça os álbuns de Max Wilson Pereira: SO IN LOVE, Tenori Amici e QUATTRO, entre repertório lírico, romantismo e crossover clássico.':
      'Listen to Max Wilson Pereira’s albums: SO IN LOVE, Tenori Amici, and QUATTRO, spanning lyrical repertoire, romance, and classical crossover.',
    'Álbuns de Max Wilson Pereira: repertórios românticos, crossover clássico e gravações especiais.':
      'Albums by Max Wilson Pereira: romantic repertoire, classical crossover, and special recordings.',
    'Coleção de álbuns de Max Wilson Pereira, tenor brasileiro.':
      'Album collection by Max Wilson Pereira, Brazilian tenor.',
    'Conheça a trajetória de Max Wilson Pereira, tenor brasileiro radicado em Viena, da formação lírica aos palcos, televisão e redes sociais.':
      'Discover the journey of Max Wilson Pereira, a Brazilian tenor based in Vienna, from classical training to stages, television, and social media.',
    'A história de Max Wilson Pereira: tenor brasileiro, artista de crossover, criador digital e intérprete que une ópera, pop, humor e emoção.':
      'The story of Max Wilson Pereira: Brazilian tenor, crossover artist, digital creator, and performer blending opera, pop, humor, and emotion.',
    'Descubra o concerto de Max Wilson Pereira: uma experiência íntima entre ópera, teatro musical, grandes melodias e crossover clássico, com voz e piano.':
      'Discover Max Wilson Pereira’s concert: an intimate experience of opera, musical theatre, great melodies, and classical crossover, with voice and piano.',
    'Uma noite íntima com voz, piano, convidados especiais, grandes melodias, teatro musical, ópera e crossover clássico.':
      'An intimate evening with voice, piano, special guests, great melodies, musical theater, opera, and classical crossover.',
    'Max Wilson Pereira em imagem de divulgação do concerto':
      'Max Wilson Pereira in a concert publicity image',
    'Concerto ao vivo': 'Live concert',
    Concerto: 'Concert',
    'Uma noite emocionante com grandes melodias, entre o teatro musical, a ópera e o crossover clássico.':
      'A moving evening with great melodies, between musical theater, opera, and classical crossover.',
    'Quero assistir': 'I want to attend',
    'Sobre o concerto': 'About the concert',
    'Uma experiência próxima, elegante e emocionante':
      'A close, elegant, and moving experience',
    'Este concerto nasce do desejo de cantar repertórios que atravessam gerações e continuam encontrando novos sentidos quando são vividos ao vivo. Ao lado de um pianista, com a presença de uma soprano convidada e, muito provavelmente, também de um violinista, a noite propõe um encontro íntimo entre voz, palavra e melodia.':
      'This concert is born from the desire to sing repertoire that crosses generations and continues finding new meaning when experienced live. Alongside a pianist, with a guest soprano and, very likely, a violinist as well, the evening offers an intimate encounter between voice, word, and melody.',
    'O público ouvirá canções eternas da Broadway, dos musicais, da ópera e de clássicos populares interpretadas com acompanhamento ao piano, convidados especiais e uma atmosfera de teatro próximo. Mais do que uma sequência de músicas, o concerto procura contar pequenas histórias: amores possíveis, despedidas, sonhos, lembranças e momentos em que uma melodia parece dizer aquilo que as palavras sozinhas não alcançam.':
      'The audience will hear timeless songs from Broadway, musicals, opera, and popular classics, performed with piano accompaniment, special guests, and the atmosphere of intimate theater. More than a sequence of songs, the concert seeks to tell small stories: possible loves, farewells, dreams, memories, and moments when a melody seems to say what words alone cannot reach.',
    'Max Wilson Pereira em apresentação ao vivo':
      'Max Wilson Pereira in a live performance',
    'Uma nova jornada': 'A new journey',
    'O início de uma nova fase artística':
      'The beginning of a new artistic phase',
    'Este projeto marca o começo de uma nova fase na minha carreira. Depois de tantos caminhos entre ópera, televisão, gravações, redes sociais e repertório crossover, sinto que este concerto reúne de forma muito verdadeira aquilo que mais me move: cantar com emoção, contar histórias e estar perto do público.':
      'This project marks the beginning of a new phase in my career. After so many paths through opera, television, recordings, social media, and crossover repertoire, I feel this concert brings together, in a very truthful way, what moves me most: singing with emotion, telling stories, and being close to the audience.',
    'As primeiras apresentações acontecerão na':
      'The first performances will take place in',
    Áustria: 'Austria',
    ', país que há muitos anos faz parte da minha vida musical. No fim do ano, em':
      ', a country that has been part of my musical life for many years. At the end of the year, in',
    dezembro: 'December',
    ', o concerto também será apresentado no':
      ', the concert will also be presented in',
    Brasil: 'Brazil',
    ', em um retorno muito especial a esse repertório diante do meu público brasileiro.':
      ', in a very special return to this repertoire before my Brazilian audience.',
    'Minha esperança é que, a partir de': 'My hope is that, starting in',
    ', este projeto cresça e se transforme em uma turnê pelo Brasil, levando essas canções a plateias de diferentes cidades. Ainda é um caminho sendo construído, mas ele nasce com sinceridade, cuidado e muita vontade de compartilhar beleza.':
      ', this project will grow and become a tour through Brazil, bringing these songs to audiences in different cities. It is still a path being built, but it begins with sincerity, care, and a deep desire to share beauty.',
    Ensaio: 'Rehearsal',
    'Preparando o concerto ao piano': 'Preparing the concert at the piano',
    'Este vídeo mostra um momento simples de ensaio ao piano, preparando uma das canções que farão parte do concerto.':
      'This video shows a simple rehearsal moment at the piano, preparing one of the songs that will be part of the concert.',
    'Max Wilson Pereira ensaiando ao piano para o concerto':
      'Max Wilson Pereira rehearsing at the piano for the concert',
    Repertório: 'Repertoire',
    'Melodias que permanecem': 'Melodies that endure',
    'O repertório pode variar a cada apresentação, preservando a liberdade do momento e o encontro com cada plateia. Entre as obras previstas estão:':
      'The repertoire may vary with each performance, preserving the freedom of the moment and the encounter with each audience. Among the planned works are:',
    'clássico popular': 'popular classic',
    Duetos: 'Duets',
    'Muitas outras canções bonitas também poderão fazer parte de cada apresentação.':
      'Many other beautiful songs may also be part of each performance.',
    Convite: 'Invitation',
    'Viva este concerto ao vivo': 'Experience this concert live',
    'Algumas músicas revelam sua força de modo especial quando acontecem no mesmo instante em que respiramos juntos: artista, convidados e plateia. Este concerto é um convite para esse encontro.':
      'Some songs reveal their power in a special way when they happen in the same instant that we breathe together: artist, guests, and audience. This concert is an invitation to that encounter.',
    'Informações em breve': 'Information coming soon',
    'Apoie a jornada artística do tenor Max Wilson Pereira via PIX. Qualquer valor é recebido de coração e reinvestido na carreira e no canto lírico.':
      'Support the artistic journey of tenor Max Wilson Pereira via PIX. Any amount is received from the heart and reinvested in his career and classical singing.',
    'Apoie o tenor Max Wilson Pereira via PIX. Seu apoio ajuda a levar o canto lírico e a cultura a mais pessoas.':
      'Support tenor Max Wilson Pereira via PIX. Your support helps bring classical singing and culture to more people.',
    'Compre o álbum SO IN LOVE do tenor Max Wilson Pereira via PIX. Emoção, romantismo e clássicos como Tonight, Over the Rainbow, Nessun dorma. Inclui bônus exclusivos.':
      'Buy the SO IN LOVE album by tenor Max Wilson Pereira via PIX. Emotion, romance, and classics such as Tonight, Over the Rainbow, and Nessun dorma. Includes exclusive bonuses.',
    'Álbum especial do tenor Max Wilson Pereira. Emoção, romantismo e interpretações de grandes clássicos. Compre via PIX e receba bônus exclusivos.':
      'A special album by tenor Max Wilson Pereira. Emotion, romance, and interpretations of great classics. Buy via PIX and receive exclusive bonuses.',
    'Página de download do álbum digital SO IN LOVE de Max Wilson Pereira.':
      'Download page for Max Wilson Pereira’s SO IN LOVE digital album.',
    'Baixe o álbum SO IN LOVE e obrigado por apoiar a jornada artística de Max Wilson Pereira.':
      'Download the SO IN LOVE album, and thank you for supporting Max Wilson Pereira’s artistic journey.',
    'Ouça amostras do álbum QUATTRO e acesse o álbum completo no Spotify.':
      'Listen to QUATTRO album samples and access the full album on Spotify.',
    'Ouça amostras de QUATTRO, projeto de 2011 da Sony Music Entertainment Brasil, e acesse o álbum completo no Spotify.':
      'Listen to QUATTRO samples, a 2011 Sony Music Entertainment Brasil project, and access the full album on Spotify.',
    'Ouça amostras do álbum Tenori Amici - Con Amore, lançado pela Biscoito Fino, e acesse o álbum completo no Spotify.':
      'Listen to samples from the Tenori Amici - Con Amore album, released by Biscoito Fino, and access the full album on Spotify.',
    'Ouça amostras de Tenori Amici - Con Amore, álbum lançado pela Biscoito Fino, e acesse o álbum completo no Spotify.':
      'Listen to Tenori Amici - Con Amore samples, an album released by Biscoito Fino, and access the full album on Spotify.',
    'Conheça o concerto': 'Discover the concert',
    'Ouça minha música': 'Listen to my music',
    'Ir para o destaque do concerto': 'Go to the concert feature',
    Explore: 'Explore',
    'Max Wilson Pereira cantando com uma orquestra em Cachoeiro de Itapemirim':
      'Max Wilson Pereira singing with an orchestra in Cachoeiro de Itapemirim',
    'Orquestra Mariuccia Iacovino': 'Orquestra Mariuccia Iacovino',
    'Uma noite emocionante com grandes melodias, entre o teatro musical, a ópera e o crossover clássico.':
      'An emotional evening of great melodies spanning musical theater, opera, and classical crossover.',
    'Um encontro íntimo entre voz, palavra e melodia, com repertórios que atravessam gerações e continuam encontrando novos sentidos ao vivo.':
      'An intimate encounter between voice, word, and melody, with repertoire that crosses generations and finds new meaning live.',
    'Conheça minha trajetória': 'Discover my journey',
    'Uma trajetória entre palcos e encontros':
      'A journey through stages and encounters',
    'Ópera, televisão, crossover e redes sociais, levando a força do canto lírico para cada vez mais pessoas.':
      'Opera, television, crossover, and social media, bringing the power of classical singing to more and more people.',
    'Cena da ópera Fedra e Hipólito em um palco de grandes dimensões':
      'Scene from the opera Fedra e Hipólito on a grand stage',
    'Max Wilson Pereira e Hebe Camargo durante apresentação no Credicard Hall':
      'Max Wilson Pereira and Hebe Camargo performing at Credicard Hall',
    'Max Wilson Pereira em figurino de época':
      'Max Wilson Pereira in period costume',
    'Viena, 2025': 'Vienna, 2025',
    'Fedra e Hipólito, Palácio das Artes': 'Fedra e Hipólito, Palácio das Artes',
    'DVD Hebe Camargo, Credicard Hall': 'DVD Hebe Camargo, Credicard Hall',
    'Leia a biografia': 'Read the biography',
    'Álbuns': 'Albums',
    'Três momentos de uma trajetória entre romantismo, repertório lírico e crossover.':
      'Three moments from a journey through romance, lyrical repertoire, and crossover.',
    'Explore os álbuns': 'Explore the albums',
    'Viena • Brasil': 'Vienna • Brazil',
    'VÍDEOS': 'VIDEOS',
    'Vídeos': 'Videos',
    'Momentos de palco, encontros e canções que seguem encontrando novas pessoas.': 'Stage moments, encounters, and songs that continue to find new listeners.',
    'A voz em movimento': 'A voice in motion',
    'Veja todos os vídeos no canal de Max Wilson Pereira no YouTube': 'Watch every video on Max Wilson Pereira’s YouTube channel',
    'Seleção de vídeos': 'Video selection',
    'Dio Come Ti Amo com Hebe Camargo': 'Dio Come Ti Amo with Hebe Camargo',
    'Taneyevsky Festival 2017 — Rússia': 'Taneyevsky Festival 2017 — Russia',
    'All I Ask of You, com Marina Elali': 'All I Ask of You, with Marina Elali',
    'Evidências — Versão Ópera': 'Evidências — Opera Version',
    'Hino do Flamengo, com Sandra de Sá e 3 Tenores': 'Flamengo Anthem, with Sandra de Sá and 3 Tenors',
    'She, de Charles Aznavour — Rio de Janeiro': 'She, by Charles Aznavour — Rio de Janeiro',
    'Con te partirò, com Francesca Caforio': 'Con te partirò, with Francesca Caforio',
    'Eu Sei Que Vou Te Amar, com Sylvia Massari': 'Eu Sei Que Vou Te Amar, with Sylvia Massari',
    'Torna a Surriento — em Sorrento': 'Torna a Surriento — in Sorrento',
    'She, de Elvis Costello — Notting Hill': 'She, by Elvis Costello — Notting Hill',
    'Awake, de Josh Groban': 'Awake, by Josh Groban',
    'A próxima canção começa lá': 'The next song begins there',
    'Visitar o canal no YouTube': 'Visit the YouTube channel',
  },
  de: {
    'A voz continua': 'Die Stimme klingt weiter',
    'Uma pausa antes da próxima canção': 'Eine Pause vor dem nächsten Lied',
    'Canções que permanecem': 'Lieder, die bleiben',
    'Escolher idioma': 'Sprache auswählen',
    'Mudar idioma para': 'Sprache wechseln zu',
    'Seguir Max Wilson Pereira no': 'Max Wilson Pereira folgen auf',
    'Max Wilson Pereira em apresentação no DVD de Hebe Camargo':
      'Max Wilson Pereira bei einem Auftritt auf der DVD von Hebe Camargo',
    'Max Wilson Pereira em apresentação de opereta':
      'Max Wilson Pereira bei einer Operettenaufführung',
    'Max Wilson Pereira em traje formal':
      'Max Wilson Pereira in festlicher Abendgarderobe',
    'Destaques da carreira': 'Karrierehöhepunkte',
    'Max Wilson Pereira no Taneyevsky Festival 2017':
      'Max Wilson Pereira beim Taneyevsky Festival 2017',
    'Max Wilson Pereira em apresentação para redes sociais':
      'Max Wilson Pereira bei einem Auftritt für soziale Medien',
    'Max Wilson Pereira levando o canto lírico para novos públicos':
      'Max Wilson Pereira bringt klassischen Gesang zu neuem Publikum',
    'Fechar aviso': 'Hinweis schließen',
    'Tenor • Ópera & Entretenimento': 'Tenor • Oper & Unterhaltung',
    'Tenor • Artista': 'Tenor • Künstler',
    'Tenor brasileiro': 'Brasilianischer Tenor',
    'Álbum digital': 'Digitales Album',
    'Álbum digital liberado': 'Digitales Album',
    'Álbuns': 'Alben',
    'Três momentos da minha trajetória em música gravada, reunidos para você conhecer cada projeto pelo clima, pela capa e pela história sonora.':
      'Drei Momente meiner Reise mit aufgenommener Musik, gesammelt, damit Sie jedes Projekt über Stimmung, Cover und Klanggeschichte entdecken können.',
    'Coleção de álbuns': 'Albumkollektion',
    'Ir para o álbum': 'Zum Album',
    'Botão do álbum SO IN LOVE': 'Schaltfläche für das Album SO IN LOVE',
    'Botão do álbum Tenori Amici': 'Schaltfläche für das Album Tenori Amici',
    'Botão do álbum QUATTRO': 'Schaltfläche für das Album QUATTRO',
    'Capas do álbum Tenori Amici': 'Albumcover von Tenori Amici',
    'Capa do álbum Tenori Amici': 'Vorderseite des Albums Tenori Amici',
    'Contracapa do álbum Tenori Amici': 'Rückseite des Albums Tenori Amici',
    'Capas do álbum SO IN LOVE': 'Albumcover von SO IN LOVE',
    'Capa do álbum SO IN LOVE': 'Vorderseite des Albums SO IN LOVE',
    'Contracapa do álbum SO IN LOVE': 'Rückseite des Albums SO IN LOVE',
    'Capas do álbum QUATTRO': 'Albumcover von QUATTRO',
    'Capa do álbum QUATTRO': 'Vorderseite des Albums QUATTRO',
    'Contracapa do álbum QUATTRO': 'Rückseite des Albums QUATTRO',
    'Clássicos românticos, cinema, teatro musical e faixas bônus em uma seleção íntima e emocionante.':
      'Romantische Klassiker, Film, Musicaltheater und Bonustracks in einer intimen und bewegenden Auswahl.',
    'Um encontro de vozes, amizade e repertório lírico em uma gravação especial.':
      'Eine Begegnung von Stimmen, Freundschaft und lyrischem Repertoire in einer besonderen Aufnahme.',
    'Projeto crossover gravado com o grupo Quattro, unindo grandes canções internacionais e intensidade vocal.':
      'Ein Crossover-Projekt, aufgenommen mit der Gruppe Quattro, das große internationale Songs und stimmliche Intensität verbindet.',
    'Canto, paixão e entretenimento para alegrar o seu dia e tocar o seu coração':
      'Gesang, Leidenschaft und Unterhaltung, um Ihren Tag zu erhellen und Ihr Herz zu berühren',
    HOME: 'HOME',
    BIOGRAFIA: 'BIOGRAFIE',
    CONCERTO: 'KONZERT',
    ÁLBUM: 'ALBUM',
    ÁLBUMS: 'ALBEN',
    APOIO: 'UNTERSTÜTZUNG',
    'Abrir menu': 'Menü öffnen',
    'Fechar menu': 'Menü schließen',
    'Navegação principal': 'Hauptnavigation',
    'Redes sociais': 'Soziale Netzwerke',
    'Redes sociais de Max Wilson Pereira':
      'Soziale Netzwerke von Max Wilson Pereira',
    'Links principais': 'Hauptlinks',
    'Siga nas redes sociais': 'Folgen Sie mir in den sozialen Netzwerken',
    'Bem-vindo': 'Willkommen',
    'Que alegria ter você aqui': 'Wie schön, dass Sie hier sind',
    'Este espaço reúne um pouco da minha voz, da minha história e da minha paixão pela música: da tradição lírica às canções que atravessam gerações, sempre com o desejo de tocar o coração de quem escuta.':
      'Dieser Raum vereint ein wenig von meiner Stimme, meiner Geschichte und meiner Leidenschaft für Musik: von der lyrischen Tradition bis zu Liedern, die Generationen verbinden, immer mit dem Wunsch, das Herz der Zuhörenden zu berühren.',
    'Assista ao vídeo e seja muito bem-vindo ao meu mundo musical.':
      'Sehen Sie sich das Video an und fühlen Sie sich herzlich willkommen in meiner musikalischen Welt.',
    'Mensagem em vídeo de Max Wilson Pereira':
      'Videobotschaft von Max Wilson Pereira',
    Voltar: 'Zurück',
    'Vídeo de Max Wilson Pereira': 'Video von Max Wilson Pereira',
    Biografia: 'Biografie',
    'Uma trajetória entre ópera, televisão, crossover e redes sociais, levando a força do canto lírico para cada vez mais pessoas.':
      'Ein Weg durch Oper, Fernsehen, Crossover und soziale Medien, der die Kraft des klassischen Gesangs zu immer mehr Menschen bringt.',
    'é um tenor brasileiro radicado em Viena, artista de presença cênica marcante e voz construída entre a tradição lírica e a comunicação direta com o público. Além da técnica operística, dedicou anos ao estudo do canto musical, desenvolvendo também o domínio de uma emissão mais suave, íntima e expressiva. Nascido em São Paulo e criado no Rio de Janeiro, descobriu a paixão pelo canto aos 18 anos, ao ouvir Luciano Pavarotti, e desde então transformou essa inspiração em uma carreira que atravessa palcos, televisão, gravações e plataformas digitais.':
      'ist ein brasilianischer Tenor mit Wohnsitz in Wien, ein Künstler mit markanter Bühnenpräsenz und einer Stimme, die zwischen lyrischer Tradition und direkter Kommunikation mit dem Publikum entstanden ist. Neben der Operntechnik widmete er viele Jahre dem Musicalgesang und entwickelte auch eine weichere, intimere und ausdrucksstarke Stimmgebung. Geboren in São Paulo und aufgewachsen in Rio de Janeiro, entdeckte er mit 18 Jahren seine Leidenschaft für den Gesang, als er Luciano Pavarotti hörte. Seitdem verwandelte er diese Inspiration in eine Karriere, die Bühnen, Fernsehen, Aufnahmen und digitale Plattformen verbindet.',
    'anos de trajetória artística entre Brasil, Estados Unidos e Europa':
      'Jahre künstlerische Laufbahn zwischen Brasilien, den Vereinigten Staaten und Europa',
    'seguidores no Instagram acompanhando sua arte e seu humor':
      'Instagram-Follower, die seine Kunst und seinen Humor begleiten',
    'base artística e musical de uma carreira internacional':
      'künstlerische und musikalische Basis einer internationalen Karriere',
    'Formação e Primeiros Passos': 'Ausbildung und Erste Schritte',
    'Ainda jovem, Max iniciou seus estudos com o tenor Eduardo Alvares enquanto cursava a CAL, Casa das Artes de Laranjeiras, onde concluiu o Curso Profissionalizante de Ator. A formação teatral se tornou uma parte essencial de sua identidade artística: não apenas cantar, mas contar uma história, ocupar o palco e criar uma conexão viva com quem assiste.':
      'Schon in jungen Jahren begann Max sein Studium beim Tenor Eduardo Alvares, während er die CAL, Casa das Artes de Laranjeiras, besuchte, wo er die professionelle Schauspielausbildung abschloss. Die Theaterausbildung wurde zu einem wesentlichen Teil seiner künstlerischen Identität: nicht nur singen, sondern eine Geschichte erzählen, die Bühne ausfüllen und eine lebendige Verbindung zum Publikum schaffen.',
    'Após anos de estudo em canto lírico, teoria musical e piano, seguiu para Nova York em 2005, onde estudou com Evelyn La Quaif. No ano seguinte, foi convidado pelo professor Sebastian Vittucci para estudar em Viena, na Áustria, frequentando a Konservatorium Wien Privatuniversität em canto lírico e opereta. Também estudou na Vienna Konservatorium com o tenor Agim Hushi, instituição onde obteve seu bacharelado como solista de ópera.':
      'Nach Jahren des Studiums von klassischem Gesang, Musiktheorie und Klavier ging er 2005 nach New York, wo er bei Evelyn La Quaif studierte. Im folgenden Jahr wurde er von Professor Sebastian Vittucci eingeladen, in Wien zu studieren, wo er an der Konservatorium Wien Privatuniversität klassischen Gesang und Operette belegte. Außerdem studierte er am Vienna Konservatorium bei dem Tenor Agim Hushi, wo er seinen Bachelor als Opernsolist abschloss.',
    'Palcos, Ópera e Televisão': 'Bühnen, Oper und Fernsehen',
    'Na Áustria, Max participou de concertos, óperas e operetas, destacando-se em papéis como Nemorino, em':
      'In Österreich wirkte Max bei Konzerten, Opern und Operetten mit und überzeugte in Rollen wie Nemorino in',
    ', de Donizetti, e Herzog von Urbino, em':
      'von Donizetti und Herzog von Urbino in',
    ', de Johann Strauss. Em 2007, cantou no Gran Concerto Lírico di Ferragosto, interpretando árias italianas diante de um público exigente.':
      'von Johann Strauss. 2007 sang er beim Gran Concerto Lírico di Ferragosto und interpretierte italienische Arien vor einem anspruchsvollen Publikum.',
    'Entre os momentos importantes de sua trajetória internacional, foi convidado a cantar na Rússia em duas ocasiões. Uma dessas apresentações aconteceu no':
      'Zu den wichtigen Momenten seiner internationalen Laufbahn gehört, dass er zweimal nach Russland eingeladen wurde. Einer dieser Auftritte fand beim',
    ', com a Vladimir Governor Symphony Orchestra sob regência do maestro Artiom Markin.':
      'mit dem Vladimir Governor Symphony Orchestra unter der Leitung von Maestro Artiom Markin statt.',
    'Depois de três anos em Viena, retornou ao Brasil a convite da Sony Music para integrar o grupo Quattro e gravar um CD. Em 2009, apresentou-se no oratório':
      'Nach drei Jahren in Wien kehrte er auf Einladung von Sony Music nach Brasilien zurück, um Teil der Gruppe Quattro zu werden und eine CD aufzunehmen. 2009 trat er im Oratorium',
    ', de Carlos Gomes, no Theatro Municipal do Rio de Janeiro. Em 2010, participou da gravação do DVD de Hebe Camargo, interpretando':
      'von Carlos Gomes im Theatro Municipal do Rio de Janeiro auf. 2010 nahm er an der DVD-Aufzeichnung von Hebe Camargo teil und sang',
    'no Credicard Hall, em São Paulo, e também apareceu na novela':
      'in der Credicard Hall in São Paulo und erschien auch in der Telenovela',
    ', em uma cena de': 'in einer Szene aus',
    'ao lado de Alessandra Maestrini.':
      'an der Seite von Alessandra Maestrini.',
    'Sua trajetória inclui ainda trabalhos com nomes como Bibi Ferreira, participação na minissérie':
      'Zu seinem Werdegang gehören außerdem Arbeiten mit Namen wie Bibi Ferreira, eine Mitwirkung in der Miniserie',
    ', estreia mundial da ópera': ', die Uraufführung der Oper',
    ', no Palácio das Artes, e atuação como preparador vocal no':
      'im Palácio das Artes sowie seine Tätigkeit als Vocal Coach bei',
    ', auxiliando Jonatas Faro no quadro Artista Completão.':
      ', wo er Jonatas Faro im Format Artista Completão unterstützte.',
    'Crossover, Humor e Público Digital':
      'Crossover, Humor und Digitales Publikum',
    'Nos últimos anos, Max passou a levar sua voz para um público ainda maior nas redes sociais. Misturando técnica lírica, música pop, paródias criativas e performances de rua, criou uma linguagem própria: sofisticada sem ser distante, divertida sem perder a emoção, popular sem abandonar a excelência vocal.':
      'In den letzten Jahren brachte Max seine Stimme über soziale Medien zu einem noch größeren Publikum. Indem er klassische Technik, Popmusik, kreative Parodien und Straßenperformances verbindet, entwickelte er eine eigene Sprache: anspruchsvoll, ohne distanziert zu sein, unterhaltsam, ohne die Emotion zu verlieren, populär, ohne stimmliche Exzellenz aufzugeben.',
    'Seus vídeos já ultrapassaram a marca de 1 milhão de visualizações, e sua comunidade digital reúne mais de 200 mil seguidores no Instagram e milhares de inscritos no YouTube. Com carisma, humor e uma voz de formação clássica, Max aproxima a ópera de quem talvez nunca tivesse imaginado se emocionar com ela.':
      'Seine Videos haben bereits mehr als 1 Million Aufrufe erreicht, und seine digitale Community zählt über 200.000 Instagram-Follower und Tausende von YouTube-Abonnenten. Mit Charisma, Humor und einer klassisch ausgebildeten Stimme bringt Max die Oper Menschen näher, die vielleicht nie gedacht hätten, dass sie davon berührt werden könnten.',
    'O Momento Atual': 'Der Aktuelle Moment',
    'Hoje, Max Wilson Pereira dedica grande parte de sua energia à construção de uma presença digital cada vez mais forte, criando vídeos que aproximam a ópera, o canto lírico e o crossover de públicos que talvez nunca tivessem imaginado se emocionar com esse repertório. Radicado em Viena e profundamente conectado ao Brasil, ele transforma ruas, praias, estações, casas e situações cotidianas em pequenos palcos, onde a técnica vocal encontra a surpresa, a emoção e o humor.':
      'Heute widmet Max Wilson Pereira einen großen Teil seiner Energie dem Aufbau einer immer stärkeren digitalen Präsenz. Er erstellt Videos, die Oper, klassischen Gesang und Crossover einem Publikum näherbringen, das vielleicht nie gedacht hätte, von diesem Repertoire berührt zu werden. In Wien ansässig und tief mit Brasilien verbunden, verwandelt er Straßen, Strände, Bahnhöfe, Wohnungen und Alltagssituationen in kleine Bühnen, auf denen Gesangstechnik auf Überraschung, Emotion und Humor trifft.',
    'Seu trabalho nas redes nasce do desejo de mostrar que a voz lírica não precisa viver distante das pessoas. Em performances emocionantes, paródias musicais, interações com desconhecidos e vídeos bem-humorados, Max leva a ópera para novos contextos, despertando curiosidade, risadas e reações espontâneas. É nesse encontro entre excelência artística e comunicação direta que ele segue criando novos caminhos para compartilhar sua arte com quem já o acompanha e com quem ainda vai descobri-lo.':
      'Seine Arbeit in den sozialen Netzwerken entsteht aus dem Wunsch zu zeigen, dass die lyrische Stimme nicht fern von den Menschen leben muss. In bewegenden Performances, musikalischen Parodien, Begegnungen mit Fremden und humorvollen Videos bringt Max die Oper in neue Zusammenhänge und weckt Neugier, Lachen und spontane Reaktionen. In dieser Begegnung zwischen künstlerischer Exzellenz und direkter Kommunikation schafft er weiterhin neue Wege, seine Kunst mit denen zu teilen, die ihn bereits begleiten, und mit denen, die ihn noch entdecken werden.',
    'Apoie Minha Jornada': 'Unterstützen Sie Meine Reise',
    'Se você está aqui, tudo indica que você':
      'Wenn Sie hier sind, bedeutet das wahrscheinlich, dass Sie',
    'admira o meu trabalho': 'meine Arbeit schätzen',
    e: 'und',
    'tem carinho por mim e pela minha carreira':
      'mir und meiner Karriere wohlgesonnen sind',
    '. Isso, por si só, já me enche de alegria. ❤️❤️❤️':
      '. Das allein erfüllt mich schon mit Freude. ❤️❤️❤️',
    'PIX para Apoio': 'PIX zur Unterstützung',
    'Qualquer valor': 'Jeder Betrag',
    'será recebido de coração — como um ingresso para meu espetáculo, ópera ou musical. Você acompanha meu trabalho de graça nas redes; este é um gesto de apoio real.':
      'wird von Herzen angenommen, wie eine Eintrittskarte zu meiner Show, Oper oder meinem Musical. Sie verfolgen meine Arbeit kostenlos in den sozialen Netzwerken; dies ist eine echte Geste der Unterstützung.',
    'Fico muito feliz em saber que está considerando me apoiar. Seu gesto significa muito para o caminho que estou construindo como artista.':
      'Ich freue mich sehr, dass Sie darüber nachdenken, mich zu unterstützen. Ihre Geste bedeutet viel für den Weg, den ich als Künstler aufbaue.',
    'Muito obrigado, de coração.': 'Vielen Dank von Herzen.',
    'Nos últimos anos, investi tempo, energia e recursos na produção e divulgação do meu trabalho. Para seguir em frente — levando o canto lírico a quem talvez nunca o tenha ouvido —':
      'In den letzten Jahren habe ich Zeit, Energie und Mittel in die Produktion und Verbreitung meiner Arbeit investiert. Um weiterzumachen und klassischen Gesang zu Menschen zu bringen, die ihn vielleicht noch nie gehört haben,',
    'sua ajuda é fundamental': 'ist Ihre Hilfe grundlegend',
    '.': '.',
    'Este espaço representa um': 'Dieser Bereich steht für eine',
    'gesto de carinho e apoio real':
      'Geste der Zuneigung und echten Unterstützung',
    'à minha jornada como artista. Se você acredita no meu trabalho, este é o lugar certo. Ficarei eternamente grato.':
      'für meine Reise als Künstler. Wenn Sie an meine Arbeit glauben, sind Sie hier genau richtig. Ich werde ewig dankbar sein.',
    'O apoio recebido será, em grande parte,':
      'Die erhaltene Unterstützung wird größtenteils',
    'reinvestido na minha carreira': 'in meine Karriere reinvestiert',
    ', para levar minha arte e o canto lírico cada vez mais longe.':
      ', damit ich meine Kunst und den klassischen Gesang immer weiter tragen kann.',
    'Receber seu apoio neste momento será um grande motivo de alegria e orgulho para mim.':
      'Ihre Unterstützung in diesem Moment zu erhalten, wäre für mich ein großer Grund zur Freude und zum Stolz.',
    'Álbum SO IN LOVE + Bônus': 'Album SO IN LOVE + Bonus',
    '- álbum digital': '- digitales Album',
    'Muito obrigado pelo seu interesse no meu trabalho! ❤️❤️❤️':
      'Vielen Dank für Ihr Interesse an meiner Arbeit! ❤️❤️❤️',
    'Álbum digital em formato MP3': 'Digitales Album im MP3-Format',
    'do tenor brasileiro Max Wilson Pereira, trazendo emoção, romantismo e interpretações marcantes de grandes clássicos.':
      'des brasilianischen Tenors Max Wilson Pereira, mit Emotion, Romantik und eindrucksvollen Interpretationen großer Klassiker.',
    'Atenção: este é um produto digital. Você não receberá um CD físico, apenas arquivos para download.':
      'Hinweis: Dies ist ein digitales Produkt. Sie erhalten keine physische CD, sondern nur Dateien zum Herunterladen.',
    'Como comprar via PIX': 'So kaufen Sie per PIX',
    'Faça um PIX de': 'Senden Sie eine PIX-Zahlung über',
    'para:': 'an:',
    'Depois de fazer o PIX, digite abaixo o nome que aparece no pagamento (nome do titular da conta que fez o PIX) e clique no botão para continuar.':
      'Geben Sie nach der PIX-Zahlung unten den Namen ein, der bei der Zahlung erscheint (Name des Kontoinhabers), und klicken Sie auf die Schaltfläche, um fortzufahren.',
    'Digite aqui o nome usado no PIX':
      'Geben Sie hier den für PIX verwendeten Namen ein',
    CONTINUAR: 'WEITER',
    Repertório: 'Repertoire',
    'Músicas eternas, entre elas:': 'Zeitlose Lieder, darunter:',
    'Bônus Exclusivo': 'Exklusiver Bonus',
    'Além do álbum, você recebe clássicos cantados com toda a alma:':
      'Zusätzlich zum Album erhalten Sie Klassiker, die mit ganzer Seele gesungen wurden:',
    'Volta ao Meu Mundo (música inédita)':
      'Volta ao Meu Mundo (unveröffentlichtes Lied)',
    'Primadonna (música inédita)': 'Primadonna (unveröffentlichtes Lied)',
    'Obrigado pelo seu apoio': 'Danke für Ihre Unterstützung',
    'Se você efetuou o': 'Wenn Sie die',
    ', muito obrigado! Seu interesse e seu apoio ao meu trabalho':
      'geleistet haben, vielen Dank! Ihr Interesse und Ihre Unterstützung für meine Arbeit',
    'significam muito para mim': 'bedeuten mir sehr viel',
    'Quero te dizer algo com toda sinceridade: eu optei por':
      'Ich möchte Ihnen ganz ehrlich etwas sagen: Ich habe mich entschieden,',
    'não bloquear o download': 'den Download nicht zu blockieren',
    ', mesmo antes de conferir o pagamento. Eu escolho':
      ', selbst bevor ich die Zahlung überprüfe. Ich entscheide mich,',
    'confiar em você': 'Ihnen zu vertrauen',
    ', que me acompanha e apoia minha jornada com carinho e respeito, e ficarei muito feliz quando perceber que você fez o PIX, ao ver o seu nome nos recebimentos na minha conta.':
      ', weil Sie mich begleiten und meine Reise mit Zuneigung und Respekt unterstützen. Ich werde sehr glücklich sein, wenn ich sehe, dass Sie die PIX-Zahlung geleistet haben und Ihr Name in meinen Zahlungseingängen erscheint.',
    'Se ainda não fez o pagamento, peço com todo respeito que':
      'Wenn Sie die Zahlung noch nicht vorgenommen haben, bitte ich Sie respektvoll,',
    'só faça o download depois de ter efetuado o pagamento':
      'den Download erst nach erfolgter Zahlung zu starten',
    'Vou ficar muito feliz se escolher uma das músicas e':
      'Ich würde mich sehr freuen, wenn Sie eines der Lieder auswählen und',
    'compartilhar um story no Instagram me marcando':
      'eine Instagram-Story teilen und mich markieren',
    'Você pode escrever algo simples como:':
      'Sie können etwas Einfaches schreiben wie:',
    '"Comprei o álbum SO IN LOVE do @maxwilsonpereira e estou adorando! 🎶"':
      '"Ich habe das Album SO IN LOVE von @maxwilsonpereira gekauft und liebe es! 🎶"',
    '"Estou ouvindo SO IN LOVE do tenor @maxwilsonpereira e estou adorando! 🎶"':
      '"Ich höre SO IN LOVE vom Tenor @maxwilsonpereira und liebe es! 🎶"',
    'Isso ajuda': 'Das hilft',
    'muito mais pessoas': 'viel mehr Menschen',
    'a descobrirem minha música.': 'meine Musik zu entdecken.',
    'Projeto de 2011 da Sony Music Entertainment Brasil com o Grupo Quattro, revisitando grandes canções internacionais em formato crossover vocal.':
      'Ein Projekt von Sony Music Entertainment Brasil aus dem Jahr 2011 mit Grupo Quattro, das große internationale Songs im Vocal-Crossover-Format neu interpretiert.',
    'Álbum lançado pela gravadora Biscoito Fino, reunindo repertório clássico e popular em formato crossover vocal.':
      'Ein Album des Labels Biscoito Fino, das klassisches und populäres Repertoire im Vocal-Crossover-Format verbindet.',
    'Lançado pela gravadora Biscoito Fino em 2017, Con Amore reúne o Tenori Amici em repertório clássico e popular com espírito crossover.':
      'Con Amore wurde 2017 beim Label Biscoito Fino veröffentlicht und vereint Tenori Amici mit klassischem und populärem Repertoire im Crossover-Geist.',
    'O álbum completo está disponível no Spotify.':
      'Das komplette Album ist auf Spotify verfügbar.',
    'Ouvir no Spotify': 'Auf Spotify anhören',
    'Ouvir o álbum QUATTRO completo no Spotify':
      'Das komplette Album QUATTRO auf Spotify anhören',
    'Ouvir Tenori Amici no Spotify': 'Tenori Amici auf Spotify anhören',
    'Baixar todas as músicas': 'Alle Lieder herunterladen',
    '13 faixas': '13 Titel',
    '11 faixas': '11 Titel',
    '11 amostras': '11 Hörproben',
    'Suas músicas': 'Ihre Musik',
    Amostras: 'Hörproben',
    'Prévia MP3': 'MP3-Vorschau',
    'Seu navegador não suporta reprodução de áudio.':
      'Ihr Browser unterstützt keine Audiowiedergabe.',
    Baixar: 'Herunterladen',
    Play: 'Abspielen',
    'Ouvir amostra': 'Hörprobe abspielen',
    Pausar: 'Pause',
    'Preparando downloads...': 'Downloads werden vorbereitet...',
    'Faixas Bônus': 'Bonustracks',
    'Max Wilson Pereira | Tenor Brasileiro em Viena':
      'Max Wilson Pereira | Brasilianischer Tenor in Wien',
    'Biografia | Max Wilson Pereira': 'Biografie | Max Wilson Pereira',
    'Concerto de Ópera e Crossover | Max Wilson Pereira':
      'Opern- und Crossover-Konzert | Max Wilson Pereira',
    'Apoie Minha Jornada | Max Wilson Pereira':
      'Unterstützen Sie Meine Reise | Max Wilson Pereira',
    'Álbum SO IN LOVE | Max Wilson Pereira':
      'Album SO IN LOVE | Max Wilson Pereira',
    'Álbuns e Música | Max Wilson Pereira':
      'Alben &amp; Musik | Max Wilson Pereira',
    'Baixar Álbum SO IN LOVE | Max Wilson Pereira':
      'Album SO IN LOVE herunterladen | Max Wilson Pereira',
    'Baixar Álbum QUATTRO | Max Wilson Pereira':
      'Album QUATTRO herunterladen | Max Wilson Pereira',
    'Baixar Album QUATTRO | Max Wilson Pereira':
      'Album QUATTRO herunterladen | Max Wilson Pereira',
    'Amostras do Álbum QUATTRO | Max Wilson Pereira':
      'Hörproben aus dem Album QUATTRO | Max Wilson Pereira',
    'Amostras do Álbum Tenori Amici | Max Wilson Pereira':
      'Hörproben aus dem Album Tenori Amici | Max Wilson Pereira',
    'Conheça Max Wilson Pereira, tenor brasileiro radicado em Viena, com uma trajetória entre ópera, crossover clássico, televisão, concertos e música gravada.':
      'Lernen Sie Max Wilson Pereira kennen: brasilianischer Tenor in Wien mit einer Laufbahn in Oper, klassischem Crossover, Fernsehen, Konzerten und Tonaufnahmen.',
    'Tenor brasileiro em Viena. Ópera, crossover clássico, concertos e música gravada em uma trajetória guiada pela emoção da voz.':
      'Brasilianischer Tenor in Wien. Oper, klassischer Crossover, Konzerte und Tonaufnahmen – eine Laufbahn, die von der Kraft der Stimme geprägt ist.',
    'Ouça os álbuns de Max Wilson Pereira: SO IN LOVE, Tenori Amici e QUATTRO, entre repertório lírico, romantismo e crossover clássico.':
      'Hören Sie die Alben von Max Wilson Pereira: SO IN LOVE, Tenori Amici und QUATTRO zwischen lyrischem Repertoire, Romantik und klassischem Crossover.',
    'Álbuns de Max Wilson Pereira: repertórios românticos, crossover clássico e gravações especiais.':
      'Alben von Max Wilson Pereira: romantisches Repertoire, klassischer Crossover und besondere Aufnahmen.',
    'Coleção de álbuns de Max Wilson Pereira, tenor brasileiro.':
      'Albumkollektion von Max Wilson Pereira, brasilianischer Tenor.',
    'Conheça a trajetória de Max Wilson Pereira, tenor brasileiro radicado em Viena, da formação lírica aos palcos, televisão e redes sociais.':
      'Entdecken Sie Max Wilson Pereiras Weg als brasilianischer Tenor in Wien – von der klassischen Ausbildung zu Bühne, Fernsehen und sozialen Medien.',
    'A história de Max Wilson Pereira: tenor brasileiro, artista de crossover, criador digital e intérprete que une ópera, pop, humor e emoção.':
      'Die Geschichte von Max Wilson Pereira: brasilianischer Tenor, Crossover-Künstler, digitaler Creator und Interpret, der Oper, Pop, Humor und Emotion verbindet.',
    'Descubra o concerto de Max Wilson Pereira: uma experiência íntima entre ópera, teatro musical, grandes melodias e crossover clássico, com voz e piano.':
      'Erleben Sie Max Wilson Pereira im Konzert: Oper, Musicaltheater, große Melodien und klassischer Crossover in intimer Atmosphäre mit Stimme und Klavier.',
    'Uma noite íntima com voz, piano, convidados especiais, grandes melodias, teatro musical, ópera e crossover clássico.':
      'Ein intimer Abend mit Stimme, Klavier, besonderen Gästen, großen Melodien, Musicaltheater, Oper und klassischem Crossover.',
    'Max Wilson Pereira em imagem de divulgação do concerto':
      'Max Wilson Pereira auf einem Konzert-Pressebild',
    'Concerto ao vivo': 'Live-Konzert',
    Concerto: 'Konzert',
    'Uma noite emocionante com grandes melodias, entre o teatro musical, a ópera e o crossover clássico.':
      'Ein bewegender Abend mit großen Melodien zwischen Musicaltheater, Oper und klassischem Crossover.',
    'Quero assistir': 'Ich möchte dabei sein',
    'Sobre o concerto': 'Über das Konzert',
    'Uma experiência próxima, elegante e emocionante':
      'Ein nahes, elegantes und bewegendes Erlebnis',
    'Este concerto nasce do desejo de cantar repertórios que atravessam gerações e continuam encontrando novos sentidos quando são vividos ao vivo. Ao lado de um pianista, com a presença de uma soprano convidada e, muito provavelmente, também de um violinista, a noite propõe um encontro íntimo entre voz, palavra e melodia.':
      'Dieses Konzert entsteht aus dem Wunsch, Repertoire zu singen, das Generationen verbindet und live immer wieder neue Bedeutungen findet. An der Seite eines Pianisten, mit einer Gastsopranistin und sehr wahrscheinlich auch einem Violinisten, bietet der Abend eine intime Begegnung zwischen Stimme, Wort und Melodie.',
    'O público ouvirá canções eternas da Broadway, dos musicais, da ópera e de clássicos populares interpretadas com acompanhamento ao piano, convidados especiais e uma atmosfera de teatro próximo. Mais do que uma sequência de músicas, o concerto procura contar pequenas histórias: amores possíveis, despedidas, sonhos, lembranças e momentos em que uma melodia parece dizer aquilo que as palavras sozinhas não alcançam.':
      'Das Publikum hört zeitlose Lieder vom Broadway, aus Musicals, Oper und beliebten Klassikern, interpretiert mit Klavierbegleitung, besonderen Gästen und der Atmosphäre eines nahen Theaters. Mehr als eine Abfolge von Liedern möchte das Konzert kleine Geschichten erzählen: mögliche Lieben, Abschiede, Träume, Erinnerungen und Momente, in denen eine Melodie zu sagen scheint, was Worte allein nicht erreichen.',
    'Max Wilson Pereira em apresentação ao vivo':
      'Max Wilson Pereira in einem Live-Auftritt',
    'Uma nova jornada': 'Eine neue Reise',
    'O início de uma nova fase artística':
      'Der Beginn einer neuen künstlerischen Phase',
    'Este projeto marca o começo de uma nova fase na minha carreira. Depois de tantos caminhos entre ópera, televisão, gravações, redes sociais e repertório crossover, sinto que este concerto reúne de forma muito verdadeira aquilo que mais me move: cantar com emoção, contar histórias e estar perto do público.':
      'Dieses Projekt markiert den Beginn einer neuen Phase meiner Karriere. Nach so vielen Wegen zwischen Oper, Fernsehen, Aufnahmen, sozialen Medien und Crossover-Repertoire habe ich das Gefühl, dass dieses Konzert auf sehr ehrliche Weise zusammenführt, was mich am meisten bewegt: mit Emotion zu singen, Geschichten zu erzählen und dem Publikum nahe zu sein.',
    'As primeiras apresentações acontecerão na':
      'Die ersten Aufführungen finden in',
    Áustria: 'Österreich',
    ', país que há muitos anos faz parte da minha vida musical. No fim do ano, em':
      ' statt, einem Land, das seit vielen Jahren Teil meines musikalischen Lebens ist. Am Ende des Jahres, im',
    dezembro: 'Dezember',
    ', o concerto também será apresentado no': ', wird das Konzert auch in',
    Brasil: 'Brasilien',
    ', em um retorno muito especial a esse repertório diante do meu público brasileiro.':
      ' präsentiert, als eine sehr besondere Rückkehr zu diesem Repertoire vor meinem brasilianischen Publikum.',
    'Minha esperança é que, a partir de':
      'Meine Hoffnung ist, dass dieses Projekt ab',
    ', este projeto cresça e se transforme em uma turnê pelo Brasil, levando essas canções a plateias de diferentes cidades. Ainda é um caminho sendo construído, mas ele nasce com sinceridade, cuidado e muita vontade de compartilhar beleza.':
      ' wächst und zu einer Tournee durch Brasilien wird, die diese Lieder zu Publikum in verschiedenen Städten bringt. Es ist noch ein Weg im Aufbau, aber er beginnt mit Aufrichtigkeit, Sorgfalt und dem großen Wunsch, Schönheit zu teilen.',
    Ensaio: 'Probe',
    'Preparando o concerto ao piano': 'Das Konzert am Klavier vorbereiten',
    'Este vídeo mostra um momento simples de ensaio ao piano, preparando uma das canções que farão parte do concerto.':
      'Dieses Video zeigt einen einfachen Probemoment am Klavier, bei dem eines der Lieder vorbereitet wird, die Teil des Konzerts sein werden.',
    'Max Wilson Pereira ensaiando ao piano para o concerto':
      'Max Wilson Pereira probt am Klavier für das Konzert',
    Repertório: 'Repertoire',
    'Melodias que permanecem': 'Melodien, die bleiben',
    'O repertório pode variar a cada apresentação, preservando a liberdade do momento e o encontro com cada plateia. Entre as obras previstas estão:':
      'Das Repertoire kann bei jeder Aufführung variieren und bewahrt so die Freiheit des Moments und die Begegnung mit jedem Publikum. Zu den vorgesehenen Werken gehören:',
    'clássico popular': 'beliebter Klassiker',
    Duetos: 'Duette',
    'Muitas outras canções bonitas também poderão fazer parte de cada apresentação.':
      'Viele weitere schöne Lieder können ebenfalls Teil jeder Aufführung sein.',
    Convite: 'Einladung',
    'Viva este concerto ao vivo': 'Erleben Sie dieses Konzert live',
    'Algumas músicas revelam sua força de modo especial quando acontecem no mesmo instante em que respiramos juntos: artista, convidados e plateia. Este concerto é um convite para esse encontro.':
      'Manche Lieder entfalten ihre Kraft auf besondere Weise, wenn sie in demselben Augenblick geschehen, in dem wir gemeinsam atmen: Künstler, Gäste und Publikum. Dieses Konzert ist eine Einladung zu dieser Begegnung.',
    'Informações em breve': 'Informationen folgen in Kürze',
    'Apoie a jornada artística do tenor Max Wilson Pereira via PIX. Qualquer valor é recebido de coração e reinvestido na carreira e no canto lírico.':
      'Unterstützen Sie die künstlerische Reise des Tenors Max Wilson Pereira per PIX. Jeder Betrag wird von Herzen angenommen und in seine Karriere und den klassischen Gesang reinvestiert.',
    'Apoie o tenor Max Wilson Pereira via PIX. Seu apoio ajuda a levar o canto lírico e a cultura a mais pessoas.':
      'Unterstützen Sie den Tenor Max Wilson Pereira per PIX. Ihre Unterstützung hilft, klassischen Gesang und Kultur zu mehr Menschen zu bringen.',
    'Compre o álbum SO IN LOVE do tenor Max Wilson Pereira via PIX. Emoção, romantismo e clássicos como Tonight, Over the Rainbow, Nessun dorma. Inclui bônus exclusivos.':
      'Kaufen Sie das Album SO IN LOVE des Tenors Max Wilson Pereira per PIX. Emotion, Romantik und Klassiker wie Tonight, Over the Rainbow und Nessun dorma. Inklusive exklusiver Boni.',
    'Álbum especial do tenor Max Wilson Pereira. Emoção, romantismo e interpretações de grandes clássicos. Compre via PIX e receba bônus exclusivos.':
      'Ein besonderes Album des Tenors Max Wilson Pereira. Emotion, Romantik und Interpretationen großer Klassiker. Kaufen Sie per PIX und erhalten Sie exklusive Boni.',
    'Página de download do álbum digital SO IN LOVE de Max Wilson Pereira.':
      'Download-Seite für das digitale Album SO IN LOVE von Max Wilson Pereira.',
    'Baixe o álbum SO IN LOVE e obrigado por apoiar a jornada artística de Max Wilson Pereira.':
      'Laden Sie das Album SO IN LOVE herunter, und vielen Dank für die Unterstützung der künstlerischen Reise von Max Wilson Pereira.',
    'Ouça amostras do álbum QUATTRO e acesse o álbum completo no Spotify.':
      'Hören Sie Hörproben aus dem Album QUATTRO und öffnen Sie das komplette Album auf Spotify.',
    'Ouça amostras de QUATTRO, projeto de 2011 da Sony Music Entertainment Brasil, e acesse o álbum completo no Spotify.':
      'Hören Sie Hörproben aus QUATTRO, einem Projekt von Sony Music Entertainment Brasil aus dem Jahr 2011, und öffnen Sie das komplette Album auf Spotify.',
    'Ouça amostras do álbum Tenori Amici - Con Amore, lançado pela Biscoito Fino, e acesse o álbum completo no Spotify.':
      'Hören Sie Hörproben aus dem Album Tenori Amici - Con Amore, veröffentlicht bei Biscoito Fino, und öffnen Sie das komplette Album auf Spotify.',
    'Ouça amostras de Tenori Amici - Con Amore, álbum lançado pela Biscoito Fino, e acesse o álbum completo no Spotify.':
      'Hören Sie Hörproben aus Tenori Amici - Con Amore, einem bei Biscoito Fino veröffentlichten Album, und öffnen Sie das komplette Album auf Spotify.',
    'Conheça o concerto': 'Das Konzert entdecken',
    'Ouça minha música': 'Meine Musik hören',
    'Ir para o destaque do concerto': 'Zum Konzertbereich',
    Explore: 'Entdecken',
    'Max Wilson Pereira cantando com uma orquestra em Cachoeiro de Itapemirim':
      'Max Wilson Pereira singt mit einem Orchester in Cachoeiro de Itapemirim',
    'Orquestra Mariuccia Iacovino': 'Orquestra Mariuccia Iacovino',
    'Uma noite emocionante com grandes melodias, entre o teatro musical, a ópera e o crossover clássico.':
      'Ein bewegender Abend mit großen Melodien aus Musiktheater, Oper und klassischem Crossover.',
    'Um encontro íntimo entre voz, palavra e melodia, com repertórios que atravessam gerações e continuam encontrando novos sentidos ao vivo.':
      'Eine intime Begegnung von Stimme, Wort und Melodie mit einem Repertoire, das Generationen verbindet und live neue Bedeutung gewinnt.',
    'Conheça minha trajetória': 'Meinen Weg entdecken',
    'Uma trajetória entre palcos e encontros':
      'Ein Weg durch Bühnen und Begegnungen',
    'Ópera, televisão, crossover e redes sociais, levando a força do canto lírico para cada vez mais pessoas.':
      'Oper, Fernsehen, Crossover und soziale Medien bringen die Kraft des klassischen Gesangs zu immer mehr Menschen.',
    'Cena da ópera Fedra e Hipólito em um palco de grandes dimensões':
      'Szene aus der Oper Fedra e Hipólito auf einer großen Bühne',
    'Max Wilson Pereira e Hebe Camargo durante apresentação no Credicard Hall':
      'Max Wilson Pereira und Hebe Camargo bei einem Auftritt in der Credicard Hall',
    'Max Wilson Pereira em figurino de época':
      'Max Wilson Pereira in historischem Kostüm',
    'Viena, 2025': 'Wien, 2025',
    'Fedra e Hipólito, Palácio das Artes': 'Fedra e Hipólito, Palácio das Artes',
    'DVD Hebe Camargo, Credicard Hall': 'DVD Hebe Camargo, Credicard Hall',
    'Leia a biografia': 'Biografie lesen',
    'Álbuns': 'Alben',
    'Três momentos de uma trajetória entre romantismo, repertório lírico e crossover.':
      'Drei Momente einer Reise durch Romantik, lyrisches Repertoire und Crossover.',
    'Explore os álbuns': 'Alben entdecken',
    'Viena • Brasil': 'Wien • Brasilien',
    'VÍDEOS': 'VIDEOS',
    'Vídeos': 'Videos',
    'Momentos de palco, encontros e canções que seguem encontrando novas pessoas.': 'Bühnenmomente, Begegnungen und Lieder, die immer neue Menschen erreichen.',
    'A voz em movimento': 'Die Stimme in Bewegung',
    'Veja todos os vídeos no canal de Max Wilson Pereira no YouTube': 'Alle Videos auf Max Wilson Pereiras YouTube-Kanal ansehen',
    'Seleção de vídeos': 'Videoauswahl',
    'Dio Come Ti Amo com Hebe Camargo': 'Dio Come Ti Amo mit Hebe Camargo',
    'Taneyevsky Festival 2017 — Rússia': 'Taneyevsky Festival 2017 — Russland',
    'All I Ask of You, com Marina Elali': 'All I Ask of You mit Marina Elali',
    'Evidências — Versão Ópera': 'Evidências — Opernversion',
    'Hino do Flamengo, com Sandra de Sá e 3 Tenores': 'Flamengo-Hymne mit Sandra de Sá und 3 Tenören',
    'She, de Charles Aznavour — Rio de Janeiro': 'She von Charles Aznavour — Rio de Janeiro',
    'Con te partirò, com Francesca Caforio': 'Con te partirò mit Francesca Caforio',
    'Eu Sei Que Vou Te Amar, com Sylvia Massari': 'Eu Sei Que Vou Te Amar mit Sylvia Massari',
    'Torna a Surriento — em Sorrento': 'Torna a Surriento — in Sorrent',
    'She, de Elvis Costello — Notting Hill': 'She von Elvis Costello — Notting Hill',
    'Awake, de Josh Groban': 'Awake von Josh Groban',
    'A próxima canção começa lá': 'Das nächste Lied beginnt dort',
    'Visitar o canal no YouTube': 'YouTube-Kanal besuchen',
  },
  es:     {
      "A voz continua": "La voz continúa",
      "Uma pausa antes da próxima canção": "Una pausa antes de la siguiente canción.",
      "Canções que permanecem": "Canciones que quedan",
      "Escolher idioma": "Elige idioma",
      "Mudar idioma para": "Cambiar idioma a",
      "Seguir Max Wilson Pereira no": "Sigue a Max Wilson Pereira en",
      "Max Wilson Pereira em apresentação no DVD de Hebe Camargo": "Max Wilson Pereira en presentación del DVD de Hebe Camargo",
      "Max Wilson Pereira em apresentação de opereta": "Max Wilson Pereira en representación de opereta",
      "Max Wilson Pereira em traje formal": "Max Wilson Pereira con traje de gala",
      "Destaques da carreira": "Aspectos destacados de la carrera",
      "Max Wilson Pereira no Taneyevsky Festival 2017": "Max Wilson Pereira en el Festival Taneyevsky 2017",
      "Max Wilson Pereira em apresentação para redes sociais": "Max Wilson Pereira en presentación para redes sociales",
      "Max Wilson Pereira levando o canto lírico para novos públicos": "Max Wilson Pereira lleva el canto lírico a nuevos públicos",
      "Fechar aviso": "Cerrar aviso",
      "Tenor • Ópera & Entretenimento": "Tenor • Ópera y entretenimiento",
      "Tenor • Artista": "Tenor • Artista",
      "Tenor brasileiro": "tenor brasileño",
      "Álbum digital": "álbum digital",
      "Álbum digital liberado": "Lanzamiento del álbum digital",
      "Álbuns": "Álbumes",
      "Três momentos da minha trajetória em música gravada, reunidos para você conhecer cada projeto pelo clima, pela capa e pela história sonora.": "Tres momentos de mi carrera en la música grabada, reunidos para que puedas conocer cada proyecto por su atmósfera, portada e historia sonora.",
      "Coleção de álbuns": "colección de álbumes",
      "Ir para o álbum": "Ir al álbum",
      "Botão do álbum SO IN LOVE": "Botón del álbum TAN ENAMORADO",
      "Botão do álbum Tenori Amici": "Botón del álbum Tenori Amici",
      "Botão do álbum QUATTRO": "Botón del álbum QUATTRO",
      "Capas do álbum Tenori Amici": "Portadas de álbumes de Tenori Amici",
      "Capa do álbum Tenori Amici": "portada del disco Tenori Amici",
      "Contracapa do álbum Tenori Amici": "Contraportada del álbum Tenori Amici",
      "Capas do álbum SO IN LOVE": "TAN ENAMORADA portadas de álbumes",
      "Capa do álbum SO IN LOVE": "portada del disco TAN ENAMORADO",
      "Contracapa do álbum SO IN LOVE": "Contraportada del disco TAN ENAMORADO",
      "Capas do álbum QUATTRO": "portadas de discos de QUATTRO",
      "Capa do álbum QUATTRO": "portada del disco CUATRO",
      "Contracapa do álbum QUATTRO": "Contraportada del álbum QUATTRO",
      "Clássicos românticos, cinema, teatro musical e faixas bônus em uma seleção íntima e emocionante.": "Clásicos románticos, cine, teatro musical y bonus tracks en una selección íntima y emotiva.",
      "Um encontro de vozes, amizade e repertório lírico em uma gravação especial.": "Un encuentro de voces, amistad y repertorio lírico en una grabación especial.",
      "Projeto crossover gravado com o grupo Quattro, unindo grandes canções internacionais e intensidade vocal.": "Proyecto crossover grabado con el grupo Quattro, combinando grandes canciones internacionales e intensidad vocal.",
      "Canto, paixão e entretenimento para alegrar o seu dia e tocar o seu coração": "Canto, pasión y entretenimiento para alegrarte el día y tocar tu corazón.",
      "HOME": "HOME",
      "BIOGRAFIA": "BIOGRAFÍA",
      "CONCERTO": "CONCIERTO",
      "ÁLBUM": "ÁLBUM",
      "ÁLBUMS": "ÁLBUMES",
      "APOIO": "APOYO",
      "Abrir menu": "abrir menú",
      "Fechar menu": "Cerrar menú",
      "Navegação principal": "Navegación principal",
      "Redes sociais": "redes sociales",
      "Redes sociais de Max Wilson Pereira": "Redes sociales de Max Wilson Pereira",
      "Links principais": "Enlaces principales",
      "Siga nas redes sociais": "Seguir en las redes sociales",
      "Bem-vindo": "Bienvenido",
      "Que alegria ter você aqui": "Que alegría tenerte aquí",
      "Este espaço reúne um pouco da minha voz, da minha história e da minha paixão pela música: da tradição lírica às canções que atravessam gerações, sempre com o desejo de tocar o coração de quem escuta.": "Este espacio reúne un poco de mi voz, mi historia y mi pasión por la música: desde la tradición lírica hasta las canciones que atraviesan generaciones, siempre con el deseo de tocar el corazón de quienes las escuchan.",
      "Assista ao vídeo e seja muito bem-vindo ao meu mundo musical.": "Mira el vídeo y bienvenido a mi mundo musical.",
      "Mensagem em vídeo de Max Wilson Pereira": "Mensaje en vídeo de Max Wilson Pereira",
      "Voltar": "para volver",
      "Vídeo de Max Wilson Pereira": "Vídeo de Max Wilson Pereira",
      "Biografia": "Biografía",
      "Uma trajetória entre ópera, televisão, crossover e redes sociais, levando a força do canto lírico para cada vez mais pessoas.": "Una trayectoria entre ópera, televisión, crossover y redes sociales, acercando el poder del canto lírico a cada vez más personas.",
      "é um tenor brasileiro radicado em Viena, artista de presença cênica marcante e voz construída entre a tradição lírica e a comunicação direta com o público. Além da técnica operística, dedicou anos ao estudo do canto musical, desenvolvendo também o domínio de uma emissão mais suave, íntima e expressiva. Nascido em São Paulo e criado no Rio de Janeiro, descobriu a paixão pelo canto aos 18 anos, ao ouvir Luciano Pavarotti, e desde então transformou essa inspiração em uma carreira que atravessa palcos, televisão, gravações e plataformas digitais.": "es un tenor brasileño afincado en Viena, un artista con una impactante presencia escénica y una voz construida entre la tradición lírica y la comunicación directa con el público. Además de la técnica operística, dedicó años al estudio del canto musical, desarrollando también el dominio de una interpretación más suave, íntima y expresiva. Nacido en São Paulo y criado en Río de Janeiro, descubrió su pasión por el canto a los 18 años, al escuchar a Luciano Pavarotti, y desde entonces transformó esa inspiración en una carrera que abarca escenarios, televisión, grabaciones y plataformas digitales.",
      "anos de trajetória artística entre Brasil, Estados Unidos e Europa": "años de trayectoria artística entre Brasil, Estados Unidos y Europa",
      "seguidores no Instagram acompanhando sua arte e seu humor": "Seguidores de Instagram siguiendo tu arte y estado de ánimo.",
      "base artística e musical de uma carreira internacional": "base artística y musical de una carrera internacional",
      "Formação e Primeiros Passos": "Entrenamiento y primeros pasos",
      "Ainda jovem, Max iniciou seus estudos com o tenor Eduardo Alvares enquanto cursava a CAL, Casa das Artes de Laranjeiras, onde concluiu o Curso Profissionalizante de Ator. A formação teatral se tornou uma parte essencial de sua identidade artística: não apenas cantar, mas contar uma história, ocupar o palco e criar uma conexão viva com quem assiste.": "Aún joven, Max comenzó sus estudios con el tenor Eduardo Alvares mientras asistía al CAL, Casa das Artes de Laranjeiras, donde completó el Curso de Actor Profesional. La formación teatral se convirtió en parte esencial de su identidad artística: no sólo cantar, sino contar una historia, ocupar el escenario y crear una conexión viva con quienes miran.",
      "Após anos de estudo em canto lírico, teoria musical e piano, seguiu para Nova York em 2005, onde estudou com Evelyn La Quaif. No ano seguinte, foi convidado pelo professor Sebastian Vittucci para estudar em Viena, na Áustria, frequentando a Konservatorium Wien Privatuniversität em canto lírico e opereta. Também estudou na Vienna Konservatorium com o tenor Agim Hushi, instituição onde obteve seu bacharelado como solista de ópera.": "Después de años de estudiar canto operístico, teoría musical y piano, se mudó a Nueva York en 2005, donde estudió con Evelyn La Quaif. Al año siguiente, fue invitado por el profesor Sebastian Vittucci a estudiar en Viena, Austria, asistiendo al Konservatorium Wien Privatuniversität en canto de ópera y opereta. También estudió en el Konservatorium de Viena con el tenor Agim Hushi, donde obtuvo su licenciatura como solista de ópera.",
      "Palcos, Ópera e Televisão": "Escenario, Ópera y Televisión",
      "Na Áustria, Max participou de concertos, óperas e operetas, destacando-se em papéis como Nemorino, em": "En Austria, Max participó en conciertos, óperas y operetas, destacándose en papeles como Nemorino, en",
      ", de Donizetti, e Herzog von Urbino, em": ", de Donizetti y Herzog von Urbino, en",
      ", de Johann Strauss. Em 2007, cantou no Gran Concerto Lírico di Ferragosto, interpretando árias italianas diante de um público exigente.": ", de Johann Strauss. En 2007 cantó en el Gran Concierto Lírico di Ferragosto, interpretando arias italianas ante un público exigente.",
      "Entre os momentos importantes de sua trajetória internacional, foi convidado a cantar na Rússia em duas ocasiões. Uma dessas apresentações aconteceu no": "Entre los momentos importantes de su carrera internacional, fue invitado a cantar en Rusia en dos ocasiones. Una de estas presentaciones tuvo lugar en",
      ", com a Vladimir Governor Symphony Orchestra sob regência do maestro Artiom Markin.": ", con la Orquesta Sinfónica del Gobernador de Vladimir dirigida por el maestro Artiom Markin.",
      "Depois de três anos em Viena, retornou ao Brasil a convite da Sony Music para integrar o grupo Quattro e gravar um CD. Em 2009, apresentou-se no oratório": "Después de tres años en Viena, regresó a Brasil por invitación de Sony Music para integrar el grupo Quattro y grabar un CD. En 2009 actuó en el oratorio.",
      ", de Carlos Gomes, no Theatro Municipal do Rio de Janeiro. Em 2010, participou da gravação do DVD de Hebe Camargo, interpretando": ", de Carlos Gomes, en el Teatro Municipal de Río de Janeiro. En 2010 participó en la grabación del DVD de Hebe Camargo, interpretando",
      "no Credicard Hall, em São Paulo, e também apareceu na novela": "en Credicard Hall, en São Paulo, y también apareció en la telenovela",
      ", em uma cena de": ", en una escena de",
      "ao lado de Alessandra Maestrini.": "junto a Alessandra Maestrini.",
      "Sua trajetória inclui ainda trabalhos com nomes como Bibi Ferreira, participação na minissérie": "Su carrera también incluye trabajos con nombres como Bibi Ferreira, participación en la miniserie",
      ", estreia mundial da ópera": ", estreno mundial de la ópera",
      ", no Palácio das Artes, e atuação como preparador vocal no": ", en el Palácio das Artes, y actuando como entrenador vocal en",
      ", auxiliando Jonatas Faro no quadro Artista Completão.": ", ayudando a Jonatas Faro en el tablero de Artista Completo.",
      "Crossover, Humor e Público Digital": "Crossover, Humor y Audiencia Digital",
      "Nos últimos anos, Max passou a levar sua voz para um público ainda maior nas redes sociais. Misturando técnica lírica, música pop, paródias criativas e performances de rua, criou uma linguagem própria: sofisticada sem ser distante, divertida sem perder a emoção, popular sem abandonar a excelência vocal.": "En los últimos años, Max ha comenzado a llevar su voz a una audiencia aún mayor en las redes sociales. Mezclando técnica lírica, música pop, parodias creativas y performances callejeras, creó su propio lenguaje: sofisticado sin distanciarse, divertido sin perder la emoción, popular sin abandonar la excelencia vocal.",
      "Seus vídeos já ultrapassaram a marca de 1 milhão de visualizações, e sua comunidade digital reúne mais de 200 mil seguidores no Instagram e milhares de inscritos no YouTube. Com carisma, humor e uma voz de formação clássica, Max aproxima a ópera de quem talvez nunca tivesse imaginado se emocionar com ela.": "Sus videos ya han superado la marca del millón de visitas y su comunidad digital tiene más de 200 mil seguidores en Instagram y miles de suscriptores en YouTube. Con carisma, humor y una voz de formación clásica, Max acerca la ópera a aquellos que nunca hubieran imaginado sentirse conmovidos por ella.",
      "O Momento Atual": "El momento actual",
      "Hoje, Max Wilson Pereira dedica grande parte de sua energia à construção de uma presença digital cada vez mais forte, criando vídeos que aproximam a ópera, o canto lírico e o crossover de públicos que talvez nunca tivessem imaginado se emocionar com esse repertório. Radicado em Viena e profundamente conectado ao Brasil, ele transforma ruas, praias, estações, casas e situações cotidianas em pequenos palcos, onde a técnica vocal encontra a surpresa, a emoção e o humor.": "Hoy, Max Wilson Pereira dedica gran parte de su energía a construir una presencia digital cada vez más fuerte, creando videos que acercan la ópera, el canto lírico y el crossover a públicos que quizás nunca hubieran imaginado conmoverse con este repertorio. Radicado en Viena y profundamente conectado con Brasil, transforma calles, playas, estaciones, casas y situaciones cotidianas en pequeños escenarios, donde la técnica vocal se encuentra con la sorpresa, la emoción y el humor.",
      "Seu trabalho nas redes nasce do desejo de mostrar que a voz lírica não precisa viver distante das pessoas. Em performances emocionantes, paródias musicais, interações com desconhecidos e vídeos bem-humorados, Max leva a ópera para novos contextos, despertando curiosidade, risadas e reações espontâneas. É nesse encontro entre excelência artística e comunicação direta que ele segue criando novos caminhos para compartilhar sua arte com quem já o acompanha e com quem ainda vai descobri-lo.": "Su trabajo en las redes nace del deseo de demostrar que la voz lírica no necesita vivir alejada de la gente. En emocionantes actuaciones, parodias musicales, interacciones con extraños y videos humorísticos, Max lleva la ópera a nuevos contextos, despertando curiosidad, risas y reacciones espontáneas. Es en este encuentro entre excelencia artística y comunicación directa que continúa creando nuevas formas de compartir su arte con quienes ya lo siguen y con quienes aún están por descubrirlo.",
      "Apoie Minha Jornada": "Apoya mi viaje",
      "Se você está aqui, tudo indica que você": "Si estás aquí, todo indica que",
      "admira o meu trabalho": "admira mi trabajo",
      "e": "y",
      "tem carinho por mim e pela minha carreira": "Él se preocupa por mí y mi carrera.",
      ". Isso, por si só, já me enche de alegria. ❤️❤️❤️": ". Eso, en sí mismo, me llena de alegría. ❤️❤️❤️",
      "PIX para Apoio": "Foto de soporte",
      "Qualquer valor": "cualquier valor",
      "será recebido de coração — como um ingresso para meu espetáculo, ópera ou musical. Você acompanha meu trabalho de graça nas redes; este é um gesto de apoio real.": "será recibido de todo corazón, como una entrada para mi espectáculo, ópera o musical. Sigues mi trabajo gratis en las redes; Este es un verdadero gesto de apoyo.",
      "Fico muito feliz em saber que está considerando me apoiar. Seu gesto significa muito para o caminho que estou construindo como artista.": "Me alegra mucho saber que estás pensando en apoyarme. Tu gesto significa mucho para el camino que estoy tomando como artista.",
      "Muito obrigado, de coração.": "Muchas gracias, desde el fondo de mi corazón.",
      "Nos últimos anos, investi tempo, energia e recursos na produção e divulgação do meu trabalho. Para seguir em frente — levando o canto lírico a quem talvez nunca o tenha ouvido —": "En los últimos años he invertido tiempo, energía y recursos en producir y difundir mi trabajo. Para seguir adelante, llevando el canto lírico a quienes quizás nunca lo hayan escuchado,",
      "sua ajuda é fundamental": "tu ayuda es esencial",
      ".": ".",
      "Este espaço representa um": "Este espacio representa un",
      "gesto de carinho e apoio real": "gesto de cariño y apoyo real",
      "à minha jornada como artista. Se você acredita no meu trabalho, este é o lugar certo. Ficarei eternamente grato.": "a mi viaje como artista. Si crees en mi trabajo, este es el lugar indicado. Estaré eternamente agradecido.",
      "O apoio recebido será, em grande parte,": "El apoyo recibido será en gran medida",
      "reinvestido na minha carreira": "reinvertido en mi carrera",
      ", para levar minha arte e o canto lírico cada vez mais longe.": ", para llevar mi arte y canto lírico cada vez más lejos.",
      "Receber seu apoio neste momento será um grande motivo de alegria e orgulho para mim.": "Recibir su apoyo en este momento será para mí un gran motivo de alegría y orgullo.",
      "Álbum SO IN LOVE + Bônus": "Álbum SO IN LOVE + Bonus",
      "- álbum digital": "-álbum digital",
      "Muito obrigado pelo seu interesse no meu trabalho! ❤️❤️❤️": "¡Muchas gracias por tu interés en mi trabajo! ❤️❤️❤️",
      "Álbum digital em formato MP3": "Álbum digital en formato MP3",
      "do tenor brasileiro Max Wilson Pereira, trazendo emoção, romantismo e interpretações marcantes de grandes clássicos.": "del tenor brasileño Max Wilson Pereira, aportando emoción, romanticismo e interpretaciones sorprendentes de grandes clásicos.",
      "Atenção: este é um produto digital. Você não receberá um CD físico, apenas arquivos para download.": "Tenga en cuenta: este es un producto digital. No recibirá un CD físico, solo archivos descargables.",
      "Como comprar via PIX": "Cómo comprar a través de PIX",
      "Faça um PIX de": "hacer una foto",
      "para:": "a:",
      "Depois de fazer o PIX, digite abaixo o nome que aparece no pagamento (nome do titular da conta que fez o PIX) e clique no botão para continuar.": "Después de realizar la PIX, ingrese el nombre que aparece en el pago a continuación (nombre del titular de la cuenta que realizó la PIX) y haga clic en el botón para continuar.",
      "Digite aqui o nome usado no PIX": "Introduzca aquí el nombre utilizado en PIX",
      "CONTINUAR": "CONTINUAR",
      "Repertório": "Repertorio",
      "Músicas eternas, entre elas:": "Canciones eternas, que incluyen:",
      "Bônus Exclusivo": "Bono Exclusivo",
      "Além do álbum, você recebe clássicos cantados com toda a alma:": "Además del disco, recibes clásicos cantados con toda el alma:",
      "Volta ao Meu Mundo (música inédita)": "Return to My World (canción inédita)",
      "Primadonna (música inédita)": "Primadonna (canción inédita)",
      "Obrigado pelo seu apoio": "Gracias por tu apoyo",
      "Se você efetuou o": "Si realizaste el",
      ", muito obrigado! Seu interesse e seu apoio ao meu trabalho": ", ¡muchas gracias! Su interés y apoyo a mi trabajo.",
      "significam muito para mim": "significa mucho para mi",
      "Quero te dizer algo com toda sinceridade: eu optei por": "Quiero decirles algo con toda sinceridad: elegí",
      "não bloquear o download": "no bloquees la descarga",
      ", mesmo antes de conferir o pagamento. Eu escolho": ", incluso antes de comprobar el pago. yo elijo",
      "confiar em você": "confiar en ti",
      ", que me acompanha e apoia minha jornada com carinho e respeito, e ficarei muito feliz quando perceber que você fez o PIX, ao ver o seu nome nos recebimentos na minha conta.": ", que me acompaña y apoya mi camino con cariño y respeto, y estaré muy feliz cuando me dé cuenta de que completaste la PIX, cuando vea tu nombre en los recibos de mi cuenta.",
      "Se ainda não fez o pagamento, peço com todo respeito que": "Si aún no has realizado el pago, te pido respetuosamente que",
      "só faça o download depois de ter efetuado o pagamento": "Descargar solo después de realizar el pago",
      "Vou ficar muito feliz se escolher uma das músicas e": "Estaré muy feliz si eliges una de las canciones y",
      "compartilhar um story no Instagram me marcando": "comparte una historia en Instagram etiquetándome",
      "Você pode escrever algo simples como:": "Puedes escribir algo simple como:",
      "\"Comprei o álbum SO IN LOVE do @maxwilsonpereira e estou adorando! 🎶\"": "\"Compré el álbum SO IN LOVE de @maxwilsonpereira y ¡me encanta! 🎶\"",
      "\"Estou ouvindo SO IN LOVE do tenor @maxwilsonpereira e estou adorando! 🎶\"": "\"¡Estoy escuchando SO IN LOVE del tenor @maxwilsonpereira y me encanta! 🎶\"",
      "Isso ajuda": "esto ayuda",
      "muito mais pessoas": "mucha más gente",
      "a descobrirem minha música.": "para descubrir mi música.",
      "Projeto de 2011 da Sony Music Entertainment Brasil com o Grupo Quattro, revisitando grandes canções internacionais em formato crossover vocal.": "Proyecto de 2011 de Sony Music Entertainment Brasil con Grupo Quattro, revisitando grandes canciones internacionales en un formato de crossover vocal.",
      "Álbum lançado pela gravadora Biscoito Fino, reunindo repertório clássico e popular em formato crossover vocal.": "Álbum editado por el sello discográfico Biscoito Fino, que reúne repertorio clásico y popular en un formato crossover vocal.",
      "Lançado pela gravadora Biscoito Fino em 2017, Con Amore reúne o Tenori Amici em repertório clássico e popular com espírito crossover.": "Lanzado por el sello discográfico Biscoito Fino en 2017, Con Amore reúne a Tenori Amici en un repertorio clásico y popular con espíritu crossover.",
      "O álbum completo está disponível no Spotify.": "El álbum completo está disponible en Spotify.",
      "Ouvir no Spotify": "Escuchar en Spotify",
      "Ouvir o álbum QUATTRO completo no Spotify": "Escucha el álbum completo QUATTRO en Spotify",
      "Ouvir Tenori Amici no Spotify": "Escucha Tenori Amici en Spotify",
      "Baixar todas as músicas": "Descargar todas las canciones",
      "13 faixas": "13 pistas",
      "11 faixas": "11 pistas",
      "11 amostras": "11 muestras",
      "Suas músicas": "Tus canciones",
      "Amostras": "Muestras",
      "Prévia MP3": "Vista previa de MP3",
      "Seu navegador não suporta reprodução de áudio.": "Su navegador no admite la reproducción de audio.",
      "Baixar": "para bajar",
      "Play": "Jugar",
      "Ouvir amostra": "Escuchar muestra",
      "Pausar": "Pausa",
      "Preparando downloads...": "Preparando descargas...",
      "Faixas Bônus": "Pistas extra",
      "Max Wilson Pereira | Tenor Brasileiro em Viena": "Max Wilson Pereira | Tenor brasileño en Viena",
      "Biografia | Max Wilson Pereira": "Biografía | Max Wilson Pereira",
      "Concerto de Ópera e Crossover | Max Wilson Pereira": "Concierto de Ópera y Crossover | Max Wilson Pereira",
      "Apoie Minha Jornada | Max Wilson Pereira": "Apoye mi viaje | Max Wilson Pereira",
      "Álbum SO IN LOVE | Max Wilson Pereira": "Álbum TAN ENAMORADO | Max Wilson Pereira",
      "Álbuns e Música | Max Wilson Pereira": "Álbumes y Música | Max Wilson Pereira",
      "Baixar Álbum SO IN LOVE | Max Wilson Pereira": "Descargar Álbum TAN ENAMORADO | Max Wilson Pereira",
      "Baixar Álbum QUATTRO | Max Wilson Pereira": "Descargar Álbum QUATTRO | Max Wilson Pereira",
      "Baixar Album QUATTRO | Max Wilson Pereira": "Descargar Álbum QUATTRO | Max Wilson Pereira",
      "Amostras do Álbum QUATTRO | Max Wilson Pereira": "Muestras de álbumes de QUATTRO | Max Wilson Pereira",
      "Amostras do Álbum Tenori Amici | Max Wilson Pereira": "Muestras de álbumes de Tenori Amici | Max Wilson Pereira",
      "Conheça Max Wilson Pereira, tenor brasileiro radicado em Viena, com uma trajetória entre ópera, crossover clássico, televisão, concertos e música gravada.": "Conoce a Max Wilson Pereira, un tenor brasileño afincado en Viena, con una carrera entre ópera, crossover clásico, televisión, conciertos y música grabada.",
      "Tenor brasileiro em Viena. Ópera, crossover clássico, concertos e música gravada em uma trajetória guiada pela emoção da voz.": "Tenor brasileño en Viena. Ópera, crossover clásico, conciertos y música grabada en una trayectoria guiada por la emoción de la voz.",
      "Ouça os álbuns de Max Wilson Pereira: SO IN LOVE, Tenori Amici e QUATTRO, entre repertório lírico, romantismo e crossover clássico.": "Escuche los álbumes de Max Wilson Pereira: SO IN LOVE, Tenori Amici y QUATTRO, entre repertorio lírico, romanticismo y crossover clásico.",
      "Álbuns de Max Wilson Pereira: repertórios românticos, crossover clássico e gravações especiais.": "Álbumes de Max Wilson Pereira: repertorios románticos, crossover clásicos y grabaciones especiales.",
      "Coleção de álbuns de Max Wilson Pereira, tenor brasileiro.": "Colección de álbumes de Max Wilson Pereira, tenor brasileño.",
      "Conheça a trajetória de Max Wilson Pereira, tenor brasileiro radicado em Viena, da formação lírica aos palcos, televisão e redes sociais.": "Descubre la trayectoria de Max Wilson Pereira, tenor brasileño afincado en Viena, desde la formación lírica hasta el escenario, la televisión y las redes sociales.",
      "A história de Max Wilson Pereira: tenor brasileiro, artista de crossover, criador digital e intérprete que une ópera, pop, humor e emoção.": "La historia de Max Wilson Pereira: tenor brasileño, artista crossover, creador digital e intérprete que combina ópera, pop, humor y emoción.",
      "Descubra o concerto de Max Wilson Pereira: uma experiência íntima entre ópera, teatro musical, grandes melodias e crossover clássico, com voz e piano.": "Descubra el concierto de Max Wilson Pereira: una experiencia íntima entre ópera, teatro musical, grandes melodías y crossover clásico, con voz y piano.",
      "Uma noite íntima com voz, piano, convidados especiais, grandes melodias, teatro musical, ópera e crossover clássico.": "Una velada íntima con voz, piano, invitados especiales, grandes melodías, teatro musical, ópera y crossover clásico.",
      "Max Wilson Pereira em imagem de divulgação do concerto": "Max Wilson Pereira en imagen publicitaria del concierto",
      "Concerto ao vivo": "Concierto en vivo",
      "Concerto": "Concierto",
      "Uma noite emocionante com grandes melodias, entre o teatro musical, a ópera e o crossover clássico.": "Una noche emocionante y con grandes melodías, entre teatro musical, ópera y crossover clásico.",
      "Quero assistir": "quiero mirar",
      "Sobre o concerto": "Sobre el concierto",
      "Uma experiência próxima, elegante e emocionante": "Una experiencia cercana, elegante y emocionante",
      "Este concerto nasce do desejo de cantar repertórios que atravessam gerações e continuam encontrando novos sentidos quando são vividos ao vivo. Ao lado de um pianista, com a presença de uma soprano convidada e, muito provavelmente, também de um violinista, a noite propõe um encontro íntimo entre voz, palavra e melodia.": "Este concierto nace del deseo de cantar repertorios que atraviesan generaciones y continúan encontrando nuevos significados cuando se viven en vivo. Junto a un pianista, con la presencia de una soprano invitada y, probablemente, también de un violinista, la velada propone un encuentro íntimo entre voz, palabra y melodía.",
      "O público ouvirá canções eternas da Broadway, dos musicais, da ópera e de clássicos populares interpretadas com acompanhamento ao piano, convidados especiais e uma atmosfera de teatro próximo. Mais do que uma sequência de músicas, o concerto procura contar pequenas histórias: amores possíveis, despedidas, sonhos, lembranças e momentos em que uma melodia parece dizer aquilo que as palavras sozinhas não alcançam.": "El público escuchará canciones eternas de Broadway, musicales, ópera y clásicos populares interpretados con acompañamiento de piano, invitados especiales y una atmósfera teatral de primer plano. Más que una secuencia de canciones, el concierto busca contar pequeñas historias: amores posibles, despedidas, sueños, recuerdos y momentos en los que una melodía parece decir lo que las palabras por sí solas no pueden lograr.",
      "Max Wilson Pereira em apresentação ao vivo": "Max Wilson Pereira en una actuación en directo",
      "Uma nova jornada": "un nuevo viaje",
      "O início de uma nova fase artística": "El comienzo de una nueva etapa artística",
      "Este projeto marca o começo de uma nova fase na minha carreira. Depois de tantos caminhos entre ópera, televisão, gravações, redes sociais e repertório crossover, sinto que este concerto reúne de forma muito verdadeira aquilo que mais me move: cantar com emoção, contar histórias e estar perto do público.": "Este proyecto marca el comienzo de una nueva etapa en mi carrera. Después de tantos caminos entre ópera, televisión, grabaciones, redes sociales y repertorio cruzado, siento que realmente este concierto reúne lo que más me mueve: cantar con emoción, contar historias y estar cerca del público.",
      "As primeiras apresentações acontecerão na": "Las primeras presentaciones tendrán lugar en",
      "Áustria": "Austria",
      ", país que há muitos anos faz parte da minha vida musical. No fim do ano, em": ", país que forma parte de mi vida musical desde hace muchos años. A finales de año, en",
      "dezembro": "Diciembre",
      ", o concerto também será apresentado no": ", el concierto también se presentará en",
      "Brasil": "Brasil",
      ", em um retorno muito especial a esse repertório diante do meu público brasileiro.": ", en un regreso muy especial a este repertorio frente a mi público brasileño.",
      "Minha esperança é que, a partir de": "Mi esperanza es que desde",
      ", este projeto cresça e se transforme em uma turnê pelo Brasil, levando essas canções a plateias de diferentes cidades. Ainda é um caminho sendo construído, mas ele nasce com sinceridade, cuidado e muita vontade de compartilhar beleza.": ", este proyecto crece y se convierte en una gira por Brasil, llevando estas canciones al público de diferentes ciudades. Es un camino aún en construcción, pero nace con sinceridad, cariño y muchas ganas de compartir la belleza.",
      "Ensaio": "Ensayo",
      "Preparando o concerto ao piano": "Preparando el concierto de piano",
      "Este vídeo mostra um momento simples de ensaio ao piano, preparando uma das canções que farão parte do concerto.": "Este vídeo muestra un sencillo momento de ensayo al piano, preparando una de las canciones que formarán parte del concierto.",
      "Max Wilson Pereira ensaiando ao piano para o concerto": "Max Wilson Pereira ensayando al piano para el concierto",
      "Melodias que permanecem": "Melodías que quedan",
      "O repertório pode variar a cada apresentação, preservando a liberdade do momento e o encontro com cada plateia. Entre as obras previstas estão:": "El repertorio podrá variar con cada actuación, preservando la libertad del momento y el encuentro con cada público. Entre las obras previstas se encuentran:",
      "clássico popular": "clasico popular",
      "Duetos": "Duetos",
      "Muitas outras canções bonitas também poderão fazer parte de cada apresentação.": "Muchas otras hermosas canciones también pueden formar parte de cada actuación.",
      "Convite": "Invitación",
      "Viva este concerto ao vivo": "Vive este concierto en vivo",
      "Algumas músicas revelam sua força de modo especial quando acontecem no mesmo instante em que respiramos juntos: artista, convidados e plateia. Este concerto é um convite para esse encontro.": "Algunas canciones revelan su fuerza de manera especial cuando ocurren en el mismo momento en el que respiramos juntos: artista, invitados y público. Este concierto es una invitación a ese encuentro.",
      "Informações em breve": "Información próximamente",
      "Apoie a jornada artística do tenor Max Wilson Pereira via PIX. Qualquer valor é recebido de coração e reinvestido na carreira e no canto lírico.": "Apoye el recorrido artístico del tenor Max Wilson Pereira a través de PIX. Cualquier cantidad se recibe de todo corazón y se reinvierte en la carrera y el canto operístico.",
      "Apoie o tenor Max Wilson Pereira via PIX. Seu apoio ajuda a levar o canto lírico e a cultura a mais pessoas.": "Apoya al tenor Max Wilson Pereira vía PIX. Tu apoyo ayuda a acercar el canto y la cultura operística a más personas.",
      "Compre o álbum SO IN LOVE do tenor Max Wilson Pereira via PIX. Emoção, romantismo e clássicos como Tonight, Over the Rainbow, Nessun dorma. Inclui bônus exclusivos.": "Compra el álbum SO IN LOVE del tenor Max Wilson Pereira vía PIX. Emoción, romanticismo y clásicos como Tonight, Over the Rainbow, Nessun dorma. Incluye bonos exclusivos.",
      "Álbum especial do tenor Max Wilson Pereira. Emoção, romantismo e interpretações de grandes clássicos. Compre via PIX e receba bônus exclusivos.": "Álbum especial del tenor Max Wilson Pereira. Emoción, romanticismo e interpretaciones de grandes clásicos. Compra a través de PIX y recibe bonos exclusivos.",
      "Página de download do álbum digital SO IN LOVE de Max Wilson Pereira.": "Página de descarga del álbum digital SO IN LOVE de Max Wilson Pereira.",
      "Baixe o álbum SO IN LOVE e obrigado por apoiar a jornada artística de Max Wilson Pereira.": "Descarga el álbum SO IN LOVE y gracias por apoyar el viaje artístico de Max Wilson Pereira.",
      "Ouça amostras do álbum QUATTRO e acesse o álbum completo no Spotify.": "Escuche muestras del álbum QUATTRO y acceda al álbum completo en Spotify.",
      "Ouça amostras de QUATTRO, projeto de 2011 da Sony Music Entertainment Brasil, e acesse o álbum completo no Spotify.": "Escuche muestras de QUATTRO, un proyecto de 2011 de Sony Music Entertainment Brasil, y acceda al álbum completo en Spotify.",
      "Ouça amostras do álbum Tenori Amici - Con Amore, lançado pela Biscoito Fino, e acesse o álbum completo no Spotify.": "Escuche muestras del álbum Tenori Amici - Con Amore, lanzado por Biscoito Fino, y acceda al álbum completo en Spotify.",
      "Ouça amostras de Tenori Amici - Con Amore, álbum lançado pela Biscoito Fino, e acesse o álbum completo no Spotify.": "Escuche muestras de Tenori Amici - Con Amore, un álbum lanzado por Biscoito Fino, y acceda al álbum completo en Spotify.",
      "Conheça o concerto": "Descubre el concierto",
      "Ouça minha música": "escucha mi musica",
      "Ir para o destaque do concerto": "Ir al concierto destacado",
      "Explore": "Explorar",
      "Max Wilson Pereira cantando com uma orquestra em Cachoeiro de Itapemirim": "Max Wilson Pereira cantando con orquesta en Cachoeiro de Itapemirim",
      "Orquestra Mariuccia Iacovino": "Orquesta Mariuccia Iacovino",
      "Um encontro íntimo entre voz, palavra e melodia, com repertórios que atravessam gerações e continuam encontrando novos sentidos ao vivo.": "Un encuentro íntimo entre voz, palabra y melodía, con repertorios que atraviesan generaciones y siguen encontrando nuevos significados en vivo.",
      "Conheça minha trajetória": "Descubre mi trayectoria",
      "Uma trajetória entre palcos e encontros": "Una trayectoria entre etapas y encuentros",
      "Ópera, televisão, crossover e redes sociais, levando a força do canto lírico para cada vez mais pessoas.": "Ópera, televisión, crossover y redes sociales, acercando el poder del canto lírico a cada vez más personas.",
      "Cena da ópera Fedra e Hipólito em um palco de grandes dimensões": "Escena de la ópera Fedra e Hipólito en un gran escenario.",
      "Max Wilson Pereira e Hebe Camargo durante apresentação no Credicard Hall": "Max Wilson Pereira y Hebe Camargo durante una presentación en Credicard Hall",
      "Max Wilson Pereira em figurino de época": "Max Wilson Pereira con traje de época",
      "Viena, 2025": "Viena, 2025",
      "Fedra e Hipólito, Palácio das Artes": "Fedra e Hipólito, Palacio de las Artes",
      "DVD Hebe Camargo, Credicard Hall": "DVD Hebe Camargo, Sala Credicard",
      "Leia a biografia": "leer la biografia",
      "Três momentos de uma trajetória entre romantismo, repertório lírico e crossover.": "Tres momentos en una trayectoria entre romanticismo, repertorio lírico y cruce.",
      "Explore os álbuns": "Explora los álbumes",
      "Viena • Brasil": "Viena • Brasil",
      "VÍDEOS": "VÍDEOS",
      "Vídeos": "Vídeos",
      "Momentos de palco, encontros e canções que seguem encontrando novas pessoas.": "Momentos de escenario, encuentros y canciones que siguen encontrando nuevas personas.",
      "A voz em movimento": "La voz en movimiento",
      "Veja todos os vídeos no canal de Max Wilson Pereira no YouTube": "Ve todos los videos en el canal de YouTube de Max Wilson Pereira",
      "Seleção de vídeos": "Selección de videos",
      "Dio Come Ti Amo com Hebe Camargo": "Dio Come Ti Amo con Hebe Camargo",
      "Taneyevsky Festival 2017 — Rússia": "Festival Taneyevsky 2017 — Rusia",
      "All I Ask of You, com Marina Elali": "All I Ask of You, con Marina Elali",
      "Evidências — Versão Ópera": "Evidências — Versión Ópera",
      "Hino do Flamengo, com Sandra de Sá e 3 Tenores": "Himno del Flamengo, con Sandra de Sá y 3 Tenores",
      "She, de Charles Aznavour — Rio de Janeiro": "She, de Charles Aznavour — Río de Janeiro",
      "Con te partirò, com Francesca Caforio": "Con te partirò, con Francesca Caforio",
      "Eu Sei Que Vou Te Amar, com Sylvia Massari": "Eu Sei Que Vou Te Amar, con Sylvia Massari",
      "Torna a Surriento — em Sorrento": "Torna a Surriento — en Sorrento",
      "She, de Elvis Costello — Notting Hill": "She, de Elvis Costello — Notting Hill",
      "Awake, de Josh Groban": "Awake, de Josh Groban",
      "A próxima canção começa lá": "La próxima canción comienza allí",
      "Visitar o canal no YouTube": "Visitar el canal de YouTube"
    }
};
function getCurrentLanguage() {
  const pathLanguage = getLanguageFromPath(window.location.pathname);
  if (pathLanguage) {
    try {
      localStorage.setItem('mwp-language', pathLanguage);
    } catch {
      // The localized URL remains authoritative when storage is unavailable.
    }
    return pathLanguage;
  }

  const params = new URLSearchParams(window.location.search);
  const requested = params.get('lang');
  if (MWP_LANGUAGES[requested]) {
    try {
      localStorage.setItem('mwp-language', requested);
    } catch {
      // Continue with the URL language when storage is unavailable.
    }
    return requested;
  }

  const currentRoute = normalizePath(window.location.pathname);
  if (MWP_LOCALIZED_PAGE_PATHS.has(currentRoute)) {
    try {
      localStorage.setItem('mwp-language', 'pt');
    } catch {
      // The Portuguese public URL remains authoritative without storage.
    }
    return 'pt';
  }

  let stored = null;
  try {
    stored = localStorage.getItem('mwp-language');
  } catch {
    stored = null;
  }
  if (MWP_LANGUAGES[stored]) return stored;

  return getDefaultLanguage();
}

function getDefaultLanguage() {
  const browserLanguages = navigator.languages?.length
    ? navigator.languages
    : [navigator.language].filter(Boolean);
  const hasBrazilianPortuguese = browserLanguages.some(
    (language) => language.toLowerCase() === 'pt-br',
  );

  let timeZone = '';
  try {
    timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
  } catch {
    timeZone = '';
  }

  const brazilTimeZones = new Set([
    'America/Sao_Paulo',
    'America/Noronha',
    'America/Belem',
    'America/Fortaleza',
    'America/Recife',
    'America/Araguaina',
    'America/Maceio',
    'America/Bahia',
    'America/Cuiaba',
    'America/Campo_Grande',
    'America/Porto_Velho',
    'America/Boa_Vista',
    'America/Manaus',
    'America/Eirunepe',
    'America/Rio_Branco',
  ]);

  return hasBrazilianPortuguese || brazilTimeZones.has(timeZone) ? 'pt' : 'en';
}

function translatePhrase(text, language = getCurrentLanguage()) {
  if (!text || language === 'pt') return text;
  const normalized = text.replace(/\s+/g, ' ').trim();
  return MWP_TEXT_TRANSLATIONS[language]?.[normalized] || text;
}

function getLanguageHref(language) {
  const route = normalizePath(window.location.pathname);
  const hash = window.location.hash || '';

  if (isSoInLoveAlbumPagePath(route) || isSoInLovePixPagePath(route)) {
    if (language === 'pt') return `/${MWP_SO_IN_LOVE_PIX_PAGE_PATH}${hash}`;
    return `/${MWP_SO_IN_LOVE_ALBUM_PAGE_PATH}?lang=${language}${hash}`;
  }

  if (MWP_LOCALIZED_PAGE_PATHS.has(route)) {
    return `${getLocalizedRoute(route, language)}${hash}`;
  }

  const url = new URL(window.location.href);
  url.searchParams.set('lang', language);
  return `${url.pathname}${url.search}${url.hash}`;
}

const MWP_SUPPORT_PAGE_PATH = 'pages/apoio-pix.html';
const MWP_SO_IN_LOVE_PIX_PAGE_PATH = 'pages/albums/so-in-love-pix.html';
const MWP_SO_IN_LOVE_ALBUM_PAGE_PATH = 'pages/albums/so-in-love.html';
const MWP_ALBUMS_PAGE_PATH = 'pages/albums.html';
const MWP_LOCALIZED_PAGE_PATHS = new Set([
  'index.html',
  'pages/biografia.html',
  'pages/concerto.html',
  'pages/albums.html',
  'pages/albums/tenori-amici.html',
  'pages/albums/quattro-sony.html',
]);

function getLanguageFromPath(path) {
  const firstSegment = path.split('/').filter(Boolean)[0];
  return firstSegment === 'en' || firstSegment === 'de' || firstSegment === 'es'
    ? firstSegment
    : null;
}

function getLocalizedRoute(route, language) {
  const normalizedRoute = normalizePath(route);
  const suffix = normalizedRoute === 'index.html' ? '' : normalizedRoute;
  if (language === 'pt') return suffix ? `/${suffix}` : '/';
  return suffix ? `/${language}/${suffix}` : `/${language}/`;
}

function isSoInLovePixPagePath(path) {
  const normalizedPath = normalizePath(path);
  return (
    normalizedPath === MWP_SO_IN_LOVE_PIX_PAGE_PATH ||
    normalizedPath === `${MWP_SO_IN_LOVE_PIX_PAGE_PATH}m`
  );
}

function isSoInLoveAlbumPagePath(path) {
  const normalizedPath = normalizePath(path);
  return (
    normalizedPath === MWP_SO_IN_LOVE_ALBUM_PAGE_PATH ||
    normalizedPath === `${MWP_SO_IN_LOVE_ALBUM_PAGE_PATH}m`
  );
}

function redirectInternationalAlbumPurchase() {
  if (
    getCurrentLanguage() === 'pt' ||
    !isSoInLovePixPagePath(window.location.pathname)
  ) {
    return;
  }

  const url = new URL(window.location.href);
  url.pathname = new URL(
    `${getBasePath()}${MWP_SO_IN_LOVE_ALBUM_PAGE_PATH}`,
    window.location.href,
  ).pathname;
  window.location.replace(`${url.pathname}${url.search}${url.hash}`);
}

function isSupportPagePath(path) {
  const normalizedPath = normalizePath(path);
  return (
    normalizedPath === MWP_SUPPORT_PAGE_PATH ||
    normalizedPath === `${MWP_SUPPORT_PAGE_PATH}m`
  );
}

function isSupportPage() {
  return isSupportPagePath(window.location.pathname);
}

function isSupportLink(link) {
  if (
    !link?.href ||
    link.href.startsWith('#') ||
    /^https?:\/\//.test(link.href)
  ) {
    return false;
  }

  const linkPath = new URL(getPageHref(link.href), window.location.href)
    .pathname;
  return isSupportPagePath(linkPath);
}

function getVisibleNavigationLinks(links) {
  // Start with language-based filtering (support page hidden for non-PT locales)
  let visible = getCurrentLanguage() === 'pt' ? links.slice() : links.filter((link) => !isSupportLink(link));

  // Use per-link `visible` flag when present. Default is visible unless explicitly false.
  visible = visible.filter((link) => (link?.visible === undefined ? true : Boolean(link.visible)));

  return visible;
}

function renderLanguageSwitcher() {
  const currentLanguage = getCurrentLanguage();
  if (isSupportPage()) {
    return `<div class="language-switcher" aria-label="${translatePhrase('Escolher idioma', currentLanguage)}" aria-hidden="true"></div>`;
  }

  const buttons = Object.values(MWP_LANGUAGES)
    .filter((language) => language.code !== currentLanguage)
    .map(
      (language) => `
        <a class="language-switch-link" href="${getLanguageHref(language.code)}" data-language="${language.code}" lang="${language.htmlLang}" hreflang="${language.htmlLang}" aria-label="${translatePhrase('Mudar idioma para', currentLanguage)} ${language.name}" title="${language.name}">
          <span class="language-switch-flag language-switch-flag-${language.code}" aria-hidden="true"></span>
        </a>
      `,
    )
    .join('');

  return `<div class="language-switcher" aria-label="${translatePhrase('Escolher idioma', currentLanguage)}">${buttons}</div>`;
}

function renderEnglishFlagLink() {
  const currentLanguage = getCurrentLanguage();
  if (isSupportPage()) return '';

  const language = currentLanguage === 'en' ? MWP_LANGUAGES.pt : MWP_LANGUAGES.en;

  return `
    <a class="site-header-mobile-english language-switch-link" href="${getLanguageHref(language.code)}" data-language="${language.code}" lang="${language.htmlLang}" hreflang="${language.htmlLang}" aria-label="${translatePhrase('Mudar idioma para', currentLanguage)} ${language.name}" title="${language.name}">
      <span class="language-switch-flag language-switch-flag-${language.code}" aria-hidden="true"></span>
    </a>
  `;
}

function translateTextNode(node, language) {
  const value = node.nodeValue;
  const trimmed = value.replace(/\s+/g, ' ').trim();
  const translated = translatePhrase(trimmed, language);
  if (!trimmed || translated === trimmed) return;

  const leading = value.match(/^\s*/)?.[0] || '';
  const trailing = value.match(/\s*$/)?.[0] || '';
  node.nodeValue = `${leading}${translated}${trailing}`;
}

function translateAttribute(element, attr, language) {
  const value = element.getAttribute(attr);
  if (!value) return;

  let translated = translatePhrase(value, language);
  if (translated === value) {
    translated = value
      .replace(
        /^Tocar (.+)$/u,
        (_, title) => `${language === 'de' ? 'Abspielen' : language === 'es' ? 'Reproducir' : 'Play'} ${title}`,
      )
      .replace(
        /^Baixar (.+)$/u,
        (_, title) =>
          `${language === 'de' ? 'Herunterladen' : language === 'es' ? 'Descargar' : 'Download'} ${title}`,
      )
      .replace(
        /^Capas do álbum (.+)$/u,
        (_, title) =>
          `${language === 'de' ? 'Albumcover von' : language === 'es' ? 'Portadas del álbum de' : 'Album covers for'} ${title}`,
      )
      .replace(
        /^Capa do álbum (.+)$/u,
        (_, title) =>
          `${language === 'de' ? 'Vorderseite des Albums' : language === 'es' ? 'Portada del álbum' : 'Front cover of'} ${title}`,
      )
      .replace(
        /^Contracapa do álbum (.+)$/u,
        (_, title) =>
          `${language === 'de' ? 'Rückseite des Albums' : language === 'es' ? 'Contraportada del álbum' : 'Back cover of'} ${title}`,
      )
      .replace(
        /^Seguir Max Wilson Pereira no (.+)$/u,
        (_, social) =>
          `${language === 'de' ? 'Max Wilson Pereira folgen auf' : language === 'es' ? 'Seguir a Max Wilson Pereira en' : 'Follow Max Wilson Pereira on'} ${social}`,
      );
  }

  if (translated !== value) element.setAttribute(attr, translated);
}

function applyStaticTranslations() {
  const language = getCurrentLanguage();
  document.documentElement.lang = MWP_LANGUAGES[language].htmlLang;
  if (language === 'pt') return;

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);
  textNodes.forEach((node) => translateTextNode(node, language));

  document
    .querySelectorAll('[alt], [aria-label], [title], [placeholder]')
    .forEach((element) => {
      ['alt', 'aria-label', 'title', 'placeholder'].forEach((attr) => {
        if (element.hasAttribute(attr))
          translateAttribute(element, attr, language);
      });
    });
}

window.MWP_I18N = {
  getCurrentLanguage,
  getPageHref,
  translatePhrase,
  applyStaticTranslations,
};

function getPageHref(href) {
  if (
    !href ||
    href.startsWith('/') ||
    href.startsWith('#') ||
    /^https?:\/\//.test(href)
  ) {
    return href;
  }

  const language = getCurrentLanguage();
  const targetHref =
    language !== 'pt' && isSoInLovePixPagePath(href)
      ? MWP_SO_IN_LOVE_ALBUM_PAGE_PATH
      : href;
  const normalizedTarget = normalizePath(targetHref);

  if (
    language !== 'pt' &&
    normalizedTarget === MWP_SO_IN_LOVE_ALBUM_PAGE_PATH
  ) {
    return `/${MWP_SO_IN_LOVE_ALBUM_PAGE_PATH}?lang=${language}`;
  }

  if (MWP_LOCALIZED_PAGE_PATHS.has(normalizedTarget)) {
    return getLocalizedRoute(normalizedTarget, language);
  }

  return `/${normalizedTarget}`;
}

function normalizePath(path) {
  const cleaned = path
    .replace(/^\/(?:en|de|es)(?=\/)/, '')
    .replace(/\/index\.html$/, '/')
    .replace(/^\//, '');
  return cleaned || 'index.html';
}

function isCurrentPage(href) {
  if (!href || href.startsWith('#') || /^https?:\/\//.test(href)) return false;
  const linkPath = new URL(getPageHref(href), window.location.href).pathname;
  const normalizedLinkPath = normalizePath(linkPath);
  const normalizedCurrentPath = normalizePath(window.location.pathname);

  if (
    normalizedLinkPath === MWP_ALBUMS_PAGE_PATH &&
    normalizedCurrentPath.startsWith('pages/albums/')
  ) {
    return true;
  }

  return normalizedLinkPath === normalizedCurrentPath;
}

function getSocialLinks() {
  return [
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/maxwilsonpereira/',
      icon: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none"/>',
    },
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/user/maxwilsonpereira',
      icon: '<path d="M22 12s0-3.35-.43-4.96a2.8 2.8 0 0 0-1.98-1.98C17.85 4.6 12 4.6 12 4.6s-5.85 0-7.59.46a2.8 2.8 0 0 0-1.98 1.98C2 8.65 2 12 2 12s0 3.35.43 4.96a2.8 2.8 0 0 0 1.98 1.98c1.74.46 7.59.46 7.59.46s5.85 0 7.59-.46a2.8 2.8 0 0 0 1.98-1.98C22 15.35 22 12 22 12Z"/><path d="m10 15.2 5.2-3.2L10 8.8v6.4Z" fill="currentColor" stroke="none"/>',
    },
    {
      name: 'TikTok',
      href: 'https://www.tiktok.com/discover/maxwilsonpereira',
      icon: '<path d="M14.2 3v10.2a4.25 4.25 0 1 1-4.25-4.25c.43 0 .85.06 1.25.18v3.06a1.46 1.46 0 1 0 1 1.39V3h2Z"/><path d="M14.2 3c.52 2.65 2.08 4.35 4.8 4.62v3.02c-1.82-.1-3.45-.72-4.8-1.82V3Z"/>',
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/maxwilsonpereira/',
      icon: '<path d="M14 8.6V7.1c0-.74.36-1.1 1.16-1.1H17V3h-2.62C11.8 3 10.4 4.48 10.4 6.86V8.6H8v3.1h2.4V21H14v-9.3h2.48l.42-3.1H14Z"/>',
    },
  ];
}

function renderSocialIconLinks(className) {
  return getSocialLinks()
    .map(
      (social) => `
        <a class="${className} ${className}-${social.name.toLowerCase()}" href="${social.href}" target="_blank" rel="noopener noreferrer" aria-label="${translatePhrase('Seguir Max Wilson Pereira no')} ${social.name}" title="${social.name}">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            ${social.icon}
          </svg>
        </a>
      `,
    )
    .join('');
}

/* ─── max-badge ────────────────────────────────────────────────────────────── */
class MaxBadge extends HTMLElement {
  connectedCallback() {
    const text =
      this.getAttribute('text') || MWP_CONFIG?.badge || 'Tenor • Artista';
    this.innerHTML = `<span class="badge">${translatePhrase(text)}</span>`;
  }
}
customElements.define('max-badge', MaxBadge);

/* ─── max-back-button ─────────────────────────────────────────────────────── */
class MaxBackButton extends HTMLElement {
  connectedCallback() {
    const href = this.getAttribute('href') || '/';
    this.innerHTML = `
      <a class="back-button" href="${href}">
        <svg class="back-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        ${translatePhrase('Voltar')}
      </a>
    `;
  }
}
customElements.define('max-back-button', MaxBackButton);

/* ─── max-site-nav ────────────────────────────────────────────────────────── */
class MaxSiteNav extends HTMLElement {
  connectedCallback() {
    const links = [
      { href: 'index.html', text: 'HOME', external: false },
      ...(MWP_CONFIG?.links || []),
    ];
    const siteName = MWP_CONFIG?.siteName || 'Max Wilson Pereira';
    const brandParts = siteName.trim().split(/\s+/);
    const brandSecondary = brandParts.length > 1 ? brandParts.pop() : '';
    const brandPrimary = brandParts.join(' ') || siteName;
    const navId = `site-nav-${Math.random().toString(36).slice(2)}`;
    const items = getVisibleNavigationLinks(links)
      .map(
        (link) => `
          <a class="site-nav-link ${isCurrentPage(link.href) ? 'is-active' : ''}" href="${getPageHref(link.href)}" ${link.external ? 'target="_blank" rel="noopener noreferrer"' : ''}>
            ${translatePhrase(link.text)}
          </a>
        `,
      )
      .join('');

    this.innerHTML = `
      <header class="site-header">
        <div class="site-header-inner">
          <a class="site-brand" href="${getPageHref('index.html')}" aria-label="${siteName} - Home">
            <span class="site-brand-wordmark" aria-hidden="true">
              <span class="site-brand-primary">${brandPrimary}</span>
              ${brandSecondary ? `<span class="site-brand-secondary">${brandSecondary}</span>` : ''}
            </span>
          </a>

          <nav class="site-nav" id="${navId}" aria-label="${translatePhrase('Navegação principal')}">
            <div class="site-nav-links">${items}</div>
            <div class="site-nav-mobile-meta">
              <div class="site-nav-mobile-languages">${renderLanguageSwitcher()}</div>
              <div class="site-nav-mobile-socials" aria-label="${translatePhrase('Redes sociais')}">
                ${renderSocialIconLinks('site-nav-social-link')}
              </div>
            </div>
          </nav>

          <div class="site-header-actions">
            ${renderLanguageSwitcher()}
            <div class="site-nav-socials" aria-label="${translatePhrase('Redes sociais')}">
              ${renderSocialIconLinks('site-nav-social-link')}
            </div>
          </div>

          ${renderEnglishFlagLink()}
          <button class="site-nav-toggle" type="button" aria-expanded="false" aria-controls="${navId}" aria-label="${translatePhrase('Abrir menu')}">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>
    `;

    const toggle = this.querySelector('.site-nav-toggle');
    const nav = this.querySelector('.site-nav');

    this.querySelectorAll('.language-switch-link[data-language]').forEach(
      (link) => {
        link.addEventListener('click', () => {
          try {
            localStorage.setItem('mwp-language', link.dataset.language);
          } catch (error) {
            // The URL still carries the selected language when storage is unavailable.
          }
        });
      },
    );

    const setMenuState = (isOpen) => {
      if (!nav || !toggle) return;
      nav.classList.toggle('is-open', isOpen);
      document.body.classList.toggle('site-menu-open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute(
        'aria-label',
        translatePhrase(isOpen ? 'Fechar menu' : 'Abrir menu'),
      );
      if (isOpen) {
        requestAnimationFrame(() => nav.querySelector('a')?.focus());
      }
    };

    const closeMenu = () => setMenuState(false);

    const desktopNavigation = window.matchMedia('(min-width: 60rem)');
    let breakpointTransitionFrame;
    const syncNavigationBreakpoint = () => {
      closeMenu();
      nav?.classList.add('is-breakpoint-changing');
      cancelAnimationFrame(breakpointTransitionFrame);
      breakpointTransitionFrame = requestAnimationFrame(() => {
        breakpointTransitionFrame = requestAnimationFrame(() => {
          nav?.classList.remove('is-breakpoint-changing');
        });
      });
    };

    desktopNavigation.addEventListener('change', syncNavigationBreakpoint);

    toggle?.addEventListener('click', () => {
      const isOpen = !(nav?.classList.contains('is-open'));
      setMenuState(isOpen);
    });

    nav?.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (event) => {
      if (!nav?.classList.contains('is-open')) return;

      if (event.key === 'Escape') {
        closeMenu();
        toggle?.focus();
        return;
      }

      if (event.key === 'Tab') {
        const focusable = [
          ...nav.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
          toggle,
        ].filter(Boolean);
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (!focusable.includes(document.activeElement)) {
          event.preventDefault();
          first?.focus();
        } else if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    });

    const syncHeaderState = () => {
      this.querySelector('.site-header')?.classList.toggle(
        'is-scrolled',
        window.scrollY > 24,
      );
    };
    syncHeaderState();
    window.addEventListener('scroll', syncHeaderState, { passive: true });
  }
}
customElements.define('max-site-nav', MaxSiteNav);

/* ─── max-hero-bg ─────────────────────────────────────────────────────────── */
class MaxHeroBg extends HTMLElement {
  connectedCallback() {
    // Replace the custom element with a real div and preserve any classes
    // applied to the `<max-hero-bg>` so utility classes like
    // `hero--anchor-top` are carried through.
    const div = document.createElement('div');
    const extra = Array.from(this.classList).join(' ');
    div.className = extra ? `hero-bg ${extra}` : 'hero-bg';
    this.replaceWith(div);
  }
}
customElements.define('max-hero-bg', MaxHeroBg);

class MaxMicrophoneInterlude extends HTMLElement {
  connectedCallback() {
    const caption = this.getAttribute('caption') || 'A voz continua';
    this.innerHTML = `
      <figure class="microphone-interlude">
        <div class="microphone-interlude-media" aria-hidden="true"></div>
        <figcaption>${translatePhrase(caption)}</figcaption>
      </figure>
    `;

    const media = this.querySelector('.microphone-interlude-media');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!media || reduceMotion.matches) return;

    let framePending = false;
    const updateParallax = () => {
      framePending = false;
      const rect = this.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const distance = rect.top + rect.height / 2 - viewportCenter;
      const offset = Math.max(-28, Math.min(28, distance * -0.08));
      media.style.transform = `translate3d(0, ${offset}px, 0)`;
    };
    const requestUpdate = () => {
      if (framePending) return;
      framePending = true;
      requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate, { passive: true });
  }
}
customElements.define('max-microphone-interlude', MaxMicrophoneInterlude);

/* ─── max-profile-img ─────────────────────────────────────────────────────── */
class MaxProfileImg extends HTMLElement {
  connectedCallback() {
    const base = getBasePath();
    const img = MWP_CONFIG?.profileImage || 'max-gigga.jpg';
    const alt = this.getAttribute('alt') || 'Max Wilson Pereira';
    this.innerHTML = `
      <img src="${base}assets/${img}" alt="${alt}" class="profile-img" />
    `;
  }
}
customElements.define('max-profile-img', MaxProfileImg);

/* ─── max-link-list ───────────────────────────────────────────────────────── */
class MaxLinkList extends HTMLElement {
  connectedCallback() {
    const links = getVisibleNavigationLinks(MWP_CONFIG?.links || []);
    const variant = this.getAttribute('variant');
    const navClass =
      variant === 'hero' ? 'link-list hero-link-list' : 'link-list';
    const items = links
      .map(
        (link) => `
        <div class="link-button">
          <a href="${getPageHref(link.href)}" ${link.external ? 'target="_blank" rel="noopener noreferrer"' : ''}>${translatePhrase(link.text)}</a>
        </div>
      `,
      )
      .join('');
    this.innerHTML = `<nav class="${navClass}" aria-label="${translatePhrase('Links principais')}">${items}</nav>`;
  }
}
customElements.define('max-link-list', MaxLinkList);

/* ─── max-social-follow ───────────────────────────────────────────────────── */
class MaxSocialFollow extends HTMLElement {
  connectedCallback() {
    const items = getSocialLinks()
      .map(
        (social) => `
          <a class="social-link social-link-${social.name.toLowerCase()}" href="${social.href}" target="_blank" rel="noopener noreferrer" aria-label="${translatePhrase('Seguir Max Wilson Pereira no')} ${social.name}">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              ${social.icon}
            </svg>
            <span>${social.name}</span>
          </a>
        `,
      )
      .join('');

    this.innerHTML = `
      <section class="social-follow" aria-labelledby="social-follow-title">
        <div class="social-follow-inner">
          <h2 id="social-follow-title" class="social-follow-kicker">${translatePhrase('Siga nas redes sociais')}</h2>
          <nav class="social-links" aria-label="${translatePhrase('Redes sociais de Max Wilson Pereira')}">
            ${items}
          </nav>
        </div>
      </section>
    `;
  }
}
customElements.define('max-social-follow', MaxSocialFollow);

class MaxSiteFooter extends HTMLElement {
  connectedCallback() {
    const siteName = MWP_CONFIG?.siteName || 'Max Wilson Pereira';
    const links = [
      { href: 'index.html', text: 'HOME', external: false },
      ...(MWP_CONFIG?.links || []),
    ];
    const items = getVisibleNavigationLinks(links)
      .map(
        (link) => `<a href="${getPageHref(link.href)}" ${link.external ? 'target="_blank" rel="noopener noreferrer"' : ''}>${translatePhrase(link.text)}</a>`,
      )
      .join('');

    this.innerHTML = `
      <footer class="site-footer">
        <div class="site-footer-main">
          <div class="site-footer-identity">
            <a class="site-footer-name" href="${getPageHref('index.html')}">${siteName}</a>
            <p>${translatePhrase(MWP_CONFIG?.tagline || '')}</p>
          </div>
          <nav class="site-footer-nav" aria-label="${translatePhrase('Navegação principal')}">${items}</nav>
          <div class="site-footer-socials" aria-label="${translatePhrase('Redes sociais')}">
            ${renderSocialIconLinks('site-footer-social-link')}
          </div>
        </div>
        <div class="site-footer-legal">
          <span>© 2026 ${siteName}</span>
          <span>Viena • Brasil</span>
        </div>
      </footer>
    `;
  }
}
customElements.define('max-site-footer', MaxSiteFooter);

let youtubeIframeApiPromise;
let maxVideoPlayerId = 0;

function loadYouTubeIframeApi() {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (youtubeIframeApiPromise) return youtubeIframeApiPromise;

  youtubeIframeApiPromise = new Promise((resolve) => {
    const previousReadyHandler = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousReadyHandler?.();
      resolve(window.YT);
    };

    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    script.async = true;
    document.head.append(script);
  });

  return youtubeIframeApiPromise;
}

class MaxVideoEmbed extends HTMLElement {
  connectedCallback() {
    const videoId = this.getAttribute('video-id');
    const title = translatePhrase(
      this.getAttribute('title') || 'Vídeo de Max Wilson Pereira',
    );
    const origin = window.location.origin === 'null'
      ? ''
      : `&origin=${encodeURIComponent(window.location.origin)}`;

    if (!videoId) return;

    const iframeId = `max-video-player-${maxVideoPlayerId += 1}`;

    this.innerHTML = `
      <figure class="video-embed" aria-label="${title}">
        <iframe
          id="${iframeId}"
          src="https://www.youtube.com/embed/${videoId}?enablejsapi=1${origin}"
          title="${title}"
          loading="lazy"
          referrerpolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </figure>
    `;

    if (document.body.classList.contains('page-videos')) {
      this.initializeGalleryPlayer(iframeId);
    }
  }

  async initializeGalleryPlayer(iframeId) {
    const YT = await loadYouTubeIframeApi();
    if (!this.isConnected) return;

    this.player = new YT.Player(iframeId, {
      events: {
        onStateChange: (event) => {
          if (event.data === YT.PlayerState.PLAYING) {
            pauseOtherGalleryVideos(this);
          }
        },
      },
    });
  }

  pause() {
    if (this.player?.pauseVideo) {
      this.player.pauseVideo();
      return;
    }

    const iframe = this.querySelector('iframe');
    iframe?.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }),
      '*',
    );
  }
}
customElements.define('max-video-embed', MaxVideoEmbed);

function pauseOtherGalleryVideos(activeEmbed) {
  if (!document.body.classList.contains('page-videos')) return;

  document.querySelectorAll('.videos-gallery max-video-embed').forEach((embed) => {
    if (embed !== activeEmbed) embed.pause();
  });
}

/* ─── PIX continue form behavior ──────────────────────────────────────────── */
function initPixContinueForm() {
  const input = document.querySelector('.pix-continue-form .pix-input');
  const button = document.querySelector('.pix-continue-form .primary-button');

  if (!input || !button) return;

  const validate = () => {
    const sanitizedName = input.value.trim();
    button.disabled = sanitizedName.length < 3;
  };

  input.addEventListener('input', validate);

  button.addEventListener('click', () => {
    const sanitizedName = input.value.trim();
    if (sanitizedName.length < 3) return;

    window.location.href = '/pages/albums/so-in-love.html';
  });
}

/* Reusable modal behavior */
function initModals() {
  if (getCurrentLanguage() !== 'pt') {
    document
      .querySelectorAll('.album-support-modal[data-open-on-load]')
      .forEach((modal) => modal.removeAttribute('data-open-on-load'));
  }

  const modals = [...document.querySelectorAll('.modal')];

  if (!modals.length) return;

  const updateBodyLock = () => {
    const hasOpenModal = modals.some((modal) => modal.open);
    document.body.classList.toggle('modal-open', hasOpenModal);
  };

  modals.forEach((modal) => {
    const closeButtons = modal.querySelectorAll('[data-modal-close]');

    closeButtons.forEach((button) => {
      button.addEventListener('click', () => {
        modal.close();
      });
    });

    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.close();
      }
    });

    modal.addEventListener('close', updateBodyLock);

    if (modal.hasAttribute('data-open-on-load')) {
      if (typeof modal.showModal === 'function') {
        modal.showModal();
      } else {
        modal.setAttribute('open', '');
      }

      updateBodyLock();
    }
  });
}

function initSmoothAnchorLinks() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const hash = link.getAttribute('href');
      if (!hash || hash === '#') return;

      const target = document.querySelector(hash);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', hash);
    });
  });
}

/* ─── max-tagline ─────────────────────────────────────────────────────────── */
class MaxTagline extends HTMLElement {
  connectedCallback() {
    const text = this.getAttribute('text') || MWP_CONFIG?.tagline || '';
    this.innerHTML = `<p class="tagline">${translatePhrase(text)}</p>`;
  }
}
customElements.define('max-tagline', MaxTagline);

/* ─── max-site-name ───────────────────────────────────────────────────────── */
class MaxSiteName extends HTMLElement {
  connectedCallback() {
    const text =
      this.getAttribute('text') || MWP_CONFIG?.siteName || 'Max Wilson Pereira';
    if (this.closest('#home-title')) {
      const nameParts = text.trim().split(/\s+/u);
      const finalName = nameParts.pop() || text;
      const leadingNames = nameParts.join(' ') || finalName;
      this.innerHTML = `<span class="home-name-line">${leadingNames}</span><span class="home-name-line">${finalName}</span>`;
      return;
    }

    this.textContent = text;
  }
}
customElements.define('max-site-name', MaxSiteName);

redirectInternationalAlbumPurchase();
applyStaticTranslations();
initPixContinueForm();
initModals();
initSmoothAnchorLinks();
