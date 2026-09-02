'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { generateWordSearch, type WordSearchResult } from '@/lib/wordsearch';
import { CROSSWORD_THEMES, type CrosswordTheme } from '@/lib/crossword';
import { trackUsage } from '@/lib/track';
import ExportToolbar from '@/components/ExportToolbar';
import { useGeneratorQuota } from '@/lib/useGeneratorQuota';
import GeneratorQuotaBanner from '@/components/GeneratorQuotaBanner';

const THEME_LIST = Object.entries(CROSSWORD_THEMES) as [CrosswordTheme, typeof CROSSWORD_THEMES[CrosswordTheme]][];

export default function WordSearchGeneratorPage() {
  const [theme, setTheme] = useState<CrosswordTheme>('animals');
  const [wordCount, setWordCount] = useState(8);
  const [result, setResult] = useState<WordSearchResult | null>(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);
  const quota = useGeneratorQuota();

  function handleGenerate() {
    if (!quota.guard()) return;
    setResult(generateWordSearch(theme, wordCount));
    setShowAnswers(false);
    trackUsage('generator:filvordy');
    quota.consume();
  }

  const highlightedCells = new Set<string>();
  if (result && showAnswers) {
    for (const w of result.words) {
      for (const [r, c] of w.cells) {
        highlightedCells.add(`${r},${c}`);
      }
    }
  }

  return (
    <div className="bg-black min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/generator" className="text-orange hover:underline text-sm">
          ← Все генераторы
        </Link>
        <h1 className="text-3xl font-bold mt-2 mb-2">Генератор филвордов</h1>
        <p className="text-gray-400 mb-8">
          Слова спрятаны в сетке букв по горизонтали, вертикали и диагонали — найди их все!
        </p>

        <div className="card mb-8 no-print">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">Тема</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {THEME_LIST.map(([key, t]) => (
                <button
                  key={key}
                  onClick={() => setTheme(key)}
                  className={`px-4 py-3 rounded-lg font-bold transition-colors text-sm ${
                    theme === key
                      ? 'bg-orange text-white'
                      : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="text-lg mr-1">{t.icon}</span>
                  {t.title}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium mb-2">Количество слов</label>
            <input
              type="number"
              min={5}
              max={12}
              value={wordCount}
              onChange={(e) => setWordCount(Math.max(5, Math.min(12, parseInt(e.target.value) || 8)))}
              className="w-full px-4 py-2 rounded-lg bg-black border border-[#2D2350] focus:border-orange transition-colors"
            />
          </div>

          <GeneratorQuotaBanner quota={quota} />

          <button onClick={handleGenerate} disabled={!quota.guard()} className="btn-primary w-full disabled:opacity-50">
            Создать филворд
          </button>
        </div>

        {result && (
          <div ref={printRef} className="card print-page bg-white">
            <div className="flex items-center justify-between mb-6 no-print">
              <h2 className="text-xl font-bold text-black">
                {CROSSWORD_THEMES[theme].icon} {CROSSWORD_THEMES[theme].title} — {result.words.length} слов
              </h2>
              <button
                onClick={() => setShowAnswers((v) => !v)}
                className="text-orange text-sm font-bold hover:underline"
              >
                {showAnswers ? 'Скрыть ответы' : 'Показать ответы'}
              </button>
            </div>

            <div className="overflow-x-auto mb-8">
              <table className="border-collapse mx-auto">
                <tbody>
                  {result.grid.map((row, r) => (
                    <tr key={r}>
                      {row.map((letter, c) => {
                        const isHighlighted = highlightedCells.has(`${r},${c}`);
                        return (
                          <td
                            key={c}
                            className={`w-8 h-8 text-center align-middle border font-mono font-bold ${
                              isHighlighted
                                ? 'bg-orange text-white border-orange'
                                : 'border-gray-300 text-black'
                            }`}
                          >
                            {letter}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-3">Найди слова:</h3>
              <div className="grid md:grid-cols-2 gap-2">
                {result.words.map((w) => (
                  <div key={w.word} className="text-sm text-black">
                    {showAnswers ? <span className="font-bold">{w.word}</span> : '•'} — {w.clue}
                  </div>
                ))}
              </div>
            </div>

            <div className="no-print mt-8">
              <ExportToolbar targetRef={printRef} filename="filvordy" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
