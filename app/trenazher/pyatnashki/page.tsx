'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import { pluralizeCount } from '@/lib/pluralize';

type Size = 3 | 4;

const MODES: { value: Size; label: string; hint: string }[] = [
  { value: 3, label: '🟢 Легко (3×3)', hint: '8 плиток — для начала' },
  { value: 4, label: '🟠 Сложно (4×4)', hint: '15 плиток — классика' },
];

function getNeighbors(index: number, size: number): number[] {
  const row = Math.floor(index / size);
  const col = index % size;
  const neighbors: number[] = [];
  if (row > 0) neighbors.push(index - size);
  if (row < size - 1) neighbors.push(index + size);
  if (col > 0) neighbors.push(index - 1);
  if (col < size - 1) neighbors.push(index + 1);
  return neighbors;
}

function isAdjacent(a: number, b: number, size: number): boolean {
  const rowA = Math.floor(a / size);
  const colA = a % size;
  const rowB = Math.floor(b / size);
  const colB = b % size;
  return Math.abs(rowA - rowB) + Math.abs(colA - colB) === 1;
}

function isSolved(board: number[]): boolean {
  return board.every((v, i) => (i === board.length - 1 ? v === 0 : v === i + 1));
}

// Тасуем поле случайными ХОДАМИ от собранного состояния (а не случайной
// перестановкой чисел) — так пятнашки гарантированно решаемы: любая
// последовательность допустимых ходов от решённого состояния обратима.
function shuffleBoard(size: number): number[] {
  const total = size * size;
  const board = Array.from({ length: total }, (_, i) => (i === total - 1 ? 0 : i + 1));
  let emptyIndex = total - 1;
  let lastIndex = -1;
  const movesCount = 80 + Math.floor(Math.random() * 71); // 80–150 ходов

  for (let i = 0; i < movesCount; i++) {
    const candidates = getNeighbors(emptyIndex, size).filter((n) => n !== lastIndex);
    const pool = candidates.length > 0 ? candidates : getNeighbors(emptyIndex, size);
    const next = pool[Math.floor(Math.random() * pool.length)];
    [board[emptyIndex], board[next]] = [board[next], board[emptyIndex]];
    lastIndex = emptyIndex;
    emptyIndex = next;
  }

  return board;
}

function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function PyatnashkiTrainerPage() {
  const [size, setSize] = useState<Size>(3);
  const [started, setStarted] = useState(false);
  const [board, setBoard] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [finished, setFinished] = useState(false);

  function begin(s: Size) {
    setSize(s);
    setBoard(shuffleBoard(s));
    setStarted(true);
    setFinished(false);
    setMoves(0);
    setSeconds(0);
  }

  useEffect(() => {
    if (!started || finished) return;
    const id = setInterval(() => setSeconds((sec) => sec + 1), 1000);
    return () => clearInterval(id);
  }, [started, finished]);

  function handleTileClick(index: number) {
    if (finished) return;
    const emptyIndex = board.indexOf(0);
    if (!isAdjacent(index, emptyIndex, size)) return;

    const newBoard = [...board];
    [newBoard[index], newBoard[emptyIndex]] = [newBoard[emptyIndex], newBoard[index]];
    setBoard(newBoard);
    setMoves((m) => m + 1);

    if (isSolved(newBoard)) {
      setFinished(true);
    }
  }

  return (
    <div className="min-h-screen">
      <div className="border-b border-white/15 px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">🔢 Пятнашки</h1>
      </div>

      <TrainerGate type="trainer:pyatnashki">
        <div className="max-w-2xl mx-auto py-8 px-6">
          {/* Настройки */}
          <div className="card mb-8">
            <label className="block text-sm font-medium mb-3 text-white/90">Сложность</label>
            <div className="flex flex-col gap-3">
              {MODES.map((m) => (
                <button
                  key={m.value}
                  onClick={() => begin(m.value)}
                  className={`text-left px-5 py-4 rounded-xl font-bold transition-all ${
                    started && size === m.value
                      ? 'text-white'
                      : 'bg-white/10 border border-white/25 text-white/80 hover:bg-white/15'
                  }`}
                  style={
                    started && size === m.value
                      ? { background: 'linear-gradient(135deg, #7C3AED, #f72585)' }
                      : undefined
                  }
                >
                  <span className="block text-lg">{m.label}</span>
                  <span className="block text-sm font-normal opacity-80">{m.hint}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Игровое поле */}
          {started && !finished && (
            <div className="card bg-white text-center">
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-600 text-sm">
                  Ходы: <span className="text-orange font-bold">{moves}</span>
                </span>
                <span className="text-gray-600 text-sm">
                  Время: <span className="text-orange font-bold">{formatTime(seconds)}</span>
                </span>
              </div>

              <p className="text-lg font-bold text-[#3a1c6e] mb-6">
                Собери числа по порядку — 1, 2, 3…
              </p>

              <div
                className="mx-auto grid gap-2"
                style={{
                  maxWidth: size === 3 ? 320 : 360,
                  gridTemplateColumns: `repeat(${size}, 1fr)`,
                }}
              >
                {board.map((value, index) =>
                  value === 0 ? (
                    <div
                      key={index}
                      className="aspect-square rounded-xl border-2 border-dashed border-gray-200"
                    />
                  ) : (
                    <button
                      key={index}
                      onClick={() => handleTileClick(index)}
                      className="aspect-square flex items-center justify-center rounded-xl font-black text-white shadow-md hover:scale-105 active:scale-95 transition-all"
                      style={{
                        background: 'linear-gradient(135deg, #7C3AED, #f72585)',
                        fontSize: size === 3 ? '1.75rem' : '1.35rem',
                      }}
                    >
                      {value}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {/* Итог */}
          {finished && (
            <div className="card bg-white text-center py-10">
              <p className="text-3xl font-black text-[#3a1c6e] mb-4">
                🎉 Собрано за {pluralizeCount(moves, ['ход', 'хода', 'ходов'])}, {pluralizeCount(seconds, ['секунду', 'секунды', 'секунд'])}!
              </p>
              <div className="flex justify-center gap-3 flex-wrap">
                <button onClick={() => begin(size)} className="btn-primary px-6 py-3">
                  🔁 Играть ещё
                </button>
              </div>
            </div>
          )}
        </div>
      </TrainerGate>
    </div>
  );
}
