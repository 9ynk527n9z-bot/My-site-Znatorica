// Генератор судоку для детей: 4×4, 6×6, 9×9.
// Алгоритм: сначала строим полное валидное решение через backtracking со
// случайным порядком перебора чисел (даёт разные головоломки при каждом
// вызове), затем убираем часть клеток в зависимости от сложности.
// После каждого удаления подсказки проверяем единственность решения.
// Если появляется второй вариант, возвращаем подсказку обратно.

export type SudokuSize = 4 | 6 | 9;
export type Difficulty = 'easy' | 'medium';

export interface SudokuPuzzle {
  size: SudokuSize;
  blockRows: number;
  blockCols: number;
  solution: number[][]; // 1..size
  puzzle: (number | null)[][]; // null = пустая клетка
  symbols: string[]; // symbols[0] соответствует числу 1, и т.д.
}

// Размеры блоков для каждого поля (rows x cols делят size на блок)
const BLOCK_DIMS: Record<SudokuSize, { blockRows: number; blockCols: number }> = {
  4: { blockRows: 2, blockCols: 2 },
  6: { blockRows: 2, blockCols: 3 },
  9: { blockRows: 3, blockCols: 3 },
};

// Эмодзи-наборы для маленьких полей (дошкольники/1-2 класс) вместо цифр.
const EMOJI_4 = ['🍎', '🍊', '🍇', '🍓'];
const EMOJI_6 = ['🍎', '🍊', '🍇', '🍓', '🍋', '🍒'];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function isValidPlacement(
  grid: number[][],
  row: number,
  col: number,
  num: number,
  size: number,
  blockRows: number,
  blockCols: number
): boolean {
  for (let c = 0; c < size; c++) {
    if (grid[row][c] === num) return false;
  }
  for (let r = 0; r < size; r++) {
    if (grid[r][col] === num) return false;
  }
  const startRow = Math.floor(row / blockRows) * blockRows;
  const startCol = Math.floor(col / blockCols) * blockCols;
  for (let r = startRow; r < startRow + blockRows; r++) {
    for (let c = startCol; c < startCol + blockCols; c++) {
      if (grid[r][c] === num) return false;
    }
  }
  return true;
}

function solveBacktrack(
  grid: number[][],
  size: number,
  blockRows: number,
  blockCols: number
): boolean {
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (grid[row][col] === 0) {
        const nums = shuffle(Array.from({ length: size }, (_, i) => i + 1));
        for (const num of nums) {
          if (isValidPlacement(grid, row, col, num, size, blockRows, blockCols)) {
            grid[row][col] = num;
            if (solveBacktrack(grid, size, blockRows, blockCols)) return true;
            grid[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function generateFullSolution(size: SudokuSize): number[][] {
  const { blockRows, blockCols } = BLOCK_DIMS[size];
  const grid: number[][] = Array.from({ length: size }, () => Array(size).fill(0));
  solveBacktrack(grid, size, blockRows, blockCols);
  return grid;
}

// Доля убираемых клеток в зависимости от сложности и размера поля.
function removalFraction(size: SudokuSize, difficulty: Difficulty): number {
  if (size === 4) return difficulty === 'easy' ? 0.3 : 0.35;
  if (size === 6) return difficulty === 'easy' ? 0.3 : 0.35;
  return difficulty === 'easy' ? 0.45 : 0.6;
}

// Stop at two solutions; choose the cell with the fewest candidates first.
function hasUniqueSolution(puzzle: (number | null)[][], size: SudokuSize): boolean {
  const { blockRows, blockCols } = BLOCK_DIMS[size];
  const grid = puzzle.map(row => row.map(value => value ?? 0));
  let solutions = 0;
  function search() {
    let best: { row: number; col: number; candidates: number[] } | null = null;
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (grid[row][col]) continue;
        const candidates: number[] = [];
        for (let value = 1; value <= size; value++) {
          if (isValidPlacement(grid, row, col, value, size, blockRows, blockCols)) candidates.push(value);
        }
        if (!candidates.length) return;
        if (!best || candidates.length < best.candidates.length) best = { row, col, candidates };
      }
    }
    if (!best) { solutions++; return; }
    for (const value of best.candidates) {
      grid[best.row][best.col] = value;
      search();
      grid[best.row][best.col] = 0;
      if (solutions >= 2) return;
    }
  }
  search();
  return solutions === 1;
}

export function generateSudoku(size: SudokuSize, difficulty: Difficulty = 'easy'): SudokuPuzzle {
  const { blockRows, blockCols } = BLOCK_DIMS[size];
  const solution = generateFullSolution(size);

  const puzzle: (number | null)[][] = solution.map((row) => [...row]);
  const totalCells = size * size;
  const toRemove = Math.round(totalCells * removalFraction(size, difficulty));

  const positions = shuffle(
    Array.from({ length: totalCells }, (_, i) => ({ row: Math.floor(i / size), col: i % size }))
  );

  let removed = 0;
  for (const { row, col } of positions) {
    if (removed >= toRemove) break;
    const previous = puzzle[row][col];
    puzzle[row][col] = null;
    if (hasUniqueSolution(puzzle, size)) removed++;
    else puzzle[row][col] = previous;
  }

  const symbols =
    size === 4 ? EMOJI_4 : size === 6 ? EMOJI_6 : Array.from({ length: 9 }, (_, i) => String(i + 1));

  return { size, blockRows, blockCols, solution, puzzle, symbols };
}

// Проверка валидности полностью заполненной сетки судоку: в каждой строке,
// каждом столбце и каждом блоке все символы 1..size встречаются ровно
// один раз. Используется тестом ниже и может использоваться для отладки.
export function isValidSolution(grid: number[][], size: SudokuSize): boolean {
  const { blockRows, blockCols } = BLOCK_DIMS[size];
  const expected = new Set(Array.from({ length: size }, (_, i) => i + 1));

  for (let row = 0; row < size; row++) {
    const seen = new Set(grid[row]);
    if (seen.size !== size || ![...seen].every((v) => expected.has(v))) return false;
  }
  for (let col = 0; col < size; col++) {
    const seen = new Set(grid.map((r) => r[col]));
    if (seen.size !== size || ![...seen].every((v) => expected.has(v))) return false;
  }
  const blocksPerRow = size / blockCols;
  const blocksPerCol = size / blockRows;
  for (let br = 0; br < blocksPerCol; br++) {
    for (let bc = 0; bc < blocksPerRow; bc++) {
      const seen = new Set<number>();
      for (let r = br * blockRows; r < br * blockRows + blockRows; r++) {
        for (let c = bc * blockCols; c < bc * blockCols + blockCols; c++) {
          seen.add(grid[r][c]);
        }
      }
      if (seen.size !== size || ![...seen].every((v) => expected.has(v))) return false;
    }
  }
  return true;
}

// Проверка, что головоломка (с пустыми клетками) согласуется с решением:
// все непустые клетки совпадают с решением.
export function puzzleMatchesSolution(
  puzzle: (number | null)[][],
  solution: number[][]
): boolean {
  for (let r = 0; r < solution.length; r++) {
    for (let c = 0; c < solution.length; c++) {
      if (puzzle[r][c] !== null && puzzle[r][c] !== solution[r][c]) return false;
    }
  }
  return true;
}
