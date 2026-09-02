'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import {
  generateColoringPicture,
  PICTURES,
  LEVELS,
  type ColoringPictureId,
  type ColoringLevel,
  type ColoringResult,
} from '@/lib/math-coloring';
import { trackUsage } from '@/lib/track';
import ExportToolbar from '@/components/ExportToolbar';
import { useGeneratorQuota } from '@/lib/useGeneratorQuota';
import GeneratorQuotaBanner from '@/components/GeneratorQuotaBanner';

const CELL = 30;

function ColoringGrid({ result, showAnswer }: { result: ColoringResult; showAnswer: boolean }) {
  const rowsCount = result.grid.length;
  const colsCount = result.grid[0]?.length ?? 0;
  const width = colsCount * CELL;
  const height = rowsCount * CELL;
  const cellByKey = new Map(result.cells.map((c) => [`${c.row}-${c.col}`, c]));

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} className="border border-gray-300 max-w-full h-auto">
      <rect x="0" y="0" width={width} height={height} fill="#fff" />
      {result.grid.map((rowCells, row) =>
        rowCells.map((filled, col) => {
          if (!filled) return null;
          const cell = cellByKey.get(`${row}-${col}`);
          if (!cell) return null;
          const band = result.bands[cell.bandIndex];
          const x = col * CELL;
          const y = row * CELL;
          return (
            <g key={`${row}-${col}`}>
              <rect
                x={x}
                y={y}
                width={CELL}
                height={CELL}
                fill={showAnswer ? band.swatch : '#fff'}
                stroke="#999"
                strokeWidth="0.75"
              />
              <text
                x={x + CELL / 2}
                y={y + CELL / 2 + 3}
                textAnchor="middle"
                fontSize="8"
                fontWeight="bold"
                fill={showAnswer ? '#1a1a1a' : '#333'}
              >
                {cell.a}
                {cell.op}
                {cell.b}
              </text>
            </g>
          );
        })
      )}
    </svg>
  );
}

export default function MatematicheskayaRaskraskaPage() {
  const [pictureId, setPictureId] = useState<ColoringPictureId>('star');
  const [level, setLevel] = useState<ColoringLevel>(10);
  const [result, setResult] = useState<ColoringResult | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);
  const quota = useGeneratorQuota();

  const picture = PICTURES.find((p) => p.id === pictureId) ?? PICTURES[0];

  function handleGenerate() {
    if (!quota.guard()) return;
    setResult(generateColoringPicture(pictureId, level));
    setShowAnswer(false);
    trackUsage('generator:matematicheskaya-raskraska');
    quota.consume();
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/generator" className="text-orange hover:underline text-sm">
          ← Все генераторы
        </Link>
        <h1 className="text-3xl font-bold mt-2 mb-2">🎨 Математическая раскраска</h1>
        <p className="text-white/75 mb-8">
          Реши пример в клетке, узнай ответ и закрась клетку нужным цветом по легенде — если всё
          верно, проявится картинка. Тренирует счёт в пределах 10 или 20.
        </p>

        <div className="card mb-8 no-print">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">Картинка</label>
            <div className="flex gap-3 flex-wrap">
              {PICTURES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPictureId(p.id)}
                  className={`px-5 py-2 rounded-lg font-bold transition-colors text-sm ${
                    pictureId === p.id
                      ? 'bg-orange text-white'
                      : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
                  }`}
                >
                  {p.emoji} {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">Примеры в пределах</label>
            <div className="flex gap-3 flex-wrap">
              {LEVELS.map((lv) => (
                <button
                  key={lv}
                  onClick={() => setLevel(lv)}
                  className={`px-5 py-2 rounded-lg font-bold transition-colors text-sm ${
                    level === lv
                      ? 'bg-orange text-white'
                      : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
                  }`}
                >
                  До {lv}
                </button>
              ))}
            </div>
          </div>

          <GeneratorQuotaBanner quota={quota} />

          <button onClick={handleGenerate} disabled={!quota.guard()} className="btn-primary w-full disabled:opacity-50">
            Сгенерировать
          </button>
        </div>

        {result && (
          <div ref={printRef} className="card print-page bg-white">
            <div className="no-print mb-4 flex justify-between items-center flex-wrap gap-3">
              <span className="text-sm text-gray-500">
                {picture.emoji} {picture.label} · до {level}
              </span>
              <ExportToolbar targetRef={printRef} filename={`matematicheskaya-raskraska-${pictureId}-do-${level}`} />
            </div>

            <h2 className="no-print text-xl font-bold text-black mb-2">
              Реши пример — узнай цвет
            </h2>
            {!showAnswer && (
              <p className="no-print text-gray-500 text-sm mb-4">
                Реши пример в каждой клетке и закрась её цветом по легенде ниже.
              </p>
            )}

            <div className="flex flex-wrap gap-3 mb-6">
              {result.bands.map((band) => (
                <div key={band.key} className="flex items-center gap-2 text-sm text-black">
                  <span
                    className="coloring-legend-swatch inline-block w-5 h-5 rounded border border-gray-400"
                    style={{ backgroundColor: band.swatch, '--swatch': band.swatch } as React.CSSProperties}
                  />
                  <span>
                    Ответ {band.min}–{band.max} → {band.label.toLowerCase()}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <ColoringGrid result={result} showAnswer={showAnswer} />
            </div>

            <div className="mt-6 no-print">
              <button onClick={() => setShowAnswer((v) => !v)} className="text-orange font-bold hover:underline">
                {showAnswer ? 'Скрыть решение' : 'Показать решение (для проверки)'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
