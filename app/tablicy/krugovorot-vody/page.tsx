'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import ExportToolbar from '@/components/ExportToolbar';
import { useGeneratorQuota } from '@/lib/useGeneratorQuota';

const STAGES = [
  { number: '1', title: 'Испарение', text: 'Солнце нагревает воду. Она превращается в водяной пар и поднимается вверх.', color: '#0369a1', pale: '#e0f2fe' },
  { number: '2', title: 'Конденсация', text: 'Высоко в небе водяной пар охлаждается и превращается в мельчайшие капли воды. Образуются облака.', color: '#6d28d9', pale: '#f3e8ff' },
  { number: '3', title: 'Осадки', text: 'Капли в облаках становятся крупнее и выпадают на землю в виде дождя или снега.', color: '#1d4ed8', pale: '#dbeafe' },
  { number: '4', title: 'Возвращение воды', text: 'Вода стекает в реки, озёра и моря, а часть просачивается в почву. Затем круговорот повторяется.', color: '#15803d', pale: '#dcfce7' },
];

export default function WaterCyclePage() {
  const printRef = useRef<HTMLDivElement>(null);
  const quota = useGeneratorQuota();

  return (
    <main className="min-h-screen px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link href="/tablicy" className="no-print mb-4 inline-block text-sm text-orange hover:underline">← Все таблицы</Link>
        <header className="no-print mx-auto mb-7 max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-violet-200">🌍 Окружающий мир · 2–3 класс</p>
          <h1 className="mt-2 text-[26px] font-black sm:text-[44px]">Круговорот воды в природе</h1>
          <p className="mt-3 text-white/70">Наглядная схема и четыре основных этапа движения воды в природе.</p>
        </header>

        <section className="card print-page bg-white !p-4 text-slate-900 sm:!p-6">
          <div className="no-print mb-4 flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm font-bold text-slate-500">Готовый учебный лист</span>
            <ExportToolbar targetRef={printRef} filename="krugovorot-vody" />
          </div>

          <div ref={printRef} className="mx-auto rounded-[28px] border-[3px] border-violet-400 bg-white p-5 sm:p-8">
            <header className="mb-4 rounded-2xl border-2 border-violet-300 bg-violet-100 px-4 py-3 text-center">
              <h2 className="text-2xl font-black sm:text-3xl" style={{ color: '#4c1d95' }}>Круговорот воды в природе</h2>
            </header>

            <div id="schema" className="relative scroll-mt-20 overflow-hidden rounded-2xl border-2 border-sky-300 bg-sky-50">
              <Image src="/images/tablicy/krugovorot-vody.png" alt="Схема круговорота воды в природе: испарение, облака, осадки и возвращение воды" width={1536} height={1024} className="h-auto w-full" priority unoptimized />
              <span className="absolute left-[7%] top-[46%] flex items-center gap-1.5 rounded-xl border-2 border-sky-500 bg-white/95 px-2 py-1 font-black text-sky-800 shadow-md sm:px-3 sm:text-base"><b className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-600 text-xs text-white sm:h-6 sm:w-6 sm:text-sm">1</b>Испарение</span>
              <span className="absolute left-[36%] top-[6%] flex items-center gap-1.5 rounded-xl border-2 border-violet-500 bg-white/95 px-2 py-1 font-black text-violet-800 shadow-md sm:px-3 sm:text-base"><b className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 text-xs text-white sm:h-6 sm:w-6 sm:text-sm">2</b>Конденсация</span>
              <span className="absolute right-[7%] top-[29%] flex items-center gap-1.5 rounded-xl border-2 border-blue-500 bg-white/95 px-2 py-1 font-black text-blue-800 shadow-md sm:px-3 sm:text-base"><b className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white sm:h-6 sm:w-6 sm:text-sm">3</b>Осадки</span>
              <span className="absolute bottom-[12%] right-[16%] flex items-center gap-1.5 rounded-xl border-2 border-emerald-600 bg-white/95 px-2 py-1 font-black text-emerald-800 shadow-md sm:px-3 sm:text-base"><b className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-xs text-white sm:h-6 sm:w-6 sm:text-sm">4</b>Возвращение воды</span>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {STAGES.map((stage) => (
                <section key={stage.number} className="rounded-2xl border-2 p-3" style={{ backgroundColor: stage.pale, borderColor: stage.color }}>
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-base font-black text-white" style={{ backgroundColor: stage.color }}>{stage.number}</span>
                    <h3 className="text-lg font-black" style={{ color: stage.color }}>{stage.title}</h3>
                  </div>
                  <p className="mt-2 text-sm font-semibold leading-snug text-slate-700">{stage.text}</p>
                </section>
              ))}
            </div>

            <p className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-center text-sm font-bold text-amber-900">Вода постоянно движется между поверхностью Земли и атмосферой. Поэтому этот процесс называется круговоротом.</p>
            {!quota.isSubscriber && <p className="mt-4 text-center text-[10px] font-semibold tracking-wide text-slate-400">Знаторика · znatorica.ru</p>}
          </div>
        </section>
      </div>
    </main>
  );
}
