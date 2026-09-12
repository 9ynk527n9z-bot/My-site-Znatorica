'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import ExportToolbar from '@/components/ExportToolbar';
import { useGeneratorQuota } from '@/lib/useGeneratorQuota';

const BODY_PARTS = [
  { emoji: '😀', word: 'Head', transcription: '/hed/', ru: 'голова', pale: '#f5f3ff', border: '#c4b5fd' },
  { emoji: '👀', word: 'Eyes', transcription: '/aɪz/', ru: 'глаза', pale: '#eff6ff', border: '#93c5fd' },
  { emoji: '👂', word: 'Ears', transcription: '/ɪəz/', ru: 'уши', pale: '#fdf4ff', border: '#f0abfc' },
  { emoji: '👃', word: 'Nose', transcription: '/nəʊz/', ru: 'нос', pale: '#fff7ed', border: '#fdba74' },
  { emoji: '👄', word: 'Mouth', transcription: '/maʊθ/', ru: 'рот', pale: '#fff1f2', border: '#fda4af' },
  { emoji: '🦷', word: 'Teeth', transcription: '/tiːθ/', ru: 'зубы', pale: '#f8fafc', border: '#cbd5e1' },
  { emoji: '💇', word: 'Hair', transcription: '/heə/', ru: 'волосы', pale: '#fefce8', border: '#fde047' },
  { emoji: '✋', word: 'Hand', transcription: '/hænd/', ru: 'рука (кисть)', pale: '#f0fdf4', border: '#86efac' },
  { emoji: '💪', word: 'Arm', transcription: '/ɑːm/', ru: 'рука', pale: '#eef2ff', border: '#a5b4fc' },
  { emoji: '🦵', word: 'Leg', transcription: '/leɡ/', ru: 'нога', pale: '#eff6ff', border: '#7dd3fc' },
  { emoji: '🦶', word: 'Foot', transcription: '/fʊt/', ru: 'ступня', pale: '#fff1f2', border: '#fca5a5' },
];

export default function EnglishBodyPartsTablePage() {
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
            🇬🇧 Английский язык · 4–9 лет
          </div>
          <h1 className="text-2xl font-black leading-tight sm:text-3xl">Body Parts</h1>
          <p className="mt-3 text-xl text-white/70 leading-relaxed">
            11 частей тела на английском языке с транскрипцией и переводом.
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
            <p className="text-sm font-medium text-slate-500">Готовый учебный лист · 11 слов</p>
            <ExportToolbar targetRef={printRef} filename="chasti-tela-po-anglijski" />
          </div>

          <div
            ref={printRef}
            className={`mx-auto rounded-[28px] border-[3px] bg-white p-5 sm:p-8 ${monochrome ? 'border-slate-700 grayscale' : 'border-violet-400'}`}
          >
            <header className={`mb-5 rounded-2xl px-5 py-4 text-center ${monochrome ? 'border-2 border-slate-700' : 'bg-gradient-to-r from-violet-100 via-fuchsia-50 to-orange-50'}`}>
              <p className={`text-[23px] font-black uppercase tracking-[0.22em] ${monochrome ? 'text-slate-600' : 'text-violet-600'}`}>Таблица</p>
              <h2 className="mt-1 text-3xl font-black text-slate-900">Body Parts</h2>
              <p className="mt-1 text-[23px] font-semibold text-slate-500">Части тела на английском</p>
            </header>

            <div className="rounded-2xl border-2 p-3" style={{ backgroundColor: monochrome ? '#fff' : '#f5f3ff', borderColor: monochrome ? '#64748b' : '#c4b5fd' }}>
              <div className="flex flex-col gap-2">
                {BODY_PARTS.map((b) => (
                  <div
                    key={b.word}
                    className="flex items-center gap-4 rounded-xl border-2 px-4 py-2.5"
                    style={{ backgroundColor: monochrome ? 'rgba(255,255,255,.7)' : b.pale, borderColor: monochrome ? '#e2e8f0' : b.border }}
                  >
                    <p className="w-14 shrink-0 text-center text-[52px]">{monochrome ? '' : b.emoji}</p>
                    <p className="w-40 shrink-0 text-[25px] font-bold tracking-tight text-slate-800">{b.word}</p>
                    <p className="w-32 shrink-0 text-[21px] font-semibold text-slate-500">{b.transcription}</p>
                    <p className="text-[21px] font-semibold text-slate-400">{b.ru}</p>
                  </div>
                ))}
              </div>
            </div>

            {!quota.isSubscriber && (
              <p className="mt-4 text-center text-[10px] font-semibold tracking-wide text-slate-400">Знаторика · znatorica.ru</p>
            )}
          </div>
        </section>

        <section className="no-print mx-auto mt-8 max-w-3xl rounded-2xl border border-white/15 bg-white/[0.06] p-6">
          <h2 className="text-2xl font-black">Как пользоваться таблицей</h2>
          <p className="mt-3 leading-relaxed text-white/70">
            Показывай на себе или на рисунке ту часть тела, которую называешь — так слово запоминается
            вместе с движением. Потом закрой перевод и попробуй вспомнить слово по картинке.
          </p>
        </section>
      </div>
    </main>
  );
}
