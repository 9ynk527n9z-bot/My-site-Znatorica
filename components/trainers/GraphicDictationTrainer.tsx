'use client';

import { useMemo, useState } from 'react';
import { computePath, instructionLines, type Direction, type Move } from '@/lib/graphic-dictation';

const GRID_SIZE = 6;
const START: [number, number] = [1, 4];
const DIRS: Direction[] = ['R', 'L', 'U', 'D'];
const OPPOSITE: Record<Direction, Direction> = { R: 'L', L: 'R', U: 'D', D: 'U' };

function inBounds(x: number, y: number): boolean {
  return x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE;
}

function step(x: number, y: number, dir: Direction): [number, number] {
  if (dir === 'R') return [x + 1, y];
  if (dir === 'L') return [x - 1, y];
  if (dir === 'U') return [x, y - 1];
  return [x, y + 1];
}

// Короткий диктант для 4-5 лет: 2-3 шага по одной клетке, без диагоналей и
// без выхода за пределы небольшой сетки 6x6 (см. теорию раздела — «2-3 шага, не больше»).
function generateMoves(stepsCount: number): Move[] {
  const moves: Move[] = [];
  let [x, y] = START;
  let last: Direction | null = null;

  for (let i = 0; i < stepsCount; i++) {
    const candidates = DIRS.filter((d) => d !== (last ? OPPOSITE[last] : null) && inBounds(...step(x, y, d)));
    if (candidates.length === 0) break;
    const dir = candidates[Math.floor(Math.random() * candidates.length)];
    moves.push({ dir, n: 1 });
    [x, y] = step(x, y, dir);
    last = dir;
  }
  return moves;
}

function makeRound() {
  const moves = generateMoves(2 + Math.floor(Math.random() * 2)); // 2-3 шага
  const path = computePath(START, moves);
  return { moves, path };
}

export default function GraphicDictationTrainer() {
  const [round, setRound] = useState(() => makeRound());
  const [stepIndex, setStepIndex] = useState(0);
  const [wrongCell, setWrongCell] = useState<string | null>(null);

  const visited = useMemo(() => new Set(round.path.slice(0, stepIndex + 1).map(([x, y]) => `${x},${y}`)), [round, stepIndex]);
  const done = stepIndex === round.path.length - 1;

  function handleCellClick(x: number, y: number) {
    if (done) return;
    const key = `${x},${y}`;
    const expected = round.path[stepIndex + 1];
    if (expected && expected[0] === x && expected[1] === y) {
      setStepIndex((i) => i + 1);
      setWrongCell(null);
    } else {
      setWrongCell(key);
      setTimeout(() => setWrongCell(null), 400);
    }
  }

  function next() {
    setRound(makeRound());
    setStepIndex(0);
    setWrongCell(null);
  }

  const lines = instructionLines(round.moves);

  return (
    <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8">
      <p className="text-center text-lg mb-2">Веди линию по инструкции — нажимай на клетки по порядку:</p>
      <div className="flex flex-wrap justify-center gap-2 mb-6 text-orange font-bold">
        {lines.map((line, i) => (
          <span key={i} className="bg-orange/10 px-3 py-1 rounded">
            {line}
          </span>
        ))}
      </div>

      <div
        className="grid mx-auto mb-6 w-fit"
        style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 36px)`, gridTemplateRows: `repeat(${GRID_SIZE}, 36px)` }}
      >
        {Array.from({ length: GRID_SIZE }).map((_, y) =>
          Array.from({ length: GRID_SIZE }).map((_, x) => {
            const key = `${x},${y}`;
            const isStart = x === START[0] && y === START[1];
            const isVisited = visited.has(key);
            const isWrong = wrongCell === key;
            return (
              <button
                key={key}
                onClick={() => handleCellClick(x, y)}
                className={`border border-[#2D2350] transition-colors ${
                  isWrong
                    ? 'bg-red-500/60'
                    : isStart
                    ? 'bg-green-500/60'
                    : isVisited
                    ? 'bg-orange'
                    : 'bg-black/40 hover:bg-black/70'
                }`}
              />
            );
          })
        )}
      </div>

      {done ? (
        <div className="text-center">
          <p className="font-bold text-green-400 mb-4">✅ Отлично, всё верно!</p>
          <button onClick={next} className="btn-primary">
            Ещё раз →
          </button>
        </div>
      ) : (
        <p className="text-center text-gray-400 text-sm">
          Зелёная клетка — старт. Кликай по клеткам по порядку, следуя стрелкам выше.
        </p>
      )}
    </div>
  );
}
