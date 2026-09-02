'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { generateSudoku, type SudokuPuzzle, type SudokuSize, type Difficulty } from '@/lib/sudoku';
import { trackUsage } from '@/lib/track';
import ExportToolbar from '@/components/ExportToolbar';
import { useGeneratorQuota } from '@/lib/useGeneratorQuota';
import GeneratorQuotaBanner from '@/components/GeneratorQuotaBanner';
import { pluralizeCount } from '@/lib/pluralize';

const SIZE_OPTIONS: { size: SudokuSize; label: string; hint: string }[] = [
  { size: 4, label: '4×4', hint: 'дошкольники, 1 класс' },
  { size: 6, label: '6×6', hint: '2 класс' },
  { size: 9, label: '9×9', hint: '3–4 класс' },
];

const DIFFICULTY_OPTIONS: { value: Difficulty; label: string }[] = [
  { value: 'easy', label: 'Легко' },
  { value: 'medium', label: 'Средне' },
];

const SHEET_COUNTS = [1, 2, 3, 4] as const;

const puzzlesCount = (n: number) => pluralizeCount(n, ['головоломка', 'головоломки', 'головоломок']);

export default function SudokuPage() {
  const [size, setSize] = useState<SudokuSize>(4);
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [sheetCount, setSheetCount] = useState<number>(1);
  const [puzzles, setPuzzles] = useState<SudokuPuzzle[] | null>(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);
  const quota = useGeneratorQuota();

  function handleGenerate() {
    if (!quota.guard()) return;
    setPuzzles(Array.from({ length: sheetCount }, () => generateSudoku(size, difficulty)));
    setShowAnswers(false);
    trackUsage('generator:sudoku');
    quota.consume();
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/generator" className="text-orange hover:underline text-sm">
          ← Все генераторы
        </Link>
        <h1 className="text-3xl font-bold mt-2 mb-2">🧩 Судоку для детей</h1>
        <p className="text-white/75 mb-8">
          Заполни пустые клетки так, чтобы в каждой строке, столбце и блоке символы не
          повторялись. Размер и сложность подбираются по возрасту — от 4×4 с картинками до
          классического 9×9.
        </p>

        <div className="card mb-8 no-print">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">Размер поля</label>
            <div className="flex gap-3 flex-wrap">
              {SIZE_OPTIONS.map((opt) => (
                <button
                  key={opt.size}
                  onClick={() => setSize(opt.size)}
                  className={`px-5 py-2 rounded-lg font-bold transition-colors text-sm ${
                    size === opt.size
                      ? 'bg-orange text-white'
                      : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
                  }`}
                >
                  {opt.label} <span className="font-normal opacity-75">· {opt.hint}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">Сложность</label>
            <div className="flex gap-3 flex-wrap">
              {DIFFICULTY_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setDifficulty(opt.value)}
                  className={`px-5 py-2 rounded-lg font-bold transition-colors text-sm ${
                    difficulty === opt.value
                      ? 'bg-orange text-white'
                      : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">Головоломок на листе</label>
            <div className="flex gap-3 flex-wrap">
              {SHEET_COUNTS.map((c) => (
                <button
                  key={c}
                  onClick={() => setSheetCount(c)}
                  className={`px-5 py-2 rounded-lg font-bold transition-colors text-sm ${
                    sheetCount === c
                      ? 'bg-orange text-white'
                      : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <GeneratorQuotaBanner quota={quota} />

          <button onClick={handleGenerate} disabled={!quota.guard()} className="btn-primary w-full disabled:opacity-50">
            Сгенерировать
          </button>
        </div>

        {puzzles && (
          <div ref={printRef} className="card print-page bg-white">
            <div className="no-print mb-4 flex justify-between items-center flex-wrap gap-3">
              <span className="text-sm text-gray-500">
                {puzzlesCount(puzzles.length)} · {size}×{size}
              </span>
              <ExportToolbar targetRef={printRef} filename={`sudoku-${size}x${size}`} />
            </div>

            <h2 className="no-print text-xl font-bold text-black mb-6">
              Судоку {size}×{size}
            </h2>

            <div className={`grid gap-8 ${puzzles.length > 1 ? 'sm:grid-cols-2' : 'grid-cols-1'}`}>
              {puzzles.map((puzzle, i) => (
                <SudokuGrid key={i} puzzle={puzzle} index={i} showAnswers={showAnswers} />
              ))}
            </div>

            <div className="mt-6 no-print">
              <button onClick={() => setShowAnswers((v) => !v)} className="text-orange font-bold hover:underline">
                {showAnswers ? 'Скрыть ответ' : 'Показать ответ'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SudokuGrid({
  puzzle,
  index,
  showAnswers,
}: {
  puzzle: SudokuPuzzle;
  index: number;
  showAnswers: boolean;
}) {
  const { size, blockRows, blockCols, solution, puzzle: cells, symbols } = puzzle;
  const isEmojiMode = size !== 9;

  return (
    <div>
      <div className="no-print text-xs font-bold text-gray-500 mb-2">Головоломка {index + 1}</div>
      <div
        className="grid border-2 border-black bg-white"
        style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`, maxWidth: 360 }}
      >
        {cells.map((row, r) =>
          row.map((value, c) => {
            const num = showAnswers ? solution[r][c] : value;
            const display = num === null ? '' : isEmojiMode ? symbols[num - 1] : num;
            const isGiven = value !== null;
            const borderRight = (c + 1) % blockCols === 0 && c !== size - 1 ? '2px solid black' : '1px solid #999';
            const borderBottom = (r + 1) % blockRows === 0 && r !== size - 1 ? '2px solid black' : '1px solid #999';
            return (
              <div
                key={`${r}-${c}`}
                className="flex items-center justify-center aspect-square text-black"
                style={{
                  borderRight,
                  borderBottom,
                  fontSize: isEmojiMode ? '1.1rem' : '1rem',
                  fontWeight: isGiven ? 700 : 500,
                  color: isGiven ? '#000' : showAnswers ? '#e07b00' : '#000',
                  background: '#fff',
                }}
              >
                {display}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
