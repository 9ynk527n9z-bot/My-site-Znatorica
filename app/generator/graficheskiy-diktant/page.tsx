'use client';

import { useRef, useState } from 'react';
import { pickShape, instructionLines, computePath, type DictationShape } from '@/lib/graphic-dictation';
import { trackUsage } from '@/lib/track';
import ExportToolbar from '@/components/ExportToolbar';
import { useGeneratorQuota } from '@/lib/useGeneratorQuota';
import GeneratorQuotaBanner from '@/components/GeneratorQuotaBanner';

const COUNTS = [1, 2, 3] as const;
const CELL = 20;

function DictationGrid({ shape, showAnswer }: { shape: DictationShape; showAnswer: boolean }) {
  const size = shape.gridSize * CELL;
  const lines = [];
  for (let i = 0; i <= shape.gridSize; i++) {
    lines.push(<line key={`v${i}`} x1={i * CELL} y1={0} x2={i * CELL} y2={size} stroke="#ddd" strokeWidth="1" />);
    lines.push(<line key={`h${i}`} x1={0} y1={i * CELL} x2={size} y2={i * CELL} stroke="#ddd" strokeWidth="1" />);
  }
  const [sx, sy] = shape.start;
  const pathPoints = showAnswer
    ? computePath(shape.start, shape.moves).map(([x, y]) => `${x * CELL},${y * CELL}`).join(' ')
    : null;

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} className="border border-gray-300">
      <rect x="0" y="0" width={size} height={size} fill="#fff" />
      {lines}
      {pathPoints && <polyline points={pathPoints} fill="none" stroke="#F97316" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />}
      <circle cx={sx * CELL} cy={sy * CELL} r={CELL * 0.28} fill="#F97316" />
    </svg>
  );
}

export default function GraficheskiyDiktantPage() {
  const [count, setCount] = useState<number>(1);
  const [shapes, setShapes] = useState<DictationShape[] | null>(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);
  const quota = useGeneratorQuota();

  function handleGenerate() {
    if (!quota.guard()) return;
    const used = new Set<string>();
    const picked = Array.from({ length: count }, () => pickShape(used));
    setShapes(picked);
    setShowAnswers(false);
    trackUsage('generator:graficheskiy-diktant');
    quota.consume();
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mt-2 mb-2">✏️ Графический диктант</h1>
        <p className="text-white/75 mb-8">
          Ребёнок ставит карандаш в отмеченную точку и ведёт линию по инструкциям — если всё сделано
          верно, получится картинка. Тренирует внимание и умение слушать инструкции.
        </p>

        <div className="card mb-8 no-print">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">Сколько диктантов на листе</label>
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

        {shapes && (
          <div ref={printRef} className="card print-page bg-white">
            <div className="no-print mb-4 flex justify-between items-center flex-wrap gap-3">
              <span className="text-sm text-gray-500">{shapes.length} шт.</span>
              <ExportToolbar targetRef={printRef} filename="graficheskiy-diktant" />
            </div>

            <h2 className="text-xl font-bold text-black mb-2">Графический диктант</h2>
            {!showAnswers && (
              <p className="text-gray-500 text-sm mb-6">
                Поставь карандаш в оранжевую точку и веди линию по инструкциям.
              </p>
            )}

            <div className="space-y-10">
              {shapes.map((shape, i) => (
                <div key={i} className="flex flex-col sm:flex-row gap-6 items-start">
                  <DictationGrid shape={shape} showAnswer={showAnswers} />
                  <div>
                    <p className="font-bold text-black mb-2">
                      {i + 1}. {showAnswers ? shape.title : 'Начни с точки и следуй инструкциям:'}
                    </p>
                    <ol className="text-gray-700 text-sm space-y-1">
                      {instructionLines(shape.moves).map((line, j) => (
                        <li key={j}>{line}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 no-print">
              <button onClick={() => setShowAnswers((v) => !v)} className="text-orange font-bold hover:underline">
                {showAnswers ? 'Скрыть ответ' : 'Показать ответ (готовый рисунок)'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
