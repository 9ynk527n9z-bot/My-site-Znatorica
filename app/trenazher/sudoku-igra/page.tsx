'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import TrainerGate from '@/components/TrainerGate';

type Mode = 'easy' | 'medium';

interface DifficultyConfig {
  label: string;
  hint: string;
  N: number;
  blockH: number;
  blockW: number;
  removeMin: number;
  removeMax: number;
}

const DIFFICULTIES: Record<Mode, DifficultyConfig> = {
  easy: {
    label: '🟢 Лёгкий (4×4)',
    hint: 'Цифры 1–4, блоки 2×2',
    N: 4,
    blockH: 2,
    blockW: 2,
    removeMin: 6,
    removeMax: 7,
  },
  medium: {
    label: '🟠 Средний (6×6)',
    hint: 'Цифры 1–6, блоки 2×3',
    N: 6,
    blockH: 2,
    blockW: 3,
    removeMin: 19,
    removeMax: 21,
  },
};

type Grid = number[][];

// Перемешивание массива (Фишер — Йейтс)
function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function isSafe(
  grid: Grid,
  N: number,
  blockH: number,
  blockW: number,
  r: number,
  c: number,
  val: number
): boolean {
  for (let i = 0; i < N; i++) {
    if (grid[r][i] === val) return false;
    if (grid[i][c] === val) return false;
  }
  const blockRowStart = Math.floor(r / blockH) * blockH;
  const blockColStart = Math.floor(c / blockW) * blockW;
  for (let i = 0; i < blockH; i++) {
    for (let j = 0; j < blockW; j++) {
      if (grid[blockRowStart + i][blockColStart + j] === val) return false;
    }
  }
  return true;
}

// Рекурсивное randomized backtracking-заполнение сетки корректным решением судоку
function fillGrid(grid: Grid, N: number, blockH: number, blockW: number, pos: number): boolean {
  if (pos === N * N) return true;
  const r = Math.floor(pos / N);
  const c = pos % N;
  const candidates = shuffle(Array.from({ length: N }, (_, i) => i + 1));
  for (const val of candidates) {
    if (isSafe(grid, N, blockH, blockW, r, c, val)) {
      grid[r][c] = val;
      if (fillGrid(grid, N, blockH, blockW, pos + 1)) return true;
      grid[r][c] = 0;
    }
  }
  return false;
}

function generateSolved(N: number, blockH: number, blockW: number): Grid {
  const grid: Grid = Array.from({ length: N }, () => Array(N).fill(0));
  fillGrid(grid, N, blockH, blockW, 0);
  return grid;
}

function makePuzzle(solved: Grid, N: number, removeMin: number, removeMax: number): Grid {
  const puzzle = solved.map((row) => [...row]);
  const removeCount = removeMin + Math.floor(Math.random() * (removeMax - removeMin + 1));
  const positions = shuffle(Array.from({ length: N * N }, (_, i) => i));
  for (let k = 0; k < removeCount; k++) {
    const pos = positions[k];
    const r = Math.floor(pos / N);
    const c = pos % N;
    puzzle[r][c] = 0;
  }
  return puzzle;
}

// Находит все клетки, которые нарушают правила судоку в текущем состоянии
function computeConflicts(grid: Grid, N: number, blockH: number, blockW: number): Set<string> {
  const conflicts = new Set<string>();

  for (let r = 0; r < N; r++) {
    const seen = new Map<number, number[]>();
    for (let c = 0; c < N; c++) {
      const v = grid[r][c];
      if (!v) continue;
      const list = seen.get(v) ?? [];
      list.push(c);
      seen.set(v, list);
    }
    seen.forEach((cols) => {
      if (cols.length > 1) cols.forEach((c) => conflicts.add(`${r},${c}`));
    });
  }

  for (let c = 0; c < N; c++) {
    const seen = new Map<number, number[]>();
    for (let r = 0; r < N; r++) {
      const v = grid[r][c];
      if (!v) continue;
      const list = seen.get(v) ?? [];
      list.push(r);
      seen.set(v, list);
    }
    seen.forEach((rows) => {
      if (rows.length > 1) rows.forEach((r) => conflicts.add(`${r},${c}`));
    });
  }

  for (let br = 0; br < N; br += blockH) {
    for (let bc = 0; bc < N; bc += blockW) {
      const seen = new Map<number, [number, number][]>();
      for (let i = 0; i < blockH; i++) {
        for (let j = 0; j < blockW; j++) {
          const r = br + i;
          const c = bc + j;
          const v = grid[r][c];
          if (!v) continue;
          const list = seen.get(v) ?? [];
          list.push([r, c]);
          seen.set(v, list);
        }
      }
      seen.forEach((cells) => {
        if (cells.length > 1) cells.forEach(([r, c]) => conflicts.add(`${r},${c}`));
      });
    }
  }

  return conflicts;
}

function gridsEqual(a: Grid, b: Grid): boolean {
  for (let r = 0; r < a.length; r++) {
    for (let c = 0; c < a[r].length; c++) {
      if (a[r][c] !== b[r][c]) return false;
    }
  }
  return true;
}

function cellBorderStyle(
  r: number,
  c: number,
  blockH: number,
  blockW: number
): React.CSSProperties {
  const thick = '3px solid #3a1c6e';
  const thin = '1px solid #d1d5db';
  return {
    borderTop: r % blockH === 0 ? thick : thin,
    borderLeft: c % blockW === 0 ? thick : thin,
    borderRight: (c + 1) % blockW === 0 ? thick : thin,
    borderBottom: (r + 1) % blockH === 0 ? thick : thin,
  };
}

export default function SudokuIgraTrainerPage() {
  const [mode, setMode] = useState<Mode>('easy');
  const [started, setStarted] = useState(false);
  const [solution, setSolution] = useState<Grid>([]);
  const [puzzle, setPuzzle] = useState<Grid>([]);
  const [userGrid, setUserGrid] = useState<Grid>([]);
  const [selected, setSelected] = useState<{ r: number; c: number } | null>(null);
  const [finished, setFinished] = useState(false);
  const [checkMsg, setCheckMsg] = useState<'incomplete' | 'errors' | null>(null);

  const config = DIFFICULTIES[mode];
  const conflicts = userGrid.length
    ? computeConflicts(userGrid, config.N, config.blockH, config.blockW)
    : new Set<string>();

  function begin(m: Mode) {
    const cfg = DIFFICULTIES[m];
    const solved = generateSolved(cfg.N, cfg.blockH, cfg.blockW);
    const newPuzzle = makePuzzle(solved, cfg.N, cfg.removeMin, cfg.removeMax);
    setMode(m);
    setSolution(solved);
    setPuzzle(newPuzzle);
    setUserGrid(newPuzzle.map((row) => [...row]));
    setSelected(null);
    setStarted(true);
    setFinished(false);
    setCheckMsg(null);
  }

  // Сбрасываем сообщение проверки, как только игрок снова меняет сетку
  useEffect(() => {
    setCheckMsg(null);
  }, [userGrid]);

  function handleCellClick(r: number, c: number) {
    if (puzzle[r][c] !== 0) return;
    setSelected({ r, c });
  }

  function placeNumber(val: number) {
    if (!selected) return;
    const { r, c } = selected;
    if (puzzle[r][c] !== 0) return;
    setUserGrid((prev) => {
      const next = prev.map((row) => [...row]);
      next[r][c] = next[r][c] === val ? 0 : val;
      return next;
    });
  }

  function clearSelected() {
    if (!selected) return;
    const { r, c } = selected;
    if (puzzle[r][c] !== 0) return;
    setUserGrid((prev) => {
      const next = prev.map((row) => [...row]);
      next[r][c] = 0;
      return next;
    });
  }

  function handleCheck() {
    const hasEmpty = userGrid.some((row) => row.some((v) => v === 0));
    if (hasEmpty) {
      setCheckMsg('incomplete');
      return;
    }
    if (gridsEqual(userGrid, solution)) {
      setFinished(true);
      setCheckMsg(null);
    } else {
      setCheckMsg('errors');
    }
  }

  return (
    <div className="min-h-screen">
      <div className="border-b border-white/15 px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">🔲 Судоку</h1>
      </div>

      <TrainerGate type="trainer:sudoku-igra">
        <div className="max-w-2xl mx-auto py-8 px-6">
          {/* Настройки */}
          <div className="card mb-8">
            <label className="block text-sm font-medium mb-3 text-white/90">Сложность</label>
            <div className="flex flex-col gap-3">
              {(Object.keys(DIFFICULTIES) as Mode[]).map((m) => {
                const cfg = DIFFICULTIES[m];
                return (
                  <button
                    key={m}
                    onClick={() => begin(m)}
                    className={`text-left px-5 py-4 rounded-xl font-bold transition-all ${
                      started && mode === m
                        ? 'text-white'
                        : 'bg-white/10 border border-white/25 text-white/80 hover:bg-white/15'
                    }`}
                    style={
                      started && mode === m
                        ? { background: 'linear-gradient(135deg, #7C3AED, #f72585)' }
                        : undefined
                    }
                  >
                    <span className="block text-lg">{cfg.label}</span>
                    <span className="block text-sm font-normal opacity-80">{cfg.hint}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Игровое поле */}
          {started && !finished && (
            <div className="card bg-white text-center">
              <p className="text-lg font-bold text-[#3a1c6e] mb-4">
                Заполни клетки так, чтобы цифры не повторялись в строке, столбце и блоке
              </p>

              <div
                className="mx-auto grid mb-6"
                style={{
                  gridTemplateColumns: `repeat(${config.N}, minmax(0, 1fr))`,
                  maxWidth: config.N <= 4 ? '288px' : '396px',
                }}
              >
                {userGrid.map((row, r) =>
                  row.map((value, c) => {
                    const isFixed = puzzle[r][c] !== 0;
                    const isSelected = selected?.r === r && selected?.c === c;
                    const isConflict = conflicts.has(`${r},${c}`);

                    let cellClasses =
                      'flex items-center justify-center aspect-square font-black text-lg sm:text-xl transition-colors';
                    if (isFixed) {
                      cellClasses += ' bg-gray-100 text-[#3a1c6e] cursor-default';
                    } else if (isConflict) {
                      cellClasses += ' bg-red-100 text-red-500 cursor-pointer';
                    } else if (isSelected) {
                      cellClasses += ' bg-amber-100 text-[#3a1c6e] cursor-pointer';
                    } else if (value) {
                      cellClasses += ' bg-white text-orange cursor-pointer hover:bg-gray-50';
                    } else {
                      cellClasses += ' bg-white text-gray-300 cursor-pointer hover:bg-gray-50';
                    }

                    return (
                      <button
                        key={`${r}-${c}`}
                        type="button"
                        onClick={() => handleCellClick(r, c)}
                        disabled={isFixed}
                        style={cellBorderStyle(r, c, config.blockH, config.blockW)}
                        className={cellClasses}
                      >
                        {value || ''}
                      </button>
                    );
                  })
                )}
              </div>

              <div className="flex justify-center flex-wrap gap-2 mb-4">
                {Array.from({ length: config.N }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    onClick={() => placeNumber(n)}
                    disabled={!selected}
                    className="w-11 h-11 rounded-xl font-black text-lg bg-gray-100 text-[#3a1c6e] hover:bg-orange hover:text-white transition-colors disabled:opacity-40 disabled:hover:bg-gray-100 disabled:hover:text-[#3a1c6e]"
                  >
                    {n}
                  </button>
                ))}
                <button
                  onClick={clearSelected}
                  disabled={!selected}
                  className="px-4 h-11 rounded-xl font-bold text-sm bg-gray-100 text-gray-500 hover:bg-red-100 hover:text-red-500 transition-colors disabled:opacity-40"
                >
                  ✖ очистить
                </button>
              </div>

              <button onClick={handleCheck} className="btn-primary px-6 py-3">
                ✅ Проверить
              </button>

              <div className="h-8 mt-3">
                {checkMsg === 'incomplete' && (
                  <p className="text-gray-500 font-bold">Заполни все клетки, чтобы проверить</p>
                )}
                {checkMsg === 'errors' && (
                  <p className="text-red-500 font-bold">Есть ошибки, попробуй ещё раз 🔍</p>
                )}
              </div>
            </div>
          )}

          {/* Итог */}
          {finished && (
            <div className="card bg-white text-center py-10">
              <p className="text-3xl font-black text-[#3a1c6e] mb-6">🎉 Отлично! Судоку решено!</p>
              <button onClick={() => begin(mode)} className="btn-primary px-6 py-3">
                🔁 Новая игра
              </button>
            </div>
          )}
        </div>
      </TrainerGate>
    </div>
  );
}
