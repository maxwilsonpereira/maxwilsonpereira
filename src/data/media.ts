import type { Track, VideoItem } from '@/types';
import type { Locale } from '@/config/site';

export const tenoriAmiciTracks: Track[] = [
  ['01', 'Mamma', 'Tenori Amici', '01- Mamma (Cesare Bixio) - Tenori Amici.mp3'],
  ['02', 'Besame mucho', 'Tenori Amici', '02- Besame mucho (Consuelo Velázquez) - Tenori Amici.mp3'],
  ['03', 'Primadona', 'Tenori Amici', '03- Primadona (Guto Graça Mello, Sylvia Massari) - Tenori Amici.mp3'],
  ['04', "Core 'ngrato", 'Ali Magomedov', "04- Core 'ngrato - Ali Magomedov.mp3"],
  ['05', 'Smile', 'Tenori Amici', '05- Smile (Charles Chaplin) - Tenori Amici.mp3'],
  ['06', 'If I loved you', 'Max Wilson Pereira', '06- If I loved you - Max Wilson Pereira.mp3'],
  ['07', 'Musica proibita', 'Ara Karapetian', '07- Musica proibita (Gastaldon) - Ara Kaparetian.mp3'],
  ['08', 'Nessun dorma', 'Ali Magomedov', '08- Nessun dorma (Puccini) - Ali Magomedov.mp3'],
  ['09', 'So in love', 'Max Wilson Pereira', '09- So in love (Cole Porter) - Max Wilson Pereira.mp3'],
  ['10', 'Donna non vidi mai', 'Ara Karapetian', '10- Donna non vidi mai (Puccini) - Ara Karapetian.mp3'],
  ['11', 'O sole mio', 'Tenori Amici', '11- O sole mio (Di Capua) - Tenori Amici.mp3'],
].map(([number, title, artist, file]) => ({ number, title, artist, src: `/assets/tenori-amici/samples/${file}` }));

export const quattroTracks: Track[] = [
  ['01', 'Your Song', 'Quattro', 'Quattro 01 - Your Song.mp3'],
  ['02', "I Don't Wanna Miss A Thing", 'Quattro', 'Quattro 02 - I Don´t Wanna Miss A Thing.mp3'],
  ['03', 'My Immortal', 'Quattro', 'Quattro 03 - My Immortal.mp3'],
  ['04', 'This Love', 'Quattro', 'Quattro 04 - This Love.mp3'],
  ['05', 'Per Te', 'Quattro', 'Quattro 05 - Per Te.mp3'],
  ['06', "I Just Can't Stop Loving You", 'Quattro', 'Quattro 06 - I Just Can´t Stop Loving You.mp3'],
  ['07', 'Rosanna', 'Quattro', 'Quattro 07 - Rosanna.mp3'],
  ['08', 'Angels', 'Quattro', 'Quattro 08 - Angels.mp3'],
  ['09', 'Tonight', 'Quattro', 'Quattro 09 - Tonight.mp3'],
  ['10', 'Maldito Amor', 'Quattro', 'Quattro 10 - Maldito Amor.mp3'],
  ['11', 'Aqui Estoy Yo', 'Quattro', 'Quattro 11 - Aqui Estoy Yo.mp3'],
].map(([number, title, artist, file]) => ({ number, title, artist, src: `/assets/quattro-sony/samples/${file}` }));

export const soInLoveTracks: Track[] = [
  ['01', 'Rosa Che Stai Nascendo', 'Max Wilson', '01- Rosa Che Stai Nascendo - Max Wilson.mp3'],
  ['02', 'All I Ask of You', 'Max Wilson, Marina Elali', '02- All I Ask of You - Max Wilson (Part Marina Elali).mp3'],
  ['03', 'Smile', 'Max Wilson', '03- Smile - Max Wilson.mp3'],
  ['04', 'As Time Goes By', 'Max Wilson, Jonatas Faro', '04- As Time Goes By - Max Wilson (Part Jonatas Faro).mp3'],
  ['05', 'The Way You Look Tonight', 'Max Wilson', '05- The Way you Look Tonight - Max Wilson.mp3'],
  ['06', 'Tonight', 'Max Wilson, Sylvia Massari', '06- Tonight - Max Wilson (Part Sylvia Massari).mp3'],
  ['07', 'Some Enchanted Evening', 'Max Wilson', '07- Some enchanted evening - Max Wilson.mp3'],
  ['08', 'Eu Nunca Mais Vou Te Esquecer', 'Max Wilson', '08- Eu nunca mais vou te esquecer - Max Wilson.mp3'],
  ['09', 'If I Loved You', 'Max Wilson', '09- If I loved you (Carousel) - Max Wilson.mp3'],
  ['10', 'Where Do I Begin', 'Max Wilson', '10- Where do I begin (Love Story) - Max Wilson.mp3'],
  ['11', 'So in Love', 'Max Wilson', '11- So in Love (Kiss Me, Kate) - Max Wilson.mp3'],
  ['12', 'Over the Rainbow', 'Max Wilson', '12- Over The Rainbow - Max Wilson.mp3'],
  ['13', 'Love Is a Many-Splendored Thing', 'Max Wilson', '13- Love is a many splendored thing - Max Wilson.mp3'],
].map(([number, title, artist, file]) => ({ number, title, artist, src: `/assets/so-in-love/${file}` }));

export const bonusTracks: Track[] = [
  ['01', 'Volta ao Meu Mundo (música inédita)', 'Max Wilson', 'Volta ao Meu Mundo (música inédita) - Max Wilson (2026).mp3'],
  ['02', 'Primadonna (música inédita)', 'Max Wilson', 'Primadonna (música inédita) - Max Wilson (2013).mp3'],
  ['03', 'Nessun dorma – Turandot (Puccini)', 'Max Wilson', 'Nessun dorma - Turandot (Puccini) - Max Wilson (2008).mp3'],
  ['04', 'E lucevan le stelle – Tosca (Puccini)', 'Max Wilson', 'E lucevan le stelle - Tosca (Puccini) - Max Wilson (2008).mp3'],
  ['05', "Una furtiva lagrima – L'elisir d'amore (Donizetti)", 'Max Wilson', "Una furtiva lagrima - L'elisir d'amore (Donizetti) - Max Wilson (2010).mp3"],
  ['06', 'Vesti la giubba – I Pagliacci (Leoncavallo)', 'Max Wilson', 'Vesti la guibba - I Pagliacci (Leoncavallo) - Max Wilson (2006).mp3'],
  ['07', 'Vision Fugitive – Hérodiade (Massenet)', 'Max Wilson', 'Vision Fugitive - Hérodiade (Massenet) - Max Wilson (2015).mp3'],
  ['08', 'Wolgalied – Der Zarewitsch (Lehár)', 'Max Wilson', 'Wolgalied - Der Zarewitsch (Lehár) - Max Wilson (2015).mp3'],
  ['09', 'Non ti scordar di me', 'Max Wilson', 'Non ti scordar di me - Max Wilson (2018).mp3'],
  ['10', 'Empty Chairs at Empty Tables – Les Misérables', 'Max Wilson', 'Empty Chairs at Empty Tables - Les Misérables - Max Wilson (2013).mp3'],
  ['11', 'Stars – Les Misérables', 'Max Wilson', 'Stars - Les Misérables - Max Wilson (2015).mp3'],
].map(([number, title, artist, file]) => ({ number, title, artist, src: `/assets/so-in-love/${file}` }));

const videoBase: Omit<VideoItem, 'description'>[] = [
  { id: 'video-hebe', videoId: 'nh0W3LdgOlc', title: 'Dio Come Ti Amo com Hebe Camargo' },
  { id: 'video-russia', videoId: 'DQpRr9dLBHI', title: 'Taneyevsky Festival 2017 — Rússia' },
  { id: 'video-phantom', videoId: 'Bbe9J0HVYDQ', title: 'All I Ask of You, com Marina Elali' },
  { id: 'video-evidencias', videoId: 'b3bEGoChkPQ', title: 'Evidências — Versão Ópera' },
  { id: 'video-flamengo', videoId: 'i87P-NQ_Nbc', title: 'Hino do Flamengo, com Sandra de Sá e 3 Tenores' },
  { id: 'video-enchanted', videoId: 'Iczgp6LiUjU', title: 'Some Enchanted Evening' },
  { id: 'video-she-rio', videoId: 'sS4Xo3dJXQU', title: 'She, de Charles Aznavour — Rio de Janeiro' },
  { id: 'video-conte', videoId: 'qDwn4x_lb8w', title: 'Con te partirò, com Francesca Caforio' },
  { id: 'video-mae', videoId: 'h2ZoYt8FSQ8', title: 'Eu Sei Que Vou Te Amar, com Sylvia Massari' },
  { id: 'video-sorrento', videoId: 'xSuuhfaYft8', title: 'Torna a Surriento — em Sorrento' },
  { id: 'video-notting', videoId: 'nlJ_GrzKbe4', title: 'She, de Elvis Costello — Notting Hill' },
  { id: 'video-awake', videoId: 'jyFudt2O3iw', title: 'Awake, de Josh Groban' },
];

const videoDescriptions: Record<Locale, string[]> = {
  pt: [
    'Em 2010, no Credicard Hall, em São Paulo, tive a honra de dividir este clássico italiano com a inesquecível Hebe Camargo. É a lembrança de uma noite luminosa — e de uma artista cuja alegria, generosidade e paixão pela música permanecem vivas.',
    'Um registro da entrevista à Russia-1 e da emoção de representar o Brasil como tenor convidado no Taneyevsky Festival. Ao lado do maestro Artiom Markin e da Orquestra Sinfônica do Governador de Vladimir, compartilhei ópera, opereta e teatro musical com um público que recebeu cada canção de coração aberto.',
    'Uma das grandes declarações de amor do teatro musical, gravada no Blue Studio com Marina Elali e o saudoso produtor Guto Graça Mello. Um dueto que deixa a melodia falar primeiro — delicada, intensa e inteiramente presente.',
    'Um clássico que mora na memória brasileira, reinventado para três vozes e três países. Ao lado da soprano Nataliya Stepanska e do tenor Fernando Hernández, celebro a força universal de uma canção que todos reconhecem antes mesmo do primeiro verso.',
    'Paixão, voz e torcida se encontram nesta gravação do hino do Clube de Regatas do Flamengo, ao lado da querida Sandra de Sá. Uma celebração brasileira, vibrante e feita para cantar junto.',
    'Ao vivo em São Paulo, canto a inesquecível canção de Rodgers e Hammerstein para o musical South Pacific. Há melodias que parecem suspender o tempo; esta é uma delas.',
    'No Fairmont Rio, em Copacabana, a elegância de Charles Aznavour encontra o piano sensível de Tibí e a paisagem carioca. Um clássico romântico em um cenário onde cada nota parece respirar o mar.',
    'Uma noite entre amigos em Viena, no Boteco Larica, ganhou a amplitude de um grande dueto. Ao lado da soprano italiana Francesca Caforio, canto ao vivo esta despedida que, paradoxalmente, sempre nos aproxima.',
    'Antes de deixar o Brasil para voltar a Viena, cantei com minha mãe, Sylvia Massari, diante do mar no litoral de São Paulo. É uma canção sobre permanência e afeto — e uma despedida que se transforma em abraço.',
    'Cantar esta canção napolitana em Sorrento é deixar que a própria cidade entre na interpretação. Um pequeno filme de viagem, saudade e Itália, guiado por uma melodia que atravessa gerações.',
    'Nas ruas de Notting Hill, onde o cinema eternizou esta música, reencontro uma canção de que gosto profundamente. Londres vira cenário e memória para um cover feito com carinho por um clássico contemporâneo.',
    'Um tributo a um artista que admiro e a uma canção pop de grande delicadeza. Em Awake, procuro a intimidade da melodia e a esperança tranquila que ela deixa depois de terminar.',
  ],
  en: [
    'In 2010, at Credicard Hall in São Paulo, I had the honour of sharing this Italian classic with the unforgettable Hebe Camargo. It recalls a radiant evening — and an artist whose joy, generosity and love of music remain alive.',
    'A record of my Russia-1 interview and of the emotion of representing Brazil as a guest tenor at the Taneyevsky Festival. With Maestro Artiom Markin and the Vladimir Governor Symphony Orchestra, I shared opera, operetta and musical theatre with an open-hearted audience.',
    'One of musical theatre’s great declarations of love, recorded at Blue Studio with Marina Elali and the late producer Guto Graça Mello. A duet that lets the melody speak first: delicate, intense and fully present.',
    'A Brazilian classic, reinvented for three voices and three countries. With soprano Nataliya Stepanska and tenor Fernando Hernández, I celebrate the universal power of a song everyone recognises before the first line.',
    'Passion, voice and supporters meet in this recording of Clube de Regatas do Flamengo’s anthem with the beloved Sandra de Sá. A vibrant Brazilian celebration made to sing along to.',
    'Live in São Paulo, I sing Rodgers and Hammerstein’s unforgettable song from South Pacific. Some melodies seem to suspend time; this is one of them.',
    'At the Fairmont Rio in Copacabana, Charles Aznavour’s elegance meets Tibí’s sensitive piano and Rio’s landscape. A romantic classic where every note seems to breathe the sea air.',
    'An evening among friends in Vienna’s Boteco Larica grew into a grand duet. With Italian soprano Francesca Caforio, I sing this farewell which, paradoxically, always brings us closer.',
    'Before leaving Brazil to return to Vienna, I sang with my mother, Sylvia Massari, beside the sea in São Paulo. It is a song of permanence and affection — a farewell becoming an embrace.',
    'Singing this Neapolitan song in Sorrento lets the city itself enter the interpretation: a small film of travel, longing and Italy, carried by a melody that crosses generations.',
    'On the streets of Notting Hill, where cinema immortalised this song, I revisit a piece I love deeply. London becomes both setting and memory for this affectionate cover of a contemporary classic.',
    'A tribute to an artist I admire and to a beautifully delicate pop song. In Awake, I look for the melody’s intimacy and the quiet hope it leaves behind.',
  ],
  de: [
    '2010 in der Credicard Hall in São Paulo durfte ich diesen italienischen Klassiker mit der unvergesslichen Hebe Camargo teilen. Die Aufnahme erinnert an einen strahlenden Abend und an eine Künstlerin, deren Freude, Großzügigkeit und Liebe zur Musik weiterleben.',
    'Ein Dokument meines Interviews für Russia-1 und der großen Ehre, Brasilien als Gasttenor beim Taneyevsky Festival zu vertreten. Mit Maestro Artiom Markin und dem Vladimir Governor Symphony Orchestra sang ich Oper, Operette und Musical für ein herzliches Publikum.',
    'Eine der großen Liebeserklärungen des Musiktheaters, aufgenommen im Blue Studio mit Marina Elali und dem verstorbenen Produzenten Guto Graça Mello: ein Duett, das die Melodie zuerst sprechen lässt — zart, intensiv und ganz im Moment.',
    'Ein brasilianischer Klassiker, neu gestaltet für drei Stimmen und drei Länder. Mit Sopranistin Nataliya Stepanska und Tenor Fernando Hernández feiere ich die universelle Kraft eines Liedes, das alle schon vor der ersten Zeile erkennen.',
    'Leidenschaft, Stimme und Fankultur treffen in dieser Aufnahme der Hymne des Clube de Regatas do Flamengo mit der beliebten Sandra de Sá zusammen — eine lebendige brasilianische Feier zum Mitsingen.',
    'Live in São Paulo singe ich Rodgers und Hammersteins unvergessliches Lied aus South Pacific. Manche Melodien scheinen die Zeit anzuhalten; diese gehört dazu.',
    'Im Fairmont Rio in Copacabana begegnen sich die Eleganz von Charles Aznavour, Tibís sensibles Klavier und die Landschaft Rios. Ein romantischer Klassiker, in dem jede Note Meeresluft zu atmen scheint.',
    'Ein Abend unter Freunden im Wiener Boteco Larica wurde zu einem großen Duett. Mit der italienischen Sopranistin Francesca Caforio singe ich diesen Abschied, der uns paradoxerweise immer näherbringt.',
    'Bevor ich Brasilien in Richtung Wien verließ, sang ich mit meiner Mutter Sylvia Massari am Meer. Es ist ein Lied über Beständigkeit und Zuneigung — ein Abschied, der zur Umarmung wird.',
    'Dieses neapolitanische Lied in Sorrent zu singen heißt, die Stadt selbst in die Interpretation einzuladen: ein kleiner Film von Reise, Sehnsucht und Italien.',
    'In den Straßen von Notting Hill, wo das Kino dieses Lied verewigte, begegne ich einem Stück wieder, das ich sehr liebe. London wird zur Kulisse und Erinnerung dieses Covers eines modernen Klassikers.',
    'Eine Hommage an einen Künstler, den ich bewundere, und an ein besonders zartes Popsong. In Awake suche ich die Intimität der Melodie und die stille Hoffnung, die sie hinterlässt.',
  ],
  es: [
    'En 2010, en el Credicard Hall de São Paulo, tuve el honor de compartir este clásico italiano con la inolvidable Hebe Camargo. Es el recuerdo de una noche luminosa y de una artista cuya alegría, generosidad y pasión por la música siguen vivas.',
    'Un registro de mi entrevista para Russia-1 y de la emoción de representar a Brasil como tenor invitado en el Festival Taneyevsky. Junto al maestro Artiom Markin y la Orquesta Sinfónica del Gobernador de Vladimir, compartí ópera, opereta y teatro musical con un público de corazón abierto.',
    'Una de las grandes declaraciones de amor del teatro musical, grabada en Blue Studio con Marina Elali y el recordado productor Guto Graça Mello. Un dúo que deja hablar primero a la melodía: delicada, intensa y plenamente presente.',
    'Un clásico brasileño reinventado para tres voces y tres países. Junto a la soprano Nataliya Stepanska y al tenor Fernando Hernández, celebro la fuerza universal de una canción que todos reconocen antes del primer verso.',
    'Pasión, voz y afición se encuentran en esta grabación del himno del Clube de Regatas do Flamengo con la querida Sandra de Sá. Una celebración brasileña vibrante, hecha para cantar juntos.',
    'En vivo en São Paulo, canto la inolvidable canción de Rodgers y Hammerstein para South Pacific. Hay melodías que parecen detener el tiempo; esta es una de ellas.',
    'En el Fairmont Rio de Copacabana, la elegancia de Charles Aznavour se encuentra con el sensible piano de Tibí y el paisaje carioca. Un clásico romántico en el que cada nota parece respirar el mar.',
    'Una noche entre amigos en el Boteco Larica de Viena se convirtió en un gran dúo. Junto a la soprano italiana Francesca Caforio, canto esta despedida que, paradójicamente, siempre nos acerca.',
    'Antes de dejar Brasil para volver a Viena, canté con mi madre, Sylvia Massari, frente al mar. Es una canción de permanencia y afecto: una despedida que se transforma en abrazo.',
    'Cantar esta canción napolitana en Sorrento permite que la propia ciudad entre en la interpretación: una pequeña película de viaje, nostalgia e Italia.',
    'En las calles de Notting Hill, donde el cine inmortalizó esta canción, vuelvo a una música que amo profundamente. Londres se vuelve escenario y memoria para este cover de un clásico contemporáneo.',
    'Un homenaje a un artista que admiro y a una canción pop de gran delicadeza. En Awake busco la intimidad de la melodía y la esperanza serena que deja al terminar.',
  ],
};

export function videosFor(locale: Locale): VideoItem[] {
  return videoBase.map((video, index) => ({ ...video, description: videoDescriptions[locale][index] }));
}
