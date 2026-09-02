// Каталог украшений для «Домика Знатика» (геймификация /domik).
// Ребёнок тратит звёзды (progress.total + starsBalance − уже потрачено),
// чтобы украсить домик белки-маскота. Категории влияют только на группировку
// в магазине и на то, в какой части сцены рисуется предмет.
export type DecorationCategory = 'mebel' | 'steny' | 'dvor' | 'prazdnik';

export interface DecorationItem {
  id: string;
  title: string;
  emoji: string;
  cost: number;
  category: DecorationCategory;
  // Только для category: 'mebel' — на каком этаже окна показывается (1 — низ, 2 — верх).
  floor?: 1 | 2;
}

export const DECORATION_CATEGORIES: { id: DecorationCategory; title: string }[] = [
  { id: 'mebel', title: 'Мебель' },
  { id: 'steny', title: 'Стены и окна' },
  { id: 'dvor', title: 'Двор' },
  { id: 'prazdnik', title: 'Праздник' },
];

// Цены растут от дешёвых «на попробовать» до крупных долгосрочных целей —
// экономика: 1 звезда/занятие + до 40/день за подарок со стриком.
export const DECORATIONS: DecorationItem[] = [
  { id: 'kovrik', title: 'Персиковый письменный стол', emoji: '🗃️', cost: 25, category: 'mebel', floor: 1 },
  { id: 'podushka', title: 'Кровать с лавандовым одеялом', emoji: '🛏️', cost: 15, category: 'mebel', floor: 2 },
  { id: 'lampa', title: 'Компьютер на подставке', emoji: '🖥️', cost: 50, category: 'mebel', floor: 2 },
  { id: 'polka-knig', title: 'Книжный стеллаж', emoji: '📚', cost: 35, category: 'mebel', floor: 2 },
  { id: 'divan', title: 'Мягкий персиковый диван', emoji: '🛋️', cost: 60, category: 'mebel', floor: 1 },
  { id: 'stol', title: 'Круглый стол и два стула', emoji: '🪑', cost: 45, category: 'mebel', floor: 1 },
  { id: 'shkaf', title: 'Уютный платяной шкаф', emoji: '🗄️', cost: 70, category: 'mebel', floor: 2 },

  { id: 'kartina', title: 'Картина с цветком', emoji: '🖼️', cost: 25, category: 'steny' },
  { id: 'chasy', title: 'Круглые настенные часы', emoji: '🕐', cost: 30, category: 'steny' },
  { id: 'shtory', title: 'Лавандовые шторы', emoji: '🪟', cost: 40, category: 'steny' },
  { id: 'girlyanda', title: 'Гирлянда огоньков', emoji: '✨', cost: 50, category: 'steny' },

  { id: 'ogorod', title: 'Три грядки с овощами', emoji: '🥕', cost: 30, category: 'dvor' },
  { id: 'kacheli', title: 'Садовые качели', emoji: '🛝', cost: 55, category: 'dvor' },
  { id: 'fonar', title: 'Фонарик у крыльца', emoji: '🏮', cost: 25, category: 'dvor' },
  { id: 'derevo', title: 'Ореховое дерево', emoji: '🌳', cost: 65, category: 'dvor' },

  { id: 'shary', title: 'Воздушные шары', emoji: '🎈', cost: 20, category: 'prazdnik' },
  { id: 'flazhki', title: 'Флажки', emoji: '🎏', cost: 20, category: 'prazdnik' },
  { id: 'tort', title: 'Праздничный торт', emoji: '🎂', cost: 40, category: 'prazdnik' },
  { id: 'feyerverk', title: 'Салют', emoji: '🎆', cost: 80, category: 'prazdnik' },
];

export function getDecoration(id: string): DecorationItem | undefined {
  return DECORATIONS.find((d) => d.id === id);
}

export const TOTAL_DECORATIONS_COST = DECORATIONS.reduce((sum, d) => sum + d.cost, 0);
