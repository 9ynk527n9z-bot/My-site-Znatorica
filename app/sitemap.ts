import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';
import { SEGMENTS } from '@/lib/constants';
import { getAllVprParams, getAllVprSubjectParams } from '@/lib/vpr';
import { getAllMckoParams, getAllMckoSubjectParams } from '@/lib/mcko';
import { getAllArticleSlugs, getPublishedTopics } from '@/lib/content';
import { CODE_TOPIC_ROUTES } from '@/lib/code-topics';
import { getTournamentTracks } from '@/lib/tournament';

// Контент из БД меняется через админку — не кешируем sitemap статически.
export const dynamic = 'force-dynamic';

// Темы, свёрстанные в коде («цветные» страницы) — список в lib/code-topics.ts.
const TOPIC_ROUTES: string[] = CODE_TOPIC_ROUTES;

export const TRAINER_ROUTES: string[] = [
  '/trenazher',
  '/trenazher/azbuky',
  '/trenazher/numbers',
  '/trenazher/colors',
  '/trenazher/english-words',
  '/trenazher/irregular-verbs',
  '/trenazher/pogovorki',
  '/trenazher/razbor-sostav-3klass',
  '/trenazher/shapes-colors',
  '/trenazher/pristavki',
  '/trenazher/angliyskiy-alfavit',
  '/trenazher/angliyskiy-schet',
  '/trenazher/tablitsa-umnozheniya',
  '/trenazher/slovarnye-slova',
  '/trenazher/naydi-lishnee',
  '/trenazher/proza-1klass',
  '/trenazher/analiz-teksta-4klass',
  '/trenazher/kombinatorika-3klass',
  '/trenazher/sravnenie-predmetov',
  '/trenazher/orientaciya-v-prostranstve',
  '/trenazher/vychitanie-5-10',
  '/trenazher/naydi-paru',
  '/trenazher/chto-izmenilos',
  '/trenazher/sobery-po-poryadku',
  '/trenazher/pereskaz-4-5let',
  '/trenazher/pereskaz-6-7let',
  '/trenazher/dialogi-6-7let',
  '/trenazher/rasskazy-6-7let',
  '/trenazher/english-colors',
  '/trenazher/english-shapes',
  '/trenazher/sravnenie',
  '/trenazher/slozhenie-5-10',
  '/trenazher/slozhenie-do-20',
  '/trenazher/russkiy-alfavit',
  '/trenazher/glasnye-soglasnye',
  '/trenazher/delenie',
  '/trenazher/delenie-s-ostatkom',
  '/trenazher/poryadok-deystviy',
  '/trenazher/slozhnie-primery-3klass',
  '/trenazher/schet-do-10',
  '/trenazher/schet-do-20-ru',
  '/trenazher/schet-do-5',
  '/trenazher/sostav-chisla',
  '/trenazher/zadachi-1klass',
  '/trenazher/dvuznachnye',
  '/trenazher/trekhznachnye',
  '/trenazher/velikie-chisla',
  '/trenazher/edinitsy-izmereniya-4klass',
  '/trenazher/domashnie-dikie',
  '/trenazher/priroda-zhivaya-nezhivaya-2klass',
  '/trenazher/priroda-1klass',
  '/trenazher/vremena-goda',
  '/trenazher/prirodnye-yavleniya-6-7let',
  '/trenazher/zakonomernosti',
  '/trenazher/chasti-rechi',
  '/trenazher/punktuaciya-1klass',
  '/trenazher/predlozhenie-2klass',
  '/trenazher/bezudarnye-glasnye',
  '/trenazher/udarenie',
  '/trenazher/zhi-shi-cha-scha',
  '/trenazher/vremya',
  '/trenazher/telo-cheloveka',
  '/trenazher/chelovek-organy-chuvstv',
  '/trenazher/bezopasnost-1klass',
  '/trenazher/zagadki-4-5let',
  '/trenazher/zagadki-1klass',
  '/trenazher/analogii-1klass',
  '/trenazher/tsveta',
  '/trenazher/doli',
  '/trenazher/uravneniya-3klass',
  '/trenazher/ploshchad-perimetr-3klass',
  '/trenazher/perimetr-2klass',
  '/trenazher/logicheskie-zadachi-2klass',
  '/trenazher/logicheskie-tablitsy-4klass',
  '/trenazher/zagadki-2klass',
  '/trenazher/rebusy-2klass',
  '/trenazher/geometriya-4klass',
  '/trenazher/skorost-vremya-rasstoyanie-4klass',
  '/trenazher/desyatichnie-drobi-4klass',
  '/trenazher/umnozhenie-delenie-stolbikom-4klass',
  '/trenazher/spryazhenie-3klass',
  '/trenazher/grammatika-3klass-english',
  '/trenazher/slozhnie-predlozheniya-3klass',
  '/trenazher/stili-rechi-4klass',
  '/trenazher/sklonenie-4klass',
  '/trenazher/sintaksis-4klass',
  '/trenazher/vzveshivanie-3klass',
  '/trenazher/perelivanie-4klass',
  '/trenazher/stihi-1klass',
  '/trenazher/koren-slova-2klass',
  '/trenazher/sinonimy-antonimy-2klass',
  '/trenazher/klassika-4klass',
  '/trenazher/skorochtenie',
  '/trenazher/slova-obobshchenie-4-5let',
  '/trenazher/zvuki-4-5let',
  '/trenazher/slogi-4-5let',
  '/trenazher/zagadki-6-7let',
  '/trenazher/chtenie-6-7let',
  '/trenazher/vnetablichnoe-umnozhenie-3klass',
  '/trenazher/english-animals',
  '/trenazher/english-food',
  '/trenazher/english-family',
  '/trenazher/english-clothes',
  '/trenazher/english-weather',
  '/trenazher/english-school',
  // Игры-тренажёры, доступные через хаб /igry
  '/trenazher/krestiki-noliki',
  '/trenazher/ugaday-slovo',
  '/trenazher/pyatnashki',
  '/trenazher/slova-iz-slova',
  '/trenazher/sudoku-igra',
  '/trenazher/sobery-slovo',
  '/trenazher/matematicheskaya-lesenka',
  '/trenazher/zmeyka-s-chislami',
  '/trenazher/morskoy-boy',
  '/trenazher/ugaday-chislo',
];

export const STATIC_ROUTES: string[] = [
  '/',
  '/podpiska',
  '/privacy',
  '/terms',
  '/oferta',
  '/generator',
  '/generator/primery',
  '/generator/propisi-angliyskiy',
  '/generator/propisi-ru',
  '/generator/krossvordy',
  '/generator/filvordy',
  '/generator/anagrammy',
  '/generator/diktanty',
  '/generator/slovarnye-slova',
  '/generator/zadachi',
  '/generator/sostav-chisla',
  '/generator/schet-predmetov',
  '/generator/naydi-i-poschitay',
  '/generator/graficheskiy-diktant',
  '/generator/matematicheskaya-raskraska',
  '/generator/kotoryy-chas',
  '/generator/labirinty',
  '/generator/sudoku',
  '/generator/raspisanie-urokov',
  '/generator/fleshkarty',
  '/generator/spisyvanie',
  '/generator/chislovaya-piramida',
  '/igry',
  '/plakaty',
  '/sborniki',
  '/sborniki/podgotovka-k-1-klassu',
  '/pamyatki',
  '/dlya-roditeley',
  '/otzyvy',
  '/turnir',
  '/gotovnost',
  '/gotovnost-k-shkole',
  '/gotovnost-k-2-klassu',
  '/gotovnost-k-3-klassu',
  '/gotovnost-k-4-klassu',
  '/gotovnost-k-5-klassu',
  '/kakoy-ty-roditel',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const segmentRoutes = SEGMENTS.map((segment) => `/${segment.id}`);

  // Раздел ВПР: хаб + страницы предметов + все варианты (генерируются из данных)
  const vprRoutes = [
    '/vpr',
    ...getAllVprSubjectParams().map((p) => `/vpr/${p.klass}/${p.subject}`),
    ...getAllVprParams().map((p) => `/vpr/${p.klass}/${p.subject}/${p.variant}`),
  ];

  const articleRoutes = (await getAllArticleSlugs()).map((slug) => `/dlya-roditeley/${slug}`);

  const turnirRoutes = getTournamentTracks().map((t) => `/turnir/${t.id}`);

  // Раздел МЦКО (Москва и МО): хаб + страницы предметов + все варианты
  const mckoRoutes = [
    '/podgotovka-k-mcko',
    ...getAllMckoSubjectParams().map((p) => `/podgotovka-k-mcko/${p.klass}/${p.subject}`),
    ...getAllMckoParams().map((p) => `/podgotovka-k-mcko/${p.klass}/${p.subject}/${p.variant}`),
  ];

  // Новые темы из админки/БД живут под /tema/[slug]
  const cmsTopicRoutes = (await getPublishedTopics()).map((t) => `/tema/${t.slug}`);

  const allRoutes = [
    ...STATIC_ROUTES,
    ...segmentRoutes,
    ...TRAINER_ROUTES,
    ...TOPIC_ROUTES,
    ...vprRoutes,
    ...mckoRoutes,
    ...articleRoutes,
    ...cmsTopicRoutes,
    ...turnirRoutes,
  ];

  return allRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === '/' ? 'daily' : 'weekly',
    priority: route === '/' ? 1 : route.split('/').length <= 2 ? 0.8 : 0.6,
  }));
}
