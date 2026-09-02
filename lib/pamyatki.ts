// Бесплатные печатные памятки для родителей первоклассников — без регистрации,
// в отличие от платных PDF-сборников (см. lib/products.ts). Цель — приводить
// трафик и доверие, не продажи.

export interface Pamyatka {
  slug: string;
  title: string;
  description: string;
  emoji: string;
  fileName: string;
}

export const PAMYATKI: Pamyatka[] = [
  {
    slug: 'gotov-li-rebenok-k-1-klassu',
    title: 'Готов ли ребёнок к 1 классу: чек-лист для родителей',
    description: 'Учебные навыки, самостоятельность и психологическая готовность — отметь пункты и пойми, готов ли первоклассник к школе.',
    emoji: '✅',
    fileName: 'gotov-li-rebenok-k-1-klassu.pdf',
  },
  {
    slug: 'chto-kupit-pervoklassniku',
    title: 'Что купить первокласснику: полный список к школе',
    description: 'Портфель, канцелярия, форма и всё для уроков труда — ничего не забудешь к 1 сентября.',
    emoji: '🎒',
    fileName: 'chto-kupit-pervoklassniku.pdf',
  },
  {
    slug: 'rezhim-dnya-pervoklassnika',
    title: 'Режим дня первоклассника: расписание по часам',
    description: 'Ориентировочная схема дня — сон, уроки, отдых и прогулки в правильном балансе.',
    emoji: '🕐',
    fileName: 'rezhim-dnya-pervoklassnika.pdf',
  },
  {
    slug: 'adaptaciya-pervoklassnika-k-shkole',
    title: 'Адаптация первоклассника к школе: советы на первый месяц',
    description: 'Что нормально в первые недели, как помочь ребёнку и когда стоит обратиться к психологу.',
    emoji: '🌱',
    fileName: 'adaptaciya-pervoklassnika-k-shkole.pdf',
  },
  {
    slug: 'bezopasnost-pervoklassnika-po-doroge-v-shkolu',
    title: 'Безопасность первоклассника по дороге в школу',
    description: 'Как выбрать и отработать безопасный маршрут, правила перехода дороги.',
    emoji: '🚸',
    fileName: 'bezopasnost-pervoklassnika-po-doroge-v-shkolu.pdf',
  },
  {
    slug: 'kak-pomoch-pervoklassniku-s-domashnim-zadaniem',
    title: 'Как помочь первокласснику с домашним заданием',
    description: 'Что делать и чего избегать, чтобы ребёнок учился сам, а не полагался на родителей.',
    emoji: '📚',
    fileName: 'kak-pomoch-pervoklassniku-s-domashnim-zadaniem.pdf',
  },
];

export function getPamyatka(slug: string): Pamyatka | undefined {
  return PAMYATKI.find((p) => p.slug === slug);
}
