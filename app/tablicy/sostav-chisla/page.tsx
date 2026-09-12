'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import ExportToolbar from '@/components/ExportToolbar';
import { useGeneratorQuota } from '@/lib/useGeneratorQuota';

type Range = 10 | 20;

const PALETTE = [
  ['#fff1f2', '#be123c', '#fb7185'],
  ['#fff7ed', '#c2410c', '#fb923c'],
  ['#fefce8', '#a16207', '#facc15'],
  ['#f0fdf4', '#15803d', '#4ade80'],
  ['#ecfeff', '#0e7490', '#22d3ee'],
  ['#eff6ff', '#1d4ed8', '#60a5fa'],
  ['#f5f3ff', '#6d28d9', '#a78bfa'],
  ['#fdf4ff', '#a21caf', '#e879f9'],
  ['#fff1f2', '#9f1239', '#fda4af'],
  ['#f0fdfa', '#0f766e', '#5eead4'],
];

function pairsFor(number: number) {
  return Array.from({ length: Math.floor(number / 2) }, (_, index) => [index + 1, number - index - 1]);
}

export default function NumberCompositionPage() {
  const quota = useGeneratorQuota();
  const [range, setRange] = useState<Range>(10);
  const [monochrome, setMonochrome] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);
  const numbers = range === 10
    ? Array.from({ length: 9 }, (_, index) => index + 2)
    : Array.from({ length: 10 }, (_, index) => index + 11);

  return (
    <main className="min-h-screen px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link href="/generator" className="no-print text-sm text-orange hover:underline">← Все материалы</Link>

        <header className="no-print mt-4 mb-8 max-w-3xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold text-violet-100">
            🔢 Математика · 1–2 класс
          </div>
          <h1 className="text-3xl font-black leading-tight sm:text-4xl">Состав числа до 10 и до 20</h1>
          <p className="mt-3 text-white/70 leading-relaxed">
            Готовая учебная таблица с парами слагаемых. Выбери диапазон и оформление — лист можно распечатать
            или сохранить в удобном формате.
          </p>
        </header>

        <section className="no-print card mb-6 grid gap-5 !p-4 sm:grid-cols-2 sm:!p-5">
          <div>
            <p className="mb-2 font-extrabold">Диапазон чисел</p>
            <div className="inline-flex rounded-xl border border-white/15 bg-black/20 p-1">
              {([10, 20] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRange(value)}
                  className={`rounded-lg px-5 py-2 text-sm font-bold transition ${range === value ? 'bg-orange text-white' : 'text-white/60 hover:text-white'}`}
                >
                  До {value}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 font-extrabold">Оформление</p>
            <div className="inline-flex rounded-xl border border-white/15 bg-black/20 p-1">
              <button type="button" onClick={() => setMonochrome(false)} className={`rounded-lg px-4 py-2 text-sm font-bold ${!monochrome ? 'bg-orange text-white' : 'text-white/60'}`}>🌈 Цветное</button>
              <button type="button" onClick={() => setMonochrome(true)} className={`rounded-lg px-4 py-2 text-sm font-bold ${monochrome ? 'bg-white text-slate-900' : 'text-white/60'}`}>◻ Чёрно-белое</button>
            </div>
          </div>
        </section>

        <section className="card print-page bg-white !p-4 text-slate-900 sm:!p-6">
          <div className="no-print mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-medium text-slate-500">Готовый лист · состав числа {range === 10 ? 'от 2 до 10' : 'от 11 до 20'}</p>
            <ExportToolbar targetRef={printRef} filename={`sostav-chisla-do-${range}`} />
          </div>

          <div ref={printRef} className={`mx-auto rounded-[28px] border-[3px] bg-white p-5 sm:p-8 ${monochrome ? 'border-slate-700 grayscale' : 'border-violet-400'}`}>
            <header className={`mb-5 rounded-2xl px-5 py-4 text-center ${monochrome ? 'border-2 border-slate-700' : 'bg-gradient-to-r from-violet-100 via-fuchsia-50 to-orange-50'}`}>
              <p className={`text-xs font-black uppercase tracking-[0.22em] ${monochrome ? 'text-slate-600' : 'text-violet-600'}`}>Таблица</p>
              <h2 className="mt-1 text-3xl font-black text-slate-900">Состав числа</h2>
              <p className="mt-1 text-sm font-semibold text-slate-500">{range === 10 ? 'от 2 до 10' : 'от 11 до 20'}</p>
            </header>

            <div className={`grid gap-3 ${range === 10 ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-2'}`}>
              {numbers.map((number, index) => {
                const [background, text, border] = PALETTE[index];
                return (
                  <section
                    key={number}
                    className="overflow-hidden rounded-2xl border-2"
                    style={{ backgroundColor: monochrome ? '#fff' : background, borderColor: monochrome ? '#475569' : border }}
                  >
                    <div className="flex items-center justify-center gap-3 px-4 py-2.5 text-white" style={{ backgroundColor: monochrome ? '#334155' : text }}>
                      <span className="text-xs font-black uppercase tracking-widest">Число</span>
                      <strong className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-xl font-black" style={{ color: monochrome ? '#0f172a' : text }}>{number}</strong>
                    </div>
                    <div className={`grid gap-x-3 gap-y-1.5 px-4 py-3 ${range === 20 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                      {pairsFor(number).map(([left, right]) => (
                        <div key={left} className="flex items-center justify-center whitespace-nowrap text-[15px] font-extrabold leading-6 text-slate-800">
                          <span>{left}</span><span className="px-1.5 text-slate-400">+</span><span>{right}</span><span className="px-1.5 text-slate-400">=</span>
                          <strong style={{ color: monochrome ? '#0f172a' : text }}>{number}</strong>
                        </div>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>

            <footer className={`mt-5 rounded-2xl border-2 px-5 py-3 text-center ${monochrome ? 'border-slate-500' : 'border-violet-200 bg-violet-50'}`}>
              <p className="text-sm font-bold text-slate-700">
                Слагаемые можно менять местами:
                <span className={`ml-2 whitespace-nowrap font-black ${monochrome ? 'text-slate-900' : 'text-violet-700'}`}>3 + 5 = 5 + 3 = 8</span>
              </p>
            </footer>
            {!quota.isSubscriber && <p className="mt-4 text-center text-[10px] font-semibold tracking-wide text-slate-400">Знаторика · znatorica.ru</p>}
          </div>
        </section>

        <section className="no-print mx-auto mt-8 max-w-3xl rounded-2xl border border-white/15 bg-white/[0.06] p-6">
          <h2 className="text-2xl font-black">Как учить состав числа</h2>
          <p className="mt-3 leading-relaxed text-white/70">
            Выбери одно число и прочитай все пары. Затем закрой одно слагаемое и восстанови его по памяти.
            Не переходи дальше, пока ребёнок не называет пары уверенно и без пересчёта предметов.
          </p>
          <nav className="mt-5 flex flex-wrap gap-3" aria-label="Материалы по составу числа">
            <Link href="/trenazher/sostav-chisla" className="btn-primary px-5 py-2.5 text-sm">Тренажёр состава числа</Link>
            <Link href="/generator/sostav-chisla" className="rounded-lg border border-white/20 px-5 py-2.5 text-sm font-bold hover:border-orange">Создать задания</Link>
          </nav>
        </section>
      </div>
    </main>
  );
}
