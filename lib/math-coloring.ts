// Генератор «Математическая раскраска»: картинка разбита на клетки сетки,
// в каждой закрашенной клетке — пример на сложение/вычитание. Ответ попадает
// в один из 4 диапазонов, каждому диапазону соответствует свой цвет из
// легенды. Ребёнок решает пример и закрашивает клетку нужным цветом —
// если всё верно, проявляется картинка.
//
// ВАЖНО про цвета: violet/orange в tailwind.config.js заданы как плоские
// строки без шкалы оттенков (-400 и т.п. не существуют), поэтому здесь
// используются стандартные цвета Tailwind (purple/amber/sky/pink), у которых
// шкала оттенков есть из коробки — см. memory/tailwind_custom_colors_gotcha.md.

export type ColoringPictureId = 'star' | 'heart' | 'tree';
export type ColoringLevel = 10 | 20;

function rows(strings: string[]): boolean[][] {
  return strings.map((row) => row.split('').map((ch) => ch === '#'));
}

// 16×16 силуэт пятиконечной звезды. Строки 6-7 дают заметную вогнутую
// «подмышку» между верхним лучом и боковыми — без нее фигура читалась
// как ромб с двумя ножками, а не как звезда.
const STAR_GRID = rows([
  '.......##.......',
  '.......##.......',
  '......####......',
  '......####......',
  '.....######.....',
  '....########....',
  '###..######..###',
  '#####.####.#####',
  '################',
  '.##############.',
  '..############..',
  '...##########...',
  '.######..######.',
  '######....######',
  '#####......#####',
  '####........####',
].map((r) => r.slice(0, 16)));

// 16×16 симметричное сердце.
const HEART_GRID = rows([
  '.###....###.....',
  '#####..#####....',
  '#######.#######.',
  '################',
  '################',
  '################',
  '.##############.',
  '.##############.',
  '..############..',
  '..############..',
  '...##########...',
  '...##########...',
  '....########....',
  '.....######.....',
  '......####......',
  '.......##.......',
].map((r) => r.slice(0, 16)));

// 16×16 ёлочка: расширяющийся треугольник + ствол.
const TREE_GRID = rows([
  '.......##.......',
  '......####......',
  '......####......',
  '.....######.....',
  '.....######.....',
  '....########....',
  '...##########...',
  '...##########...',
  '..############..',
  '..############..',
  '.##############.',
  '.##############.',
  '################',
  '.......##.......',
  '.......##.......',
  '......####......',
]);

export interface ColoringPictureDef {
  id: ColoringPictureId;
  label: string;
  emoji: string;
  grid: boolean[][];
}

export const PICTURES: ColoringPictureDef[] = [
  { id: 'star', label: 'Звезда', emoji: '⭐', grid: STAR_GRID },
  { id: 'heart', label: 'Сердечко', emoji: '💖', grid: HEART_GRID },
  { id: 'tree', label: 'Ёлочка', emoji: '🎄', grid: TREE_GRID },
];

export const LEVELS: ColoringLevel[] = [10, 20];

export interface ColorBand {
  key: 'purple' | 'amber' | 'sky' | 'pink';
  label: string;
  swatch: string; // цвет для превью-решения (инлайн style, независим от Tailwind JIT)
  bgClass: string;
  min: number;
  max: number;
}

// Диапазоны ответов делят весь возможный диапазон (0..уровень) на 4 примерно
// равные части — см. обоснование расчёта границ в описании задачи генератора.
function bandsForLevel(level: ColoringLevel): ColorBand[] {
  const ranges = level === 10 ? [[0, 2], [3, 5], [6, 8], [9, 10]] : [[0, 5], [6, 10], [11, 15], [16, 20]];
  const meta: Array<{ key: ColorBand['key']; label: string; swatch: string; bgClass: string }> = [
    { key: 'purple', label: 'Фиолетовый', swatch: '#c084fc', bgClass: 'bg-purple-400' },
    { key: 'amber', label: 'Жёлтый', swatch: '#fbbf24', bgClass: 'bg-amber-400' },
    { key: 'sky', label: 'Голубой', swatch: '#38bdf8', bgClass: 'bg-sky-400' },
    { key: 'pink', label: 'Розовый', swatch: '#f472b6', bgClass: 'bg-pink-400' },
  ];
  return ranges.map(([min, max], i) => ({ ...meta[i], min, max }));
}

function bandIndexForAnswer(answer: number, bands: ColorBand[]): number {
  const idx = bands.findIndex((b) => answer >= b.min && answer <= b.max);
  return idx === -1 ? bands.length - 1 : idx;
}

export interface ColoringCell {
  row: number;
  col: number;
  a: number;
  b: number;
  op: '+' | '-';
  answer: number;
  bandIndex: number;
}

export interface ColoringResult {
  pictureId: ColoringPictureId;
  level: ColoringLevel;
  grid: boolean[][];
  cells: ColoringCell[]; // только закрашенные клетки картинки
  bands: ColorBand[];
}

function randomInt(max: number): number {
  return Math.floor(Math.random() * (max + 1));
}

function makeProblem(level: ColoringLevel): { a: number; b: number; op: '+' | '-'; answer: number } {
  const op: '+' | '-' = Math.random() < 0.5 ? '+' : '-';
  if (op === '+') {
    const a = randomInt(level);
    const b = randomInt(level - a);
    return { a, b, op, answer: a + b };
  }
  const a = randomInt(level);
  const b = randomInt(a);
  return { a, b, op, answer: a - b };
}

export function generateColoringPicture(pictureId: ColoringPictureId, level: ColoringLevel): ColoringResult {
  const picture = PICTURES.find((p) => p.id === pictureId) ?? PICTURES[0];
  const bands = bandsForLevel(level);
  const cells: ColoringCell[] = [];

  picture.grid.forEach((rowCells, row) => {
    rowCells.forEach((filled, col) => {
      if (!filled) return;
      const { a, b, op, answer } = makeProblem(level);
      cells.push({ row, col, a, b, op, answer, bandIndex: bandIndexForAnswer(answer, bands) });
    });
  });

  return { pictureId, level, grid: picture.grid, cells, bands };
}
