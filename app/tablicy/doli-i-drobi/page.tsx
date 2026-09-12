'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import ExportToolbar from '@/components/ExportToolbar';
import { useGeneratorQuota } from '@/lib/useGeneratorQuota';

const FRACTIONS = [
  { num: 1, den: 2, name: 'Половина', color: '#be123c', pale: '#fff1f2', border: '#fb7185' },
  { num: 1, den: 3, name: 'Треть', color: '#c2410c', pale: '#fff7ed', border: '#fb923c' },
  { num: 1, den: 4, name: 'Четверть', color: '#a16207', pale: '#fefce8', border: '#facc15' },
  { num: 2, den: 3, name: 'Две трети', color: '#15803d', pale: '#f0fdf4', border: '#4ade80' },
  { num: 3, den: 4, name: 'Три четверти', color: '#1d4ed8', pale: '#eff6ff', border: '#60a5fa' },
];

function FractionCircle({ num, den, color, monochrome }: { num: number; den: number; color: string; monochrome: boolean }) {
  const fillColor = monochrome ? '#334155' : color;
  const emptyColor = monochrome ? '#e2e8f0' : '#f1f5f9';
  const gap = 1.5;
  const stops: string[] = [];
  for (let i = 0; i < den; i++) {
    const start = (i / den) * 100;
    const end = ((i + 1) / den) * 100;
    const isFilled = i < num;
    stops.push(`${isFilled ? fillColor : emptyColor} ${start}% ${end - gap}%`);
    stops.push(`#ffffff ${end - gap}% ${end}%`);
  }
  return (
    <div
      className="mx-auto h-16 w-16 rounded-full border-2"
      style={{
        background: `conic-gradient(${stops.join(', ')})`,
        borderColor: monochrome ? '#64748b' : '#cbd5e1',
      }}
    />
  );
}

export default function FractionsTablePage() {
  const quota = useGeneratorQuota();
  const [monochrome, setMonochrome] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  return (
    <main className="min-h-screen px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link href="/tablicy" className="no-print mb-4 inline-block text-base text-orange hover:underline">
          ← Все таблицы
        </Link>

        <header className="no-print mt-4 mb-8 max-w-3xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-bold text-violet-100">
            🔢 Математика · 2–3 класс
          </div>
          <h1 className="text-3xl font-black leading-tight sm:text-4xl">Доли и дроби</h1>
          <p className="mt-3 text-lg text-white/70 leading-relaxed">
            Наглядные схемы простых долей: половина, треть, четверть, 2/3 и 3/4.
          </p>
        </header>

        <section className="no-print card mb-6 flex flex-wrap items-center justify-between gap-4 !p-4 sm:!p-5">
          <div>
            <p className="font-extrabold">Оформление таблицы</p>
            <p className="text-sm text-white/55">Чёрно-белый вариант экономит цветные чернила</p>
          </div>
          <div className="flex rounded-xl border border-white/15 bg-black/20 p-1">
            <button
              type="button"
              onClick={() => setMonochrome(false)}
              className={`rounded-lg px-4 py-2 text-sm font-bold transition ${!monochrome ? 'bg-orange text-white' : 'text-white/60 hover:text-white'}`}
            >
              🌈 Цветная
            </button>
            <button
              type="button"
              onClick={() => setMonochrome(true)}
              className={`rounded-lg px-4 py-2 text-sm font-bold transition ${monochrome ? 'bg-white text-slate-900' : 'text-white/60 hover:text-white'}`}
            >
              ◻ Чёрно-белая
            </button>
          </div>
        </section>

        <section className="card print-page bg-white !p-4 text-slate-900 sm:!p-6">
          <div className="no-print mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-medium text-slate-500">Готовый учебный лист</p>
            <ExportToolbar targetRef={printRef} filename="doli-i-drobi" />
          </div>

          <div
            ref={printRef}
            className={`mx-auto rounded-[28px] border-[3px] bg-white p-5 sm:p-8 ${monochrome ? 'border-slate-700 grayscale' : 'border-violet-400'}`}
          >
            <header className={`mb-5 rounded-2xl px-5 py-4 text-center ${monochrome ? 'border-2 border-slate-700' : 'bg-gradient-to-r from-violet-100 via-fuchsia-50 to-orange-50'}`}>
              <p className={`text-xs font-black uppercase tracking-[0.22em] ${monochrome ? 'text-slate-600' : 'text-violet-600'}`}>Таблица</p>
              <h2 className="mt-1 text-3xl font-black text-slate-900">Доли и дроби</h2>
            </header>

            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
              {FRACTIONS.map((f) => (
                <div
                  key={`${f.num}/${f.den}`}
                  className="rounded-2xl border-2 p-3 text-center"
                  style={{ backgroundColor: monochrome ? '#fff' : f.pale, borderColor: monochrome ? '#64748b' : f.border }}
                >
                  <FractionCircle num={f.num} den={f.den} color={f.color} monochrome={monochrome} />
                  <div
                    className="mx-auto mt-2 inline-flex flex-col items-center font-mono text-lg font-black leading-none"
                    style={{ color: monochrome ? '#0f172a' : f.color }}
                  >
                    <span>{f.num}</span>
                    <span className="my-0.5 h-[2px] w-6 bg-current" />
                    <span>{f.den}</span>
                  </div>
                  <p className="mt-2 text-xs font-bold text-slate-600">{f.name}</p>
                </div>
              ))}
            </div>

            <section className={`mt-5 rounded-2xl border-2 p-4 text-center ${monochrome ? 'border-slate-500' : 'border-violet-200 bg-violet-50'}`}>
              <p className="text-sm font-bold text-slate-700">
                В дроби число сверху (числитель) показывает, сколько долей взяли, а число снизу (знаменатель) — на сколько долей поделили целое.
              </p>
            </section>

            {!quota.isSubscriber && (
              <p className="mt-4 text-center text-[10px] font-semibold tracking-wide text-slate-400">Знаторика · znatorica.ru</p>
            )}
          </div>
        </section>

        <section className="no-print mx-auto mt-8 max-w-3xl rounded-2xl border border-white/15 bg-white/[0.06] p-6">
          <h2 className="text-2xl font-black">Как пользоваться таблицей</h2>
          <p className="mt-3 leading-relaxed text-white/70">
            Сравнивай закрашенную часть круга с дробью рядом — так проще запомнить, что показывает числитель,
            а что знаменатель. Потренируйся называть долю сразу по картинке, не глядя на подпись.
          </p>
          <nav className="mt-5 flex flex-wrap gap-3" aria-label="Материалы по долям и дробям">
            <Link href="/trenazher/doli" className="btn-primary px-5 py-2.5 text-sm">
              Тренажёр «Доли и дроби»
            </Link>
          </nav>
        </section>
      </div>
    </main>
  );
}
