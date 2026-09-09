'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { trackUsage } from '@/lib/track';
import ExportToolbar from '@/components/ExportToolbar';

const WEEKDAYS = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
const MONTHS = [
  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
];

const LEGEND = [
  { emoji: '☀️', label: 'Ясно' },
  { emoji: '⛅', label: 'Переменная облачность' },
  { emoji: '☁️', label: 'Пасмурно' },
  { emoji: '🌧️', label: 'Дождь' },
  { emoji: '⛈️', label: 'Гроза' },
  { emoji: '❄️', label: 'Снег' },
  { emoji: '🌫️', label: 'Туман' },
];

const PERIODS = [7, 14, 30] as const;
type Level = 'simple' | 'detailed';

interface Row {
  n: number;
  date: string | null;
  weekday: string | null;
}

interface Settings {
  name: string;
  klass: string;
  level: Level;
  rows: Row[];
}

export default function DnevnikPogodyPage() {
  const [name, setName] = useState('');
  const [klass, setKlass] = useState('');
  const [period, setPeriod] = useState<number>(14);
  const [level, setLevel] = useState<Level>('simple');
  const [startDate, setStartDate] = useState('');
  const [result, setResult] = useState<Settings | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  function handleGenerate() {
    const rows: Row[] = [];
    const start = startDate ? new Date(startDate + 'T00:00:00') : null;
    for (let i = 0; i < period; i++) {
      if (start) {
        const d = new Date(start);
        d.setDate(d.getDate() + i);
        rows.push({ n: i + 1, date: `${d.getDate()} ${MONTHS[d.getMonth()]}`, weekday: WEEKDAYS[d.getDay()] });
      } else {
        rows.push({ n: i + 1, date: null, weekday: null });
      }
    }
    setResult({ name, klass, level, rows });
    trackUsage('generator:dnevnik-nablyudeniy-za-pogodoy');
  }

  return (
    <main className="min-h-screen px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link href="/generator" className="no-print text-sm text-orange hover:underline">
          ← Все генераторы
        </Link>

        <div className="no-print mt-3 mb-8 max-w-3xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold text-violet-100">
            🌦️ Окружающий мир · 1–4 класс
          </div>
          <h1 className="text-3xl font-black leading-tight sm:text-4xl">Дневник наблюдений за погодой</h1>
          <p className="mt-3 text-white/70">
            Готовая таблица для ежедневных наблюдений: ребёнок каждый день отмечает погоду значком
            и заполняет остальные графы от руки. Укажи дату начала — числа и дни недели подставятся
            сами, без даты останутся пустые строки на заполнение.
          </p>
        </div>

        <section className="card no-print mb-8 overflow-hidden !p-4 sm:!p-6 space-y-6">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange/20 text-lg">1</span>
              <div>
                <h2 className="font-extrabold">Кто наблюдает</h2>
                <p className="text-sm text-white/55">Появится на обложке дневника</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Имя ученика (необязательно)"
                className="w-full px-4 py-2 rounded-lg bg-black border border-[#2D2350] text-white placeholder-gray-500 focus:border-orange outline-none"
              />
              <input
                type="text"
                value={klass}
                onChange={(e) => setKlass(e.target.value)}
                placeholder="Класс, например 2 «А»"
                className="w-full px-4 py-2 rounded-lg bg-black border border-[#2D2350] text-white placeholder-gray-500 focus:border-orange outline-none"
              />
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange/20 text-lg">2</span>
              <div>
                <h2 className="font-extrabold">Сколько дней наблюдать</h2>
              </div>
            </div>
            <div className="flex gap-3 flex-wrap">
              {PERIODS.map((p) => (
                <button
                  key={p}
                  type="button"
                  aria-pressed={period === p}
                  onClick={() => setPeriod(p)}
                  className={`px-5 py-2 rounded-lg font-bold transition-colors text-sm ${
                    period === p ? 'bg-orange text-white' : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
                  }`}
                >
                  {p === 7 ? 'Неделя' : p === 14 ? '2 недели' : 'Месяц'} ({p} дн.)
                </button>
              ))}
            </div>
            <div className="mt-4">
              <label className="block text-sm text-white/55 mb-2">Дата начала (необязательно — иначе строки пустые)</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="px-4 py-2 rounded-lg bg-black border border-[#2D2350] text-white focus:border-orange outline-none"
              />
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange/20 text-lg">3</span>
              <div>
                <h2 className="font-extrabold">Уровень подробности</h2>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {(
                [
                  { id: 'simple' as Level, title: 'Простой', subtitle: '1–2 класс', desc: 'Дата · день недели · погода значком · заметка' },
                  { id: 'detailed' as Level, title: 'Подробный', subtitle: '3–4 класс', desc: '+ температура, облачность и ветер' },
                ]
              ).map((item) => {
                const selected = level === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setLevel(item.id)}
                    className={`relative rounded-2xl border p-5 text-left transition-all ${
                      selected
                        ? 'border-orange bg-gradient-to-br from-orange/25 via-pink-500/15 to-violet-500/20 shadow-[0_12px_32px_rgba(255,126,95,0.16)]'
                        : 'border-white/15 bg-white/[0.06] hover:border-white/35 hover:bg-white/[0.09]'
                    }`}
                  >
                    <span className="mb-2 flex items-start justify-between gap-3">
                      <strong className="text-lg">{item.title}</strong>
                      <span className={`flex h-6 w-6 items-center justify-center rounded-full border ${selected ? 'border-orange bg-orange text-white' : 'border-white/30'}`}>
                        {selected ? '✓' : ''}
                      </span>
                    </span>
                    <span className="block text-sm text-white/60">{item.subtitle}</span>
                    <span className="mt-2 block text-sm text-white/70">{item.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <button type="button" onClick={handleGenerate} className="btn-primary w-full py-3 text-base">
            ✨ Создать дневник
          </button>
        </section>

        {result && (
          <section className="card print-page bg-white !p-4 text-slate-900 sm:!p-6">
            <div className="no-print mb-5 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-medium text-slate-500">
                Готово: {result.rows.length} дней · {result.level === 'simple' ? 'простой' : 'подробный'} уровень
              </p>
              <ExportToolbar targetRef={printRef} filename="dnevnik-nablyudeniy-za-pogodoy" />
            </div>

            <div ref={printRef} className="rounded-2xl border-2 border-[#A78BFA] bg-white p-5 sm:p-7">
              <header className="mb-4 flex items-center justify-between gap-4 border-b-2 border-violet-100 pb-4">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-violet">Окружающий мир</p>
                  <h2 className="mt-1 text-2xl font-black text-[#3a1c6e]">Дневник наблюдений за погодой</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {result.name || 'Ученик(-ца)'}{result.klass ? `, ${result.klass} класс` : ''}
                  </p>
                </div>
                <div className="rounded-2xl bg-violet-100 px-5 py-3 text-center text-violet-800 shrink-0">
                  <span className="block text-4xl leading-none">🌦️</span>
                </div>
              </header>

              <div className="mb-5 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-slate-600">
                {LEGEND.map((l) => (
                  <span key={l.label} className="whitespace-nowrap">
                    <span className="text-lg align-middle mr-1">{l.emoji}</span>
                    {l.label}
                  </span>
                ))}
              </div>

              <table className="w-full border-collapse text-black text-sm">
                <thead>
                  <tr>
                    <th className="border-2 border-violet bg-violet text-white py-2 w-8">№</th>
                    <th className="border-2 border-violet bg-violet text-white py-2">Дата</th>
                    <th className="border-2 border-violet bg-violet text-white py-2">День недели</th>
                    <th className="border-2 border-violet bg-violet text-white py-2 w-16">Погода</th>
                    {result.level === 'detailed' && (
                      <>
                        <th className="border-2 border-violet bg-violet text-white py-2 w-20">t°C</th>
                        <th className="border-2 border-violet bg-violet text-white py-2">Облачность</th>
                        <th className="border-2 border-violet bg-violet text-white py-2">Ветер</th>
                      </>
                    )}
                    <th className="border-2 border-violet bg-violet text-white py-2">Заметка</th>
                  </tr>
                </thead>
                <tbody>
                  {result.rows.map((row) => (
                    <tr key={row.n} className={row.n % 2 === 0 ? 'bg-orange/10' : 'bg-white'}>
                      <td className="border-2 border-gray-300 text-center py-2">{row.n}</td>
                      <td className="border-2 border-gray-300 text-center py-2">{row.date ?? ' '}</td>
                      <td className="border-2 border-gray-300 text-center py-2">{row.weekday ?? ' '}</td>
                      <td className="border-2 border-gray-300 py-2">&nbsp;</td>
                      {result.level === 'detailed' && (
                        <>
                          <td className="border-2 border-gray-300 py-2">&nbsp;</td>
                          <td className="border-2 border-gray-300 py-2">&nbsp;</td>
                          <td className="border-2 border-gray-300 py-2">&nbsp;</td>
                        </>
                      )}
                      <td className="border-2 border-gray-300 py-2">&nbsp;</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <footer className="mt-4 flex items-center justify-between border-t border-violet-100 pt-3 text-xs text-slate-400">
                <span>Заполняется от руки каждый день</span>
                <span className="font-bold text-violet">{result.rows.length} дней</span>
              </footer>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
