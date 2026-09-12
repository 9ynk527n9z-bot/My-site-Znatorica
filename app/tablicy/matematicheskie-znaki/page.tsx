'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import ExportToolbar from '@/components/ExportToolbar';
import { useGeneratorQuota } from '@/lib/useGeneratorQuota';

const ACTIONS = [
  { sign: '+', name: 'Сложение', example: '7 + 3 = 10', parts: 'слагаемое + слагаемое = сумма', color: '#1d4ed8', pale: '#eff6ff', border: '#60a5fa' },
  { sign: '−', name: 'Вычитание', example: '10 − 4 = 6', parts: 'уменьшаемое − вычитаемое = разность', color: '#be123c', pale: '#fff1f2', border: '#fb7185' },
  { sign: '×', name: 'Умножение', example: '4 × 3 = 12', parts: 'множитель × множитель = произведение', color: '#15803d', pale: '#f0fdf4', border: '#4ade80' },
  { sign: ':', name: 'Деление', example: '12 : 3 = 4', parts: 'делимое : делитель = частное', color: '#6d28d9', pale: '#f5f3ff', border: '#a78bfa' },
];

export default function MathSignsPage() {
  const [monochrome, setMonochrome] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);
  const quota = useGeneratorQuota();

  return (
    <main className="min-h-screen px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link href="/tablicy" className="no-print mb-4 inline-block text-sm text-orange hover:underline">← Все таблицы</Link>
        <header className="no-print mx-auto mb-7 max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-violet-200">🧮 Математика · 1–4 класс</p>
          <h1 className="mt-2 text-[26px] font-black sm:text-[44px]">Математические знаки</h1>
          <p className="mt-3 text-white/70">Действия, названия компонентов, сравнение и порядок вычислений.</p>
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
            <ExportToolbar targetRef={printRef} filename="matematicheskie-znaki" />
          </div>

          <div ref={printRef} className={`mx-auto rounded-[28px] border-[3px] bg-white p-5 sm:p-8 ${monochrome ? 'border-slate-700 grayscale' : 'border-violet-400'}`}>
            <header className={`mb-5 rounded-2xl border-2 px-4 py-3 text-center ${monochrome ? 'border-slate-600 bg-slate-100' : 'border-violet-300 bg-violet-100'}`}>
              <h2 className="text-3xl font-black sm:text-4xl" style={{ color: monochrome ? '#0f172a' : '#4c1d95' }}>Математические знаки</h2>
            </header>

            <div className="grid gap-3 sm:grid-cols-2">
              {ACTIONS.map((action) => (
                <section key={action.name} className="rounded-2xl border-2 p-5 text-center" style={{ backgroundColor: monochrome ? '#fff' : action.pale, borderColor: monochrome ? '#64748b' : action.border }}>
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-5xl font-black" style={{ color: monochrome ? '#0f172a' : action.color }}>{action.sign}</span>
                    <h3 className="text-2xl font-black" style={{ color: monochrome ? '#0f172a' : action.color }}>{action.name}</h3>
                  </div>
                  <p className="mt-3 text-2xl font-black">{action.example}</p>
                  <p className="mt-2 text-base font-bold text-slate-700">{action.parts}</p>
                </section>
              ))}
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <section className={`rounded-2xl border-2 p-4 text-center ${monochrome ? 'border-slate-500' : 'border-amber-300 bg-amber-50'}`}>
                <h3 className="text-xl font-black text-slate-900">Знаки сравнения</h3>
                <p className="mt-2 text-2xl font-black">8 &gt; 5 <span className="mx-2 text-slate-400">•</span> 3 &lt; 7 <span className="mx-2 text-slate-400">•</span> 6 = 6</p>
                <p className="mt-2 text-base font-bold text-slate-700">больше <span className="mx-2">•</span> меньше <span className="mx-2">•</span> равно</p>
              </section>
              <section className={`rounded-2xl border-2 p-4 ${monochrome ? 'border-slate-500' : 'border-cyan-300 bg-cyan-50'}`}>
                <h3 className="text-center text-xl font-black text-slate-900">Порядок действий</h3>
                <ol className="mt-2 space-y-1 text-base font-bold text-slate-700">
                  <li><b>1.</b> Действия в скобках.</li>
                  <li><b>2.</b> Умножение и деление слева направо.</li>
                  <li><b>3.</b> Сложение и вычитание слева направо.</li>
                </ol>
                <p className="mt-2 text-center text-lg font-black">18 − (2 + 4) : 2 = 15</p>
              </section>
            </div>

            {!quota.isSubscriber && <p className="mt-4 text-center text-[10px] font-semibold tracking-wide text-slate-400">Знаторика · znatorica.ru</p>}
          </div>
        </section>
      </div>
    </main>
  );
}
