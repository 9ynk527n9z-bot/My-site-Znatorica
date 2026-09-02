'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { generateCrossword, CROSSWORD_THEMES, type CrosswordTheme, type CrosswordResult } from '@/lib/crossword';
import { drawCrosswordSheet } from '@/lib/crossword-sheet';
import { trackUsage } from '@/lib/track';
import ExportToolbar from '@/components/ExportToolbar';
import { useGeneratorQuota } from '@/lib/useGeneratorQuota';
import GeneratorQuotaBanner from '@/components/GeneratorQuotaBanner';

const THEME_LIST = Object.entries(CROSSWORD_THEMES) as [CrosswordTheme, typeof CROSSWORD_THEMES[CrosswordTheme]][];

export default function CrosswordGeneratorPage() {
  const [theme, setTheme] = useState<CrosswordTheme>('animals');
  const [wordCount, setWordCount] = useState(6);
  const [result, setResult] = useState<CrosswordResult | null>(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const printRef = useRef<HTMLCanvasElement>(null);
  const [generatedTheme, setGeneratedTheme] = useState(theme);
  useEffect(() => {
    if (result && printRef.current) drawCrosswordSheet(printRef.current, result, showAnswers);
  }, [result, showAnswers]);
  const quota = useGeneratorQuota();

  function handleGenerate() {
    if (!quota.guard()) return;
    setResult(generateCrossword(theme, wordCount));
    setGeneratedTheme(theme);
    setShowAnswers(false);
    trackUsage('generator:krossvordy');
    quota.consume();
  }

  const across = result?.words.filter((w) => w.direction === 'across').sort((a, b) => a.number - b.number) ?? [];
  const down = result?.words.filter((w) => w.direction === 'down').sort((a, b) => a.number - b.number) ?? [];

  return (
    <div className="bg-black min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/generator" className="text-orange hover:underline text-sm">
          ← Все генераторы
        </Link>
        <h1 className="text-3xl font-bold mt-2 mb-2">Генератор кроссвордов</h1>
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
                  aria-pressed={theme === key}
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
              min={4}
              max={8}
              value={wordCount}
              onChange={(e) => setWordCount(Math.max(4, Math.min(8, parseInt(e.target.value) || 6)))}
              className="w-full px-4 py-2 rounded-lg bg-black border border-[#2D2350] focus:border-orange transition-colors"
            />
          </div>

          <GeneratorQuotaBanner quota={quota} />

          <button onClick={handleGenerate} disabled={!quota.guard()} className="btn-primary w-full disabled:opacity-50">
            Создать кроссворд
          </button>
        </div>

        {result && (
          <div className="crossword-result card print-page bg-white">
            <div className="flex items-center justify-between mb-6 no-print">
              <h2 className="text-xl font-bold text-black">
                {CROSSWORD_THEMES[generatedTheme].icon} {CROSSWORD_THEMES[generatedTheme].title} — {result.words.length} слов
              </h2>
              <button
                onClick={() => setShowAnswers((v) => !v)}
                className="text-orange text-sm font-bold hover:underline"
              >
                {showAnswers ? 'Скрыть ответы' : 'Показать ответы'}
              </button>
            </div>

            <canvas ref={printRef} className="crossword-print-sheet" role="img"
              aria-label={`Кроссворд. По горизонтали: ${across.map(w => `${w.number}. ${w.clue}${showAnswers ? ` — ${w.word}` : ''}`).join('; ')}. По вертикали: ${down.map(w => `${w.number}. ${w.clue}${showAnswers ? ` — ${w.word}` : ''}`).join('; ')}`} />

            <div className="mt-8 no-print">
              <ExportToolbar targetRef={printRef} filename="krossvordy" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
