'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { generateMaze, solvePath, SIZE_CONFIG, type Maze, type Size } from '@/lib/maze';
import { trackUsage } from '@/lib/track';
import ExportToolbar from '@/components/ExportToolbar';
import { useGeneratorQuota } from '@/lib/useGeneratorQuota';
import GeneratorQuotaBanner from '@/components/GeneratorQuotaBanner';

const SIZES: Size[] = ['small', 'medium', 'large'];
const CELL = 28;

function MazeSvg({ maze, showSolution }: { maze: Maze; showSolution: boolean }) {
  const { cols, rows, cells, start, end } = maze;
  const w = cols * CELL;
  const h = rows * CELL;
  const walls: React.ReactNode[] = [];

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const cell = cells[y][x];
      const x0 = x * CELL;
      const y0 = y * CELL;
      const x1 = x0 + CELL;
      const y1 = y0 + CELL;
      if (cell.top) walls.push(<line key={`t${x}-${y}`} x1={x0} y1={y0} x2={x1} y2={y0} />);
      if (cell.left) walls.push(<line key={`l${x}-${y}`} x1={x0} y1={y0} x2={x0} y2={y1} />);
      // Правую и нижнюю границу всей сетки рисуем отдельно ниже, чтобы не
      // дублировать линии — внутренние right/bottom уже нарисованы как left/top соседней клетки.
    }
  }

  const path = showSolution ? solvePath(maze) : [];
  const pathPoints = path.map(([x, y]) => `${x * CELL + CELL / 2},${y * CELL + CELL / 2}`).join(' ');

  return (
    <svg viewBox={`-3 -3 ${w + 6} ${h + 6}`} width={w} height={h} className="border border-gray-300 bg-white">
      <rect x={-3} y={-3} width={w + 6} height={h + 6} fill="#fff" />
      {pathPoints && (
        <polyline
          points={pathPoints}
          fill="none"
          stroke="#F97316"
          strokeWidth={CELL * 0.28}
          strokeLinejoin="round"
          strokeLinecap="round"
          opacity={0.85}
        />
      )}
      <g stroke="#111" strokeWidth={2.5} strokeLinecap="square">
        {walls}
        {/* внешняя рамка целиком */}
        <line x1={0} y1={h} x2={w} y2={h} />
        <line x1={w} y1={0} x2={w} y2={h} />
      </g>
      {/* вход — зелёная точка */}
      <circle cx={start[0] * CELL + CELL / 2} cy={start[1] * CELL + CELL / 2} r={CELL * 0.22} fill="#22C55E" />
      {/* выход — красная точка */}
      <circle cx={end[0] * CELL + CELL / 2} cy={end[1] * CELL + CELL / 2} r={CELL * 0.22} fill="#EF4444" />
    </svg>
  );
}

export default function LabirintyPage() {
  const [size, setSize] = useState<Size>('medium');
  const [maze, setMaze] = useState<Maze | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);
  const quota = useGeneratorQuota();

  function handleGenerate() {
    if (!quota.guard()) return;
    setMaze(generateMaze(size));
    setShowSolution(false);
    trackUsage('generator:labirinty');
    quota.consume();
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/generator" className="text-orange hover:underline text-sm">
          ← Все генераторы
        </Link>
        <h1 className="text-3xl font-bold mt-2 mb-2">🌀 Лабиринты</h1>
        <p className="text-white/75 mb-8">
          Проведи линию от входа (зелёная точка) до выхода (красная точка). Развивает внимание,
          пространственное мышление и мелкую моторику.
        </p>

        <div className="card mb-8 no-print">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">Размер лабиринта</label>
            <div className="flex gap-3 flex-wrap">
              {SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-5 py-2 rounded-lg font-bold transition-colors text-sm ${
                    size === s
                      ? 'bg-orange text-white'
                      : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
                  }`}
                >
                  {SIZE_CONFIG[s].label}
                </button>
              ))}
            </div>
            <p className="text-xs text-white/50 mt-2">{SIZE_CONFIG[size].hint}</p>
          </div>

          <GeneratorQuotaBanner quota={quota} />

          <button onClick={handleGenerate} disabled={!quota.guard()} className="btn-primary w-full disabled:opacity-50">
            Сгенерировать
          </button>
        </div>

        {maze && (
          <div ref={printRef} className="card print-page bg-white">
            <div className="no-print mb-4 flex justify-between items-center flex-wrap gap-3">
              <span className="text-sm text-gray-500">{SIZE_CONFIG[size].label} · {maze.cols}×{maze.rows}</span>
              <ExportToolbar targetRef={printRef} filename={`labirint-${size}`} />
            </div>

            <h2 className="no-print text-xl font-bold text-black mb-2">Лабиринт</h2>
            <p className="no-print text-gray-500 text-sm mb-6">
              От зелёной точки до красной — только один верный путь.
            </p>

            <div className="overflow-x-auto flex justify-center">
              <MazeSvg maze={maze} showSolution={showSolution} />
            </div>

            <div className="mt-6 no-print">
              <button onClick={() => setShowSolution((v) => !v)} className="text-orange font-bold hover:underline">
                {showSolution ? 'Скрыть решение' : 'Показать решение'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
