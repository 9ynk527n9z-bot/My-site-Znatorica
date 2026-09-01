'use client';

import { useRef, useState } from 'react';
import { generateCountingItems, type CountingItem } from '@/lib/counting';
import { trackUsage } from '@/lib/track';
import ExportToolbar from '@/components/ExportToolbar';
import { useGeneratorQuota } from '@/lib/useGeneratorQuota';
import GeneratorQuotaBanner from '@/components/GeneratorQuotaBanner';
import ShapeSvg from '@/components/ShapeSvg';

const MAX_OPTIONS = [5, 10] as const;
const COUNTS = [6, 8, 10] as const;

export default function SchetPredmetovPage() {
  const [maxCount, setMaxCount] = useState<number>(5);
  const [count, setCount] = useState<number>(6);
  const [items, setItems] = useState<CountingItem[] | null>(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);
  const quota = useGeneratorQuota();

  function handleGenerate() {
    if (!quota.guard()) return;
    setItems(generateCountingItems(maxCount, count));
    setShowAnswers(false);
    trackUsage('generator:schet-predmetov');
    quota.consume();
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mt-2 mb-2">🔢 Счёт предметов</h1>
        <p className="text-white/75 mb-8">
          Посчитай фигурки в каждой строке и впиши число в клетку — базовое упражнение для
          дошкольников и 1 класса.
        </p>

        <div className="card mb-8 no-print">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">Считаем до</label>
            <div className="flex gap-3 flex-wrap">
              {MAX_OPTIONS.map((m) => (
                <button
                  key={m}
                  onClick={() => setMaxCount(m)}
                  className={`px-5 py-2 rounded-lg font-bold transition-colors text-sm ${
                    maxCount === m
                      ? 'bg-orange text-white'
                      : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
                  }`}
                >
                  До {m}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">Количество заданий</label>
            <div className="flex gap-3 flex-wrap">
              {COUNTS.map((c) => (
                <button
                  key={c}
                  onClick={() => setCount(c)}
                  className={`px-5 py-2 rounded-lg font-bold transition-colors text-sm ${
                    count === c
                      ? 'bg-orange text-white'
                      : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
                  }`}
                >
                  {c} заданий
                </button>
              ))}
            </div>
          </div>

          <GeneratorQuotaBanner quota={quota} />

          <button onClick={handleGenerate} disabled={!quota.guard()} className="btn-primary w-full disabled:opacity-50">
            Сгенерировать
          </button>
        </div>

        {items && (
          <div ref={printRef} className="card print-page bg-white">
            <div className="no-print mb-4 flex justify-between items-center flex-wrap gap-3">
              <span className="text-sm text-gray-500">{items.length} заданий · до {maxCount}</span>
              <ExportToolbar targetRef={printRef} filename={`schet-predmetov-do-${maxCount}`} />
            </div>

            <h2 className="text-xl font-bold text-black mb-6">Посчитай и напиши число</h2>
            <div className="space-y-5">
              {items.map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="text-gray-400 font-bold w-6">{i + 1}.</span>
                  <div className="flex-1 flex flex-wrap gap-2 items-center">
                    {Array.from({ length: item.count }).map((_, j) => (
                      <ShapeSvg key={j} kind={item.shape} color={item.color} size={32} />
                    ))}
                  </div>
                  <div className="w-14 h-12 rounded-lg border-2 border-gray-300 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-bold text-black">{showAnswers ? item.count : ''}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 no-print">
              <button onClick={() => setShowAnswers((v) => !v)} className="text-orange font-bold hover:underline">
                {showAnswers ? 'Скрыть ответы' : 'Показать ответы'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
