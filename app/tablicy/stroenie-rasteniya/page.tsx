'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import ExportToolbar from '@/components/ExportToolbar';
import { useGeneratorQuota } from '@/lib/useGeneratorQuota';

const LABELS = [
  { text: 'Цветок', className: 'left-[29%] top-[15%]', color: '#be185d' },
  { text: 'Лист', className: 'left-[17%] top-[38%]', color: '#15803d' },
  { text: 'Стебель', className: 'left-[42%] top-[55%]', color: '#3f6212' },
  { text: 'Плод', className: 'right-[17%] top-[34%]', color: '#047857' },
  { text: 'Семя', className: 'right-[7%] top-[49%]', color: '#a16207' },
  { text: 'Корень', className: 'left-[34%] bottom-[12%]', color: '#92400e' },
];

export default function PlantStructurePage() {
  const printRef = useRef<HTMLDivElement>(null);
  const quota = useGeneratorQuota();

  return (
    <main className="min-h-screen px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link href="/tablicy" className="no-print mb-4 inline-block text-sm text-orange hover:underline">← Все таблицы</Link>
        <header className="no-print mx-auto mb-7 max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-violet-200">🌱 Окружающий мир · 1–3 класс</p>
          <h1 className="mt-2 text-[26px] font-black sm:text-[44px]">Строение растения</h1>
          <p className="mt-3 text-white/70">Основные части цветкового растения на одной наглядной схеме.</p>
        </header>

        <section className="card print-page bg-white !p-4 text-slate-900 sm:!p-6">
          <div className="no-print mb-4 flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm font-bold text-slate-500">Готовый учебный лист</span>
            <ExportToolbar targetRef={printRef} filename="stroenie-rasteniya" />
          </div>

          <div ref={printRef} className="mx-auto rounded-[28px] border-[3px] border-violet-400 bg-white p-5 sm:p-8">
            <header className="mb-4 rounded-2xl border-2 border-emerald-400 bg-emerald-50 px-4 py-3 text-center">
              <h2 className="text-2xl font-black text-emerald-800 sm:text-3xl">Строение растения</h2>
            </header>

            <div className="relative overflow-hidden rounded-2xl border-2 border-emerald-300 bg-white">
              <Image src="/images/tablicy/stroenie-rasteniya.png" alt="Строение растения: корень, стебель, листья, цветок, плод и семя" width={1536} height={1024} className="h-auto w-full" priority unoptimized />
              {LABELS.map((label) => (
                <span key={label.text} className={`absolute rounded-xl border-2 bg-white/95 px-2 py-1 text-[10px] font-black shadow-md sm:px-4 sm:py-2 sm:text-lg ${label.className}`} style={{ borderColor: label.color, color: label.color }}>{label.text}</span>
              ))}
            </div>
            {!quota.isSubscriber && <p className="mt-4 text-center text-[10px] font-semibold tracking-wide text-slate-400">Знаторика · znatorica.ru</p>}
          </div>
        </section>

        <section className="no-print mx-auto mt-8 max-w-3xl rounded-3xl border border-white/15 bg-white/10 p-6 text-white/80 sm:p-8">
          <h2 className="text-2xl font-black text-white">Таблица «Строение растения» для начальной школы</h2>
          <p className="mt-3 leading-7">
            Наглядная таблица помогает детям запомнить основные части цветкового растения: корень, стебель, лист, цветок, плод и семя. Подписи расположены непосредственно рядом с соответствующими частями растения, поэтому ребёнку легко сопоставить название с изображением.
          </p>
          <p className="mt-3 leading-7">
            Материал подойдёт для уроков окружающего мира в 1–3 классах, повторения темы дома и подготовки небольшого сообщения о растениях. Таблицу можно рассмотреть на экране, распечатать или сохранить в PDF и PNG. Она подходит для знакомства со строением растения и последующего устного опроса по схеме.
          </p>
        </section>
      </div>
    </main>
  );
}
