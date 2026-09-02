// «Найди и посчитай» — на листе вразброс расположены эмодзи-картинки нескольких
// разных видов (перемешаны), ребёнок должен найти и сосчитать, сколько каждого
// вида, и вписать числа в таблицу снизу.

export type FindCountCategory = 'zhivotnye' | 'frukty' | 'transport' | 'figury';

export const CATEGORY_LABELS: Record<FindCountCategory, string> = {
  zhivotnye: 'Животные',
  frukty: 'Фрукты и ягоды',
  transport: 'Транспорт',
  figury: 'Фигуры',
};

// Пул эмодзи по категориям — с запасом (по 8), чтобы можно было выбрать
// до 6 случайных непересекающихся видов на лист.
const EMOJI_POOLS: Record<FindCountCategory, { emoji: string; name: string }[]> = {
  zhivotnye: [
    { emoji: '🐶', name: 'собак' },
    { emoji: '🐱', name: 'кошек' },
    { emoji: '🐰', name: 'зайцев' },
    { emoji: '🐻', name: 'медведей' },
    { emoji: '🦊', name: 'лис' },
    { emoji: '🐸', name: 'лягушек' },
    { emoji: '🐷', name: 'свинок' },
    { emoji: '🐵', name: 'обезьян' },
  ],
  frukty: [
    { emoji: '🍎', name: 'яблок' },
    { emoji: '🍌', name: 'бананов' },
    { emoji: '🍇', name: 'гроздей винограда' },
    { emoji: '🍊', name: 'апельсинов' },
    { emoji: '🍓', name: 'клубничек' },
    { emoji: '🍋', name: 'лимонов' },
    { emoji: '🍒', name: 'вишенок' },
    { emoji: '🍉', name: 'арбузов' },
  ],
  transport: [
    { emoji: '🚗', name: 'машин' },
    { emoji: '🚌', name: 'автобусов' },
    { emoji: '🚂', name: 'поездов' },
    { emoji: '✈️', name: 'самолётов' },
    { emoji: '🚲', name: 'велосипедов' },
    { emoji: '🚁', name: 'вертолётов' },
    { emoji: '🚢', name: 'корабликов' },
    { emoji: '🚓', name: 'полицейских машин' },
  ],
  figury: [
    { emoji: '🔴', name: 'красных кругов' },
    { emoji: '🔵', name: 'синих кругов' },
    { emoji: '🟢', name: 'зелёных кругов' },
    { emoji: '🟡', name: 'жёлтых кругов' },
    { emoji: '🟣', name: 'фиолетовых кругов' },
    { emoji: '🟠', name: 'оранжевых кругов' },
    { emoji: '⬛', name: 'чёрных квадратов' },
    { emoji: '🔺', name: 'треугольников' },
  ],
};

export interface FindCountKind {
  emoji: string;
  name: string;
  count: number;
}

export interface FindCountSheet {
  category: FindCountCategory;
  kinds: FindCountKind[];
  // Все эмодзи вперемешку, в случайном порядке отображения.
  shuffled: string[];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const MAX_TOTAL_ICONS = 40;
const MIN_PER_KIND = 2;
const MAX_PER_KIND = 9;

// Генерирует лист: выбирает kindsCount случайных непересекающихся видов эмодзи
// из категории, для каждого — случайное количество (2-9), следит, чтобы общая
// сумма не превышала MAX_TOTAL_ICONS (комфортно для листа A4).
export function generateFindCountSheet(category: FindCountCategory, kindsCount: number): FindCountSheet {
  const pool = EMOJI_POOLS[category];
  const n = Math.min(Math.max(kindsCount, 4), Math.min(6, pool.length));
  const chosen = shuffle(pool).slice(0, n);

  // Верхняя граница на вид с учётом общего лимита в 40 иконок на лист.
  const perKindCap = Math.max(MIN_PER_KIND, Math.min(MAX_PER_KIND, Math.floor(MAX_TOTAL_ICONS / n)));

  const kinds: FindCountKind[] = chosen.map((item) => ({
    emoji: item.emoji,
    name: item.name,
    count: MIN_PER_KIND + Math.floor(Math.random() * (perKindCap - MIN_PER_KIND + 1)),
  }));

  const all: string[] = [];
  for (const k of kinds) {
    for (let i = 0; i < k.count; i++) all.push(k.emoji);
  }

  return { category, kinds, shuffled: shuffle(all) };
}
