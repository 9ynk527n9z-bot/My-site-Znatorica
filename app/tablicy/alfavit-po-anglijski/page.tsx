'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import ExportToolbar from '@/components/ExportToolbar';
import { useGeneratorQuota } from '@/lib/useGeneratorQuota';

const ALPHABET = [
  { letter: 'Aa', transcription: '/eɪ/', emoji: '🍎', word: 'Apple', ru: 'яблоко' },
  { letter: 'Bb', transcription: '/biː/', emoji: '⚽', word: 'Ball', ru: 'мяч' },
  { letter: 'Cc', transcription: '/siː/', emoji: '🐱', word: 'Cat', ru: 'кошка' },
  { letter: 'Dd', transcription: '/diː/', emoji: '🐶', word: 'Dog', ru: 'собака' },
  { letter: 'Ee', transcription: '/iː/', emoji: '🐘', word: 'Elephant', ru: 'слон' },
  { letter: 'Ff', transcription: '/ɛf/', emoji: '🐟', word: 'Fish', ru: 'рыба' },
  { letter: 'Gg', transcription: '/dʒiː/', emoji: '🐐', word: 'Goat', ru: 'коза' },
  { letter: 'Hh', transcription: '/eɪtʃ/', emoji: '✋', word: 'Hand', ru: 'рука' },
  { letter: 'Ii', transcription: '/aɪ/', emoji: '🍦', word: 'Ice cream', ru: 'мороженое' },
  { letter: 'Jj', transcription: '/dʒeɪ/', emoji: '🧃', word: 'Juice', ru: 'сок' },
  { letter: 'Kk', transcription: '/keɪ/', emoji: '🪁', word: 'Kite', ru: 'воздушный змей' },
  { letter: 'Ll', transcription: '/ɛl/', emoji: '🦁', word: 'Lion', ru: 'лев' },
  { letter: 'Mm', transcription: '/ɛm/', emoji: '👩', word: 'Mother', ru: 'мама' },
  { letter: 'Nn', transcription: '/ɛn/', emoji: '👃', word: 'Nose', ru: 'нос' },
  { letter: 'Oo', transcription: '/əʊ/', emoji: '🍊', word: 'Orange', ru: 'апельсин' },
  { letter: 'Pp', transcription: '/piː/', emoji: '🐷', word: 'Pig', ru: 'свинья' },
  { letter: 'Qq', transcription: '/kjuː/', emoji: '👑', word: 'Queen', ru: 'королева' },
  { letter: 'Rr', transcription: '/ɑː/', emoji: '🐰', word: 'Rabbit', ru: 'кролик' },
  { letter: 'Ss', transcription: '/ɛs/', emoji: '☀️', word: 'Sun', ru: 'солнце' },
  { letter: 'Tt', transcription: '/tiː/', emoji: '🐯', word: 'Tiger', ru: 'тигр' },
  { letter: 'Uu', transcription: '/juː/', emoji: '☂️', word: 'Umbrella', ru: 'зонт' },
  { letter: 'Vv', transcription: '/viː/', emoji: '🟣', word: 'Violet', ru: 'фиолетовый' },
  { letter: 'Ww', transcription: '/ˈdʌbljuː/', emoji: '💧', word: 'Water', ru: 'вода' },
  { letter: 'Xx', transcription: '/ɛks/', emoji: '📦', word: 'Box', ru: 'коробка' },
  { letter: 'Yy', transcription: '/waɪ/', emoji: '🟡', word: 'Yellow', ru: 'жёлтый' },
  { letter: 'Zz', transcription: '/zɛd/', emoji: '🦓', word: 'Zebra', ru: 'зебра' },
];

const LEFT = ALPHABET.slice(0, 13);
const RIGHT = ALPHABET.slice(13);

const PALETTE = [
  { pale: '#f5f3ff', border: '#c4b5fd', text: '#6d28d9' },
  { pale: '#fff1f2', border: '#fda4af', text: '#be123c' },
  { pale: '#eff6ff', border: '#93c5fd', text: '#1d4ed8' },
  { pale: '#fff7ed', border: '#fdba74', text: '#c2410c' },
  { pale: '#f0fdf4', border: '#86efac', text: '#15803d' },
  { pale: '#fefce8', border: '#fde047', text: '#a16207' },
  { pale: '#fdf4ff', border: '#f0abfc', text: '#a21caf' },
  { pale: '#eef2ff', border: '#a5b4fc', text: '#4338ca' },
];

function AlphabetColumn({ items, monochrome, startIndex }: { items: typeof ALPHABET; monochrome: boolean; startIndex: number }) {
  return (
    <div className="flex flex-1 flex-col gap-1.5">
      {items.map((a, i) => {
        const c = PALETTE[(startIndex + i) % PALETTE.length];
        return (
          <div
            key={a.letter}
            className="flex items-center gap-2 rounded-xl border-2 px-2.5 py-1.5"
            style={{ backgroundColor: monochrome ? '#fff' : c.pale, borderColor: monochrome ? '#e2e8f0' : c.border }}
          >
            <p className="w-11 shrink-0 text-center text-[26px] font-black" style={{ color: monochrome ? '#334155' : c.text }}>{a.letter}</p>
            <p className="w-16 shrink-0 text-[14px] font-semibold text-slate-500">{a.transcription}</p>
            <p className="shrink-0 text-[22px]">{monochrome ? '' : a.emoji}</p>
            <div className="min-w-0">
              <p className="truncate text-[16px] font-bold text-slate-800">{a.word}</p>
              <p className="truncate text-[13px] font-semibold text-slate-400">{a.ru}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function EnglishAlphabetTablePage() {
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
          <h1 className="text-2xl font-black leading-tight sm:text-3xl">English Alphabet</h1>
          <p className="mt-3 text-xl text-white/70 leading-relaxed">
            26 букв английского алфавита с произношением, словом-примером и переводом — в два столбика.
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
            <p className="text-sm font-medium text-slate-500">Готовый учебный лист · 26 букв</p>
            <ExportToolbar targetRef={printRef} filename="alfavit-po-anglijski" />
          </div>

          <div
            ref={printRef}
            className={`mx-auto rounded-[28px] border-[3px] bg-white p-5 sm:p-8 ${monochrome ? 'border-slate-700 grayscale' : 'border-violet-400'}`}
          >
            <header className={`mb-5 rounded-2xl px-5 py-4 text-center ${monochrome ? 'border-2 border-slate-700' : 'bg-gradient-to-r from-violet-100 via-fuchsia-50 to-orange-50'}`}>
              <p className={`text-[23px] font-black uppercase tracking-[0.22em] ${monochrome ? 'text-slate-600' : 'text-violet-600'}`}>Таблица</p>
              <h2 className="mt-1 text-3xl font-black text-slate-900">English Alphabet</h2>
              <p className="mt-1 text-[23px] font-semibold text-slate-500">Английский алфавит, 26 букв</p>
            </header>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <AlphabetColumn items={LEFT} monochrome={monochrome} startIndex={0} />
              <AlphabetColumn items={RIGHT} monochrome={monochrome} startIndex={LEFT.length} />
            </div>

            {!quota.isSubscriber && (
              <p className="mt-4 text-center text-[10px] font-semibold tracking-wide text-slate-400">Знаторика · znatorica.ru</p>
            )}
          </div>
        </section>

        <section className="no-print mx-auto mt-8 max-w-3xl rounded-2xl border border-white/15 bg-white/[0.06] p-6">
          <h2 className="text-2xl font-black">Как пользоваться таблицей</h2>
          <p className="mt-3 leading-relaxed text-white/70">
            Проговаривай название буквы по транскрипции, потом слово-пример на эту букву.
            Со временем закрой транскрипцию и вспоминай произношение буквы сам.
          </p>
          <nav className="mt-5 flex flex-wrap gap-3" aria-label="Материалы по теме">
            <Link href="/trenazher/angliyskiy-alfavit" className="btn-primary px-5 py-2.5 text-sm">Тренажёр: алфавит</Link>
          </nav>
        </section>
      </div>
    </main>
  );
}
