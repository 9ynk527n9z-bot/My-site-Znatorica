'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import ExportToolbar from '@/components/ExportToolbar';
import { useGeneratorQuota } from '@/lib/useGeneratorQuota';

const ENDINGS = [
  { person: '1-е лицо (я, мы)', first: '-у, -ю / -ем', second: '-у, -ю / -им' },
  { person: '2-е лицо (ты, вы)', first: '-ешь / -ете', second: '-ишь / -ите' },
  { person: '3-е лицо (он, они)', first: '-ет / -ут, -ют', second: '-ит / -ат, -ят' },
];

const EXCEPTIONS_II = ['гнать', 'держать', 'дышать', 'слышать', 'видеть', 'ненавидеть', 'зависеть', 'вертеть', 'обидеть', 'терпеть', 'смотреть'];
const EXCEPTIONS_I = ['брить', 'стелить'];

export default function SpryazhenieTablePage() {
  const quota = useGeneratorQuota();
  const [monochrome, setMonochrome] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  return (
    <main className="min-h-screen px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link href="/tablicy" className="no-print mb-4 inline-block text-sm text-orange hover:underline">
          ← Все таблицы
        </Link>

        <header className="no-print mt-4 mb-8 max-w-3xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold text-violet-100">
            📚 Русский язык · 3–4 класс
          </div>
          <h1 className="text-3xl font-black leading-tight sm:text-4xl">Спряжение глаголов</h1>
          <p className="mt-3 text-white/70 leading-relaxed">
            Личные окончания I и II спряжения, алгоритм определения спряжения по неопределённой форме и глаголы-исключения.
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
            <ExportToolbar targetRef={printRef} filename="spryazhenie-glagolov" />
          </div>

          <div
            ref={printRef}
            className={`mx-auto rounded-[28px] border-[3px] bg-white p-5 sm:p-8 ${monochrome ? 'border-slate-700 grayscale' : 'border-violet-400'}`}
          >
            <header className={`mb-5 rounded-2xl px-5 py-4 text-center ${monochrome ? 'border-2 border-slate-700' : 'bg-gradient-to-r from-violet-100 via-fuchsia-50 to-orange-50'}`}>
              <p className={`text-xs font-black uppercase tracking-[0.22em] ${monochrome ? 'text-slate-600' : 'text-violet-600'}`}>Таблица</p>
              <h2 className="mt-1 text-3xl font-black text-slate-900">Спряжение глаголов</h2>
            </header>

            <div className="overflow-hidden rounded-2xl border-2 border-slate-200">
              <div className="grid grid-cols-[1.3fr_1fr_1fr] gap-3 bg-[#4C1D95] px-4 py-2 text-[11px] font-black uppercase tracking-wide text-white">
                <span>Лицо</span>
                <span>I спряжение</span>
                <span>II спряжение</span>
              </div>
              {ENDINGS.map((row, index) => (
                <div
                  key={row.person}
                  className="grid grid-cols-[1.3fr_1fr_1fr] gap-3 border-b-2 px-4 py-3 last:border-b-0"
                  style={{ backgroundColor: monochrome ? (index % 2 ? '#f8fafc' : '#fff') : index % 2 ? '#eff6ff' : '#fff', borderColor: monochrome ? '#cbd5e1' : '#dbeafe' }}
                >
                  <p className="text-sm font-bold text-slate-700">{row.person}</p>
                  <p className="font-black" style={{ color: monochrome ? '#0f172a' : '#1d4ed8' }}>{row.first}</p>
                  <p className="font-black" style={{ color: monochrome ? '#0f172a' : '#6d28d9' }}>{row.second}</p>
                </div>
              ))}
            </div>

            <section className={`mt-5 rounded-2xl border-2 p-4 ${monochrome ? 'border-slate-500' : 'border-violet-200 bg-violet-50'}`}>
              <h3 className={`text-center text-base font-black ${monochrome ? 'text-slate-900' : 'text-violet-800'}`}>
                Как определить спряжение
              </h3>
              <ol className="mt-3 grid gap-3 text-sm text-slate-700 sm:grid-cols-3">
                <li className="rounded-xl border-2 border-rose-300 bg-rose-50 p-3">
                  <b className="block text-rose-700">1. Проверь окончание</b>
                  <span className="mt-1 block font-semibold">Если личное окончание глагола под ударением — определяй спряжение прямо по нему.</span>
                </li>
                <li className="rounded-xl border-2 border-amber-300 bg-amber-50 p-3">
                  <b className="block text-amber-700">2. Поставь в неопр. форму</b>
                  <span className="mt-1 block font-semibold">Если окончание безударное — поставь глагол в начальную форму: что делать?</span>
                </li>
                <li className="rounded-xl border-2 border-sky-300 bg-sky-50 p-3">
                  <b className="block text-sky-700">3. Посмотри на -ить</b>
                  <span className="mt-1 block font-semibold">Оканчивается на -ить — II спряжение. Все остальные — I спряжение. Кроме исключений.</span>
                </li>
              </ol>
            </section>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <section className={`rounded-2xl border-2 p-4 ${monochrome ? 'border-slate-500' : 'border-cyan-300 bg-cyan-50'}`}>
                <h3 className="text-sm font-black text-slate-900">Исключения — II спряжение</h3>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {EXCEPTIONS_II.map((word) => (
                    <span
                      key={word}
                      className="rounded-full px-2.5 py-1 text-xs font-black"
                      style={{
                        backgroundColor: monochrome ? '#e2e8f0' : '#cffafe',
                        color: monochrome ? '#1e293b' : '#0e7490',
                      }}
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </section>
              <section className={`rounded-2xl border-2 p-4 ${monochrome ? 'border-slate-500' : 'border-orange-300 bg-orange-50'}`}>
                <h3 className="text-sm font-black text-slate-900">Исключения — I спряжение</h3>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {EXCEPTIONS_I.map((word) => (
                    <span
                      key={word}
                      className="rounded-full px-2.5 py-1 text-xs font-black"
                      style={{
                        backgroundColor: monochrome ? '#e2e8f0' : '#fed7aa',
                        color: monochrome ? '#1e293b' : '#c2410c',
                      }}
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            {!quota.isSubscriber && (
              <p className="mt-4 text-center text-[10px] font-semibold tracking-wide text-slate-400">Знаторика · znatorica.ru</p>
            )}
          </div>
        </section>

        <section className="no-print mx-auto mt-8 max-w-3xl rounded-2xl border border-white/15 bg-white/[0.06] p-6">
          <h2 className="text-2xl font-black">Как пользоваться таблицей</h2>
          <p className="mt-3 leading-relaxed text-white/70">
            Если личное окончание глагола стоит под ударением, спряжение видно сразу. Если окончание безударное,
            смотри на неопределённую форму — и не забывай про глаголы-исключения, которые не подчиняются общему правилу.
          </p>
          <nav className="mt-5 flex flex-wrap gap-3" aria-label="Материалы по спряжению глаголов">
            <Link href="/trenazher/spryazhenie-3klass" className="btn-primary px-5 py-2.5 text-sm">
              Тренажёр спряжения глаголов
            </Link>
          </nav>
        </section>
      </div>
    </main>
  );
}
