'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { generateNumberPyramid, type NumberPyramid, type PyramidBase } from '@/lib/number-pyramid';
import { trackUsage } from '@/lib/track';
import ExportToolbar from '@/components/ExportToolbar';
import { useGeneratorQuota } from '@/lib/useGeneratorQuota';
import GeneratorQuotaBanner from '@/components/GeneratorQuotaBanner';

const BASE_OPTIONS: { value: PyramidBase; label: string; hint: string }[] = [
  { value: 3, label: '3 в основании', hint: 'дошкольники, 1 класс' },
  { value: 4, label: '4 в основании', hint: '2 класс' },
  { value: 5, label: '5 в основании', hint: '3–4 класс' },
];

const SHEET_COUNTS = [1, 2, 3, 4] as const;

export default function ChislovayaPiramidaPage() {
  const [base, setBase] = useState<PyramidBase>(3);
  const [sheetCount, setSheetCount] = useState<number>(2);
  const [pyramids, setPyramids] = useState<NumberPyramid[] | null>(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);
  const quota = useGeneratorQuota();

  function handleGenerate() {
    if (!quota.guard()) return;
    setPyramids(Array.from({ length: sheetCount }, () => generateNumberPyramid(base)));
    setShowAnswers(false);
    trackUsage('generator:chislovaya-piramida');
    quota.consume();
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/generator" className="text-orange hover:underline text-sm">
          ← Все генераторы
        </Link>
        <h1 className="text-3xl font-bold mt-2 mb-2">🔺 Числовая пирамида</h1>
        <p className="text-white/75 mb-8">
          В нижнем ряду — числа. Каждая клетка выше — сумма двух соседних клеток снизу. Нужно
          сложить пары и заполнить пирамиду до самой вершины.
        </p>

        <div className="card mb-8 no-print">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">Размер пирамиды</label>
            <div className="flex gap-3 flex-wrap">
              {BASE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    setBase(opt.value);
                    setPyramids(null);
                  }}
                  className={`px-5 py-2 rounded-lg font-bold transition-colors text-sm ${
                    base === opt.value
                      ? 'bg-orange text-white'
                      : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
                  }`}
                >
                  {opt.label}
                  <span className="block text-xs font-normal opacity-70">{opt.hint}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">Пирамид на листе</label>
            <div className="flex gap-3">
              {SHEET_COUNTS.map((c) => (
                <button
                  key={c}
                  onClick={() => setSheetCount(c)}
                  className={`w-12 h-12 rounded-lg font-bold transition-colors ${
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

        {pyramids && (
          <div ref={printRef} className="print-page bg-white p-4 rounded-xl">
            <div className="no-print mb-4 flex justify-between items-center flex-wrap gap-3">
              <button
                onClick={() => setShowAnswers((v) => !v)}
                className="text-orange text-sm font-bold hover:underline"
              >
                {showAnswers ? 'Скрыть ответы' : 'Показать ответы'}
              </button>
              <ExportToolbar targetRef={printRef} filename={`chislovaya-piramida-${base}`} />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {pyramids.map((pyramid, pIndex) => (
                <div key={pIndex} className="flex flex-col items-center gap-2 py-4">
                  {[...pyramid.rows].reverse().map((row, rIndex) => {
                    const isBottomRow = rIndex === pyramid.rows.length - 1;
                    return (
                      <div key={rIndex} className="flex gap-2 justify-center">
                        {row.map((value, cIndex) => (
                          <div
                            key={cIndex}
                            className="w-12 h-12 border-2 border-gray-400 rounded-lg flex items-center justify-center text-lg font-bold text-black bg-gray-50"
                          >
                            {isBottomRow || showAnswers ? value : ''}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
