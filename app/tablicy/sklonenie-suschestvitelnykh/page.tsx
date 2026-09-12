'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import ExportToolbar from '@/components/ExportToolbar';
import { useGeneratorQuota } from '@/lib/useGeneratorQuota';

const DECLENSIONS = [
  {
    number: '1-е',
    rule: 'Ж. и м. род с окончанием -а, -я',
    word: 'весна',
    color: '#be123c', pale: '#fff1f2', border: '#fb7185',
    endings: ['весна (-а)', 'весны (-ы)', 'весне (-е)', 'весну (-у)', 'весной (-ой)', 'о весне (-е)'],
  },
  {
    number: '2-е',
    rule: 'М. род с нулевым окончанием, ср. род на -о, -е',
    word: 'стол',
    color: '#1d4ed8', pale: '#eff6ff', border: '#60a5fa',
    endings: ['стол (—)', 'стола (-а)', 'столу (-у)', 'стол (—)', 'столом (-ом)', 'о столе (-е)'],
  },
  {
    number: '3-е',
    rule: 'Ж. род с нулевым окончанием и ь на конце',
    word: 'ночь',
    color: '#15803d', pale: '#f0fdf4', border: '#4ade80',
    endings: ['ночь (—)', 'ночи (-и)', 'ночи (-и)', 'ночь (—)', 'ночью (-ью)', 'о ночи (-и)'],
  },
];

const CASES = [
  { name: 'Именительный', question: 'кто? что?' },
  { name: 'Родительный', question: 'кого? чего?' },
  { name: 'Дательный', question: 'кому? чему?' },
  { name: 'Винительный', question: 'кого? что?' },
  { name: 'Творительный', question: 'кем? чем?' },
  { name: 'Предложный', question: 'о ком? о чём?' },
];

export default function DeclensionTablePage() {
  const quota = useGeneratorQuota();
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
          <h1 className="text-3xl font-black leading-tight sm:text-4xl">Склонение имён существительных</h1>
          <p className="mt-3 text-white/70 leading-relaxed">
            Три склонения с примером слова, гарантированным родом и окончанием в каждом из шести падежей.
            Помогает не путать «нулевое окончание» с его отсутствием.
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
            <p className="text-sm font-medium text-slate-500">Готовый учебный лист · 3 склонения, 6 падежей</p>
            <ExportToolbar targetRef={printRef} filename="sklonenie-suschestvitelnykh" />
          </div>

          <div ref={printRef} className={`mx-auto rounded-[28px] border-[3px] bg-white p-5 sm:p-8 ${monochrome ? 'border-slate-700 grayscale' : 'border-violet-400'}`}>
            <header className={`mb-5 rounded-2xl px-5 py-4 text-center ${monochrome ? 'border-2 border-slate-700' : 'bg-gradient-to-r from-violet-100 via-fuchsia-50 to-orange-50'}`}>
              <p className={`text-xs font-black uppercase tracking-[0.22em] ${monochrome ? 'text-slate-600' : 'text-violet-600'}`}>Таблица</p>
              <h2 className="mt-1 text-3xl font-black text-slate-900">Склонение имён существительных</h2>
            </header>

            <div className={`mb-5 grid gap-3 sm:grid-cols-3`}>
              {DECLENSIONS.map((d) => (
                <div key={d.number} className="rounded-2xl border-2 p-3 text-center" style={{ backgroundColor: monochrome ? '#fff' : d.pale, borderColor: monochrome ? '#cbd5e1' : d.border }}>
                  <strong className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-sm font-black text-white" style={{ backgroundColor: monochrome ? '#334155' : d.color }}>{d.number}</strong>
                  <p className="mt-2 text-sm font-semibold leading-snug text-slate-600">{d.rule}</p>
                </div>
              ))}
            </div>

            <div className="overflow-x-auto rounded-2xl border-2 border-slate-200">
              <table className="w-full min-w-[540px] border-collapse text-sm">
                <thead>
                  <tr className="bg-[#4C1D95] text-white">
                    <th className="px-3 py-2 text-left text-[11px] font-black uppercase tracking-wide">Падеж</th>
                    {DECLENSIONS.map((d) => (
                      <th key={d.number} className="px-3 py-2 text-left text-[11px] font-black uppercase tracking-wide">{d.number} скл. · «{d.word}»</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {CASES.map((c, i) => (
                    <tr key={c.name} style={{ backgroundColor: monochrome ? (i % 2 ? '#f8fafc' : '#fff') : undefined }}>
                      <td className="border-t-2 border-slate-200 px-3 py-2 font-black text-slate-700">
                        {c.name}
                        <span className="block text-xs font-semibold text-slate-400">{c.question}</span>
                      </td>
                      {DECLENSIONS.map((d) => (
                        <td key={d.number} className="border-t-2 px-3 py-2 font-extrabold" style={{ borderColor: monochrome ? '#e2e8f0' : d.border, color: monochrome ? '#0f172a' : d.color }}>
                          {d.endings[i]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <section className={`mt-5 rounded-2xl border-2 p-4 ${monochrome ? 'border-slate-500' : 'border-violet-200 bg-violet-50'}`}>
              <h3 className={`text-center text-base font-black ${monochrome ? 'text-slate-900' : 'text-violet-800'}`}>Как определить склонение</h3>
              <ol className="mt-3 grid gap-3 text-sm text-slate-700 sm:grid-cols-3">
                <li className="rounded-xl border-2 border-rose-300 bg-rose-50 p-3">
                  <b className="block text-rose-700">1. Начальная форма</b>
                  <span className="mt-1 block font-semibold">Поставь существительное в им. падеж, ед. число.</span>
                </li>
                <li className="rounded-xl border-2 border-amber-300 bg-amber-50 p-3">
                  <b className="block text-amber-700">2. Определи род</b>
                  <span className="mt-1 block font-semibold">Проверь, мужской, женский или средний род у слова.</span>
                </li>
                <li className="rounded-xl border-2 border-sky-300 bg-sky-50 p-3">
                  <b className="block text-sky-700">3. Посмотри на окончание</b>
                  <span className="mt-1 block font-semibold">Сопоставь род и окончание с таблицей выше.</span>
                </li>
              </ol>
              <p className="mt-3 rounded-xl border-2 border-fuchsia-300 bg-gradient-to-r from-violet-50 via-fuchsia-50 to-rose-50 px-4 py-3 text-center text-sm font-semibold text-slate-600">
                <b className="text-slate-800">Важно:</b> есть и особые случаи — разносклоняемые слова на <i>-мя</i> (время, имя) и слово «путь»,
                а также несклоняемые заимствования (пальто, кино, метро), которые не входят ни в одно из трёх склонений.
              </p>
            </section>
            {!quota.isSubscriber && <p className="mt-4 text-center text-[10px] font-semibold tracking-wide text-slate-400">Знаторика · znatorica.ru</p>}
          </div>
        </section>

        <section className="no-print mx-auto mt-8 max-w-3xl rounded-2xl border border-white/15 bg-white/[0.06] p-6">
          <h2 className="text-2xl font-black">Как работать с таблицей</h2>
          <p className="mt-3 leading-relaxed text-white/70">
            Склонение — это не то же самое, что падеж: падеж существительное принимает в предложении,
            а склонение — это постоянный признак, который не меняется. Определи его один раз по начальной
            форме — и дальше используй таблицу, чтобы проверить окончание в любом падеже.
          </p>
          <nav className="mt-5 flex flex-wrap gap-3" aria-label="Материалы по склонению">
            <Link href="/trenazher/sklonenie-4klass" className="btn-primary px-5 py-2.5 text-sm">Тренажёр склонений</Link>
            <Link href="/4-klass/russkiy/sklonenie-suschestvitelnykh" className="rounded-lg border border-white/20 px-5 py-2.5 text-sm font-bold hover:border-orange">Правило и примеры</Link>
            <Link href="/tablicy/padezhi-russkogo-yazyka" className="rounded-lg border border-white/20 px-5 py-2.5 text-sm font-bold hover:border-orange">Таблица падежей</Link>
          </nav>
        </section>
      </div>
    </main>
  );
}
