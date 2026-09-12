'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import ExportToolbar from '@/components/ExportToolbar';
import { useGeneratorQuota } from '@/lib/useGeneratorQuota';

const SYNONYMS = [
  ['смелый', 'храбрый'],
  ['грустный', 'печальный'],
  ['быстрый', 'стремительный'],
  ['большой', 'огромный'],
  ['красивый', 'прекрасный'],
  ['умный', 'сообразительный'],
  ['весёлый', 'радостный'],
  ['маленький', 'крошечный'],
  ['говорить', 'сказать'],
  ['идти', 'шагать'],
];

const ANTONYMS = [
  ['большой', 'маленький'],
  ['день', 'ночь'],
  ['горячий', 'холодный'],
  ['добрый', 'злой'],
  ['высокий', 'низкий'],
  ['быстро', 'медленно'],
  ['смеяться', 'плакать'],
  ['друг', 'враг'],
  ['начало', 'конец'],
  ['тяжёлый', 'лёгкий'],
];

export default function SynonymsAntonymsTablePage() {
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
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-base font-bold text-violet-100">
            📝 Русский язык · 2–4 класс
          </div>
          <h1 className="text-2xl font-black leading-tight sm:text-3xl">Синонимы и антонимы</h1>
          <p className="mt-3 text-xl text-white/70 leading-relaxed">
            По 10 пар слов — близких по значению и противоположных по значению.
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
            <p className="text-sm font-medium text-slate-500">Готовый учебный лист · 20 пар слов</p>
            <ExportToolbar targetRef={printRef} filename="sinonimy-i-antonimy" />
          </div>

          <div
            ref={printRef}
            className={`mx-auto rounded-[28px] border-[3px] bg-white p-5 sm:p-8 ${monochrome ? 'border-slate-700 grayscale' : 'border-violet-400'}`}
          >
            <header className={`mb-5 rounded-2xl px-5 py-4 text-center ${monochrome ? 'border-2 border-slate-700' : 'bg-gradient-to-r from-violet-100 via-fuchsia-50 to-orange-50'}`}>
              <p className={`text-[23px] font-black uppercase tracking-[0.22em] ${monochrome ? 'text-slate-600' : 'text-violet-600'}`}>Таблица</p>
              <h2 className="mt-1 text-3xl font-black text-slate-900">Синонимы и антонимы</h2>
            </header>

            <div className={`mb-5 rounded-2xl border-2 p-4 text-center ${monochrome ? 'border-slate-500' : 'border-fuchsia-300 bg-gradient-to-r from-green-50 via-fuchsia-50 to-rose-50'}`}>
              <p className="text-base font-semibold text-slate-700">
                <b className={monochrome ? 'text-slate-900' : 'text-green-700'}>Синонимы</b> — слова одной и той же части речи, которые звучат и пишутся по-разному, но одинаковы или близки по значению
              </p>
              <p className="mt-1 text-base font-semibold text-slate-700">
                <b className={monochrome ? 'text-slate-900' : 'text-rose-700'}>Антонимы</b> — слова одной и той же части речи, имеющие противоположное лексическое значение
              </p>
            </div>

            <div className="grid items-stretch gap-3 sm:grid-cols-2">
              <div className="flex h-full flex-col rounded-2xl border-2 p-3" style={{ backgroundColor: monochrome ? '#fff' : '#f0fdf4', borderColor: monochrome ? '#64748b' : '#86efac' }}>
                <p
                  className="mb-3 rounded-xl px-3 py-2 text-center text-[21px] font-black uppercase tracking-wide text-white"
                  style={{ backgroundColor: monochrome ? '#334155' : '#15803d' }}
                >
                  🤝 Синонимы
                </p>
                <div className="flex flex-1 flex-col gap-2">
                  {SYNONYMS.map(([a, b]) => (
                    <div key={a} className="flex items-center justify-between rounded-xl bg-white/70 px-3 py-2 text-center">
                      <span className="flex-1 text-[17px] font-bold text-slate-800">{a}</span>
                      <span className="mx-2 text-[15px] font-semibold text-slate-400">=</span>
                      <span className="flex-1 text-[17px] font-bold text-slate-800">{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex h-full flex-col rounded-2xl border-2 p-3" style={{ backgroundColor: monochrome ? '#fff' : '#fff1f2', borderColor: monochrome ? '#64748b' : '#fda4af' }}>
                <p
                  className="mb-3 rounded-xl px-3 py-2 text-center text-[21px] font-black uppercase tracking-wide text-white"
                  style={{ backgroundColor: monochrome ? '#334155' : '#be123c' }}
                >
                  ⚡ Антонимы
                </p>
                <div className="flex flex-1 flex-col gap-2">
                  {ANTONYMS.map(([a, b]) => (
                    <div key={a} className="flex items-center justify-between rounded-xl bg-white/70 px-3 py-2 text-center">
                      <span className="flex-1 text-[17px] font-bold text-slate-800">{a}</span>
                      <span className="mx-2 text-[15px] font-semibold text-slate-400">↔</span>
                      <span className="flex-1 text-[17px] font-bold text-slate-800">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {!quota.isSubscriber && (
              <p className="mt-4 text-center text-[10px] font-semibold tracking-wide text-slate-400">Знаторика · znatorica.ru</p>
            )}
          </div>
        </section>

        <section className="no-print mx-auto mt-8 max-w-3xl rounded-2xl border border-white/15 bg-white/[0.06] p-6">
          <h2 className="text-2xl font-black">Как работать с таблицей</h2>
          <p className="mt-3 leading-relaxed text-white/70">
            Синонимы — слова разные по звучанию, но близкие по значению: ими можно заменить друг друга
            в предложении почти без потери смысла. Антонимы — слова с противоположным значением.
            Попробуй придумать своё предложение с каждой парой слов.
          </p>
        </section>
      </div>
    </main>
  );
}
