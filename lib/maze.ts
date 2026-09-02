// Генератор лабиринтов: recursive backtracker на прямоугольной сетке.
// Алгоритм строит «идеальный» лабиринт (perfect maze) — между любыми двумя
// клетками существует ровно один путь (нет циклов, нет недостижимых клеток),
// поэтому путь от входа (0,0) до выхода (гарантированно) всегда существует.

export type Size = 'small' | 'medium' | 'large';

export const SIZE_CONFIG: Record<Size, { cols: number; rows: number; label: string; hint: string }> = {
  small: { cols: 8, rows: 8, label: 'Маленький', hint: '8×8 — для детей 3–5 лет' },
  medium: { cols: 14, rows: 14, label: 'Средний', hint: '14×14 — для школьников' },
  large: { cols: 20, rows: 20, label: 'Большой', hint: '20×20 — сложный уровень' },
};

// Стены хранятся на клетку: какие из 4 сторон закрыты.
export interface Cell {
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
}

export interface Maze {
  cols: number;
  rows: number;
  cells: Cell[][]; // cells[row][col]
  start: [number, number]; // [col, row]
  end: [number, number];
}

function makeGrid(cols: number, rows: number): Cell[][] {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({ top: true, right: true, bottom: true, left: true }))
  );
}

type Dir = 'N' | 'E' | 'S' | 'W';
const DELTAS: Record<Dir, [number, number]> = {
  N: [0, -1],
  E: [1, 0],
  S: [0, 1],
  W: [-1, 0],
};
const OPPOSITE: Record<Dir, Dir> = { N: 'S', E: 'W', S: 'N', W: 'E' };
const WALL_KEY: Record<Dir, keyof Cell> = { N: 'top', E: 'right', S: 'bottom', W: 'left' };

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Recursive backtracker (итеративно, через стек — чтобы не упереться в лимит
// рекурсии на больших сетках) — гарантированно строит идеальный лабиринт:
// связный граф без циклов на N*M клетках ровно с N*M-1 «проходами».
export function generateMaze(size: Size): Maze {
  const { cols, rows } = SIZE_CONFIG[size];
  const cells = makeGrid(cols, rows);
  const visited: boolean[][] = Array.from({ length: rows }, () => Array(cols).fill(false));

  const stack: [number, number][] = [];
  const startCell: [number, number] = [0, 0];
  visited[0][0] = true;
  stack.push(startCell);

  while (stack.length > 0) {
    const [cx, cy] = stack[stack.length - 1];
    const dirs = shuffle(['N', 'E', 'S', 'W'] as Dir[]);
    let moved = false;

    for (const dir of dirs) {
      const [dx, dy] = DELTAS[dir];
      const nx = cx + dx;
      const ny = cy + dy;
      if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue;
      if (visited[ny][nx]) continue;

      // Пробиваем стену между текущей и соседней клеткой.
      cells[cy][cx][WALL_KEY[dir]] = false;
      cells[ny][nx][WALL_KEY[OPPOSITE[dir]]] = false;

      visited[ny][nx] = true;
      stack.push([nx, ny]);
      moved = true;
      break;
    }

    if (!moved) stack.pop();
  }

  return {
    cols,
    rows,
    cells,
    start: [0, 0],
    end: [cols - 1, rows - 1],
  };
}

// BFS-поиск единственного пути от входа до выхода. Возвращает список клеток
// [col,row] по пути включительно. В идеальном лабиринте путь всегда есть и он
// единственный (граф — дерево), но BFS универсален и не зависит от этого факта.
export function solvePath(maze: Maze): [number, number][] {
  const { cols, rows, cells, start, end } = maze;
  const visited: boolean[][] = Array.from({ length: rows }, () => Array(cols).fill(false));
  const prev = new Map<string, [number, number]>();
  const key = (c: number, r: number) => `${c},${r}`;

  const queue: [number, number][] = [start];
  visited[start[1]][start[0]] = true;

  while (queue.length > 0) {
    const [cx, cy] = queue.shift()!;
    if (cx === end[0] && cy === end[1]) break;

    const cell = cells[cy][cx];
    const options: [Dir, boolean][] = [
      ['N', cell.top],
      ['E', cell.right],
      ['S', cell.bottom],
      ['W', cell.left],
    ];

    for (const [dir, wall] of options) {
      if (wall) continue; // стена есть — прохода нет
      const [dx, dy] = DELTAS[dir];
      const nx = cx + dx;
      const ny = cy + dy;
      if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue;
      if (visited[ny][nx]) continue;
      visited[ny][nx] = true;
      prev.set(key(nx, ny), [cx, cy]);
      queue.push([nx, ny]);
    }
  }

  // Восстанавливаем путь от конца к началу.
  if (!visited[end[1]][end[0]]) return []; // не должно случаться в идеальном лабиринте

  const path: [number, number][] = [end];
  let cur = end;
  while (cur[0] !== start[0] || cur[1] !== start[1]) {
    const p = prev.get(key(cur[0], cur[1]));
    if (!p) break;
    path.push(p);
    cur = p;
  }
  return path.reverse();
}
