'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import ExportToolbar from '@/components/ExportToolbar';
import { useGeneratorQuota } from '@/lib/useGeneratorQuota';

const SHAPES = [
  {
    icon: '🟦', title: 'Квадрат', color: '#1d4ed8', pale: '#eff6ff', border: '#60a5fa',
    given: 'сторона a',
    perimeter: 'P = a × 4',
    area: 'S = a × a',
    example: 'a = 5 см → P = 20 см, S = 25 см²',
  },
  {
    icon: '▭', title: 'Прямоугольник', color: '#c2410c', pale: '#fff7ed', border: '#fb923c',
    given: 'стороны a и b',
    perimeter: 'P = (a + b) × 2',
    area: 'S = a × b',
    example: 'a = 7 см, b = 3 см → P = 20 см, S = 21 см²',
  },
  {
    icon: '🔺', title: 'Треугольник', color: '#15803d', pale: '#f0fdf4', border: '#4ade80',
    given: 'стороны a, b и c',
    perimeter: 'P = a + b + c',
    area: '',
    example: 'a = 4 см, b = 5 см, c = 6 см → P = 15 см',
  },
  {
    icon: '⬠', title: 'Многоугольник', color: '#6d28d9', pale: '#f5f3ff', border: '#a78bfa',
    given: 'все стороны',
    perimeter: 'P = сумма всех сторон',
    area: '',
    example: 'стороны 3, 4, 5, 6 см → P = 18 см',
  },
];

function ShapeIcon({ shape, monochrome }: { shape: (typeof SHAPES)[number]; monochrome: boolean }) {
  const fill = monochrome ? '#334155' : shape.color;
  if (shape.title === 'Прямоугольник') {
    return (
      <svg width="28" height="22" viewBox="0 0 28 22" aria-hidden="true">
        <rect x="1" y="1" width="26" height="20" rx="3" fill={fill} />
      </svg>
    );
  }
  if (shape.title === 'Многоугольник') {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
        <polygon points="12,1 23,9 19,22 5,22 1,9" fill={fill} />
      </svg>
    );
  }
  if (shape.title === 'Треугольник') {
    return (
      <svg width="26" height="22" viewBox="0 0 26 22" aria-hidden="true">
        <polygon points="13,1 25,21 1,21" fill={fill} />
      </svg>
    );
  }
  return <span className="text-2xl" aria-hidden="true">{shape.icon}</span>;
}

export default function FormulasAreaPerimeterPage() {
  const quota = useGeneratorQuota();
  const [monochrome, setMonochrome] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  return (
    <main className="min-h-screen px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link href="/tablicy" className="no-print mb-4 inline-block text-sm text-orange hover:underline">← Все таблицы</Link>

        <header className="no-print mx-auto mb-7 max-w-3xl text-center">
          <p className="text-base font-black uppercase tracking-[0.2em] text-violet-200">🔢 Математика · 2–4 класс</p>
          <h1 className="mt-2 text-[26px] font-black sm:text-[44px]">Формулы периметра и площади</h1>
          <p className="mt-3 text-white/70">Квадрат, прямоугольник, треугольник и многоугольник — какая формула для чего и в каких единицах.</p>
        </header>

        <section className="no-print card mb-6 flex flex-wrap items-center justify-between gap-4 !p-4 sm:!p-5">
          <div><b className="block">Оформление таблицы</b><span className="text-base text-white/60">Цветная или чёрно-белая печать</span></div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setMonochrome(false)} className={`btn-secondary px-4 py-2 text-base ${!monochrome ? 'border-orange' : ''}`}>🌈 Цветная</button>
            <button onClick={() => setMonochrome(true)} className={`btn-secondary px-4 py-2 text-base ${monochrome ? 'border-orange' : ''}`}>◻ Чёрно-белая</button>
          </div>
        </section>

        <section className="card print-page bg-white !p-4 text-slate-900 sm:!p-6">
          <div className="no-print mb-4 flex flex-wrap items-center justify-between gap-3">
            <span className="text-base font-bold text-slate-500">Готовый учебный лист · 4 фигуры</span>
            <ExportToolbar targetRef={printRef} filename="formuly-perimetra-i-ploshchadi" />
          </div>

          <div ref={printRef} className={`mx-auto rounded-[28px] border-[3px] bg-white p-5 sm:p-8 ${monochrome ? 'border-slate-700 grayscale' : 'border-violet-400'}`}>
            <header className={`mb-5 rounded-2xl px-5 py-4 text-center ${monochrome ? 'border-2 border-slate-700' : 'bg-gradient-to-r from-violet-100 via-fuchsia-50 to-orange-50'}`}>
              <p className={`text-sm font-black uppercase tracking-[0.22em] ${monochrome ? 'text-slate-600' : 'text-violet-600'}`}>Таблица</p>
              <h2 className="mt-1 text-3xl font-black text-slate-900">Формулы периметра и площади</h2>
            </header>

            <div className={`mb-5 rounded-2xl border-2 p-4 text-center ${monochrome ? 'border-slate-500' : 'border-violet-200 bg-violet-50'}`}>
              <p className="text-base font-semibold text-slate-700">
                <b className={monochrome ? 'text-slate-900' : 'text-violet-800'}>S</b> — площадь (см², м² — сколько места занимает фигура)
              </p>
              <p className="mt-1 text-base font-semibold text-slate-700">
                <b className={monochrome ? 'text-slate-900' : 'text-violet-800'}>P</b> — периметр (см, м — сумма длин сторон)
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {SHAPES.map((shape) => (
                <div key={shape.title} className="rounded-2xl border-2 p-4" style={{ backgroundColor: monochrome ? '#fff' : shape.pale, borderColor: monochrome ? '#cbd5e1' : shape.border }}>
                  <div className="flex items-center gap-2">
                    <ShapeIcon shape={shape} monochrome={monochrome} />
                    <h3 className="text-lg font-black text-slate-900">{shape.title}</h3>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-slate-500">Дано: {shape.given}</p>
                  <div className="mt-3 space-y-1.5">
                    {shape.area && <p className="rounded-lg bg-white/70 px-3 py-1.5 font-black" style={{ color: monochrome ? '#0f172a' : shape.color }}>{shape.area}</p>}
                    <p className="rounded-lg bg-white/70 px-3 py-1.5 font-black" style={{ color: monochrome ? '#0f172a' : shape.color }}>{shape.perimeter}</p>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-slate-500">{shape.example}</p>
                </div>
              ))}
            </div>

            <section className={`mt-5 rounded-2xl border-2 p-4 ${monochrome ? 'border-slate-500' : 'border-violet-200 bg-violet-50'}`}>
              <h3 className={`text-center text-base font-black ${monochrome ? 'text-slate-900' : 'text-violet-800'}`}>Не перепутай P и S</h3>
              <p className="mt-2 text-center text-base font-semibold text-slate-600">
                Периметр измеряется в обычных единицах длины (см, м), а площадь — в квадратных (см², м²).
                Для квадрата все стороны равны, поэтому <b className="text-slate-800">P = a × 4</b>, а не (a + a) × 2 — хотя это то же самое.
              </p>
            </section>
            {!quota.isSubscriber && <p className="mt-4 text-center text-xs font-semibold tracking-wide text-slate-400">Знаторика · znatorica.ru</p>}
          </div>
        </section>

        <section className="no-print mx-auto mt-8 max-w-3xl rounded-2xl border border-white/15 bg-white/[0.06] p-6">
          <h2 className="text-2xl font-black">Как работать с таблицей</h2>
          <p className="mt-3 leading-relaxed text-white/70">
            Сначала определи фигуру и то, что дано в задаче — стороны или сторону. Затем выбери нужную формулу:
            если нужно узнать длину границы — это периметр, если сколько места внутри — площадь. Площадь считается
            только для квадрата и прямоугольника: формула площади треугольника (через высоту) в начальной школе не изучается.
          </p>
          <nav className="mt-5 flex flex-wrap gap-3" aria-label="Материалы по теме">
            <Link href="/trenazher/geometriya-4klass" className="btn-primary px-5 py-2.5 text-sm">Тренажёр: периметр и площадь</Link>
            <Link href="/3-klass/matematika/ploshchad-perimetr" className="rounded-lg border border-white/20 px-5 py-2.5 text-sm font-bold hover:border-orange">Правило и примеры</Link>
            <Link href="/tablicy/edinitsy-izmereniya" className="rounded-lg border border-white/20 px-5 py-2.5 text-sm font-bold hover:border-orange">Таблица единиц измерения</Link>
          </nav>
        </section>
      </div>
    </main>
  );
}
