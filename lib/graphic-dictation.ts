// Графический диктант: от стартовой точки ребёнок ведёт линию по инструкциям
// («3 клетки вправо, 2 клетки вниз…») и получает рисунок. Все фигуры заданы
// только горизонтальными/вертикальными шагами (без диагоналей — так это и
// делается на практике) и проверены на то, что не выходят за пределы сетки.
export type Direction = 'R' | 'L' | 'U' | 'D';

export interface Move {
  dir: Direction;
  n: number;
}

export interface DictationShape {
  id: string;
  title: string;
  start: [number, number];
  moves: Move[];
  gridSize: number; // сторона квадратной сетки в клетках
}

const DIR_WORD: Record<Direction, string> = {
  R: 'вправо',
  L: 'влево',
  U: 'вверх',
  D: 'вниз',
};

function cellsWord(n: number): string {
  if (n === 1) return 'клетка';
  if (n >= 2 && n <= 4) return 'клетки';
  return 'клеток';
}

export const SHAPES: DictationShape[] = [
  {
    id: 'flag',
    title: 'Флажок',
    start: [2, 10],
    gridSize: 12,
    moves: [
      { dir: 'U', n: 8 },
      { dir: 'R', n: 4 },
      { dir: 'D', n: 2 },
      { dir: 'L', n: 4 },
      { dir: 'D', n: 6 },
    ],
  },
  {
    id: 'house',
    title: 'Домик',
    start: [2, 10],
    gridSize: 12,
    moves: [
      { dir: 'U', n: 4 },
      { dir: 'R', n: 1 },
      { dir: 'U', n: 1 },
      { dir: 'R', n: 1 },
      { dir: 'U', n: 1 },
      { dir: 'R', n: 1 },
      { dir: 'D', n: 1 },
      { dir: 'R', n: 1 },
      { dir: 'D', n: 1 },
      { dir: 'D', n: 4 },
      { dir: 'L', n: 4 },
    ],
  },
  {
    id: 'tree',
    title: 'Ёлочка',
    start: [2, 8],
    gridSize: 10,
    moves: [
      { dir: 'U', n: 2 },
      { dir: 'R', n: 1 },
      { dir: 'U', n: 1 },
      { dir: 'R', n: 1 },
      { dir: 'U', n: 1 },
      { dir: 'R', n: 1 },
      { dir: 'D', n: 1 },
      { dir: 'R', n: 1 },
      { dir: 'D', n: 1 },
      { dir: 'D', n: 2 },
      { dir: 'L', n: 4 },
    ],
  },
  {
    id: 'boat',
    title: 'Кораблик',
    start: [2, 10],
    gridSize: 12,
    moves: [
      { dir: 'R', n: 6 },
      { dir: 'U', n: 2 },
      { dir: 'L', n: 1 },
      { dir: 'U', n: 2 },
      { dir: 'L', n: 4 },
      { dir: 'D', n: 4 },
    ],
  },
  {
    id: 'mushroom',
    title: 'Грибок',
    start: [3, 10],
    gridSize: 12,
    moves: [
      { dir: 'U', n: 2 },
      { dir: 'L', n: 2 },
      { dir: 'U', n: 2 },
      { dir: 'R', n: 6 },
      { dir: 'D', n: 2 },
      { dir: 'L', n: 2 },
      { dir: 'D', n: 2 },
      { dir: 'L', n: 2 },
    ],
  },
  {
    id: 'umbrella',
    title: 'Зонтик',
    start: [6, 12],
    gridSize: 14,
    moves: [
      { dir: 'U', n: 5 },
      { dir: 'L', n: 1 },
      { dir: 'U', n: 1 },
      { dir: 'R', n: 1 },
      { dir: 'U', n: 1 },
      { dir: 'R', n: 1 },
      { dir: 'U', n: 1 },
      { dir: 'R', n: 1 },
      { dir: 'D', n: 1 },
      { dir: 'R', n: 1 },
      { dir: 'D', n: 1 },
      { dir: 'R', n: 1 },
      { dir: 'U', n: 1 },
      { dir: 'D', n: 5 },
    ],
  },
  {
    id: 'robot',
    title: 'Робот',
    start: [2, 10],
    gridSize: 12,
    moves: [
      { dir: 'U', n: 3 },
      { dir: 'R', n: 4 },
      { dir: 'D', n: 3 },
      { dir: 'L', n: 4 },
      { dir: 'U', n: 3 },
      { dir: 'U', n: 3 },
      { dir: 'R', n: 4 },
      { dir: 'D', n: 3 },
      { dir: 'L', n: 4 },
    ],
  },
  {
    id: 'fish',
    title: 'Рыбка',
    start: [2, 8],
    gridSize: 12,
    moves: [
      { dir: 'R', n: 4 },
      { dir: 'U', n: 1 },
      { dir: 'R', n: 2 },
      { dir: 'D', n: 1 },
      { dir: 'R', n: 2 },
      { dir: 'U', n: 1 },
      { dir: 'L', n: 2 },
      { dir: 'D', n: 2 },
      { dir: 'L', n: 2 },
      { dir: 'U', n: 1 },
      { dir: 'L', n: 4 },
    ],
  },
  {
    id: 'stairs',
    title: 'Лесенка',
    start: [2, 10],
    gridSize: 12,
    moves: [
      { dir: 'R', n: 1 },
      { dir: 'U', n: 1 },
      { dir: 'R', n: 1 },
      { dir: 'U', n: 1 },
      { dir: 'R', n: 1 },
      { dir: 'U', n: 1 },
      { dir: 'R', n: 1 },
      { dir: 'U', n: 1 },
      { dir: 'R', n: 1 },
      { dir: 'U', n: 1 },
    ],
  },
  {
    id: 'table',
    title: 'Стол',
    start: [2, 10],
    gridSize: 12,
    moves: [
      { dir: 'U', n: 3 },
      { dir: 'R', n: 1 },
      { dir: 'U', n: 1 },
      { dir: 'R', n: 4 },
      { dir: 'D', n: 1 },
      { dir: 'R', n: 1 },
      { dir: 'D', n: 3 },
    ],
  },
  {
    id: 'gate',
    title: 'Ворота',
    start: [2, 10],
    gridSize: 12,
    moves: [
      { dir: 'U', n: 4 },
      { dir: 'R', n: 4 },
      { dir: 'D', n: 4 },
    ],
  },
  {
    id: 'letterT',
    title: 'Буква Т',
    start: [2, 6],
    gridSize: 12,
    moves: [
      { dir: 'R', n: 6 },
      { dir: 'L', n: 3 },
      { dir: 'D', n: 4 },
    ],
  },
];

export function pickShape(usedIds: Set<string>): DictationShape {
  const pool = SHAPES.filter((s) => !usedIds.has(s.id));
  const list = pool.length > 0 ? pool : SHAPES;
  const shape = list[Math.floor(Math.random() * list.length)];
  usedIds.add(shape.id);
  return shape;
}

export function instructionLines(moves: Move[]): string[] {
  return moves.map((m, i) => `${i + 1}. ${m.n} ${cellsWord(m.n)} ${DIR_WORD[m.dir]}`);
}

export function computePath(start: [number, number], moves: Move[]): [number, number][] {
  let [x, y] = start;
  const pts: [number, number][] = [[x, y]];
  for (const m of moves) {
    if (m.dir === 'R') x += m.n;
    if (m.dir === 'L') x -= m.n;
    if (m.dir === 'U') y -= m.n;
    if (m.dir === 'D') y += m.n;
    pts.push([x, y]);
  }
  return pts;
}
