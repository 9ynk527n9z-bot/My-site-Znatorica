'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import ExportToolbar from '@/components/ExportToolbar';
import { useGeneratorQuota } from '@/lib/useGeneratorQuota';

const LABELS = [
  { text: 'Солнце', className: 'left-[9%]' },
  { text: 'Трава', className: 'left-[29%]' },
  { text: 'Кузнечик', className: 'left-[49%]' },
  { text: 'Лягушка', className: 'left-[68%]' },
  { text: 'Аист', className: 'left-[88%]' },
];

export default function FoodChainPage() {
  const printRef = useRef<HTMLDivElement>(null);
  const quota = useGeneratorQuota();

  return (
    <main className="min-h-screen px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link href="/tablicy" className="no-print mb-4 inline-block text-sm text-orange hover:underline">← Все таблицы</Link>
        <header className="no-print mx-auto mb-7 max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-violet-200">🌿 Окружающий мир · 2–3 класс</p>
          <h1 className="mt-2 text-[26px] font-black sm:text-[44px]">Цепь питания</h1>
          <p className="mt-3 text-white/70">Наглядный пример связи живых организмов в природе.</p>
        </header>

        <section className="card print-page bg-white !p-4 text-slate-900 sm:!p-6">
          <div className="no-print mb-4 flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm font-bold text-slate-500">Готовый учебный лист</span>
            <ExportToolbar targetRef={printRef} filename="tsep-pitaniya" />
          </div>

          <div ref={printRef} className="mx-auto rounded-[28px] border-[3px] border-emerald-400 bg-white p-5 sm:p-8">
            <header className="mb-4 rounded-2xl border-2 border-emerald-400 bg-emerald-50 px-4 py-3 text-center">
              <h2 className="text-2xl font-black text-emerald-800 sm:text-3xl">Цепь питания</h2>
            </header>

            <div className="relative overflow-hidden rounded-2xl border-2 border-emerald-300 bg-white">
              <Image src="/images/tablicy/tsep-pitaniya.png" alt="Цепь питания: солнце, трава, кузнечик, лягушка и аист" width={1536} height={1024} className="h-auto w-full" priority unoptimized />
              {LABELS.map((label) => (
                <span key={label.text} className={`absolute bottom-[8%] -translate-x-1/2 rounded-xl border-2 border-emerald-600 bg-white/95 px-2 py-1 text-[9px] font-black text-emerald-800 shadow-md sm:px-3 sm:py-2 sm:text-base ${label.className}`}>{label.text}</span>
              ))}
            </div>
            {!quota.isSubscriber && <p className="mt-4 text-center text-[10px] font-semibold tracking-wide text-slate-400">Знаторика · znatorica.ru</p>}
          </div>
        </section>

        <section className="no-print mx-auto mt-8 max-w-3xl rounded-3xl border border-white/15 bg-white/10 p-6 text-white/80 sm:p-8">
          <h2 className="text-2xl font-black text-white">Цепь питания для урока окружающего мира</h2>
          <p className="mt-3 leading-7">Таблица показывает простой пример пищевой цепи: солнечный свет помогает расти траве, травой питается кузнечик, кузнечика съедает лягушка, а лягушкой может питаться аист. Стрелки показывают направление передачи энергии от одного звена к следующему.</p>
          <p className="mt-3 leading-7">Наглядный материал подойдёт для изучения темы в 2–3 классах, повторения дома и устного разбора связей между организмами. Таблицу можно рассмотреть на экране, распечатать или сохранить в PDF и PNG.</p>
        </section>
      </div>
    </main>
  );
}
