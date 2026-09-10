export interface SortItem {
  text: string;
  group: 'a' | 'b';
}

export interface SortTheme {
  title: string;
  icon: string;
  labelA: string;
  labelB: string;
  items: SortItem[];
}

export type SortThemeKey =
  | 'fruits-vegetables'
  | 'wild-domestic'
  | 'team-individual-sport'
  | 'living-nonliving'
  | 'migratory-wintering-birds';

// Слова — только заглавные русские буквы (кроме случаев с пробелом в названии, где это уместно).
export const SORT_THEMES: Record<SortThemeKey, SortTheme> = {
  'fruits-vegetables': {
    title: 'Фрукты и овощи',
    icon: '🍎',
    labelA: 'Фрукты',
    labelB: 'Овощи',
    items: [
      { text: 'ЯБЛОКО', group: 'a' },
      { text: 'ГРУША', group: 'a' },
      { text: 'БАНАН', group: 'a' },
      { text: 'АПЕЛЬСИН', group: 'a' },
      { text: 'СЛИВА', group: 'a' },
      { text: 'ВИНОГРАД', group: 'a' },
      { text: 'ПЕРСИК', group: 'a' },
      { text: 'МАНДАРИН', group: 'a' },
      { text: 'МОРКОВЬ', group: 'b' },
      { text: 'КАРТОФЕЛЬ', group: 'b' },
      { text: 'ОГУРЕЦ', group: 'b' },
      { text: 'ПОМИДОР', group: 'b' },
      { text: 'КАПУСТА', group: 'b' },
      { text: 'ЛУК', group: 'b' },
      { text: 'СВЁКЛА', group: 'b' },
      { text: 'ПЕРЕЦ', group: 'b' },
    ],
  },
  'wild-domestic': {
    title: 'Дикие и домашние животные',
    icon: '🦊',
    labelA: 'Дикие',
    labelB: 'Домашние',
    items: [
      { text: 'ВОЛК', group: 'a' },
      { text: 'ЛИСА', group: 'a' },
      { text: 'МЕДВЕДЬ', group: 'a' },
      { text: 'ЗАЯЦ', group: 'a' },
      { text: 'ЁЖ', group: 'a' },
      { text: 'БЕЛКА', group: 'a' },
      { text: 'ТИГР', group: 'a' },
      { text: 'ЛОСЬ', group: 'a' },
      { text: 'СОБАКА', group: 'b' },
      { text: 'КОШКА', group: 'b' },
      { text: 'КОРОВА', group: 'b' },
      { text: 'ЛОШАДЬ', group: 'b' },
      { text: 'СВИНЬЯ', group: 'b' },
      { text: 'КОЗА', group: 'b' },
      { text: 'ОВЦА', group: 'b' },
      { text: 'КРОЛИК', group: 'b' },
    ],
  },
  'team-individual-sport': {
    title: 'Командный и индивидуальный спорт',
    icon: '⚽',
    labelA: 'Командные',
    labelB: 'Индивидуальные',
    items: [
      { text: 'ФУТБОЛ', group: 'a' },
      { text: 'ВОЛЕЙБОЛ', group: 'a' },
      { text: 'БАСКЕТБОЛ', group: 'a' },
      { text: 'ХОККЕЙ', group: 'a' },
      { text: 'РЕГБИ', group: 'a' },
      { text: 'ГАНДБОЛ', group: 'a' },
      { text: 'БЕГ', group: 'b' },
      { text: 'ПЛАВАНИЕ', group: 'b' },
      { text: 'ГИМНАСТИКА', group: 'b' },
      { text: 'ШАХМАТЫ', group: 'b' },
      { text: 'БОКС', group: 'b' },
      { text: 'ЛЫЖИ', group: 'b' },
      { text: 'ТЕННИС', group: 'b' },
      { text: 'ФИГУРНОЕ КАТАНИЕ', group: 'b' },
    ],
  },
  'living-nonliving': {
    title: 'Живая и неживая природа',
    icon: '🌱',
    labelA: 'Живая',
    labelB: 'Неживая',
    items: [
      { text: 'БЕРЁЗА', group: 'a' },
      { text: 'ГРИБ', group: 'a' },
      { text: 'БАБОЧКА', group: 'a' },
      { text: 'ЛЯГУШКА', group: 'a' },
      { text: 'ЧЕЛОВЕК', group: 'a' },
      { text: 'РОМАШКА', group: 'a' },
      { text: 'ВОРОБЕЙ', group: 'a' },
      { text: 'ЧЕРВЯК', group: 'a' },
      { text: 'КАМЕНЬ', group: 'b' },
      { text: 'ОБЛАКО', group: 'b' },
      { text: 'СНЕГ', group: 'b' },
      { text: 'ПЕСОК', group: 'b' },
      { text: 'ВОДА', group: 'b' },
      { text: 'СОЛНЦЕ', group: 'b' },
      { text: 'ЗВЕЗДА', group: 'b' },
      { text: 'ЛЁД', group: 'b' },
    ],
  },
  'migratory-wintering-birds': {
    title: 'Перелётные и зимующие птицы',
    icon: '🐦',
    labelA: 'Перелётные',
    labelB: 'Зимующие',
    items: [
      { text: 'ЛАСТОЧКА', group: 'a' },
      { text: 'СКВОРЕЦ', group: 'a' },
      { text: 'ЖУРАВЛЬ', group: 'a' },
      { text: 'ГРАЧ', group: 'a' },
      { text: 'КУКУШКА', group: 'a' },
      { text: 'ИВОЛГА', group: 'a' },
      { text: 'СОЛОВЕЙ', group: 'a' },
      { text: 'АИСТ', group: 'a' },
      { text: 'ВОРОБЕЙ', group: 'b' },
      { text: 'ГОЛУБЬ', group: 'b' },
      { text: 'СИНИЦА', group: 'b' },
      { text: 'ВОРОНА', group: 'b' },
      { text: 'СОРОКА', group: 'b' },
      { text: 'ДЯТЕЛ', group: 'b' },
      { text: 'СНЕГИРЬ', group: 'b' },
      { text: 'СОВА', group: 'b' },
    ],
  },
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export interface SortResult {
  labelA: string;
  labelB: string;
  items: SortItem[];
}

export function generateSortGroups(theme: SortThemeKey, count = 10): SortResult {
  const t = SORT_THEMES[theme];
  const perGroup = Math.ceil(count / 2);
  const a = shuffle(t.items.filter((i) => i.group === 'a')).slice(0, perGroup);
  const b = shuffle(t.items.filter((i) => i.group === 'b')).slice(0, count - a.length);
  return { labelA: t.labelA, labelB: t.labelB, items: shuffle([...a, ...b]) };
}

export function generateSortGroupsFromItems(labelA: string, labelB: string, items: SortItem[]): SortResult {
  return { labelA, labelB, items: shuffle(items) };
}
