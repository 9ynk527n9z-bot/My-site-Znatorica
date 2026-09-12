'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import ExportToolbar from '@/components/ExportToolbar';

const CASES = [
  { short: 'И. п.', name: 'Именительный', questions: 'кто? что?', prepositions: '—', example: 'книга', color: '#be123c', pale: '#fff1f2', border: '#fb7185' },
  { short: 'Р. п.', name: 'Родительный', questions: 'кого? чего?', prepositions: 'без, у, до, от, из, с, около', example: 'книги', color: '#c2410c', pale: '#fff7ed', border: '#fb923c' },
  { short: 'Д. п.', name: 'Дательный', questions: 'кому? чему?', prepositions: 'к, по', example: 'книге', color: '#a16207', pale: '#fefce8', border: '#facc15' },
  { short: 'В. п.', name: 'Винительный', questions: 'кого? что?', prepositions: 'в, на, за, про, через', example: 'книгу', color: '#15803d', pale: '#f0fdf4', border: '#4ade80' },
  { short: 'Т. п.', name: 'Творительный', questions: 'кем? чем?', prepositions: 'с, за, над, под, перед, между', example: 'книгой', color: '#1d4ed8', pale: '#eff6ff', border: '#60a5fa' },
  { short: 'П. п.', name: 'Предложный', questions: 'о ком? о чём?', prepositions: 'о, об, в, на, при', example: 'о книге', color: '#6d28d9', pale: '#f5f3ff', border: '#a78bfa' },
];

export default function CasesTablePage() {
  const [monochrome, setMonochrome] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  return (
    <main className="min-h-screen px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link href="/generator" className="no-print text-sm text-orange hover:underline">← Все материалы</Link>

        <header className="no-print mt-4 mb-8 max-w-3xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold text-violet-100">
            📚 Русский язык · 3–4 класс
          </div>
          <h1 className="text-3xl font-black leading-tight sm:text-4xl">Падежи русского языка</h1>
          <p className="mt-3 text-white/70 leading-relaxed">
            Готовая таблица шести падежей: вопросы, характерные предлоги и пример склонения.
            Подходит для повторения правила и самостоятельной проверки.
          </p>
        </header>

        <section className="no-print card mb-6 flex flex-wrap items-center justify-between gap-4 !p-4 sm:!p-5">
          <div>
            <p className="font-extrabold">Оформление таблицы</p>
            <p className="text-sm text-white/55">Выбери цветной лист или экономный вариант для принтера</p>
          </div>
          <div className="flex rounded-xl border border-white/15 bg-black/20 p-1">
            <button type="button" onClick={() => setMonochrome(false)} className={`rounded-lg px-4 py-2 text-sm font-bold ${!monochrome ? 'bg-orange text-white' : 'text-white/60'}`}>🌈 Цветная</button>
            <button type="button" onClick={() => setMonochrome(true)} className={`rounded-lg px-4 py-2 text-sm font-bold ${monochrome ? 'bg-white text-slate-900' : 'text-white/60'}`}>◻ Чёрно-белая</button>
          </div>
        </section>

        <section className="card print-page bg-white !p-4 text-slate-900 sm:!p-6">
          <div className="no-print mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-medium text-slate-500">Готовый учебный лист · 6 падежей</p>
            <ExportToolbar targetRef={printRef} filename="padezhi-russkogo-yazyka" />
          </div>

          <div ref={printRef} className={`mx-auto rounded-[28px] border-[3px] bg-white p-5 sm:p-8 ${monochrome ? 'border-slate-700 grayscale' : 'border-violet-400'}`}>
            <header className={`mb-5 rounded-2xl px-5 py-4 text-center ${monochrome ? 'border-2 border-slate-700' : 'bg-gradient-to-r from-violet-100 via-fuchsia-50 to-orange-50'}`}>
              <p className={`text-xs font-black uppercase tracking-[0.22em] ${monochrome ? 'text-slate-600' : 'text-violet-600'}`}>Таблица</p>
              <h2 className="mt-1 text-3xl font-black text-slate-900">Падежи русского языка</h2>
            </header>

            <div className="overflow-hidden rounded-2xl border-2 border-slate-200">
              <div className="hidden grid-cols-[1.5fr_0.9fr_1.55fr_0.75fr] gap-3 bg-[#4C1D95] px-4 py-2 text-[10px] font-black uppercase tracking-wide text-white sm:grid">
                <span>Падеж</span><span>Вопросы</span><span>Предлоги</span><span>Пример</span>
              </div>
              {CASES.map((item, index) => (
                <section
                  key={item.short}
                  className="grid gap-3 border-b-2 px-4 py-3 last:border-b-0 sm:grid-cols-[1.5fr_0.9fr_1.55fr_0.75fr] sm:items-center"
                  style={{ backgroundColor: monochrome ? (index % 2 ? '#f8fafc' : '#fff') : item.pale, borderColor: monochrome ? '#cbd5e1' : item.border }}
                >
                  <div className="flex items-center gap-2">
                    <strong className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-black text-white" style={{ backgroundColor: monochrome ? '#334155' : item.color }}>{item.short}</strong>
                    <h3 className="text-sm font-black text-slate-900">{item.name}</h3>
                  </div>
                  <p className="text-sm font-extrabold text-slate-800"><span className="mr-2 text-xs font-bold text-slate-400 sm:hidden">Вопросы:</span>{item.questions}</p>
                  <p className="text-sm font-semibold text-slate-600"><span className="mr-2 text-xs font-bold text-slate-400 sm:hidden">Предлоги:</span>{item.prepositions}</p>
                  <p className="font-black" style={{ color: monochrome ? '#0f172a' : item.color }}><span className="mr-2 text-xs font-bold text-slate-400 sm:hidden">Пример:</span>{item.example}</p>
                </section>
              ))}
            </div>

            <section className={`mt-5 rounded-2xl border-2 p-4 ${monochrome ? 'border-slate-500' : 'border-violet-200 bg-violet-50'}`}>
              <h3 className={`text-center text-base font-black ${monochrome ? 'text-slate-900' : 'text-violet-800'}`}>Как определить падеж</h3>
              <ol className="mt-3 grid gap-3 text-sm text-slate-700 sm:grid-cols-3">
                <li className="rounded-xl border-2 border-rose-300 bg-rose-50 p-3">
                  <b className="block text-rose-700">1. Найди существительное</b>
                  <span className="mt-1 block font-semibold">Выдели существительное, падеж которого нужно определить.</span>
                </li>
                <li className="rounded-xl border-2 border-amber-300 bg-amber-50 p-3">
                  <b className="block text-amber-700">2. Задай вопрос</b>
                  <span className="mt-1 block font-semibold">Найди слово, от которого зависит существительное, и задай вопрос.</span>
                </li>
                <li className="rounded-xl border-2 border-sky-300 bg-sky-50 p-3">
                  <b className="block text-sky-700">3. Определи падеж</b>
                  <span className="mt-1 block font-semibold">Сопоставь вопрос с таблицей. Предлог используй как подсказку.</span>
                </li>
              </ol>
              <p className="mt-3 rounded-xl border-2 border-fuchsia-300 bg-gradient-to-r from-violet-50 via-fuchsia-50 to-rose-50 px-4 py-3 text-center text-sm font-semibold text-slate-600">
                <b className="text-slate-800">Кот увидел мышь:</b> кот — И. п. (<i>кто увидел?</i>), мышь — В. п. (<i>увидел кого?</i>).
              </p>
            </section>
          </div>
        </section>

        <section className="no-print mx-auto mt-8 max-w-3xl rounded-2xl border border-white/15 bg-white/[0.06] p-6">
          <h2 className="text-2xl font-black">Как работать с таблицей</h2>
          <p className="mt-3 leading-relaxed text-white/70">
            Определяй падеж по вопросу и связи слов в предложении. Предлог может помочь, но один и тот же предлог
            употребляется с разными падежами, поэтому ориентироваться только на него нельзя.
          </p>
          <nav className="mt-5 flex flex-wrap gap-3" aria-label="Материалы по падежам">
            <Link href="/trenazher/sklonenie-4klass" className="btn-primary px-5 py-2.5 text-sm">Тренажёр склонений</Link>
            <Link href="/4-klass/russkiy/sklonenie-suschestvitelnykh" className="rounded-lg border border-white/20 px-5 py-2.5 text-sm font-bold hover:border-orange">Правило и примеры</Link>
          </nav>
        </section>
      </div>
    </main>
  );
}
