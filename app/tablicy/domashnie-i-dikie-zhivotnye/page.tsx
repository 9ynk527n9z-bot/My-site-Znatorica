'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import ExportToolbar from '@/components/ExportToolbar';
import { useGeneratorQuota } from '@/lib/useGeneratorQuota';

const DOMESTIC = [
  { emoji: '🐄', name: 'Корова' },
  { emoji: '🐱', name: 'Кошка' },
  { emoji: '🐶', name: 'Собака' },
  { emoji: '🐴', name: 'Лошадь' },
  { emoji: '🐷', name: 'Свинья' },
  { emoji: '🐐', name: 'Коза' },
  { emoji: '🐹', name: 'Хомяк' },
  { emoji: '🐑', name: 'Овца' },
  { emoji: '🐰', name: 'Кролик' },
  { emoji: '🫏', name: 'Осёл' },
];

const WILD = [
  { emoji: '🐺', name: 'Волк' },
  { emoji: '🦊', name: 'Лиса' },
  { emoji: '🐻', name: 'Медведь' },
  { emoji: '🐇', name: 'Заяц' },
  { emoji: '🦔', name: 'Ёж' },
  { emoji: '🐿️', name: 'Белка' },
  { emoji: '🫎', name: 'Лось' },
  { emoji: '🐗', name: 'Кабан' },
  { emoji: '🦡', name: 'Барсук' },
  { emoji: '🦫', name: 'Бобр' },
];

export default function AnimalsTablePage() {
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
            🌍 Окружающий мир · 4–6 лет
          </div>
          <h1 className="text-3xl font-black leading-tight sm:text-4xl">Домашние и дикие животные</h1>
          <p className="mt-3 text-lg text-white/70 leading-relaxed">
            20 животных, разделённых на две группы: живущие рядом с человеком и живущие в лесу.
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
            <p className="text-sm font-medium text-slate-500">Готовый учебный лист · 20 животных</p>
            <ExportToolbar targetRef={printRef} filename="domashnie-i-dikie-zhivotnye" />
          </div>

          <div
            ref={printRef}
            className={`mx-auto rounded-[28px] border-[3px] bg-white p-5 sm:p-8 ${monochrome ? 'border-slate-700 grayscale' : 'border-violet-400'}`}
          >
            <header className={`mb-5 rounded-2xl px-5 py-4 text-center ${monochrome ? 'border-2 border-slate-700' : 'bg-gradient-to-r from-violet-100 via-fuchsia-50 to-orange-50'}`}>
              <p className={`text-base font-black uppercase tracking-[0.22em] ${monochrome ? 'text-slate-600' : 'text-violet-600'}`}>Таблица</p>
              <h2 className="mt-1 text-3xl font-black text-slate-900">Домашние и дикие животные</h2>
            </header>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border-2 p-3" style={{ backgroundColor: monochrome ? '#fff' : '#fff7ed', borderColor: monochrome ? '#64748b' : '#fdba74' }}>
                <p
                  className="mb-3 rounded-xl px-3 py-2 text-center text-lg font-black uppercase tracking-wide text-white"
                  style={{ backgroundColor: monochrome ? '#334155' : '#c2410c' }}
                >
                  🏠 Домашние
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {DOMESTIC.map((a) => (
                    <div key={a.name} className="rounded-xl bg-white/70 px-2 py-2 text-center">
                      <p className="text-3xl">{monochrome ? '' : a.emoji}</p>
                      <p className="mt-1 text-lg font-bold text-slate-700">{a.name}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-center text-sm font-semibold text-slate-500">живут рядом с человеком</p>
              </div>

              <div className="rounded-2xl border-2 p-3" style={{ backgroundColor: monochrome ? '#fff' : '#f0fdf4', borderColor: monochrome ? '#64748b' : '#86efac' }}>
                <p
                  className="mb-3 rounded-xl px-3 py-2 text-center text-lg font-black uppercase tracking-wide text-white"
                  style={{ backgroundColor: monochrome ? '#334155' : '#15803d' }}
                >
                  🌲 Дикие
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {WILD.map((a) => (
                    <div key={a.name} className="rounded-xl bg-white/70 px-2 py-2 text-center">
                      <p className="text-3xl">{monochrome ? '' : a.emoji}</p>
                      <p className="mt-1 text-lg font-bold text-slate-700">{a.name}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-center text-sm font-semibold text-slate-500">живут в лесу</p>
              </div>
            </div>

            {!quota.isSubscriber && (
              <p className="mt-4 text-center text-[10px] font-semibold tracking-wide text-slate-400">Знаторика · znatorica.ru</p>
            )}
          </div>
        </section>

        <section className="no-print mx-auto mt-8 max-w-3xl rounded-2xl border border-white/15 bg-white/[0.06] p-6">
          <h2 className="text-2xl font-black">Как пользоваться таблицей</h2>
          <p className="mt-3 leading-relaxed text-white/70">
            Главный признак — заботится ли о животном человек. Домашних животных кормит и содержит человек,
            дикие сами добывают еду и строят жильё в природе.
          </p>
          <nav className="mt-5 flex flex-wrap gap-3" aria-label="Материалы по домашним и диким животным">
            <Link href="/trenazher/domashnie-dikie" className="btn-primary px-5 py-2.5 text-sm">
              Тренажёр «Домашние и дикие животные»
            </Link>
          </nav>
        </section>
      </div>
    </main>
  );
}
