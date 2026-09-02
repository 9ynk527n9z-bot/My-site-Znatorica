import { SEGMENTS } from '@/lib/constants';
import { CODE_TOPIC_ROUTES } from '@/lib/code-topics';
import { TRAINER_ROUTES, STATIC_ROUTES } from '@/app/sitemap';
import { getAllVprParams, getAllVprSubjectParams } from '@/lib/vpr';
import { getAllMckoParams, getAllMckoSubjectParams } from '@/lib/mcko';
import { getAllArticleSlugs, getPublishedTopics } from '@/lib/content';
import { getTournamentTracks } from '@/lib/tournament';
import { GAMES } from '@/lib/games';

export interface SectionPageCount {
  label: string;
  count: number;
  href: string;
}

// Реальное число страниц по разделам — считаем из тех же источников, что и sitemap.ts,
// чтобы цифры на главной не расходились с тем, что реально проиндексировано.
export async function getSectionPageCounts(): Promise<{ sections: SectionPageCount[]; other: number; total: number }> {
  const [articleSlugs, cmsTopics] = await Promise.all([getAllArticleSlugs(), getPublishedTopics()]);

  const generatorCount = STATIC_ROUTES.filter((r) => r.startsWith('/generator/')).length;
  const gamesCount = GAMES.length;
  const trenazheryCount = TRAINER_ROUTES.length - 1 /* хаб /trenazher */ - gamesCount;
  const uchebaCount = SEGMENTS.length + CODE_TOPIC_ROUTES.length + cmsTopics.length;
  const vprMckoCount =
    1 +
    getAllVprSubjectParams().length +
    getAllVprParams().length +
    1 +
    getAllMckoSubjectParams().length +
    getAllMckoParams().length;
  const roditeliCount = articleSlugs.length;

  const sections: SectionPageCount[] = [
    { label: 'Учёба', count: uchebaCount, href: '#ucheba' },
    { label: 'Генераторы', count: generatorCount, href: '/generator' },
    { label: 'Тренажёры', count: trenazheryCount, href: '/trenazher' },
    { label: 'Игры', count: gamesCount, href: '/igry' },
    { label: 'ВПР / МЦКО', count: vprMckoCount, href: '/vpr' },
    { label: 'Для родителей', count: roditeliCount, href: '#dlya-roditeley' },
  ];

  const total = STATIC_ROUTES.length + SEGMENTS.length + TRAINER_ROUTES.length + CODE_TOPIC_ROUTES.length +
    (1 + getAllVprSubjectParams().length + getAllVprParams().length) +
    (1 + getAllMckoSubjectParams().length + getAllMckoParams().length) +
    articleSlugs.length + cmsTopics.length + getTournamentTracks().length;

  const other = total - sections.reduce((sum, s) => sum + s.count, 0);

  return { sections, other, total };
}
