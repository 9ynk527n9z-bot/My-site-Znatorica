'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import ExportToolbar from '@/components/ExportToolbar';
import { useGeneratorQuota } from '@/lib/useGeneratorQuota';

const MAIN = [
  { name: 'Подлежащее', questions: 'кто? что?', underline: 'одна прямая черта', symbol: '───', color: '#1d4ed8', pale: '#eff6ff', border: '#60a5fa' },
  { name: 'Сказуемое', questions: 'что делает? что делал? каков?', underline: 'две прямые черты', symbol: '═══', color: '#be123c', pale: '#fff1f2', border: '#fb7185' },
];

const SECONDARY = [
  { name: 'Дополнение', questions: 'вопросы косвенных падежей: кого? чего? кому? чем? о ком?', underline: 'пунктир', symbol: '- - -', color: '#15803d', pale: '#f0fdf4', border: '#4ade80' },
  { name: 'Определение', questions: 'какой? какая? чей?', underline: 'волнистая линия', symbol: '〰〰〰', color: '#c2410c', pale: '#fff7ed', border: '#fb923c' },
  { name: 'Обстоятельство', questions: 'где? когда? как? куда? почему?', underline: 'штрихпунктир', symbol: '_ · _ ·', color: '#6d28d9', pale: '#f5f3ff', border: '#a78bfa' },
];

export default function SentenceMembersTablePage() {
  const quota = useGeneratorQuota();
  const [monochrome, setMonochrome] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  return (
    <main className="min-h-screen px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link href="/tablicy" className="no-print mb-4 inline-block text-sm text-orange hover:underline">
          ← Все таблицы
        </Link>

        <header className="no-print mt-4 mb-8 max-w-3xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold text-violet-100">
            📚 Русский язык · 3–4 класс
          </div>
          <h1 className="text-3xl font-black leading-tight sm:text-4xl">Члены предложения</h1>
          <p className="mt-3 text-white/70 leading-relaxed">
            Главные и второстепенные члены предложения: вопросы и условное подчёркивание при разборе.
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
            <ExportToolbar targetRef={printRef} filename="chleny-predlozheniya" />
          </div>

          <div
            ref={printRef}
            className={`mx-auto rounded-[28px] border-[3px] bg-white p-5 sm:p-8 ${monochrome ? 'border-slate-700 grayscale' : 'border-violet-400'}`}
          >
            <header className={`mb-5 rounded-2xl px-5 py-4 text-center ${monochrome ? 'border-2 border-slate-700' : 'bg-gradient-to-r from-violet-100 via-fuchsia-50 to-orange-50'}`}>
              <p className={`text-xs font-black uppercase tracking-[0.22em] ${monochrome ? 'text-slate-600' : 'text-violet-600'}`}>Таблица</p>
              <h2 className="mt-1 text-3xl font-black text-slate-900">Члены предложения</h2>
            </header>

            <h3 className="mb-2 text-sm font-black uppercase tracking-wide text-slate-500">Главные члены</h3>
            <div className="mb-4 grid gap-3 sm:grid-cols-2">
              {MAIN.map((item) => (
                <section
                  key={item.name}
                  className="rounded-2xl border-2 p-4"
                  style={{ backgroundColor: monochrome ? '#fff' : item.pale, borderColor: monochrome ? '#64748b' : item.border }}
                >
                  <h4 className="text-lg font-black" style={{ color: monochrome ? '#0f172a' : item.color }}>{item.name}</h4>
                  <p className="mt-1 text-sm font-bold text-slate-700">{item.questions}</p>
                  <p className="mt-2 text-xs font-semibold text-slate-500">Подчёркивание: {item.underline}</p>
                  <p className="mt-1 font-mono text-base font-black" style={{ color: monochrome ? '#0f172a' : item.color }}>{item.symbol}</p>
                </section>
              ))}
            </div>

            <h3 className="mb-2 text-sm font-black uppercase tracking-wide text-slate-500">Второстепенные члены</h3>
            <div className="grid gap-3 sm:grid-cols-3">
              {SECONDARY.map((item) => (
                <section
                  key={item.name}
                  className="rounded-2xl border-2 p-4"
                  style={{ backgroundColor: monochrome ? '#fff' : item.pale, borderColor: monochrome ? '#64748b' : item.border }}
                >
                  <h4 className="text-base font-black" style={{ color: monochrome ? '#0f172a' : item.color }}>{item.name}</h4>
                  <p className="mt-1 text-xs font-bold text-slate-700">{item.questions}</p>
                  <p className="mt-2 text-xs font-semibold text-slate-500">Подчёркивание: {item.underline}</p>
                  <p className="mt-1 font-mono text-sm font-black" style={{ color: monochrome ? '#0f172a' : item.color }}>{item.symbol}</p>
                </section>
              ))}
            </div>

            <p className="mt-4 text-xs font-semibold text-slate-500">
              Подлежащее и сказуемое — главные члены, всё остальное — второстепенные, они поясняют главные.
            </p>

            {!quota.isSubscriber && (
              <p className="mt-4 text-center text-[10px] font-semibold tracking-wide text-slate-400">Знаторика · znatorica.ru</p>
            )}
          </div>
        </section>

        <section className="no-print mx-auto mt-8 max-w-3xl rounded-2xl border border-white/15 bg-white/[0.06] p-6">
          <h2 className="text-2xl font-black">Как пользоваться таблицей</h2>
          <p className="mt-3 leading-relaxed text-white/70">
            Сначала найди подлежащее и сказуемое — это основа предложения. Затем к каждому слову задавай вопрос
            от главного члена и определяй, каким второстепенным членом оно является.
          </p>
          <nav className="mt-5 flex flex-wrap gap-3" aria-label="Материалы по членам предложения">
            <Link href="/trenazher/sintaksis-4klass" className="btn-primary px-5 py-2.5 text-sm">
              Тренажёр «Члены предложения»
            </Link>
            <Link href="/4-klass/russkiy/sintaksis" className="rounded-lg border border-white/20 px-5 py-2.5 text-sm font-bold hover:border-orange">
              Теория
            </Link>
          </nav>
        </section>
      </div>
    </main>
  );
}
