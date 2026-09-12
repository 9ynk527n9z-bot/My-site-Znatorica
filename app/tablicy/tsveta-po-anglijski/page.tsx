'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import ExportToolbar from '@/components/ExportToolbar';
import { useGeneratorQuota } from '@/lib/useGeneratorQuota';

const COLOURS = [
  { word: 'Red', transcription: '/rɛd/', ru: 'красный', hex: '#ef4444', dark: false },
  { word: 'Orange', transcription: '/ˈɒrɪndʒ/', ru: 'оранжевый', hex: '#f97316', dark: false },
  { word: 'Yellow', transcription: '/ˈjeləʊ/', ru: 'жёлтый', hex: '#eab308', dark: false },
  { word: 'Green', transcription: '/ɡriːn/', ru: 'зелёный', hex: '#22c55e', dark: false },
  { word: 'Blue', transcription: '/bluː/', ru: 'синий', hex: '#3b82f6', dark: true },
  { word: 'Purple', transcription: '/ˈpɜːpl/', ru: 'фиолетовый', hex: '#a855f7', dark: true },
  { word: 'Pink', transcription: '/pɪŋk/', ru: 'розовый', hex: '#ec4899', dark: false },
  { word: 'Brown', transcription: '/braʊn/', ru: 'коричневый', hex: '#92400e', dark: true },
  { word: 'Black', transcription: '/blæk/', ru: 'чёрный', hex: '#1f2937', dark: true },
  { word: 'White', transcription: '/waɪt/', ru: 'белый', hex: '#ffffff', dark: false, border: true },
  { word: 'Grey', transcription: '/ɡreɪ/', ru: 'серый', hex: '#9ca3af', dark: false },
];

export default function EnglishColoursTablePage() {
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
            🇬🇧 Английский язык · 4–9 лет
          </div>
          <h1 className="text-2xl font-black leading-tight sm:text-3xl">Colours</h1>
          <p className="mt-3 text-lg text-white/70 leading-relaxed">
            11 цветов на английском языке с транскрипцией, переводом и настоящим цветным образцом.
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
            <p className="text-sm font-medium text-slate-500">Готовый учебный лист · 11 цветов</p>
            <ExportToolbar targetRef={printRef} filename="tsveta-po-anglijski" />
          </div>

          <div
            ref={printRef}
            className={`mx-auto rounded-[28px] border-[3px] bg-white p-5 sm:p-8 ${monochrome ? 'border-slate-700 grayscale' : 'border-violet-400'}`}
          >
            <header className={`mb-5 rounded-2xl px-5 py-4 text-center ${monochrome ? 'border-2 border-slate-700' : 'bg-gradient-to-r from-violet-100 via-fuchsia-50 to-orange-50'}`}>
              <p className={`text-[23px] font-black uppercase tracking-[0.22em] ${monochrome ? 'text-slate-600' : 'text-violet-600'}`}>Таблица</p>
              <h2 className="mt-1 text-3xl font-black text-slate-900">Colours</h2>
              <p className="mt-1 text-[23px] font-semibold text-slate-500">Цвета на английском</p>
            </header>

            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {COLOURS.map((c) => (
                <div
                  key={c.word}
                  className={`flex flex-col items-center gap-1 rounded-2xl p-3 text-center ${c.border ? 'border-2 border-slate-300' : ''}`}
                  style={{ backgroundColor: monochrome ? '#f1f5f9' : c.hex }}
                >
                  <p className={`text-[21px] font-black tracking-tight ${monochrome ? 'text-slate-900' : c.dark ? 'text-white' : 'text-slate-900'}`}>{c.word}</p>
                  <p className={`text-[16px] font-semibold ${monochrome ? 'text-slate-600' : c.dark ? 'text-white/80' : 'text-slate-700/80'}`}>{c.transcription}</p>
                  <p className={`text-[16px] font-semibold ${monochrome ? 'text-slate-500' : c.dark ? 'text-white/70' : 'text-slate-700/70'}`}>{c.ru}</p>
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
            Проговаривай слово вслух, глядя на цвет, потом закрой перевод и вспомни слово сам —
            так цвет и английское название запоминаются вместе, одной картинкой.
          </p>
          <nav className="mt-5 flex flex-wrap gap-3" aria-label="Материалы по теме">
            <Link href="/trenazher/english-colors" className="btn-primary px-5 py-2.5 text-sm">Тренажёр: Colours</Link>
          </nav>
        </section>
      </div>
    </main>
  );
}
