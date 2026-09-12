'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import ExportToolbar from '@/components/ExportToolbar';
import { useGeneratorQuota } from '@/lib/useGeneratorQuota';

type Season = 'Winter' | 'Spring' | 'Summer' | 'Autumn';

const SEASON_RU: Record<Season, string> = {
  Winter: 'зима',
  Spring: 'весна',
  Summer: 'лето',
  Autumn: 'осень',
};

const SEASON_TRANS: Record<Season, string> = {
  Winter: '/ˈwɪntə/',
  Spring: '/sprɪŋ/',
  Summer: '/ˈsʌmə/',
  Autumn: '/ˈɔːtəm/',
};

const MONTHS: { word: string; transcription: string; ru: string; season: Season }[] = [
  { word: 'December', transcription: '/dɪˈsembə/', ru: 'декабрь', season: 'Winter' },
  { word: 'January', transcription: '/ˈdʒænjuəri/', ru: 'январь', season: 'Winter' },
  { word: 'February', transcription: '/ˈfebruəri/', ru: 'февраль', season: 'Winter' },
  { word: 'March', transcription: '/mɑːtʃ/', ru: 'март', season: 'Spring' },
  { word: 'April', transcription: '/ˈeɪprəl/', ru: 'апрель', season: 'Spring' },
  { word: 'May', transcription: '/meɪ/', ru: 'май', season: 'Spring' },
  { word: 'June', transcription: '/dʒuːn/', ru: 'июнь', season: 'Summer' },
  { word: 'July', transcription: '/dʒʊˈlaɪ/', ru: 'июль', season: 'Summer' },
  { word: 'August', transcription: '/ˈɔːɡəst/', ru: 'август', season: 'Summer' },
  { word: 'September', transcription: '/sepˈtembə/', ru: 'сентябрь', season: 'Autumn' },
  { word: 'October', transcription: '/ɒkˈtəʊbə/', ru: 'октябрь', season: 'Autumn' },
  { word: 'November', transcription: '/nəʊˈvembə/', ru: 'ноябрь', season: 'Autumn' },
];

const SEASON_STYLE: Record<Season, { pale: string; border: string; text: string; emoji: string }> = {
  Winter: { pale: '#eff6ff', border: '#93c5fd', text: '#1d4ed8', emoji: '⛷️' },
  Spring: { pale: '#f0fdf4', border: '#86efac', text: '#15803d', emoji: '🌼' },
  Summer: { pale: '#fefce8', border: '#fde047', text: '#a16207', emoji: '🏊' },
  Autumn: { pale: '#fff7ed', border: '#fdba74', text: '#c2410c', emoji: '🍄' },
};

export default function EnglishMonthsSeasonsTablePage() {
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
            🇬🇧 Английский язык · 6–9 лет
          </div>
          <h1 className="text-2xl font-black leading-tight sm:text-3xl">Months and Seasons</h1>
          <p className="mt-3 text-lg text-white/70 leading-relaxed">
            12 месяцев по временам года на английском языке с переводом и транскрипцией.
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
            <p className="text-sm font-medium text-slate-500">Готовый учебный лист · 12 месяцев</p>
            <ExportToolbar targetRef={printRef} filename="mesyatsy-i-vremena-goda-po-anglijski" />
          </div>

          <div
            ref={printRef}
            className={`mx-auto rounded-[28px] border-[3px] bg-white p-5 sm:p-8 ${monochrome ? 'border-slate-700 grayscale' : 'border-violet-400'}`}
          >
            <header className={`mb-5 rounded-2xl px-5 py-4 text-center ${monochrome ? 'border-2 border-slate-700' : 'bg-gradient-to-r from-violet-100 via-fuchsia-50 to-orange-50'}`}>
              <p className={`text-[23px] font-black uppercase tracking-[0.22em] ${monochrome ? 'text-slate-600' : 'text-violet-600'}`}>Таблица</p>
              <h2 className="mt-1 text-3xl font-black text-slate-900">Months and Seasons</h2>
              <p className="mt-1 text-[23px] font-semibold text-slate-500">Месяцы и времена года</p>
            </header>

            {(['Winter', 'Spring', 'Summer', 'Autumn'] as Season[]).map((season, index) => {
              const style = SEASON_STYLE[season];
              const months = MONTHS.filter((m) => m.season === season);
              return (
                <div
                  key={season}
                  className={`mb-3 pb-3 last:mb-0 last:border-b-0 last:pb-0 ${index < 3 ? 'border-b-2' : ''}`}
                  style={{ borderColor: monochrome ? '#cbd5e1' : '#e9d5ff' }}
                >
                  <div
                    className="grid grid-cols-4 gap-2 rounded-2xl border-2 p-3"
                    style={{ backgroundColor: monochrome ? '#fff' : style.pale, borderColor: monochrome ? '#64748b' : style.border }}
                  >
                    <div
                      className="col-span-4 mb-1 flex items-center justify-center gap-2 rounded-xl px-3 py-2 sm:col-span-1 sm:mb-0 sm:flex-col sm:py-3"
                      style={{ backgroundColor: monochrome ? '#334155' : style.text }}
                    >
                      <p className="text-3xl">{monochrome ? '' : style.emoji}</p>
                      <p className="text-xl font-black text-white">{season}</p>
                      <p className="text-sm font-semibold text-white/80">{SEASON_TRANS[season]}</p>
                      <p className="text-sm font-semibold text-white/70">{SEASON_RU[season]}</p>
                    </div>
                    {months.map((m) => (
                      <div key={m.word} className="rounded-xl bg-white/70 px-2 py-2 text-center">
                        <p className="text-[21px] font-bold tracking-tight text-slate-800">{m.word}</p>
                        <p className="text-sm font-semibold text-slate-500">{m.transcription}</p>
                        <p className="text-sm font-semibold text-slate-400">{m.ru}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {!quota.isSubscriber && (
              <p className="mt-4 text-center text-[10px] font-semibold tracking-wide text-slate-400">Знаторика · znatorica.ru</p>
            )}
          </div>
        </section>

        <section className="no-print mx-auto mt-8 max-w-3xl rounded-2xl border border-white/15 bg-white/[0.06] p-6">
          <h2 className="text-2xl font-black">Как пользоваться таблицей</h2>
          <p className="mt-3 leading-relaxed text-white/70">
            Названия месяцев по-английски всегда пишутся с заглавной буквы. Проговаривай слово с опорой
            на транскрипцию, потом закрой перевод и вспомни его сам.
          </p>
          <nav className="mt-5 flex flex-wrap gap-3" aria-label="Материалы по месяцам и временам года">
            <Link href="/tablicy/mesyatsy-i-vremena-goda" className="rounded-lg border border-white/20 px-5 py-2.5 text-sm font-bold hover:border-orange">
              Месяцы и времена года по-русски
            </Link>
          </nav>
        </section>
      </div>
    </main>
  );
}
