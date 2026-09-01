'use client';

import { useRef, useState } from 'react';
import { generateCrossword, CROSSWORD_THEMES, type CrosswordTheme, type CrosswordResult } from '@/lib/crossword';
import { trackUsage } from '@/lib/track';
import ExportToolbar from '@/components/ExportToolbar';
import { useGeneratorQuota } from '@/lib/useGeneratorQuota';
import GeneratorQuotaBanner from '@/components/GeneratorQuotaBanner';

const THEME_LIST = Object.entries(CROSSWORD_THEMES) as [CrosswordTheme, typeof CROSSWORD_THEMES[CrosswordTheme]][];

export default function CrosswordGeneratorPage() {
  const [theme, setTheme] = useState<CrosswordTheme>('animals');
  const [wordCount, setWordCount] = useState(8);
  const [result, setResult] = useState<CrosswordResult | null>(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);
  const quota = useGeneratorQuota();

  function handleGenerate() {
    if (!quota.guard()) return;
    setResult(generateCrossword(theme, wordCount));
    setShowAnswers(false);
    trackUsage('generator:krossvordy');
    quota.consume();
  }

  const across = result?.words.filter((w) => w.direction === 'across').sort((a, b) => a.number - b.number) ?? [];
  const down = result?.words.filter((w) => w.direction === 'down').sort((a, b) => a.number - b.number) ?? [];

  return (
    <div className="bg-black min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Генератор кроссвордов</h1>
        <p className="text-gray-400 mb-8">
          Выбери тему — кроссворд и подсказки соберутся автоматически, слова всегда пересекаются правильно.
        </p>

        <div className="card mb-8 no-print">
          {/* Тема */}
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

          {/* Количество слов */}
          <div className="mb-8">
            <label className="block text-sm font-medium mb-2">
              Количество слов (примерно, зависит от того, как они пересекутся)
            </label>
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
            Создать кроссворд
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

            {/* Сетка */}
            <div className="overflow-x-auto mb-8">
              <table className="border-collapse mx-auto">
                <tbody>
                  {result.grid.map((row, r) => (
                    <tr key={r}>
                      {row.map((cell, c) => (
                        <td
                          key={c}
                          className={`relative w-9 h-9 text-center align-middle border ${
                            cell ? 'border-gray-300 bg-gray-50' : 'border-transparent'
                          }`}
                        >
                          {cell && (
                            <>
                              {result.numbers[r][c] && (
                                <span className="crossword-clue-num absolute top-0 left-0.5 text-[9px] text-orange leading-none font-normal">
                                  {result.numbers[r][c]}
                                </span>
                              )}
                              <span className="text-lg font-bold text-black">{showAnswers ? cell : ''}</span>
                            </>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Подсказки */}
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-orange mb-3">По горизонтали →</h3>
                <ol className="space-y-2 text-sm text-black">
                  {across.map((w) => (
                    <li key={`a-${w.number}`}>
                      <span className="font-bold">{w.number}.</span> {w.clue}
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <h3 className="font-bold text-orange mb-3">По вертикали ↓</h3>
                <ol className="space-y-2 text-sm text-black">
                  {down.map((w) => (
                    <li key={`d-${w.number}`}>
                      <span className="font-bold">{w.number}.</span> {w.clue}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="mt-8">
              <ExportToolbar targetRef={printRef} filename="krossvordy" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
