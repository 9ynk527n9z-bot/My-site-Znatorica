'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import ExportToolbar from '@/components/ExportToolbar';
import { useGeneratorQuota } from '@/lib/useGeneratorQuota';

function PristavkaIcon({ color }: { color: string }) {
  return (
    <svg width="26" height="18" viewBox="0 0 26 18" fill="none" aria-hidden="true">
      <path d="M1 3H25M25 3V13" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function OkonchanieIcon({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="1.5" y="1.5" width="15" height="15" stroke={color} strokeWidth="2.5" />
    </svg>
  );
}

const MORPHS = [
  { name: 'Приставка', symbol: '', meaning: 'стоит перед корнем, образует новые слова', color: '#c2410c', pale: '#fff7ed', border: '#fb923c' },
  { name: 'Корень', symbol: '⌒', meaning: 'общая часть однокоренных слов, главный смысл', color: '#15803d', pale: '#f0fdf4', border: '#4ade80' },
  { name: 'Суффикс', symbol: '⋀', meaning: 'стоит после корня, образует новые слова', color: '#1d4ed8', pale: '#eff6ff', border: '#60a5fa' },
  { name: 'Окончание', symbol: '', meaning: 'изменяемая часть слова, связывает слова в предложении', color: '#6d28d9', pale: '#f5f3ff', border: '#a78bfa' },
];

const EXAMPLE = [
  { part: 'под', type: 'приставка', color: '#c2410c' },
  { part: 'снеж', type: 'корень', color: '#15803d' },
  { part: 'ник', type: 'суффикс', color: '#1d4ed8' },
  { part: '', type: 'окончание', color: '#6d28d9', zero: true },
];

export default function WordCompositionTablePage() {
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
            📚 Русский язык · 2–3 класс
          </div>
          <h1 className="text-3xl font-black leading-tight sm:text-4xl">Разбор слова по составу</h1>
          <p className="mt-3 text-lg text-white/70 leading-relaxed">
            Приставка, корень, суффикс, окончание — условные значки и пример полного разбора слова.
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
            <ExportToolbar targetRef={printRef} filename="razbor-slova-po-sostavu" />
          </div>

          <div
            ref={printRef}
            className={`mx-auto rounded-[28px] border-[3px] bg-white p-5 sm:p-8 ${monochrome ? 'border-slate-700 grayscale' : 'border-violet-400'}`}
          >
            <header className={`mb-5 rounded-2xl px-5 py-4 text-center ${monochrome ? 'border-2 border-slate-700' : 'bg-gradient-to-r from-violet-100 via-fuchsia-50 to-orange-50'}`}>
              <p className={`text-xs font-black uppercase tracking-[0.22em] ${monochrome ? 'text-slate-600' : 'text-violet-600'}`}>Таблица</p>
              <h2 className="mt-1 text-3xl font-black text-slate-900">Разбор слова по составу</h2>
            </header>

            <div className="grid gap-3 sm:grid-cols-2">
              {MORPHS.map((m) => (
                <section
                  key={m.name}
                  className="flex items-start gap-3 rounded-2xl border-2 p-4"
                  style={{ backgroundColor: monochrome ? '#fff' : m.pale, borderColor: monochrome ? '#64748b' : m.border }}
                >
                  <span className="flex h-8 w-8 items-center justify-center text-2xl font-black" style={{ color: monochrome ? '#0f172a' : m.color }}>
                    {m.name === 'Приставка' && <PristavkaIcon color={monochrome ? '#0f172a' : m.color} />}
                    {m.name === 'Окончание' && <OkonchanieIcon color={monochrome ? '#0f172a' : m.color} />}
                    {m.name !== 'Приставка' && m.name !== 'Окончание' && m.symbol}
                  </span>
                  <div>
                    <h3 className="text-base font-black text-slate-900">{m.name}</h3>
                    <p className="mt-1 text-xs font-semibold text-slate-600">{m.meaning}</p>
                  </div>
                </section>
              ))}
            </div>

            <section className={`mt-5 rounded-2xl border-2 p-5 text-center ${monochrome ? 'border-slate-500' : 'border-violet-200 bg-violet-50'}`}>
              <h3 className="mb-3 text-sm font-black uppercase tracking-wide text-slate-500">Пример полного разбора</h3>
              <div className="flex flex-wrap items-end justify-center gap-3.5">
                {EXAMPLE.map((p, i) => (
                  <div key={i} className="flex flex-col items-center gap-3">
                    <span className="flex h-5 w-[30px] items-center justify-center text-lg font-black leading-none" style={{ color: monochrome ? '#0f172a' : p.color }}>
                      {p.type === 'приставка' && <PristavkaIcon color={monochrome ? '#0f172a' : p.color} />}
                      {p.type === 'корень' && '⌒'}
                      {p.type === 'суффикс' && '⋀'}
                      {p.type === 'окончание' && <OkonchanieIcon color={monochrome ? '#0f172a' : p.color} />}
                    </span>
                    {!p.zero && (
                      <span
                        className="rounded-lg px-3 py-2 text-2xl font-black"
                        style={{
                          color: monochrome ? '#0f172a' : p.color,
                          backgroundColor: monochrome ? '#f1f5f9' : `${p.color}14`,
                        }}
                      >
                        {p.part}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {!quota.isSubscriber && (
              <p className="mt-4 text-center text-[10px] font-semibold tracking-wide text-slate-400">Знаторика · znatorica.ru</p>
            )}
          </div>
        </section>

        <section className="no-print mx-auto mt-8 max-w-3xl rounded-2xl border border-white/15 bg-white/[0.06] p-6">
          <h2 className="text-2xl font-black">Как разбирать слово по составу</h2>
          <p className="mt-3 leading-relaxed text-white/70">
            Начинай с окончания: измени слово по числам или падежам и посмотри, какая часть меняется — это и есть окончание.
            Дальше найди корень через однокоренные слова, а оставшиеся части перед корнем и после него — приставка и суффикс.
          </p>
          <nav className="mt-5 flex flex-wrap gap-3" aria-label="Материалы по разбору слова по составу">
            <Link href="/trenazher/razbor-sostav-3klass" className="btn-primary px-5 py-2.5 text-sm">
              Тренажёр «Разбор слова по составу»
            </Link>
          </nav>
        </section>
      </div>
    </main>
  );
}
