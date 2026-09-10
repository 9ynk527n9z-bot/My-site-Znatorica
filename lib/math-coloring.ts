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

export type ColoringPictureId = 'rocket' | 'house' | 'tree';
export type ColoringLevel = 10 | 20;

function rows(strings: string[]): boolean[][] {
  return strings.map((row) => row.split('').map((ch) => ch === '#'));
}

// 16×16 симметричная ракета: нос, корпус, боковые крылья и пламя.
const ROCKET_GRID = rows([
  '.......##.......',
  '.......##.......',
  '.......##.......',
  '.......##.......',
  '......####......',
  '......####......',
  '.....######.....',
  '.....######.....',
  '.....######.....',
  '.....######.....',
  '....########....',
  '...###.##.###...',
  '..###..##..###..',
  '.......##.......',
  '......####......',
  '.......##.......',
]);

// 16×16 симметричный домик: ровная крыша, стены, два окна и дверь.
const HOUSE_GRID = rows([
  '.......##.......',
  '......####......',
  '.....######.....',
  '....########....',
  '...##########...',
  '..############..',
  '.##############.',
  '################',
  '..############..',
  '..############..',
  '..############..',
  '..############..',
  '..############..',
  '..############..',
  '..############..',
  '..############..',
]);

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
  { id: 'rocket', label: 'Ракета', emoji: '🚀', grid: ROCKET_GRID },
  { id: 'house', label: 'Домик', emoji: '🏠', grid: HOUSE_GRID },
  { id: 'tree', label: 'Ёлочка', emoji: '🎄', grid: TREE_GRID },
];

export const LEVELS: ColoringLevel[] = [10, 20];

export interface ColorBand {
  key: 'purple' | 'red' | 'amber' | 'orange' | 'sky' | 'pink' | 'green' | 'lime' | 'brown';
  label: string;
  swatch: string; // цвет для превью-решения (инлайн style, независим от Tailwind JIT)
  bgClass: string;
  min: number;
  max: number;
}

// Диапазоны ответов делят весь возможный диапазон между цветами конкретного
// рисунка. Цвета назначены деталям заранее, поэтому решение даёт цельную картинку.
function bandsForLevel(level: ColoringLevel, pictureId: ColoringPictureId): ColorBand[] {
  const houseMeta: Array<{ key: ColorBand['key']; label: string; swatch: string; bgClass: string }> = [
    { key: 'purple', label: 'Сиреневый', swatch: '#c084fc', bgClass: 'bg-purple-400' },
    { key: 'red', label: 'Красный', swatch: '#f87171', bgClass: 'bg-red-400' },
    { key: 'amber', label: 'Жёлтый', swatch: '#fbbf24', bgClass: 'bg-amber-400' },
    { key: 'sky', label: 'Голубой', swatch: '#38bdf8', bgClass: 'bg-sky-400' },
    { key: 'pink', label: 'Розовый', swatch: '#f472b6', bgClass: 'bg-pink-400' },
  ];
  const rocketMeta: typeof houseMeta = [
    { key: 'red', label: 'Красный', swatch: '#f87171', bgClass: 'bg-red-400' },
    { key: 'sky', label: 'Голубой', swatch: '#38bdf8', bgClass: 'bg-sky-400' },
    { key: 'amber', label: 'Жёлтый', swatch: '#facc15', bgClass: 'bg-yellow-400' },
    { key: 'orange', label: 'Оранжевый', swatch: '#fb923c', bgClass: 'bg-orange-400' },
  ];
  const treeMeta: typeof houseMeta = [
    { key: 'lime', label: 'Светло-зелёный', swatch: '#86efac', bgClass: 'bg-green-300' },
    { key: 'green', label: 'Тёмно-зелёный', swatch: '#15803d', bgClass: 'bg-green-700' },
    { key: 'brown', label: 'Коричневый', swatch: '#a16207', bgClass: 'bg-yellow-700' },
    { key: 'red', label: 'Красный', swatch: '#ef4444', bgClass: 'bg-red-500' },
    { key: 'amber', label: 'Жёлтый', swatch: '#facc15', bgClass: 'bg-yellow-400' },
  ];
  const meta = pictureId === 'rocket' ? rocketMeta : pictureId === 'tree' ? treeMeta : houseMeta;
  const ranges = meta.length === 4
    ? (level === 10 ? [[0, 2], [3, 5], [6, 8], [9, 10]] : [[0, 5], [6, 10], [11, 15], [16, 20]])
    : (level === 10 ? [[0, 2], [3, 4], [5, 6], [7, 8], [9, 10]] : [[0, 4], [5, 8], [9, 12], [13, 16], [17, 20]]);
  return ranges.map(([min, max], i) => ({ ...meta[i], min, max }));
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

function makeProblemForBand(level: ColoringLevel, band: ColorBand) {
  const answer = band.min + randomInt(band.max - band.min);
  if (Math.random() < 0.5) {
    const a = randomInt(answer);
    return { a, b: answer - a, op: '+' as const, answer };
  }
  const b = randomInt(level - answer);
  return { a: answer + b, b, op: '-' as const, answer };
}

function houseBandIndex(row: number, col: number): number {
  if (row <= 7) {
    const filled = HOUSE_GRID[row];
    const first = filled.indexOf(true);
    const last = filled.lastIndexOf(true);
    return col === first || col === last ? 0 : 1; // сиреневые скаты, красная крыша
  }
  if ((row === 9 || row === 10) && ((col >= 3 && col <= 5) || (col >= 10 && col <= 12))) return 3;
  if (row >= 12 && col >= 7 && col <= 8) return 4;
  return 2; // жёлтые стены
}

function isOutline(grid: boolean[][], row: number, col: number): boolean {
  return !grid[row - 1]?.[col] || !grid[row + 1]?.[col] || !grid[row]?.[col - 1] || !grid[row]?.[col + 1];
}

function rocketBandIndex(row: number, col: number): number {
  if (row <= 3) return 0;
  if ((row === 5 || row === 6) && col >= 7 && col <= 8) return 2;
  if (row >= 14) return row === 15 ? 0 : 2;
  if (row >= 11 && row <= 12 && (col <= 5 || col >= 10)) return 3;
  return 1;
}

function treeBandIndex(row: number, col: number): number {
  if (row <= 1) return 4;
  if (row >= 13) return 2;
  const redToy = [[5, 6], [5, 9], [8, 4], [8, 11], [11, 3], [11, 12]]
    .some(([r, c]) => r === row && c === col);
  const yellowToy = [[7, 7], [7, 8], [10, 6], [10, 9]]
    .some(([r, c]) => r === row && c === col);
  if (redToy) return 3;
  if (yellowToy) return 4;
  return isOutline(TREE_GRID, row, col) ? 1 : 0;
}

export function generateColoringPicture(pictureId: ColoringPictureId, level: ColoringLevel): ColoringResult {
  const picture = PICTURES.find((p) => p.id === pictureId) ?? PICTURES[0];
  const bands = bandsForLevel(level, pictureId);
  const cells: ColoringCell[] = [];

  picture.grid.forEach((rowCells, row) => {
    rowCells.forEach((filled, col) => {
      if (!filled) return;
      const fixedBandIndex = pictureId === 'house'
        ? houseBandIndex(row, col)
        : pictureId === 'tree'
          ? treeBandIndex(row, col)
          : rocketBandIndex(row, col);
      const problem = makeProblemForBand(level, bands[fixedBandIndex]);
      cells.push({
        row,
        col,
        ...problem,
        bandIndex: fixedBandIndex,
      });
    });
  });

  return { pictureId, level, grid: picture.grid, cells, bands };
}
