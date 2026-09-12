'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import ExportToolbar from '@/components/ExportToolbar';
import { useGeneratorQuota } from '@/lib/useGeneratorQuota';
import { ENGLISH_CLOTHES } from '@/lib/english-clothes';

const LEFT = ENGLISH_CLOTHES.slice(0, 10);
const RIGHT = ENGLISH_CLOTHES.slice(10);

const PALETTE = [
  { pale: '#f5f3ff', border: '#c4b5fd' },
  { pale: '#fff1f2', border: '#fda4af' },
  { pale: '#eff6ff', border: '#93c5fd' },
  { pale: '#fff7ed', border: '#fdba74' },
  { pale: '#f0fdf4', border: '#86efac' },
  { pale: '#fefce8', border: '#fde047' },
];

function ClothesColumn({ items, monochrome, startIndex }: { items: typeof ENGLISH_CLOTHES; monochrome: boolean; startIndex: number }) {
  return (
    <div className="flex flex-1 flex-col gap-1.5">
      {items.map((c, i) => {
        const p = PALETTE[(startIndex + i) % PALETTE.length];
        return (
          <div
            key={c.word}
            className="flex items-center gap-3 rounded-xl border-2 px-3 py-1.5"
            style={{ backgroundColor: monochrome ? '#fff' : p.pale, borderColor: monochrome ? '#e2e8f0' : p.border }}
          >
            <p className="w-9 shrink-0 text-center text-[28px]">{monochrome ? '' : c.emoji}</p>
            <div className="min-w-0">
              <p className="truncate text-[17px] font-bold text-slate-800">{c.word}</p>
              <p className="truncate text-[13px] font-semibold text-slate-400">{c.translation}</p>
            </div>
            <p className="ml-auto shrink-0 text-[14px] font-semibold text-slate-500">{c.transcription}</p>
          </div>
        );
      })}
    </div>
  );
}

export default function EnglishClothesTablePage() {
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
          <h1 className="text-2xl font-black leading-tight sm:text-3xl">Clothes</h1>
          <p className="mt-3 text-xl text-white/70 leading-relaxed">
            20 предметов одежды и аксессуаров на английском языке с транскрипцией и переводом — в два столбика.
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
            <p className="text-sm font-medium text-slate-500">Готовый учебный лист · 20 слов</p>
            <ExportToolbar targetRef={printRef} filename="odezhda-po-anglijski" />
          </div>

          <div
            ref={printRef}
            className={`mx-auto rounded-[28px] border-[3px] bg-white p-5 sm:p-8 ${monochrome ? 'border-slate-700 grayscale' : 'border-violet-400'}`}
          >
            <header className={`mb-5 rounded-2xl px-5 py-4 text-center ${monochrome ? 'border-2 border-slate-700' : 'bg-gradient-to-r from-violet-100 via-fuchsia-50 to-orange-50'}`}>
              <p className={`text-[23px] font-black uppercase tracking-[0.22em] ${monochrome ? 'text-slate-600' : 'text-violet-600'}`}>Таблица</p>
              <h2 className="mt-1 text-3xl font-black text-slate-900">Clothes</h2>
              <p className="mt-1 text-[23px] font-semibold text-slate-500">Одежда на английском</p>
            </header>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <ClothesColumn items={LEFT} monochrome={monochrome} startIndex={0} />
              <ClothesColumn items={RIGHT} monochrome={monochrome} startIndex={LEFT.length} />
            </div>

            {!quota.isSubscriber && (
              <p className="mt-4 text-center text-[10px] font-semibold tracking-wide text-slate-400">Знаторика · znatorica.ru</p>
            )}
          </div>
        </section>

        <section className="no-print mx-auto mt-8 max-w-3xl rounded-2xl border border-white/15 bg-white/[0.06] p-6">
          <h2 className="text-2xl font-black">Как пользоваться таблицей</h2>
          <p className="mt-3 leading-relaxed text-white/70">
            Проговаривай слово вслух с опорой на транскрипцию, потом закрой перевод и вспомни его сам.
          </p>
          <nav className="mt-5 flex flex-wrap gap-3" aria-label="Материалы по теме">
            <Link href="/trenazher/english-clothes" className="btn-primary px-5 py-2.5 text-sm">Тренажёр: Clothes</Link>
          </nav>
        </section>
      </div>
    </main>
  );
}
