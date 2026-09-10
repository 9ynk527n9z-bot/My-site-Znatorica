'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { drawMathSheet } from '@/lib/math-sheet';
import { generateMathExamples, type MathMode } from '@/lib/generator';
import { trackUsage } from '@/lib/track';
import ExportToolbar from '@/components/ExportToolbar';
import { useGeneratorQuota } from '@/lib/useGeneratorQuota';
import GeneratorQuotaBanner from '@/components/GeneratorQuotaBanner';
import PageAbout from '@/components/PageAbout';

const MODES: { value: MathMode; label: string; icon: string }[] = [
  { value: 'plus', label: 'Сложение', icon: '+' },
  { value: 'minus', label: 'Вычитание', icon: '−' },
  { value: 'plus_minus', label: 'Сложение и вычитание', icon: '+ −' },
];

// Отдельная посадочная страница под частый запрос «примеры до 20» (1 класс,
// переход через десяток) — тот же генератор, что и /generator/primery, но с
// диапазоном, зафиксированным на 20, без выбора «до 10 / 100 / 1000».
export default function GeneratorPrimeryDo20Page() {
  const [mode, setMode] = useState<MathMode>('plus_minus');
  const [count, setCount] = useState(20);
  const [examples, setExamples] = useState<{ text: string; answer: number }[]>([]);
  const [showAnswers, setShowAnswers] = useState(false);
  const [sheetMode, setSheetMode] = useState<MathMode | null>(null);
  const printRef = useRef<HTMLCanvasElement>(null);
  const quota = useGeneratorQuota();
  useEffect(() => {
    if (!printRef.current || !examples.length || !sheetMode) return;
    const modeInfo = MODES.find((item) => item.value === sheetMode) ?? MODES[0];
    drawMathSheet(printRef.current, examples, showAnswers, {
      title: 'Примеры до 20',
      subtitle: `${modeInfo.label} · числа до 20`,
      symbol: modeInfo.icon.trim(),
      centerTitle: true,
    });
  }, [examples, showAnswers, sheetMode]);

  function handleGenerate() {
    if (!quota.guard()) return;
    const result = generateMathExamples({ range: 20, mode, count });
    setExamples(result);
    setSheetMode(mode);
    setShowAnswers(false);
    trackUsage('generator:primery');
    quota.consume();
  }

  return (
    <div className="bg-[#28134f] min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/generator" className="text-orange hover:underline text-sm">
          ← Все генераторы
        </Link>
        <h1 className="text-3xl font-bold mt-2 mb-2">Примеры до 20</h1>
        <p className="text-gray-400 mb-8">
          Сложение и вычитание в пределах 20 для 1 класса — включая переход через десяток (8 + 5, 13 − 5). Ответы считаются автоматически.
        </p>

        <div className="card mb-8 no-print">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">Действие</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {MODES.map((m) => (
                <button
                  key={m.value}
                  onClick={() => setMode(m.value)}
                  className={`px-4 py-3 rounded-lg font-bold transition-colors text-sm ${
                    mode === m.value
                      ? 'bg-orange text-white'
                      : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="text-lg mr-1">{m.icon}</span>
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium mb-2">Количество примеров</label>
            <input
              type="number"
              min={1}
              max={100}
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
              className="w-full px-4 py-2 rounded-lg bg-black border border-[#2D2350] focus:border-orange transition-colors"
            />
          </div>

          <GeneratorQuotaBanner quota={quota} />

          <button onClick={handleGenerate} disabled={!quota.guard()} className="btn-primary w-full disabled:opacity-50">
            Создать примеры
          </button>
        </div>

        {examples.length > 0 && (
          <div className="examples-result card print-page bg-white">
            <div className="flex items-center justify-between mb-4 no-print">
              <h2 className="text-xl font-bold text-black">Результат ({examples.length} примеров)</h2>
              <button
                onClick={() => setShowAnswers((v) => !v)}
                className="text-orange text-sm font-bold hover:underline"
              >
                {showAnswers ? 'Скрыть ответы' : 'Показать ответы'}
              </button>
            </div>

            <canvas ref={printRef} className="examples-print-sheet" role="img"
              aria-label={examples.map(ex => showAnswers ? ex.text.replace('___', String(ex.answer)) : ex.text).join('; ')} />

            <div className="mt-6 no-print">
              <ExportToolbar targetRef={printRef} filename="primery-do-20" />
            </div>
          </div>
        )}
      </div>

      <PageAbout route="/generator/primery-do-20" />
    </div>
  );
}
