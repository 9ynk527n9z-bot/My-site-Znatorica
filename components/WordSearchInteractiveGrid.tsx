'use client';

import { useState } from 'react';
import type { WordSearchResult } from '@/lib/wordsearch';

interface WordSearchInteractiveGridProps {
  result: WordSearchResult;
}

function cellsEqual(a: [number, number][], b: [number, number][]): boolean {
  if (a.length !== b.length) return false;
  return a.every(([r, c], i) => r === b[i][0] && c === b[i][1]);
}

function buildLine(start: [number, number], end: [number, number]): [number, number][] | null {
  const [sr, sc] = start;
  const [er, ec] = end;
  const dr = er - sr;
  const dc = ec - sc;
  const steps = Math.max(Math.abs(dr), Math.abs(dc));
  if (steps === 0) return [start];
  // Разрешаем только прямую линию — по горизонтали, вертикали или ровной диагонали.
  if (dr !== 0 && dc !== 0 && Math.abs(dr) !== Math.abs(dc)) return null;
  const stepR = Math.sign(dr);
  const stepC = Math.sign(dc);
  const cells: [number, number][] = [];
  for (let i = 0; i <= steps; i++) cells.push([sr + stepR * i, sc + stepC * i]);
  return cells;
}

export default function WordSearchInteractiveGrid({ result }: WordSearchInteractiveGridProps) {
  const [selStart, setSelStart] = useState<[number, number] | null>(null);
  const [foundWords, setFoundWords] = useState<Set<string>>(new Set());
  const [flashCells, setFlashCells] = useState<Set<string>>(new Set());

  const foundCells = new Set<string>();
  for (const w of result.words) {
    if (foundWords.has(w.word)) {
      for (const [r, c] of w.cells) foundCells.add(`${r},${c}`);
    }
  }

  function handleCellClick(r: number, c: number) {
    if (!selStart) {
      setSelStart([r, c]);
      return;
    }
    const line = buildLine(selStart, [r, c]);
    setSelStart(null);
    if (!line) return;

    const match = result.words.find(
      (w) => !foundWords.has(w.word) && (cellsEqual(line, w.cells) || cellsEqual(line, [...w.cells].reverse()))
    );
    if (match) {
      setFoundWords((prev) => new Set(prev).add(match.word));
    } else {
      const flash = new Set(line.map(([lr, lc]) => `${lr},${lc}`));
      setFlashCells(flash);
      setTimeout(() => setFlashCells(new Set()), 400);
    }
  }

  function handleReset() {
    setFoundWords(new Set());
    setSelStart(null);
  }

  return (
    <div>
      <p className="text-sm text-gray-600 mb-3 no-print">
        Кликни по первой букве слова, потом по последней — если верно, слово подсветится.
        Найдено {foundWords.size} из {result.words.length}.
      </p>

      <div className="overflow-x-auto mb-6">
        <table className="border-collapse mx-auto">
          <tbody>
            {result.grid.map((row, r) => (
              <tr key={r}>
                {row.map((letter, c) => {
                  const key = `${r},${c}`;
                  const isFound = foundCells.has(key);
                  const isSelected = selStart && selStart[0] === r && selStart[1] === c;
                  const isFlashing = flashCells.has(key);
                  return (
                    <td key={c} className="p-0">
                      <button
                        onClick={() => handleCellClick(r, c)}
                        className={`w-8 h-8 text-center align-middle border font-mono font-bold text-sm ${
                          isFound
                            ? 'bg-green-200 border-green-400 text-black'
                            : isFlashing
                            ? 'bg-red-200 border-red-400 text-black'
                            : isSelected
                            ? 'bg-orange text-white border-orange'
                            : 'border-gray-300 text-black hover:bg-orange/10'
                        }`}
                      >
                        {letter}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={handleReset} className="btn-secondary text-sm px-4 py-2 no-print mb-6">
        🗑️ Начать заново
      </button>

      <div>
        <h3 className="font-bold text-orange mb-3">Найди слова:</h3>
        <div className="grid md:grid-cols-2 gap-2">
          {result.words.map((w) => (
            <div key={w.word} className={`text-sm ${foundWords.has(w.word) ? 'text-gray-400 line-through' : 'text-black'}`}>
              {foundWords.has(w.word) ? w.word : '•'} — {w.clue}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
