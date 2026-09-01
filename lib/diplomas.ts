export interface ProgressStats {
  total: number;
  last7Days: number;
  last30Days: number;
  byCategory: Record<string, number>;
  vprVariantsCompleted: number;
  streak: number;
  dailySeries: { date: string; count: number }[];
}

export interface DiplomaDef {
  slug: string;
  title: string;
  description: string;
  icon: string;
  target: number;
  getValue: (progress: ProgressStats) => number;
}

// Достижения — от самых лёгких (мотивируют начать) до сложных (долгосрочная цель).
// Каждое достижение автоматически получает свою печатную страницу-диплом
// (app/account/diplomy/[slug]) — отдельно оформлять новую не нужно.
export const DIPLOMAS: DiplomaDef[] = [
  {
    slug: 'pervye-shagi',
    title: 'Первые шаги',
    description: 'За первое занятие на сайте',
    icon: '🌟',
    target: 1,
    getValue: (p) => p.total,
  },
  {
    slug: 'aktivny-uchenik',
    title: 'Активный ученик',
    description: 'За 25 занятий на тренажёрах и генераторах',
    icon: '🏅',
    target: 25,
    getValue: (p) => p.total,
  },
  {
    slug: 'staratelny-uchenik',
    title: 'Старательный ученик',
    description: 'За 50 занятий на тренажёрах и генераторах',
    icon: '🥉',
    target: 50,
    getValue: (p) => p.total,
  },
  {
    slug: 'master-uchyoby',
    title: 'Мастер учёбы',
    description: 'За 100 занятий на тренажёрах и генераторах',
    icon: '🥇',
    target: 100,
    getValue: (p) => p.total,
  },
  {
    slug: 'znatok-vpr',
    title: 'Знаток ВПР',
    description: 'За 10 решённых тренировочных вариантов ВПР',
    icon: '📜',
    target: 10,
    getValue: (p) => p.vprVariantsCompleted,
  },
  {
    slug: 'znatok-vpr-zoloto',
    title: 'Знаток ВПР: золото',
    description: 'За 20 решённых тренировочных вариантов ВПР',
    icon: '🏆',
    target: 20,
    getValue: (p) => p.vprVariantsCompleted,
  },
  {
    slug: 'nedelya-podryad',
    title: 'Неделя подряд',
    description: 'За 7 дней занятий подряд',
    icon: '🔥',
    target: 7,
    getValue: (p) => p.streak,
  },
  {
    slug: 'mesyats-podryad',
    title: 'Месяц подряд',
    description: 'За 30 дней занятий подряд',
    icon: '💎',
    target: 30,
    getValue: (p) => p.streak,
  },
  {
    slug: 'lyubitel-trenazherov',
    title: 'Любитель тренажёров',
    description: 'За 20 занятий на тренажёрах',
    icon: '🎮',
    target: 20,
    getValue: (p) => p.byCategory['trainer'] || 0,
  },
  {
    slug: 'master-generatorov',
    title: 'Мастер генераторов',
    description: 'За 20 занятий с генераторами заданий',
    icon: '⚙️',
    target: 20,
    getValue: (p) => p.byCategory['generator'] || 0,
  },
];

export function getDiploma(slug: string): DiplomaDef | undefined {
  return DIPLOMAS.find((d) => d.slug === slug);
}
