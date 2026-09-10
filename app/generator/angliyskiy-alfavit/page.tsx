'use client';

import Link from 'next/link';
import localFont from 'next/font/local';
import { useRef, useState } from 'react';
import ExportToolbar from '@/components/ExportToolbar';
import { trackUsage } from '@/lib/track';
import styles from './page.module.css';

const handwriting = localFont({
  src: '../../../public/fonts/patrick-hand/PatrickHand-Regular.ttf',
  display: 'swap',
});

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const COLUMN_ALPHABET = Array.from({ length: Math.ceil(ALPHABET.length / 2) }, (_, row) => [
  ALPHABET[row],
  ALPHABET[row + Math.ceil(ALPHABET.length / 2)],
]).flat().filter((letter): letter is string => Boolean(letter));
type AlphabetMode = 'printed' | 'handwritten';

const MODES: Array<{
  id: AlphabetMode;
  icon: string;
  title: string;
  subtitle: string;
  example: string;
}> = [
  {
    id: 'printed',
    icon: '🔤',
    title: 'Печатные буквы',
    subtitle: 'Заглавная и строчная',
    example: 'A a · B b · C c',
  },
  {
    id: 'handwritten',
    icon: '✍️',
    title: 'Письменные буквы',
    subtitle: 'Заглавная и строчная',
    example: 'A a · B b · C c',
  },
];

export default function EnglishAlphabetGeneratorPage() {
  const [mode, setMode] = useState<AlphabetMode>('printed');
  const [generatedMode, setGeneratedMode] = useState<AlphabetMode | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  function generate() {
    setGeneratedMode(mode);
    trackUsage(`generator:angliyskiy-alfavit:${mode}`);
  }

  const isHandwritten = generatedMode === 'handwritten';

  return (
    <main className="min-h-screen px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link href="/generator" className="no-print text-sm text-orange hover:underline">
          ← Все генераторы
        </Link>

        <div className="no-print mt-3 mb-8 max-w-3xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-300/25 bg-violet-400/10 px-3 py-1 text-xs font-bold text-violet-100">
            🇬🇧 26 букв · готово для печати
          </div>
          <h1 className="text-3xl font-black leading-tight sm:text-4xl">Английский алфавит</h1>
          <p className="mt-3 text-white/70">
            Выбери печатные или письменные буквы. В готовой таблице каждая заглавная буква показана рядом со строчной.
          </p>
        </div>

        <section className="card no-print mb-8 overflow-hidden !p-4 sm:!p-6">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange/20 text-lg">1</span>
            <div>
              <h2 className="font-extrabold">Выбери вид букв</h2>
              <p className="text-sm text-white/55">Два режима расположены в двух столбиках</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {MODES.map((item) => {
              const selected = mode === item.id;
              const handwritten = item.id === 'handwritten';
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setMode(item.id)}
                  className={`relative rounded-2xl border p-5 text-left transition-all ${
                    selected
                      ? 'border-orange bg-gradient-to-br from-orange/25 via-pink-500/15 to-violet-500/20 shadow-[0_12px_32px_rgba(255,126,95,0.16)]'
                      : 'border-white/15 bg-white/[0.06] hover:border-white/35 hover:bg-white/[0.09]'
                  }`}
                >
                  <span className="mb-4 flex items-start justify-between gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-2xl">{item.icon}</span>
                    <span className={`flex h-6 w-6 items-center justify-center rounded-full border ${selected ? 'border-orange bg-orange text-white' : 'border-white/30'}`}>
                      {selected ? '✓' : ''}
                    </span>
                  </span>
                  <strong className="block text-lg">{item.title}</strong>
                  <span className="mt-1 block text-sm text-white/60">{item.subtitle}</span>
                  <span className={`mt-4 block rounded-xl bg-white px-4 py-3 text-center text-3xl text-[#3a1c6e] ${handwritten ? `${handwriting.className} italic` : 'font-bold'}`}>
                    {item.example}
                  </span>
                </button>
              );
            })}
          </div>

          <button type="button" onClick={generate} className="btn-primary mt-6 w-full py-3 text-base">
            ✨ Создать английский алфавит
          </button>
        </section>

        {generatedMode && (
          <section className={`${styles.result} card print-page bg-white !p-4 text-slate-900 sm:!p-6`}>
            <div className="no-print mb-5 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-medium text-slate-500">
                Готово: {isHandwritten ? 'письменные' : 'печатные'} буквы
              </p>
              <ExportToolbar targetRef={printRef} filename={`angliyskiy-alfavit-${generatedMode}`} />
            </div>

            <div ref={printRef} className={`${styles.sheet} rounded-2xl border-2 border-[#A78BFA] bg-white p-5 sm:p-7`}>
              <header className="mb-5 flex items-center justify-between gap-4 border-b-2 border-violet-100 pb-4">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-violet-500">English alphabet</p>
                  <h2 className="mt-1 text-2xl font-black text-[#3a1c6e]">Английский алфавит</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {isHandwritten ? 'Письменные' : 'Печатные'} заглавные и строчные буквы
                  </p>
                </div>
                <div className="rounded-2xl bg-violet-100 px-5 py-3 text-center text-violet-800">
                  <span className="block text-5xl leading-none">🇬🇧</span>
                  <span className="mt-2 block text-2xl font-bold leading-none">A–Z</span>
                </div>
              </header>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2 sm:gap-x-7">
                {COLUMN_ALPHABET.map((letter, position) => {
                  const alphabetIndex = ALPHABET.indexOf(letter);
                  return (
                  <div
                    key={letter}
                    className={`${styles.letterRow} flex items-center rounded-xl border-2 border-violet-100 ${Math.floor(position / 2) % 2 === 0 ? 'bg-violet-50/70' : 'bg-orange-50/60'}`}
                  >
                    <span className="flex h-full w-9 shrink-0 items-center justify-center border-r-2 border-violet-100 bg-transparent text-xs font-black text-slate-600">
                      {alphabetIndex + 1}
                    </span>
                    <span
                      className={`flex shrink-0 items-baseline gap-2 pl-3 text-[32px] leading-none text-[#32145f] ${
                        isHandwritten ? `${handwriting.className} ${styles.handwritten}` : `${styles.printed} font-bold`
                      }`}
                    >
                      <span>{letter}</span>
                      <span className="text-[28px] text-orange-600">{letter.toLowerCase()}</span>
                    </span>
                    <span aria-hidden="true" className="flex min-w-0 flex-1 items-end gap-2 px-3 pb-2">
                      {Array.from({ length: 3 }, (_, practiceIndex) => (
                        <span key={practiceIndex} className="h-7 min-w-4 flex-1 border-b-2 border-dashed border-slate-300" />
                      ))}
                    </span>
                  </div>
                  );
                })}
              </div>

              <footer className="mt-5 flex items-center justify-between border-t border-violet-100 pt-3 text-xs text-slate-400">
                <span>Заглавная + строчная</span>
                <span className="font-bold text-violet-500">26 letters</span>
              </footer>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
