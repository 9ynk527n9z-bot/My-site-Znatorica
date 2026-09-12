'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import ExportToolbar from '@/components/ExportToolbar';
import { useGeneratorQuota } from '@/lib/useGeneratorQuota';

const BASE_SYMBOLS = [
  { symbol: 'I', value: 1 },
  { symbol: 'V', value: 5 },
  { symbol: 'X', value: 10 },
  { symbol: 'L', value: 50 },
  { symbol: 'C', value: 100 },
  { symbol: 'D', value: 500 },
  { symbol: 'M', value: 1000 },
];

function toRoman(num: number): string {
  const table: [number, string][] = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
    [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
  ];
  let result = '';
  let n = num;
  for (const [value, symbol] of table) {
    while (n >= value) {
      result += symbol;
      n -= value;
    }
  }
  return result;
}

const NUMBERS = Array.from({ length: 20 }, (_, i) => i + 1);

export default function RomanNumeralsTablePage() {
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
            🔢 Математика · 3–5 класс
          </div>
          <h1 className="text-3xl font-black leading-tight sm:text-4xl">Римские цифры</h1>
          <p className="mt-3 text-lg text-white/70 leading-relaxed">
            Основные обозначения, правило сложения и вычитания и готовая таблица чисел от 1 до 20.
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
            <p className="text-sm font-medium text-slate-500">Готовый учебный лист</p>
            <ExportToolbar targetRef={printRef} filename="rimskie-cifry" />
          </div>

          <div
            ref={printRef}
            className={`mx-auto rounded-[28px] border-[3px] bg-white p-5 sm:p-8 ${monochrome ? 'border-slate-700 grayscale' : 'border-violet-400'}`}
          >
            <header className={`mb-5 rounded-2xl px-5 py-4 text-center ${monochrome ? 'border-2 border-slate-700' : 'bg-gradient-to-r from-violet-100 via-fuchsia-50 to-orange-50'}`}>
              <p className={`text-xs font-black uppercase tracking-[0.22em] ${monochrome ? 'text-slate-600' : 'text-violet-600'}`}>Таблица</p>
              <h2 className="mt-1 text-3xl font-black text-slate-900">Римские цифры</h2>
            </header>

            <h3 className="mb-2 text-sm font-black uppercase tracking-wide text-slate-500">Основные обозначения</h3>
            <div className="mb-5 grid grid-cols-4 gap-2 sm:grid-cols-7">
              {BASE_SYMBOLS.map((s) => (
                <div
                  key={s.symbol}
                  className="rounded-xl border-2 p-3 text-center"
                  style={{ backgroundColor: monochrome ? '#fff' : '#f5f3ff', borderColor: monochrome ? '#64748b' : '#c4b5fd' }}
                >
                  <p className="text-2xl font-black" style={{ color: monochrome ? '#0f172a' : '#6d28d9' }}>{s.symbol}</p>
                  <p className="mt-1 text-xs font-bold text-slate-500">{s.value}</p>
                </div>
              ))}
            </div>

            <section className={`mb-5 rounded-2xl border-2 p-4 ${monochrome ? 'border-slate-500' : 'border-violet-200 bg-violet-50'}`}>
              <h3 className="mb-2 text-sm font-black uppercase tracking-wide text-slate-500 text-center">Правило записи</h3>
              <p className="text-sm font-semibold text-slate-700">
                Если меньший знак стоит после большего — их значения складывают: VI = 5 + 1 = 6.
                Если меньший знак стоит перед большим — его значение вычитают: IX = 10 − 1 = 9.
              </p>
            </section>

            <h3 className="mb-2 text-sm font-black uppercase tracking-wide text-slate-500">Числа от 1 до 20</h3>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
              {NUMBERS.map((n) => (
                <div
                  key={n}
                  className="rounded-xl border-2 px-2 py-2.5 text-center"
                  style={{ backgroundColor: monochrome ? '#fff' : '#f8fafc', borderColor: monochrome ? '#475569' : '#e2e8f0' }}
                >
                  <p className="font-mono text-lg font-black" style={{ color: monochrome ? '#0f172a' : '#4c1d95' }}>{toRoman(n)}</p>
                  <p className="mt-0.5 text-xs font-bold text-slate-500">{n}</p>
                </div>
              ))}
            </div>

            {!quota.isSubscriber && (
              <p className="mt-4 text-center text-[10px] font-semibold tracking-wide text-slate-400">Знаторика · znatorica.ru</p>
            )}
          </div>
        </section>

        <section className="no-print mx-auto mt-8 max-w-3xl rounded-2xl border border-white/15 bg-white/[0.06] p-6">
          <h2 className="text-2xl font-black">Как читать римские цифры</h2>
          <p className="mt-3 leading-relaxed text-white/70">
            Разбей число на разряды и переведи каждый отдельно: например, 24 = 20 + 4 = XX + IV = XXIV.
            Римские цифры до сих пор встречаются на циферблатах часов, в названиях веков и в оглавлениях книг.
          </p>
        </section>
      </div>
    </main>
  );
}
