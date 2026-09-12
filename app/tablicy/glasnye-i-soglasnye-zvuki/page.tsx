'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import ExportToolbar from '@/components/ExportToolbar';
import { useGeneratorQuota } from '@/lib/useGeneratorQuota';

const VOWELS = ['А', 'О', 'У', 'Ы', 'Э', 'Я', 'Ё', 'Ю', 'И', 'Е'];

const PAIRS = [
  ['Б', 'П'], ['В', 'Ф'], ['Г', 'К'], ['Д', 'Т'], ['Ж', 'Ш'], ['З', 'С'],
];

const ALWAYS_VOICED = ['Й', 'Л', 'М', 'Н', 'Р'];
const ALWAYS_VOICELESS = ['Х', 'Ц', 'Ч', 'Щ'];

export default function VowelsConsonantsTablePage() {
  const quota = useGeneratorQuota();
  const [monochrome, setMonochrome] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  return (
    <main className="min-h-screen px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link href="/tablicy" className="no-print mb-4 inline-block text-sm text-orange hover:underline">← Все таблицы</Link>

        <header className="no-print mx-auto mb-7 max-w-3xl text-center">
          <p className="text-base font-black uppercase tracking-[0.2em] text-violet-200">📝 Русский язык · 1–2 класс</p>
          <h1 className="mt-2 text-[26px] font-black sm:text-[44px]">Гласные и согласные звуки</h1>
          <p className="mt-3 text-white/70">10 гласных букв, пары звонких и глухих согласных, твёрдые и мягкие звуки — на одном листе.</p>
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
            <span className="text-base font-bold text-slate-500">Готовый учебный лист</span>
            <ExportToolbar targetRef={printRef} filename="glasnye-i-soglasnye-zvuki" />
          </div>

          <div ref={printRef} className={`mx-auto rounded-[28px] border-[3px] bg-white p-5 sm:p-8 ${monochrome ? 'border-slate-700 grayscale' : 'border-violet-400'}`}>
            <header className={`mb-5 rounded-2xl px-5 py-4 text-center ${monochrome ? 'border-2 border-slate-700' : 'bg-gradient-to-r from-violet-100 via-fuchsia-50 to-orange-50'}`}>
              <p className={`text-sm font-black uppercase tracking-[0.22em] ${monochrome ? 'text-slate-600' : 'text-violet-600'}`}>Таблица</p>
              <h2 className="mt-1 text-3xl font-black text-slate-900">Гласные и согласные звуки</h2>
            </header>

            <section className={`mb-4 rounded-2xl border-2 p-4 ${monochrome ? 'border-slate-500' : 'border-rose-200 bg-rose-50'}`}>
              <h3 className={`text-base font-black ${monochrome ? 'text-slate-900' : 'text-rose-700'}`}>10 гласных букв — можно петь голосом</h3>
              <div className="mt-3 flex flex-nowrap gap-1.5">
                {VOWELS.map((v) => (
                  <span key={v} className="flex aspect-square flex-1 items-center justify-center rounded-lg text-lg font-black text-white sm:text-2xl" style={{ backgroundColor: monochrome ? '#334155' : '#be123c' }}>{v}</span>
                ))}
              </div>
            </section>

            <section className={`mb-4 rounded-2xl border-2 p-4 ${monochrome ? 'border-slate-500' : 'border-sky-200 bg-sky-50'}`}>
              <h3 className={`text-base font-black ${monochrome ? 'text-slate-900' : 'text-sky-700'}`}>Парные согласные: звонкие и глухие</h3>
              <div className="mt-3 overflow-x-auto rounded-xl border-2 border-slate-200">
                <table className="w-full min-w-[380px] border-collapse text-center text-sm">
                  <thead>
                    <tr className="bg-[#4C1D95] text-white">
                      <th className="px-3 py-2 text-xs font-black uppercase tracking-wide">Звонкий</th>
                      <th className="px-3 py-2 text-xs font-black uppercase tracking-wide">Глухой</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PAIRS.map(([voiced, voiceless], i) => (
                      <tr key={voiced} style={{ backgroundColor: monochrome ? (i % 2 ? '#f8fafc' : '#fff') : undefined }}>
                        <td className="border-t-2 border-slate-200 px-3 py-2 text-xl font-black" style={{ color: monochrome ? '#0f172a' : '#1d4ed8' }}>{voiced}</td>
                        <td className="border-t-2 border-slate-200 px-3 py-2 text-xl font-black" style={{ color: monochrome ? '#0f172a' : '#c2410c' }}>{voiceless}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-base font-semibold text-slate-600">
                Без пары: <b className={monochrome ? 'text-slate-900' : 'text-blue-700'}>Й, Л, М, Н, Р</b> — всегда звонкие,
                а <b className={monochrome ? 'text-slate-900' : 'text-orange-700'}>Х, Ц, Ч, Щ</b> — всегда глухие.
              </p>
            </section>

            <section className={`rounded-2xl border-2 p-4 ${monochrome ? 'border-slate-500' : 'border-violet-200 bg-violet-50'}`}>
              <h3 className={`text-center text-base font-black ${monochrome ? 'text-slate-900' : 'text-violet-800'}`}>Твёрдые и мягкие согласные</h3>
              <p className="mt-2 text-center text-base font-semibold text-slate-600">
                Сравни «мама» и «мяч»: звук [м] в первом слове твёрдый, во втором — мягкий.
                Смягчают согласный буквы <b className="text-slate-800">Е, Ё, Ю, Я, И</b> и мягкий знак <b className="text-slate-800">Ь</b> после согласной.
              </p>
              <p className="mt-2 text-center text-base font-semibold text-slate-600">
                Проверь голосом: гласный можно тянуть свободно, согласный — нет, воздух встречает преграду (губы, зубы, язык).
                При звонком звуке горло дрожит, при глухом — нет.
              </p>
            </section>
            {!quota.isSubscriber && <p className="mt-4 text-center text-xs font-semibold tracking-wide text-slate-400">Знаторика · znatorica.ru</p>}
          </div>
        </section>

        <section className="no-print mx-auto mt-8 max-w-3xl rounded-2xl border border-white/15 bg-white/[0.06] p-6">
          <h2 className="text-2xl font-black">Как работать с таблицей</h2>
          <p className="mt-3 leading-relaxed text-white/70">
            Сначала научись быстро отличать гласный от согласного — гласный можно петь, согласный нет.
            Затем переходи к парам звонких и глухих согласных: приложи руку к горлу и проверь, дрожит ли оно.
            Твёрдость и мягкость легче всего слышать в парах слов вроде «мама — мяч» или «нос — нёс».
          </p>
          <nav className="mt-5 flex flex-wrap gap-3" aria-label="Материалы по теме">
            <Link href="/trenazher/glasnye-soglasnye" className="btn-primary px-5 py-2.5 text-sm">Тренажёр: гласные и согласные</Link>
            <Link href="/1-klass/russkiy/glasnye-i-soglasnye" className="rounded-lg border border-white/20 px-5 py-2.5 text-sm font-bold hover:border-orange">Правило и примеры</Link>
            <Link href="/tablicy/chasti-rechi" className="rounded-lg border border-white/20 px-5 py-2.5 text-sm font-bold hover:border-orange">Таблица частей речи</Link>
          </nav>
        </section>
      </div>
    </main>
  );
}
