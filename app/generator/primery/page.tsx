'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { drawMathSheet } from '@/lib/math-sheet';
import { generateMathExamples, type MathRange, type MathMode } from '@/lib/generator';
import { trackUsage } from '@/lib/track';
import ExportToolbar from '@/components/ExportToolbar';
import { useGeneratorQuota } from '@/lib/useGeneratorQuota';
import GeneratorQuotaBanner from '@/components/GeneratorQuotaBanner';
import PageAbout from '@/components/PageAbout';

const RANGES: { value: MathRange; label: string }[] = [
  { value: 10, label: 'До 10' },
  { value: 100, label: 'До 100' },
  { value: 1000, label: 'До 1000' },
];

const MODES: { value: MathMode; label: string; icon: string }[] = [
  { value: 'plus', label: 'Сложение', icon: '+' },
  { value: 'minus', label: 'Вычитание', icon: '−' },
  { value: 'plus_minus', label: 'Сложение и вычитание', icon: '± ' },
  { value: 'multiply', label: 'Умножение', icon: '×' },
  { value: 'divide', label: 'Деление', icon: '÷' },
  { value: 'multiply_divide', label: 'Умножение и деление', icon: '×÷' },
];

export default function GeneratorPrimeryPage() {
  const [range, setRange] = useState<MathRange>(10);
  const [mode, setMode] = useState<MathMode>('plus');
  const [count, setCount] = useState(20);
  const [examples, setExamples] = useState<{ text: string; answer: number }[]>([]);
  const [showAnswers, setShowAnswers] = useState(false);
  const printRef = useRef<HTMLCanvasElement>(null);
  const quota = useGeneratorQuota();
  useEffect(() => {
    if (printRef.current && examples.length) drawMathSheet(printRef.current, examples, showAnswers);
  }, [examples, showAnswers]);

  function handleGenerate() {
    if (!quota.guard()) return;
    const result = generateMathExamples({ range, mode, count });
    setExamples(result);
    setShowAnswers(false);
    trackUsage('generator:primery');
    quota.consume();
  }

  return (
    <div className="bg-black min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/generator" className="text-orange hover:underline text-sm">
          ← Все генераторы
        </Link>
        <h1 className="text-3xl font-bold mt-2 mb-2">Генератор примеров</h1>
        <p className="text-gray-400 mb-8">
          Выбери диапазон и действие — примеры и правильные ответы посчитаются автоматически.
        </p>

        <div className="card mb-8 no-print">
          {/* Диапазон */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">Диапазон чисел</label>
            <div className="flex gap-3 flex-wrap">
              {RANGES.map((r) => (
                <button
                  key={r.value}
                  onClick={() => setRange(r.value)}
                  className={`px-5 py-2 rounded-lg font-bold transition-colors ${
                    range === r.value
                      ? 'bg-orange text-white'
                      : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Режим */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">Действие</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
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

          {/* Количество */}
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

        {/* Результат */}
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
              <ExportToolbar targetRef={printRef} filename="primery" />
            </div>
          </div>
        )}
      </div>

      <PageAbout route="/generator/primery" />
    </div>
  );
}
