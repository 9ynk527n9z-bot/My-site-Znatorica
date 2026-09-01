'use client';

import { useRef, useState } from 'react';
import { generateNumberBonds, type NumberBond } from '@/lib/number-bonds';
import { trackUsage } from '@/lib/track';
import ExportToolbar from '@/components/ExportToolbar';
import { useGeneratorQuota } from '@/lib/useGeneratorQuota';
import GeneratorQuotaBanner from '@/components/GeneratorQuotaBanner';

const NUMBERS = [2, 3, 4, 5, 6, 7, 8, 9, 10];
const COUNTS = [4, 6, 8, 10] as const;

function House({ bond }: { bond: NumberBond }) {
  const aText = bond.blank === 'a' ? '' : String(bond.a);
  const bText = bond.blank === 'b' ? '' : String(bond.b);
  return (
    <svg viewBox="0 0 140 140" width="140" height="140" className="mx-auto">
      <path d="M 70 34 L 22 68 M 70 34 L 118 68" stroke="#bbb" strokeWidth="3" fill="none" />
      <rect x="42" y="2" width="56" height="40" rx="10" fill="#F97316" />
      <text x="70" y="29" textAnchor="middle" fontSize="22" fontWeight="bold" fill="white">
        {bond.number}
      </text>
      <rect x="4" y="72" width="56" height="46" rx="10" fill="white" stroke="#ccc" strokeWidth="2" />
      <text x="32" y="102" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#111">
        {aText}
      </text>
      <rect x="80" y="72" width="56" height="46" rx="10" fill="white" stroke="#ccc" strokeWidth="2" />
      <text x="108" y="102" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#111">
        {bText}
      </text>
    </svg>
  );
}

export default function SostavChislaPage() {
  const [selected, setSelected] = useState<Set<number>>(new Set([5, 6, 7, 8, 9, 10]));
  const [count, setCount] = useState<number>(6);
  const [bonds, setBonds] = useState<NumberBond[] | null>(null);
  const printRef = useRef<HTMLDivElement>(null);
  const quota = useGeneratorQuota();

  function toggle(n: number) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(n)) next.delete(n);
      else next.add(n);
      return next;
    });
  }

  function handleGenerate() {
    if (!quota.guard()) return;
    const numbers = NUMBERS.filter((n) => selected.has(n));
    if (numbers.length === 0) return;
    setBonds(generateNumberBonds(numbers, count));
    trackUsage('generator:sostav-chisla');
    quota.consume();
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mt-2 mb-2">🏠 Состав числа</h1>
        <p className="text-white/75 mb-8">
          «Домики» состава числа — классическое упражнение для 1 класса. Ребёнок находит недостающее
          слагаемое, чтобы получить число сверху.
        </p>

        <div className="card mb-8 no-print">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">Какие числа отрабатываем</label>
            <div className="flex gap-2 flex-wrap">
              {NUMBERS.map((n) => (
                <button
                  key={n}
                  onClick={() => toggle(n)}
                  className={`w-10 h-10 rounded-lg font-bold transition-colors ${
                    selected.has(n)
                      ? 'bg-orange text-white'
                      : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">Сколько домиков напечатать</label>
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
                  {c} домиков
                </button>
              ))}
            </div>
          </div>

          <GeneratorQuotaBanner quota={quota} />

          <button
            onClick={handleGenerate}
            disabled={selected.size === 0 || !quota.guard()}
            className="btn-primary w-full disabled:opacity-50"
          >
            Сгенерировать
          </button>
        </div>

        {bonds && (
          <div ref={printRef} className="card print-page bg-white">
            <div className="no-print mb-4 flex justify-between items-center flex-wrap gap-3">
              <span className="text-sm text-gray-500">{bonds.length} домиков</span>
              <ExportToolbar targetRef={printRef} filename="sostav-chisla" />
            </div>

            <h2 className="text-xl font-bold text-black mb-6">Состав числа</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {bonds.map((bond, i) => (
                <House key={i} bond={bond} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
