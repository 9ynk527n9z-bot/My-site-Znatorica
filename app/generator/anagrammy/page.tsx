'use client';

import { useRef, useState } from 'react';
import { generateAnagrams, type Anagram } from '@/lib/anagrams';
import { CROSSWORD_THEMES, type CrosswordTheme } from '@/lib/crossword';
import { trackUsage } from '@/lib/track';
import ExportToolbar from '@/components/ExportToolbar';
import { useGeneratorQuota } from '@/lib/useGeneratorQuota';
import GeneratorQuotaBanner from '@/components/GeneratorQuotaBanner';

const THEME_LIST = Object.entries(CROSSWORD_THEMES) as [CrosswordTheme, typeof CROSSWORD_THEMES[CrosswordTheme]][];

export default function AnagramGeneratorPage() {
  const [theme, setTheme] = useState<CrosswordTheme>('animals');
  const [count, setCount] = useState(8);
  const [anagrams, setAnagrams] = useState<Anagram[]>([]);
  const [showAnswers, setShowAnswers] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);
  const quota = useGeneratorQuota();

  function handleGenerate() {
    if (!quota.guard()) return;
    setAnagrams(generateAnagrams(theme, count));
    setShowAnswers(false);
    trackUsage('generator:anagrammy');
    quota.consume();
  }

  return (
    <div className="bg-black min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Генератор анаграмм</h1>
        <p className="text-gray-400 mb-8">
          Буквы в слове перемешаны — разгадай, какое слово спряталось, с помощью подсказки.
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
              value={count}
              onChange={(e) => setCount(Math.max(5, Math.min(12, parseInt(e.target.value) || 8)))}
              className="w-full px-4 py-2 rounded-lg bg-black border border-[#2D2350] focus:border-orange transition-colors"
            />
          </div>

          <GeneratorQuotaBanner quota={quota} />

          <button onClick={handleGenerate} disabled={!quota.guard()} className="btn-primary w-full disabled:opacity-50">
            Создать анаграммы
          </button>
        </div>

        {anagrams.length > 0 && (
          <div ref={printRef} className="card print-page">
            <div className="flex items-center justify-between mb-6 no-print">
              <h2 className="text-xl font-bold">
                {CROSSWORD_THEMES[theme].icon} {CROSSWORD_THEMES[theme].title} — {anagrams.length} слов
              </h2>
              <button
                onClick={() => setShowAnswers((v) => !v)}
                className="text-orange text-sm font-bold hover:underline"
              >
                {showAnswers ? 'Скрыть ответы' : 'Показать ответы'}
              </button>
            </div>

            <div className="space-y-4">
              {anagrams.map((a, i) => (
                <div key={i} className="p-4 bg-black/40 rounded-lg flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <p className="text-2xl font-mono font-bold tracking-widest mb-1">{a.scrambled}</p>
                    <p className="text-gray-400 text-sm">{a.clue}</p>
                  </div>
                  {showAnswers && (
                    <p className="text-orange font-bold text-xl">{a.word}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8">
              <ExportToolbar targetRef={printRef} filename="anagrammy" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
