'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import ExportToolbar from '@/components/ExportToolbar';
import { useGeneratorQuota } from '@/lib/useGeneratorQuota';

const NUMBERS = Array.from({ length: 20 }, (_, i) => i + 1);
const ACCENTS = [
  ['#fff1f2', '#be123c', '#fb7185'],
  ['#fff7ed', '#c2410c', '#fb923c'],
  ['#fefce8', '#a16207', '#facc15'],
  ['#f0fdf4', '#15803d', '#4ade80'],
  ['#ecfeff', '#0e7490', '#22d3ee'],
];

export default function SquaresTablePage() {
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
            🔢 Математика · 3–5 класс
          </div>
          <h1 className="text-3xl font-black leading-tight sm:text-4xl">Квадраты чисел</h1>
          <p className="mt-3 text-lg text-white/70 leading-relaxed">
            Готовая таблица квадратов чисел от 1 до 20: число и результат, когда его умножают само на себя.
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
            <p className="text-sm font-medium text-slate-500">Готовый лист А4 · числа от 1 до 20</p>
            <ExportToolbar targetRef={printRef} filename="kvadraty-chisel" />
          </div>

          <div
            ref={printRef}
            className={`mx-auto rounded-[28px] border-[3px] bg-white p-5 sm:p-8 ${monochrome ? 'border-slate-700 grayscale' : 'border-violet-400'}`}
          >
            <header className={`mb-5 rounded-2xl px-5 py-4 text-center ${monochrome ? 'border-2 border-slate-700' : 'bg-gradient-to-r from-violet-100 via-fuchsia-50 to-orange-50'}`}>
              <p className={`text-xs font-black uppercase tracking-[0.22em] ${monochrome ? 'text-slate-600' : 'text-violet-600'}`}>Таблица</p>
              <h2 className="mt-1 text-3xl font-black text-slate-900">Квадраты чисел</h2>
              <p className="mt-1 text-sm font-semibold text-slate-500">от 1 до 20</p>
            </header>

            <div className="grid grid-cols-4 gap-2.5 sm:grid-cols-5">
              {NUMBERS.map((n) => {
                const [background, text, border] = ACCENTS[n % ACCENTS.length];
                return (
                  <div
                    key={n}
                    className="rounded-xl border-2 px-2 py-3 text-center"
                    style={{
                      backgroundColor: monochrome ? '#ffffff' : background,
                      borderColor: monochrome ? '#475569' : border,
                    }}
                  >
                    <p className="font-mono text-base font-bold text-slate-500">{n}² =</p>
                    <p className="font-mono text-2xl font-black" style={{ color: monochrome ? '#0f172a' : text }}>{n * n}</p>
                  </div>
                );
              })}
            </div>

            <footer className={`mt-5 rounded-2xl border-2 px-5 py-3 text-center ${monochrome ? 'border-slate-500' : 'border-violet-200 bg-violet-50'}`}>
              <p className="text-sm font-bold text-slate-700">
                Квадрат числа — это число, умноженное само на себя:
                <span className={`ml-2 whitespace-nowrap font-black ${monochrome ? 'text-slate-900' : 'text-violet-700'}`}>7² = 7 × 7 = 49</span>
              </p>
            </footer>
            {!quota.isSubscriber && <p className="mt-4 text-center text-[10px] font-semibold tracking-wide text-slate-400">Знаторика · znatorica.ru</p>}
          </div>
        </section>

        <section className="no-print mx-auto mt-8 max-w-3xl rounded-2xl border border-white/15 bg-white/[0.06] p-6">
          <h2 className="text-2xl font-black">Как пользоваться таблицей</h2>
          <p className="mt-3 leading-relaxed text-white/70">
            Заучивай квадраты постепенно, небольшими группами по 5 чисел. Проверяй себя: закрой правый столбец
            и попробуй назвать квадрат числа самостоятельно, потом сверься с таблицей.
          </p>
          <nav className="mt-5 flex flex-wrap gap-3" aria-label="Материалы по квадратам чисел">
            <Link href="/tablicy/tablitsa-umnozheniya" className="rounded-lg border border-white/20 px-5 py-2.5 text-sm font-bold hover:border-orange">
              Таблица умножения
            </Link>
          </nav>
        </section>
      </div>
    </main>
  );
}
