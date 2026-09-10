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

type Klass = 1 | 2 | 3 | 4;

// Диапазон и допустимые действия по классу — ориентир по школьной программе,
// сверенный с уже существующим FAQ /generator/primery (до 10-20 — 1 класс,
// до 100 — 2-3 класс, до 1000 — 3-4 класс).
const KLASS_PRESETS: Record<Klass, { range: MathRange; modes: { value: MathMode; label: string; icon: string }[]; defaultMode: MathMode; desc: string }> = {
  1: {
    range: 20,
    modes: [
      { value: 'plus', label: 'Сложение', icon: '+' },
      { value: 'minus', label: 'Вычитание', icon: '−' },
      { value: 'plus_minus', label: 'Сложение и вычитание', icon: '± ' },
    ],
    defaultMode: 'plus_minus',
    desc: 'Счёт в пределах 20, включая переход через десяток',
  },
  2: {
    range: 100,
    modes: [
      { value: 'plus_minus', label: 'Сложение и вычитание', icon: '± ' },
      { value: 'multiply', label: 'Умножение', icon: '×' },
      { value: 'divide', label: 'Деление', icon: '÷' },
      { value: 'multiply_divide', label: 'Умножение и деление', icon: '×÷' },
    ],
    defaultMode: 'multiply',
    desc: 'Счёт в пределах 100, основы умножения и деления',
  },
  3: {
    range: 1000,
    modes: [
      { value: 'plus_minus', label: 'Сложение и вычитание', icon: '± ' },
      { value: 'multiply', label: 'Умножение', icon: '×' },
      { value: 'divide', label: 'Деление', icon: '÷' },
      { value: 'multiply_divide', label: 'Умножение и деление', icon: '×÷' },
    ],
    defaultMode: 'multiply_divide',
    desc: 'Трёхзначные числа, таблица умножения наизусть',
  },
  4: {
    range: 1000,
    modes: [
      { value: 'multiply', label: 'Умножение', icon: '×' },
      { value: 'divide', label: 'Деление', icon: '÷' },
      { value: 'multiply_divide', label: 'Умножение и деление', icon: '×÷' },
      { value: 'plus_minus', label: 'Сложение и вычитание', icon: '± ' },
    ],
    defaultMode: 'multiply_divide',
    desc: 'Многозначные числа, письменные вычисления',
  },
};

export default function GeneratorPrimeryPoKlassamPage() {
  const [klass, setKlass] = useState<Klass>(1);
  const [mode, setMode] = useState<MathMode>(KLASS_PRESETS[1].defaultMode);
  const [count, setCount] = useState(20);
  const [examples, setExamples] = useState<{ text: string; answer: number }[]>([]);
  const [showAnswers, setShowAnswers] = useState(false);
  const [sheetSettings, setSheetSettings] = useState<{ klass: Klass; mode: MathMode } | null>(null);
  const printRef = useRef<HTMLCanvasElement>(null);
  const quota = useGeneratorQuota();
  const preset = KLASS_PRESETS[klass];

  useEffect(() => {
    if (!printRef.current || !examples.length || !sheetSettings) return;
    const presetInfo = KLASS_PRESETS[sheetSettings.klass];
    const modeInfo = presetInfo.modes.find((item) => item.value === sheetSettings.mode) ?? presetInfo.modes[0];
    drawMathSheet(printRef.current, examples, showAnswers, {
      title: `Примеры по математике — ${sheetSettings.klass} класс`,
      subtitle: modeInfo.label,
      symbol: modeInfo.icon.trim(),
    });
  }, [examples, showAnswers, sheetSettings]);

  function chooseKlass(next: Klass) {
    setKlass(next);
    setMode(KLASS_PRESETS[next].defaultMode);
  }

  function handleGenerate() {
    if (!quota.guard()) return;
    const result = generateMathExamples({ range: preset.range, mode, count });
    setExamples(result);
    setSheetSettings({ klass, mode });
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
        <h1 className="text-3xl font-bold mt-2 mb-2">Примеры по математике для 1–4 класса</h1>
        <p className="text-gray-400 mb-8">
          Выберите класс — диапазон чисел и подходящие действия подберутся автоматически.
        </p>

        <div className="card mb-8 no-print">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">Класс</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {([1, 2, 3, 4] as Klass[]).map((k) => (
                <button
                  key={k}
                  onClick={() => chooseKlass(k)}
                  className={`px-4 py-3 rounded-lg font-bold transition-colors ${
                    klass === k
                      ? 'bg-orange text-white'
                      : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
                  }`}
                >
                  {k} класс
                </button>
              ))}
            </div>
            <p className="text-gray-500 text-sm mt-2">{preset.desc}</p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">Действие</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {preset.modes.map((m) => (
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
              <ExportToolbar targetRef={printRef} filename={`primery-${klass}klass`} />
            </div>
          </div>
        )}
      </div>

      <PageAbout route="/generator/primery-po-klassam" />
    </div>
  );
}
