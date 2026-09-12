'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import ExportToolbar from '@/components/ExportToolbar';
import { useGeneratorQuota } from '@/lib/useGeneratorQuota';

const LABELS = [
  { text: 'Глаза — зрение', className: 'left-[20%] top-[31%]', tone: 'border-emerald-600 text-emerald-800' },
  { text: 'Нос — обоняние', className: 'left-[16%] top-[65%]', tone: 'border-amber-500 text-amber-800' },
  { text: 'Уши — слух', className: 'left-[80%] top-[31%]', tone: 'border-sky-500 text-sky-800' },
  { text: 'Язык — вкус', className: 'left-[83%] top-[70%]', tone: 'border-rose-500 text-rose-800' },
  { text: 'Кожа — осязание', className: 'left-[52%] bottom-[3%]', tone: 'border-blue-500 text-blue-800' },
];

export default function SenseOrgansPage() {
  const printRef = useRef<HTMLDivElement>(null);
  const quota = useGeneratorQuota();

  return (
    <main className="min-h-screen px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link href="/tablicy" className="no-print mb-4 inline-block text-sm text-orange hover:underline">← Все таблицы</Link>
        <header className="no-print mx-auto mb-7 max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-violet-200">👁️ Окружающий мир · 1–2 класс</p>
          <h1 className="mt-2 text-[26px] font-black sm:text-[44px]">Органы чувств человека</h1>
          <p className="mt-3 text-white/70">Пять органов чувств и их назначение на одной схеме.</p>
        </header>

        <section className="card print-page bg-white !p-4 text-slate-900 sm:!p-6">
          <div className="no-print mb-4 flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm font-bold text-slate-500">Готовый учебный лист</span>
            <ExportToolbar targetRef={printRef} filename="organy-chuvstv" />
          </div>

          <div ref={printRef} className="mx-auto rounded-[28px] border-[3px] border-sky-400 bg-white p-5 sm:p-8">
            <header className="mb-4 rounded-2xl border-2 border-sky-400 bg-sky-50 px-4 py-3 text-center">
              <h2 className="text-2xl font-black text-sky-800 sm:text-3xl">Органы чувств человека</h2>
            </header>
            <div className="relative overflow-hidden rounded-2xl border-2 border-sky-300 bg-white">
              <Image src="/images/tablicy/organy-chuvstv.png" alt="Органы чувств человека: глаза, уши, нос, язык и кожа" width={1536} height={1024} className="h-auto w-full" priority unoptimized />
              {LABELS.map((label) => (
                <span key={label.text} className={`absolute -translate-x-1/2 rounded-lg border-2 bg-white/95 px-2 py-1 text-[8px] font-black shadow-md sm:px-3 sm:py-2 sm:text-base ${label.className} ${label.tone}`}>{label.text}</span>
              ))}
            </div>
            {!quota.isSubscriber && <p className="mt-4 text-center text-[10px] font-semibold tracking-wide text-slate-400">Знаторика · znatorica.ru</p>}
          </div>
        </section>

        <section className="no-print mx-auto mt-8 max-w-3xl rounded-3xl border border-white/15 bg-white/10 p-6 text-white/80 sm:p-8">
          <h2 className="text-2xl font-black text-white">Таблица органов чувств для начальной школы</h2>
          <p className="mt-3 leading-7">Органы чувств помогают человеку получать информацию об окружающем мире. Глазами мы видим, ушами слышим, носом различаем запахи, языком определяем вкус, а благодаря коже ощущаем прикосновение, тепло и холод.</p>
          <p className="mt-3 leading-7">Наглядная таблица подойдёт для уроков окружающего мира в 1–2 классах, повторения дома и устной проверки знаний. Материал можно рассмотреть на экране, распечатать или сохранить в PDF и PNG.</p>
        </section>
      </div>
    </main>
  );
}
