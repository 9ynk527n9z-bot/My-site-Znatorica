import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';
import { SEGMENTS } from '@/lib/constants';
import { getAllVprParams, getAllVprSubjectParams } from '@/lib/vpr';
import { getAllArticleSlugs, getPublishedTopics } from '@/lib/content';
import { CODE_TOPIC_ROUTES } from '@/lib/code-topics';

// Контент из БД меняется через админку — не кешируем sitemap статически.
export const dynamic = 'force-dynamic';

// Темы, свёрстанные в коде (52 «цветные» страницы).
const TOPIC_ROUTES: string[] = CODE_TOPIC_ROUTES;

const TRAINER_ROUTES: string[] = [
  '/trenazher',
  '/trenazher/azbuky',
  '/trenazher/numbers',
  '/trenazher/colors',
  '/trenazher/multiplication',
  '/trenazher/english-words',
  '/trenazher/irregular-verbs',
  '/trenazher/pogovorki',
  '/trenazher/shapes-colors',
  '/trenazher/pristavki',
  '/trenazher/angliyskiy-alfavit',
  '/trenazher/angliyskiy-schet',
  '/trenazher/tablitsa-umnozheniya',
  '/trenazher/slovarnye-slova',
  '/trenazher/naydi-lishnee',
  '/trenazher/naydi-paru',
  '/trenazher/chto-izmenilos',
  '/trenazher/sobery-po-poryadku',
  '/trenazher/english-colors',
  '/trenazher/english-shapes',
  '/trenazher/sravnenie',
];

const STATIC_ROUTES: string[] = [
  '/',
  '/podpiska',
  '/privacy',
  '/terms',
  '/oferta',
  '/login',
  '/register',
  '/generator',
  '/generator/primery',
  '/generator/propisi',
  '/generator/propisi-ru',
  '/generator/krossvordy',
  '/generator/math',
  '/generator/filvordy',
  '/generator/anagrammy',
  '/generator/diktanty',
  '/generator/slovarnye-slova',
  '/generator/zadachi',
  '/generator/sostav-chisla',
  '/generator/schet-predmetov',
  '/generator/graficheskiy-diktant',
  '/plakaty',
  '/dlya-roditeley',
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

  // Новые темы из админки/БД живут под /tema/[slug]
  const cmsTopicRoutes = (await getPublishedTopics()).map((t) => `/tema/${t.slug}`);

  const allRoutes = [
    ...STATIC_ROUTES,
    ...segmentRoutes,
    ...TRAINER_ROUTES,
    ...TOPIC_ROUTES,
    ...vprRoutes,
    ...articleRoutes,
    ...cmsTopicRoutes,
  ];

  return allRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === '/' ? 'daily' : 'weekly',
    priority: route === '/' ? 1 : route.split('/').length <= 2 ? 0.8 : 0.6,
  }));
}
