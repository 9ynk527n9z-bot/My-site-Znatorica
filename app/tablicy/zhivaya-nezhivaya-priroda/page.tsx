'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import ExportToolbar from '@/components/ExportToolbar';
import { useGeneratorQuota } from '@/lib/useGeneratorQuota';

const LABELS = [
  { text: 'Воздух', className: 'left-[12%] top-[31%]', tone: 'border-sky-500 text-sky-800' },
  { text: 'Солнце', className: 'left-[35%] top-[31%]', tone: 'border-amber-500 text-amber-800' },
  { text: 'Вода', className: 'left-[31%] top-[62%]', tone: 'border-blue-500 text-blue-800' },
  { text: 'Камень', className: 'left-[13%] top-[80%]', tone: 'border-slate-500 text-slate-700' },
  { text: 'Птица', className: 'left-[61%] top-[28%]', tone: 'border-emerald-600 text-emerald-800' },
  { text: 'Дерево', className: 'left-[83%] top-[43%]', tone: 'border-emerald-600 text-emerald-800' },
  { text: 'Бабочка', className: 'left-[73%] top-[65%]', tone: 'border-orange-500 text-orange-800' },
  { text: 'Цветок', className: 'left-[58%] top-[80%]', tone: 'border-pink-500 text-pink-800' },
];

export default function LivingNonlivingNaturePage() {
  const printRef = useRef<HTMLDivElement>(null);
  const quota = useGeneratorQuota();

  return (
    <main className="min-h-screen px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link href="/tablicy" className="no-print mb-4 inline-block text-sm text-orange hover:underline">← Все таблицы</Link>
        <header className="no-print mx-auto mb-7 max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-violet-200">🌍 Окружающий мир · 1–2 класс</p>
          <h1 className="mt-2 text-[26px] font-black sm:text-[44px]">Живая и неживая природа</h1>
          <p className="mt-3 text-white/70">Наглядные примеры природных объектов в двух группах.</p>
        </header>

        <section className="card print-page bg-white !p-4 text-slate-900 sm:!p-6">
          <div className="no-print mb-4 flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm font-bold text-slate-500">Готовый учебный лист</span>
            <ExportToolbar targetRef={printRef} filename="zhivaya-nezhivaya-priroda" />
          </div>

          <div ref={printRef} className="mx-auto rounded-[28px] border-[3px] border-emerald-400 bg-white p-5 sm:p-8">
            <header className="mb-4 rounded-2xl border-2 border-emerald-400 bg-emerald-50 px-4 py-3 text-center">
              <h2 className="text-2xl font-black text-emerald-800 sm:text-3xl">Живая и неживая природа</h2>
            </header>

            <div className="relative overflow-hidden rounded-2xl border-2 border-emerald-300 bg-white">
              <Image src="/images/tablicy/zhivaya-nezhivaya-priroda.png" alt="Примеры живой и неживой природы" width={1536} height={1024} className="h-auto w-full -scale-x-100" priority unoptimized />
              <span className="absolute left-[25%] top-[3%] -translate-x-1/2 rounded-xl border-2 border-sky-500 bg-white/95 px-3 py-2 text-sm font-black text-sky-800 shadow-md sm:text-xl">Неживая природа</span>
              <span className="absolute left-[75%] top-[3%] -translate-x-1/2 rounded-xl border-2 border-emerald-600 bg-white/95 px-3 py-2 text-sm font-black text-emerald-800 shadow-md sm:text-xl">Живая природа</span>
              {LABELS.map((label) => (
                <span key={label.text} className={`absolute -translate-x-1/2 rounded-lg border-2 bg-white/95 px-2 py-1 text-[9px] font-black shadow-md sm:px-3 sm:text-base ${label.className} ${label.tone}`}>{label.text}</span>
              ))}
            </div>
            {!quota.isSubscriber && <p className="mt-4 text-center text-[10px] font-semibold tracking-wide text-slate-400">Знаторика · znatorica.ru</p>}
          </div>
        </section>

        <section className="no-print mx-auto mt-8 max-w-3xl rounded-3xl border border-white/15 bg-white/10 p-6 text-white/80 sm:p-8">
          <h2 className="text-2xl font-black text-white">Таблица живой и неживой природы</h2>
          <p className="mt-3 leading-7">Таблица помогает различать объекты живой и неживой природы. Дерево, цветок, бабочка и птица относятся к живой природе: они питаются, растут, развиваются и размножаются. Солнце, вода, воздух и камень относятся к неживой природе.</p>
          <p className="mt-3 leading-7">Материал подойдёт для уроков окружающего мира в 1–2 классах, повторения темы дома и устной проверки знаний. Таблицу можно рассмотреть на экране, распечатать или сохранить в PDF и PNG.</p>
        </section>
      </div>
    </main>
  );
}
