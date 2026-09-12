'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import ExportToolbar from '@/components/ExportToolbar';
import { useGeneratorQuota } from '@/lib/useGeneratorQuota';
import { ENGLISH_NUMBERS } from '@/lib/english-numbers';

export default function EnglishNumbersTablePage() {
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
            🇬🇧 Английский язык · 5–9 лет
          </div>
          <h1 className="text-3xl font-black leading-tight sm:text-4xl">Числительные по-английски</h1>
          <p className="mt-3 text-lg text-white/70 leading-relaxed">
            Числа от 1 до 20: написание и транскрипция. Готовый лист для печати и повторения.
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
            <p className="text-sm font-medium text-slate-500">Готовый лист А4 · числа от 1 до 20</p>
            <ExportToolbar targetRef={printRef} filename="anglijskie-chislitelnye" />
          </div>

          <div
            ref={printRef}
            className={`mx-auto rounded-[28px] border-[3px] bg-white p-5 sm:p-8 ${monochrome ? 'border-slate-700 grayscale' : 'border-violet-400'}`}
          >
            <header className={`mb-5 rounded-2xl px-5 py-4 text-center ${monochrome ? 'border-2 border-slate-700' : 'bg-gradient-to-r from-violet-100 via-fuchsia-50 to-orange-50'}`}>
              <p className={`text-xs font-black uppercase tracking-[0.22em] ${monochrome ? 'text-slate-600' : 'text-violet-600'}`}>Таблица</p>
              <h2 className="mt-1 text-3xl font-black text-slate-900">Числительные по-английски</h2>
              <p className="mt-1 text-sm font-semibold text-slate-500">от 1 до 20</p>
            </header>

            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {ENGLISH_NUMBERS.map((item) => (
                <div
                  key={item.value}
                  className="rounded-xl border-2 px-2 py-3 text-center"
                  style={{
                    backgroundColor: monochrome ? '#ffffff' : '#f5f3ff',
                    borderColor: monochrome ? '#475569' : '#c4b5fd',
                  }}
                >
                  <p className="text-2xl font-black" style={{ color: monochrome ? '#0f172a' : '#6d28d9' }}>{item.value}</p>
                  <p className="mt-1 text-base font-bold text-slate-800">{item.word}</p>
                  <p className="mt-0.5 text-xs font-semibold text-slate-500">{item.transcription}</p>
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
            Повторяй числа группами по 5, проговаривая вслух с опорой на транскрипцию. Затем закрой написание
            и попробуй вспомнить слово только по цифре.
          </p>
          <nav className="mt-5 flex flex-wrap gap-3" aria-label="Материалы по числительным">
            <Link href="/trenazher/angliyskiy-schet" className="btn-primary px-5 py-2.5 text-sm">
              Тренажёр «Счёт по-английски»
            </Link>
          </nav>
        </section>
      </div>
    </main>
  );
}
