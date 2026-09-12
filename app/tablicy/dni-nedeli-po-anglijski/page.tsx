'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import ExportToolbar from '@/components/ExportToolbar';
import { useGeneratorQuota } from '@/lib/useGeneratorQuota';

const DAYS = [
  { num: 1, word: 'Monday', ru: 'понедельник', transcription: '/ˈmʌndeɪ/', weekend: false },
  { num: 2, word: 'Tuesday', ru: 'вторник', transcription: '/ˈtjuːzdeɪ/', weekend: false },
  { num: 3, word: 'Wednesday', ru: 'среда', transcription: '/ˈwenzdeɪ/', weekend: false },
  { num: 4, word: 'Thursday', ru: 'четверг', transcription: '/ˈθɜːzdeɪ/', weekend: false },
  { num: 5, word: 'Friday', ru: 'пятница', transcription: '/ˈfraɪdeɪ/', weekend: false },
  { num: 6, word: 'Saturday', ru: 'суббота', transcription: '/ˈsætədeɪ/', weekend: true },
  { num: 7, word: 'Sunday', ru: 'воскресенье', transcription: '/ˈsʌndeɪ/', weekend: true },
];

export default function EnglishWeekdaysTablePage() {
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
            🇬🇧 Английский язык · 6–9 лет
          </div>
          <h1 className="text-2xl font-black leading-tight sm:text-3xl">Days of the Week</h1>
          <p className="mt-3 text-lg text-white/70 leading-relaxed">
            7 дней недели: написание, перевод и транскрипция, от Monday до Sunday.
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
            <p className="text-sm font-medium text-slate-500">Готовый учебный лист · 7 дней</p>
            <ExportToolbar targetRef={printRef} filename="dni-nedeli-po-anglijski" />
          </div>

          <div
            ref={printRef}
            className={`mx-auto rounded-[28px] border-[3px] bg-white p-5 sm:p-8 ${monochrome ? 'border-slate-700 grayscale' : 'border-violet-400'}`}
          >
            <header className={`mb-5 rounded-2xl px-5 py-4 text-center ${monochrome ? 'border-2 border-slate-700' : 'bg-gradient-to-r from-violet-100 via-fuchsia-50 to-orange-50'}`}>
              <p className={`text-lg font-black uppercase tracking-[0.22em] ${monochrome ? 'text-slate-600' : 'text-violet-600'}`}>Таблица</p>
              <h2 className="mt-1 text-3xl font-black text-slate-900">Days of the Week</h2>
              <p className="mt-1 text-lg font-semibold text-slate-500">Дни недели</p>
            </header>

            <div className="flex flex-col gap-2.5">
              {DAYS.map((d) => (
                <div
                  key={d.num}
                  className="flex flex-wrap items-center gap-x-4 gap-y-1 rounded-2xl border-2 px-4 py-3"
                  style={{
                    backgroundColor: monochrome ? '#fff' : d.weekend ? '#fff7ed' : '#eff6ff',
                    borderColor: monochrome ? '#64748b' : d.weekend ? '#fdba74' : '#93c5fd',
                  }}
                >
                  <p className="w-8 shrink-0 text-4xl font-black" style={{ color: monochrome ? '#0f172a' : d.weekend ? '#c2410c' : '#1d4ed8' }}>{d.num}</p>
                  <p className="text-2xl font-bold text-slate-800" style={{ minWidth: '9ch' }}>{d.word}</p>
                  <p className="text-lg font-semibold text-slate-500">{d.transcription}</p>
                  <p className="flex-1 text-right text-lg font-semibold text-slate-600">{d.ru}</p>
                  {d.weekend && <p className="w-full text-right text-base font-semibold text-slate-500 sm:w-auto">выходной</p>}
                </div>
              ))}
            </div>

            {!quota.isSubscriber && (
              <p className="mt-4 text-center text-[10px] font-semibold tracking-wide text-slate-400">Знаторика · znatorica.ru</p>
            )}
          </div>
        </section>

        <section className="no-print mx-auto mt-8 max-w-3xl rounded-2xl border border-white/15 bg-white/[0.06] p-6">
          <h2 className="text-2xl font-black">Как пользоваться таблицей</h2>
          <p className="mt-3 leading-relaxed text-white/70">
            Все дни недели по-английски пишутся с заглавной буквы — даже в середине предложения.
            Проговаривай вслух с опорой на транскрипцию, а потом попробуй назвать день без подсказки.
          </p>
          <nav className="mt-5 flex flex-wrap gap-3" aria-label="Материалы по дням недели">
            <Link href="/tablicy/dni-nedeli" className="rounded-lg border border-white/20 px-5 py-2.5 text-sm font-bold hover:border-orange">
              Дни недели по-русски
            </Link>
          </nav>
        </section>
      </div>
    </main>
  );
}
