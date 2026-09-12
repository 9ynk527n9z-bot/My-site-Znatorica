'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import ExportToolbar from '@/components/ExportToolbar';
import { useGeneratorQuota } from '@/lib/useGeneratorQuota';

const GROUPS = [
  {
    icon: '📏', title: 'Длина', color: '#1d4ed8', pale: '#eff6ff', border: '#60a5fa',
    rows: ['1 см = 10 мм', '1 дм = 10 см', '1 м = 10 дм = 100 см', '1 км = 1000 м'],
    example: '3 м 25 см = 325 см',
  },
  {
    icon: '⚖️', title: 'Масса', color: '#15803d', pale: '#f0fdf4', border: '#4ade80',
    rows: ['1 кг = 1000 г', '1 ц = 100 кг', '1 т = 10 ц = 1000 кг'],
    example: '2 кг 300 г = 2300 г',
  },
  {
    icon: '⏰', title: 'Время', color: '#c2410c', pale: '#fff7ed', border: '#fb923c',
    rows: ['1 мин = 60 с', '1 ч = 60 мин', '1 сутки = 24 ч', '1 неделя = 7 суток', '1 год = 12 месяцев'],
    example: '2 ч 15 мин = 135 мин',
  },
  {
    icon: '🔲', title: 'Площадь', color: '#6d28d9', pale: '#f5f3ff', border: '#a78bfa',
    rows: ['1 дм² = 100 см²', '1 м² = 100 дм²', '1 м² = 10 000 см²', '1 км² = 1 000 000 м²'],
    example: '3 дм² = 300 см²',
  },
];

export default function MeasurementUnitsPage() {
  const [monochrome, setMonochrome] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);
  const quota = useGeneratorQuota();

  return (
    <main className="min-h-screen px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link href="/tablicy" className="no-print mb-4 inline-block text-sm text-orange hover:underline">← Все таблицы</Link>
        <header className="no-print mx-auto mb-7 max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-violet-200">🔢 Математика · 2–4 класс</p>
          <h1 className="mt-2 text-[26px] font-black sm:text-[44px]">Единицы измерения</h1>
          <p className="mt-3 text-white/70">Длина, масса, время и площадь — основные соотношения на одном листе.</p>
        </header>

        <section className="no-print card mb-6 flex flex-wrap items-center justify-between gap-4 !p-4 sm:!p-5">
          <div><b className="block">Оформление таблицы</b><span className="text-sm text-white/60">Цветная или чёрно-белая печать</span></div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setMonochrome(false)} className={`btn-secondary px-4 py-2 text-sm ${!monochrome ? 'border-orange' : ''}`}>🌈 Цветная</button>
            <button onClick={() => setMonochrome(true)} className={`btn-secondary px-4 py-2 text-sm ${monochrome ? 'border-orange' : ''}`}>◻ Чёрно-белая</button>
          </div>
        </section>

        <section className="card print-page bg-white !p-4 text-slate-900 sm:!p-6">
          <div className="no-print mb-4 flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm font-bold text-slate-500">Готовый учебный лист</span>
            <ExportToolbar targetRef={printRef} filename="edinitsy-izmereniya" />
          </div>

          <div ref={printRef} className={`mx-auto rounded-[28px] border-[3px] bg-white p-5 sm:p-8 ${monochrome ? 'border-slate-700 grayscale' : 'border-violet-400'}`}>
            <header className="mb-5 text-center">
              <p className={`text-xs font-black uppercase tracking-[0.22em] ${monochrome ? 'text-slate-600' : 'text-violet-600'}`}>Таблица</p>
              <h2 className="mt-1 text-2xl font-black sm:text-3xl">Единицы измерения</h2>
            </header>

            <div className="grid gap-4 sm:grid-cols-2">
              {GROUPS.map((group) => (
                <section key={group.title} className="rounded-2xl border-2 p-4" style={{ backgroundColor: monochrome ? '#fff' : group.pale, borderColor: monochrome ? '#64748b' : group.border }}>
                  <h3 className="flex items-center justify-center gap-2 text-xl font-black" style={{ color: monochrome ? '#0f172a' : group.color }}><span aria-hidden="true">{group.icon}</span>{group.title}</h3>
                  <div className="mt-3 grid gap-1.5 text-center">
                    {group.rows.map((row) => <p key={row} className="rounded-lg bg-white/85 px-3 py-1.5 text-base font-extrabold">{row}</p>)}
                  </div>
                  <p className="mt-3 border-t pt-3 text-center text-sm font-bold" style={{ borderColor: monochrome ? '#cbd5e1' : group.border, color: monochrome ? '#334155' : group.color }}>Пример: {group.example}</p>
                </section>
              ))}
            </div>

            <aside className={`mt-5 rounded-2xl border-2 px-5 py-3 text-center ${monochrome ? 'border-slate-500' : 'border-violet-200 bg-violet-50'}`}>
              <b className={monochrome ? 'text-slate-900' : 'text-violet-800'}>Как переводить:</b>
              <span className="ml-2 text-sm font-semibold text-slate-700">в меньшие единицы — умножай, в бо́льшие — дели.</span>
            </aside>
            {!quota.isSubscriber && <p className="mt-4 text-center text-[10px] font-semibold tracking-wide text-slate-400">Знаторика · znatorica.ru</p>}
          </div>
        </section>

        <section className="no-print mx-auto mt-8 max-w-3xl rounded-2xl border border-white/15 bg-white/[0.06] p-6">
          <h2 className="text-2xl font-black">Как пользоваться таблицей</h2>
          <p className="mt-3 leading-relaxed text-white/70">Сначала определите величину и нужную единицу измерения. Затем найдите соотношение и проверьте, нужно число увеличить или уменьшить.</p>
          <Link href="/trenazher/edinitsy-izmereniya-4klass" className="mt-5 inline-block rounded-lg border border-white/20 px-5 py-2.5 text-sm font-bold hover:border-orange">Закрепить в тренажёре →</Link>
        </section>
      </div>
    </main>
  );
}
