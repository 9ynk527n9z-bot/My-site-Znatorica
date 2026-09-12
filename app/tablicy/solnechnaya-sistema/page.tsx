'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import ExportToolbar from '@/components/ExportToolbar';
import { useGeneratorQuota } from '@/lib/useGeneratorQuota';

const LABELS = [
  { text: 'Солнце', left: '4%' },
  { text: 'Меркурий', left: '14.5%' },
  { text: 'Венера', left: '22%' },
  { text: 'Земля', left: '31%' },
  { text: 'Марс', left: '40.5%' },
  { text: 'Юпитер', left: '54%' },
  { text: 'Сатурн', left: '70%' },
  { text: 'Уран', left: '83%' },
  { text: 'Нептун', left: '94%' },
];

export default function SolarSystemPage() {
  const printRef = useRef<HTMLDivElement>(null);
  const quota = useGeneratorQuota();
  const [monochrome, setMonochrome] = useState(false);

  return (
    <main className="min-h-screen px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Link href="/tablicy" className="no-print mb-4 inline-block text-sm text-orange hover:underline">← Все таблицы</Link>
        <header className="no-print mx-auto mb-7 max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-violet-200">🪐 Окружающий мир · 4 класс</p>
          <h1 className="mt-2 text-[26px] font-black sm:text-[44px]">Солнечная система</h1>
          <p className="mt-3 text-white/70">Солнце и восемь планет в правильном порядке.</p>
        </header>

        <section className="no-print card mb-6 flex flex-wrap items-center justify-between gap-4 !p-4 sm:!p-5">
          <div><b className="block">Оформление таблицы</b><span className="text-base text-white/60">Цветная или чёрно-белая печать</span></div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setMonochrome(false)} className={`btn-secondary px-4 py-2 text-base ${!monochrome ? 'border-orange' : ''}`}>🌈 Цветная</button>
            <button onClick={() => setMonochrome(true)} className={`btn-secondary px-4 py-2 text-base ${monochrome ? 'border-orange' : ''}`}>◻ Чёрно-белая</button>
          </div>
        </section>

        <section className="card print-page bg-white !p-4 text-slate-900 sm:!p-6">
          <div className="no-print mb-4 flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm font-bold text-slate-500">Готовый учебный лист</span>
            <ExportToolbar targetRef={printRef} filename="solnechnaya-sistema" />
          </div>

          <div ref={printRef} className={`mx-auto rounded-[28px] border-[3px] bg-white p-5 sm:p-8 ${monochrome ? 'border-slate-700 grayscale' : 'border-indigo-500'}`}>
            <header className={`mb-4 rounded-2xl border-2 px-4 py-3 text-center ${monochrome ? 'border-slate-700' : 'border-indigo-500 bg-indigo-50'}`}>
              <h2 className="text-2xl font-black text-indigo-900 sm:text-3xl">Солнечная система</h2>
            </header>
            <div className="relative overflow-hidden rounded-2xl border-2 border-indigo-400 bg-[#061226]">
              <Image src="/images/tablicy/solnechnaya-sistema.png" alt="Солнце и восемь планет Солнечной системы" width={1536} height={1024} className="h-auto w-full" priority unoptimized />
              {LABELS.map((label) => (
                <div key={label.text} className="absolute top-[61%] -translate-x-1/2" style={{ left: label.left }}>
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-base font-black text-sky-200 sm:-top-7 sm:text-2xl" aria-hidden="true">↑</span>
                  <span className="block rounded-lg border border-sky-300 bg-[#071a36]/95 px-1 py-1.5 text-[8px] font-black text-white shadow-lg sm:border-2 sm:px-1.5 sm:text-sm" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>{label.text}</span>
                </div>
              ))}
            </div>
            {!quota.isSubscriber && <p className="mt-4 text-center text-[10px] font-semibold tracking-wide text-slate-400">Знаторика · znatorica.ru</p>}
          </div>
        </section>

        <section className="no-print mx-auto mt-8 max-w-3xl rounded-3xl border border-white/15 bg-white/10 p-6 text-white/80 sm:p-8">
          <h2 className="text-2xl font-black text-white">Планеты Солнечной системы по порядку</h2>
          <p className="mt-3 leading-7">Солнечная система состоит из Солнца и движущихся вокруг него небесных тел. От Солнца планеты расположены так: Меркурий, Венера, Земля, Марс, Юпитер, Сатурн, Уран и Нептун. Первые четыре относятся к планетам земной группы, следующие четыре — к планетам-гигантам.</p>
          <p className="mt-3 leading-7">Таблица подойдёт для уроков окружающего мира в 4 классе, повторения названий планет и их порядка. Изображение показывает планеты в условном масштабе: расстояния и размеры упрощены для наглядности. Материал можно распечатать или сохранить в PDF и PNG.</p>
        </section>
      </div>
    </main>
  );
}
