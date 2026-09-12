'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import ExportToolbar from '@/components/ExportToolbar';

const PARTS = [
  { name: 'Имя существительное', meaning: 'называет предмет', questions: 'кто? что?', examples: 'ученик, книга', color: '#be123c', pale: '#fff1f2', border: '#fb7185' },
  { name: 'Имя прилагательное', meaning: 'называет признак предмета', questions: 'какой? какая? какое? чей?', examples: 'добрый, яркая', color: '#c2410c', pale: '#fff7ed', border: '#fb923c' },
  { name: 'Глагол', meaning: 'называет действие или состояние', questions: 'что делать? что сделать?', examples: 'читать, решить', color: '#15803d', pale: '#f0fdf4', border: '#4ade80' },
  { name: 'Местоимение', meaning: 'указывает на предмет, но не называет его', questions: 'кто? что?', examples: 'я, ты, он, мы', color: '#0e7490', pale: '#ecfeff', border: '#22d3ee' },
  { name: 'Наречие', meaning: 'поясняет действие или признак', questions: 'как? где? когда? куда?', examples: 'быстро, рядом', color: '#1d4ed8', pale: '#eff6ff', border: '#60a5fa' },
  { name: 'Имя числительное', meaning: 'называет количество или порядок', questions: 'сколько? который?', examples: 'пять, третий', color: '#6d28d9', pale: '#f5f3ff', border: '#a78bfa' },
  { name: 'Предлог', meaning: 'связывает слова в словосочетании', questions: 'вопрос не задаётся', examples: 'в, на, под, около', color: '#a21caf', pale: '#fdf4ff', border: '#e879f9' },
];

export default function PartsOfSpeechTablePage() {
  const [monochrome, setMonochrome] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  return (
    <main className="min-h-screen px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link href="/generator" className="no-print text-sm text-orange hover:underline">← Все материалы</Link>

        <header className="no-print mt-4 mb-8 max-w-3xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold text-violet-100">
            📝 Русский язык · 2–4 класс
          </div>
          <h1 className="text-3xl font-black leading-tight sm:text-4xl">Части речи</h1>
          <p className="mt-3 text-white/70 leading-relaxed">
            Наглядная таблица самостоятельных и служебной частей речи: что они обозначают, на какие вопросы отвечают
            и как выглядят в предложении.
          </p>
        </header>

        <section className="no-print card mb-6 flex flex-wrap items-center justify-between gap-4 !p-4 sm:!p-5">
          <div>
            <p className="font-extrabold">Оформление таблицы</p>
            <p className="text-sm text-white/55">Цвета помогают различать части речи</p>
          </div>
          <div className="flex rounded-xl border border-white/15 bg-black/20 p-1">
            <button type="button" onClick={() => setMonochrome(false)} className={`rounded-lg px-4 py-2 text-sm font-bold ${!monochrome ? 'bg-orange text-white' : 'text-white/60'}`}>🌈 Цветная</button>
            <button type="button" onClick={() => setMonochrome(true)} className={`rounded-lg px-4 py-2 text-sm font-bold ${monochrome ? 'bg-white text-slate-900' : 'text-white/60'}`}>◻ Чёрно-белая</button>
          </div>
        </section>

        <section className="card print-page bg-white !p-4 text-slate-900 sm:!p-6">
          <div className="no-print mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-medium text-slate-500">Готовый учебный лист · 7 частей речи</p>
            <ExportToolbar targetRef={printRef} filename="chasti-rechi" />
          </div>

          <div ref={printRef} className={`mx-auto rounded-[28px] border-[3px] bg-white p-5 sm:p-8 ${monochrome ? 'border-slate-700 grayscale' : 'border-violet-400'}`}>
            <header className={`mb-5 rounded-2xl px-5 py-4 text-center ${monochrome ? 'border-2 border-slate-700' : 'bg-gradient-to-r from-violet-100 via-fuchsia-50 to-orange-50'}`}>
              <p className={`text-xs font-black uppercase tracking-[0.22em] ${monochrome ? 'text-slate-600' : 'text-violet-600'}`}>Таблица</p>
              <h2 className="mt-1 text-3xl font-black text-slate-900">Части речи</h2>
            </header>

            <div className="overflow-hidden rounded-2xl border-2 border-violet-200">
              <div className="hidden grid-cols-[1.25fr_1.45fr_1.35fr_0.9fr] gap-3 bg-[#4C1D95] px-4 py-2 text-[10px] font-black uppercase tracking-wide text-white sm:grid">
                <span>Часть речи</span><span>Что обозначает</span><span>Вопросы</span><span>Примеры</span>
              </div>
              {PARTS.map((part, index) => (
                <section
                  key={part.name}
                  className="grid gap-2 border-b-2 px-4 py-3 last:border-b-0 sm:grid-cols-[1.25fr_1.45fr_1.35fr_0.9fr] sm:items-center"
                  style={{ backgroundColor: monochrome ? (index % 2 ? '#f8fafc' : '#fff') : part.pale, borderColor: monochrome ? '#cbd5e1' : part.border }}
                >
                  <h3 className="text-sm font-black" style={{ color: monochrome ? '#0f172a' : part.color }}>{part.name}</h3>
                  <p className="text-sm font-semibold text-slate-700"><span className="mr-2 text-xs font-bold text-slate-400 sm:hidden">Значение:</span>{part.meaning}</p>
                  <p className="text-sm font-extrabold text-slate-800"><span className="mr-2 text-xs font-bold text-slate-400 sm:hidden">Вопросы:</span>{part.questions}</p>
                  <p className="text-sm font-black" style={{ color: monochrome ? '#0f172a' : part.color }}><span className="mr-2 text-xs font-bold text-slate-400 sm:hidden">Примеры:</span>{part.examples}</p>
                </section>
              ))}
            </div>

            <section id="primer" className={`mt-5 scroll-mt-28 rounded-2xl border-2 p-4 ${monochrome ? 'border-slate-500' : 'border-violet-200 bg-violet-50'}`}>
              <h3 className={`text-center text-base font-black ${monochrome ? 'text-slate-900' : 'text-violet-800'}`}>Найди части речи в предложении</h3>
              <div className="mt-3 rounded-xl border-2 border-cyan-200 bg-white px-4 py-3">
                <div className="flex flex-wrap items-end justify-center gap-x-3 gap-y-2">
                  {[
                    ['Три', 'числ.'],
                    ['весёлых', 'прил.'],
                    ['щенка', 'сущ.'],
                    ['быстро', 'нареч.'],
                    ['бегут', 'глаг.'],
                    ['по', 'предл.'],
                    ['двору.', 'сущ.'],
                  ].map(([word, label]) => (
                    <span key={word} className="text-center">
                      <small className="block text-[10px] font-black uppercase tracking-wide text-green-700">{label}</small>
                      <b className="block text-base font-black text-slate-950">{word}</b>
                    </span>
                  ))}
                </div>
                <div className="mt-3 flex items-end justify-center gap-3 border-t border-cyan-100 pt-3">
                  <span className="text-center"><small className="block text-[10px] font-black uppercase text-green-700">мест.</small><b className="block text-base font-black text-slate-950">Они</b></span>
                  <span className="text-center"><small className="block text-[10px] font-black uppercase text-green-700">глаг.</small><b className="block text-base font-black text-slate-950">играют.</b></span>
                </div>
              </div>
            </section>
          </div>
        </section>

        <section className="no-print mx-auto mt-8 max-w-3xl rounded-2xl border border-white/15 bg-white/[0.06] p-6">
          <h2 className="text-2xl font-black">Как определить часть речи</h2>
          <ol className="mt-4 grid gap-3 sm:grid-cols-3">
            <li className="rounded-xl border border-rose-300/50 bg-rose-400/10 p-4">
              <b className="text-rose-200">1. Определи значение</b>
              <p className="mt-1 text-sm leading-relaxed text-white/70">Что слово называет или для чего служит?</p>
            </li>
            <li className="rounded-xl border border-amber-300/50 bg-amber-400/10 p-4">
              <b className="text-amber-200">2. Задай вопрос</b>
              <p className="mt-1 text-sm leading-relaxed text-white/70">К самостоятельной части речи можно задать вопрос. К служебной — нельзя.</p>
            </li>
            <li className="rounded-xl border border-sky-300/50 bg-sky-400/10 p-4">
              <b className="text-sky-200">3. Проверь признаки</b>
              <p className="mt-1 text-sm leading-relaxed text-white/70">Посмотри, как слово изменяется и какую роль выполняет в предложении.</p>
            </li>
          </ol>
          <nav className="mt-5 flex flex-wrap gap-3" aria-label="Материалы по частям речи">
            <Link href="/trenazher/chasti-rechi-4klass" className="btn-primary px-5 py-2.5 text-sm">Тренажёр для 4 класса</Link>
            <Link href="/trenazher/chasti-rechi" className="rounded-lg border border-white/20 px-5 py-2.5 text-sm font-bold hover:border-orange">Тренажёр для 2 класса</Link>
          </nav>
        </section>
      </div>
    </main>
  );
}
