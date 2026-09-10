'use client';

import { useRef, useState } from 'react';
import type { CrosswordResult } from '@/lib/crossword';

interface CrosswordInteractiveGridProps {
  result: CrosswordResult;
}

function emptyAnswers(result: CrosswordResult): string[][] {
  return result.grid.map((row) => row.map(() => ''));
}

export default function CrosswordInteractiveGrid({ result }: CrosswordInteractiveGridProps) {
  const [answers, setAnswers] = useState<string[][]>(() => emptyAnswers(result));
  const [checked, setChecked] = useState(false);
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const across = result.words.filter((w) => w.direction === 'across').sort((a, b) => a.number - b.number);
  const down = result.words.filter((w) => w.direction === 'down').sort((a, b) => a.number - b.number);

  function setCell(r: number, c: number, value: string) {
    setChecked(false);
    setAnswers((prev) => prev.map((row, ri) => (ri === r ? row.map((v, ci) => (ci === c ? value : v)) : row)));
  }

  function focusCell(r: number, c: number) {
    inputRefs.current[`${r},${c}`]?.focus();
  }

  function isFillable(r: number, c: number): boolean {
    return r >= 0 && r < result.rows && c >= 0 && c < result.cols && result.grid[r][c] !== null;
  }

  function handleInput(r: number, c: number, raw: string) {
    const letter = raw.slice(-1).toUpperCase();
    setCell(r, c, letter);
    if (letter) {
      // Автопереход: сначала пробуем следующую клетку по горизонтали, иначе — вниз.
      if (isFillable(r, c + 1)) focusCell(r, c + 1);
      else if (isFillable(r + 1, c)) focusCell(r + 1, c);
    }
  }

  function handleKeyDown(r: number, c: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !answers[r][c]) {
      if (isFillable(r, c - 1)) focusCell(r, c - 1);
      else if (isFillable(r - 1, c)) focusCell(r - 1, c);
    }
  }

  function handleClear() {
    setAnswers(emptyAnswers(result));
    setChecked(false);
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <div
          className="inline-grid gap-0.5 bg-gray-200 p-0.5 rounded"
          style={{ gridTemplateColumns: `repeat(${result.cols}, minmax(0, 2rem))` }}
        >
          {result.grid.map((row, r) =>
            row.map((letter, c) => {
              if (letter === null) return <div key={`${r},${c}`} className="w-8 h-8" />;
              const value = answers[r][c];
              const number = result.numbers[r][c];
              let cellClass = 'bg-white text-black';
              if (checked && value) {
                cellClass = value === letter ? 'bg-green-200 text-black' : 'bg-red-200 text-black';
              }
              return (
                <div key={`${r},${c}`} className={`relative w-8 h-8 ${cellClass}`}>
                  {number !== null && (
                    <span className="absolute top-0 left-0.5 text-[8px] leading-none text-gray-500">{number}</span>
                  )}
                  <input
                    ref={(el) => {
                      inputRefs.current[`${r},${c}`] = el;
                    }}
                    type="text"
                    maxLength={1}
                    value={value}
                    onChange={(e) => handleInput(r, c, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(r, c, e)}
                    className={`w-full h-full text-center font-bold text-sm outline-none bg-transparent ${cellClass}`}
                  />
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="flex gap-3 mt-4 no-print">
        <button onClick={() => setChecked(true)} className="btn-primary text-sm px-4 py-2">
          Проверить
        </button>
        <button onClick={handleClear} className="btn-secondary text-sm px-4 py-2">
          🗑️ Очистить
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mt-6 text-black text-sm">
        <div>
          <h4 className="font-bold mb-2">По горизонтали</h4>
          <ol className="space-y-1">
            {across.map((w) => (
              <li key={`a-${w.number}`}>{w.number}. {w.clue}</li>
            ))}
          </ol>
        </div>
        <div>
          <h4 className="font-bold mb-2">По вертикали</h4>
          <ol className="space-y-1">
            {down.map((w) => (
              <li key={`d-${w.number}`}>{w.number}. {w.clue}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
