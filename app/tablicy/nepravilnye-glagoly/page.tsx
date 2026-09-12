'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import ExportToolbar from '@/components/ExportToolbar';
import { useGeneratorQuota } from '@/lib/useGeneratorQuota';

const VERBS: { base: string; past: string; pp: string; ru: string }[] = [
  { base: 'be', past: 'was/were', pp: 'been', ru: 'быть' },
  { base: 'become', past: 'became', pp: 'become', ru: 'становиться' },
  { base: 'begin', past: 'began', pp: 'begun', ru: 'начинать' },
  { base: 'break', past: 'broke', pp: 'broken', ru: 'ломать' },
  { base: 'bring', past: 'brought', pp: 'brought', ru: 'приносить' },
  { base: 'build', past: 'built', pp: 'built', ru: 'строить' },
  { base: 'buy', past: 'bought', pp: 'bought', ru: 'покупать' },
  { base: 'catch', past: 'caught', pp: 'caught', ru: 'ловить' },
  { base: 'choose', past: 'chose', pp: 'chosen', ru: 'выбирать' },
  { base: 'come', past: 'came', pp: 'come', ru: 'приходить' },
  { base: 'cost', past: 'cost', pp: 'cost', ru: 'стоить' },
  { base: 'cut', past: 'cut', pp: 'cut', ru: 'резать' },
  { base: 'do', past: 'did', pp: 'done', ru: 'делать' },
  { base: 'draw', past: 'drew', pp: 'drawn', ru: 'рисовать' },
  { base: 'drink', past: 'drank', pp: 'drunk', ru: 'пить' },
  { base: 'drive', past: 'drove', pp: 'driven', ru: 'водить' },
  { base: 'eat', past: 'ate', pp: 'eaten', ru: 'есть' },
  { base: 'fall', past: 'fell', pp: 'fallen', ru: 'падать' },
  { base: 'feel', past: 'felt', pp: 'felt', ru: 'чувствовать' },
  { base: 'find', past: 'found', pp: 'found', ru: 'находить' },
  { base: 'fly', past: 'flew', pp: 'flown', ru: 'летать' },
  { base: 'forget', past: 'forgot', pp: 'forgotten', ru: 'забывать' },
  { base: 'get', past: 'got', pp: 'got/gotten', ru: 'получать' },
  { base: 'give', past: 'gave', pp: 'given', ru: 'давать' },
  { base: 'go', past: 'went', pp: 'gone', ru: 'идти' },
  { base: 'grow', past: 'grew', pp: 'grown', ru: 'расти' },
  { base: 'have', past: 'had', pp: 'had', ru: 'иметь' },
  { base: 'hear', past: 'heard', pp: 'heard', ru: 'слышать' },
  { base: 'hold', past: 'held', pp: 'held', ru: 'держать' },
  { base: 'keep', past: 'kept', pp: 'kept', ru: 'хранить' },
  { base: 'know', past: 'knew', pp: 'known', ru: 'знать' },
  { base: 'leave', past: 'left', pp: 'left', ru: 'уходить' },
  { base: 'let', past: 'let', pp: 'let', ru: 'позволять' },
  { base: 'lose', past: 'lost', pp: 'lost', ru: 'терять' },
  { base: 'make', past: 'made', pp: 'made', ru: 'делать' },
  { base: 'meet', past: 'met', pp: 'met', ru: 'встречать' },
  { base: 'pay', past: 'paid', pp: 'paid', ru: 'платить' },
  { base: 'put', past: 'put', pp: 'put', ru: 'класть' },
  { base: 'read', past: 'read', pp: 'read', ru: 'читать' },
  { base: 'ride', past: 'rode', pp: 'ridden', ru: 'ехать' },
  { base: 'run', past: 'ran', pp: 'run', ru: 'бежать' },
  { base: 'say', past: 'said', pp: 'said', ru: 'говорить' },
  { base: 'see', past: 'saw', pp: 'seen', ru: 'видеть' },
  { base: 'sell', past: 'sold', pp: 'sold', ru: 'продавать' },
  { base: 'send', past: 'sent', pp: 'sent', ru: 'отправлять' },
  { base: 'show', past: 'showed', pp: 'shown', ru: 'показывать' },
  { base: 'sing', past: 'sang', pp: 'sung', ru: 'петь' },
  { base: 'sit', past: 'sat', pp: 'sat', ru: 'сидеть' },
  { base: 'sleep', past: 'slept', pp: 'slept', ru: 'спать' },
  { base: 'speak', past: 'spoke', pp: 'spoken', ru: 'говорить' },
  { base: 'spend', past: 'spent', pp: 'spent', ru: 'тратить' },
  { base: 'stand', past: 'stood', pp: 'stood', ru: 'стоять' },
  { base: 'swim', past: 'swam', pp: 'swum', ru: 'плавать' },
  { base: 'take', past: 'took', pp: 'taken', ru: 'брать' },
  { base: 'teach', past: 'taught', pp: 'taught', ru: 'учить' },
  { base: 'tell', past: 'told', pp: 'told', ru: 'рассказывать' },
  { base: 'think', past: 'thought', pp: 'thought', ru: 'думать' },
  { base: 'throw', past: 'threw', pp: 'thrown', ru: 'бросать' },
  { base: 'wake', past: 'woke', pp: 'woken', ru: 'просыпаться' },
  { base: 'wear', past: 'wore', pp: 'worn', ru: 'носить' },
  { base: 'win', past: 'won', pp: 'won', ru: 'побеждать' },
  { base: 'write', past: 'wrote', pp: 'written', ru: 'писать' },
];

const HALF = Math.ceil(VERBS.length / 2);
const COLUMN_1 = VERBS.slice(0, HALF);
const COLUMN_2 = VERBS.slice(HALF);

function VerbTable({ rows, monochrome }: { rows: typeof VERBS; monochrome: boolean }) {
  return (
    <table className="w-full border-collapse text-[11px] sm:text-xs" style={{ tableLayout: 'fixed' }}>
      <colgroup>
        <col style={{ width: '24%' }} />
        <col style={{ width: '24%' }} />
        <col style={{ width: '26%' }} />
        <col style={{ width: '26%' }} />
      </colgroup>
      <thead>
        <tr style={{ backgroundColor: monochrome ? '#334155' : '#4C1D95' }}>
          <th className="rounded-l-lg px-3 py-2.5 text-left font-black uppercase tracking-wide text-white">Base</th>
          <th className="px-3 py-2.5 text-left font-black uppercase tracking-wide text-white">Past</th>
          <th className="px-3 py-2.5 text-left font-black uppercase tracking-wide text-white">Participle</th>
          <th className="rounded-r-lg px-3 py-2.5 text-left font-black uppercase tracking-wide text-white">Перевод</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((v, i) => (
          <tr key={v.base} style={{ backgroundColor: monochrome ? (i % 2 ? '#f8fafc' : '#fff') : i % 2 ? '#f5f3ff' : '#fff' }}>
            <td className="px-3 py-2 font-black" style={{ color: monochrome ? '#0f172a' : '#6d28d9' }}>{v.base}</td>
            <td className="px-3 py-2 font-bold text-slate-700">{v.past}</td>
            <td className="px-3 py-2 font-bold text-slate-700">{v.pp}</td>
            <td className="px-3 py-2 font-semibold text-slate-500">{v.ru}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function IrregularVerbsTablePage() {
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
            🇬🇧 Английский язык · 2–7 класс
          </div>
          <h1 className="text-3xl font-black leading-tight sm:text-4xl">Неправильные глаголы</h1>
          <p className="mt-3 text-white/70 leading-relaxed">
            62 неправильных глагола: три формы (base — past — participle) и перевод. Готовый лист для распечатки.
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
            <p className="text-sm font-medium text-slate-500">Готовый лист А4 · 62 глагола</p>
            <ExportToolbar targetRef={printRef} filename="nepravilnye-glagoly" />
          </div>

          <div
            ref={printRef}
            className={`mx-auto rounded-[28px] border-[3px] bg-white p-5 sm:py-8 sm:pl-8 sm:pr-10 ${monochrome ? 'border-slate-700 grayscale' : 'border-violet-400'}`}
          >
            <header className={`mb-5 rounded-2xl px-5 py-4 text-center ${monochrome ? 'border-2 border-slate-700' : 'bg-gradient-to-r from-violet-100 via-fuchsia-50 to-orange-50'}`}>
              <p className={`text-xs font-black uppercase tracking-[0.22em] ${monochrome ? 'text-slate-600' : 'text-violet-600'}`}>Таблица</p>
              <h2 className="mt-1 text-3xl font-black text-slate-900">Неправильные глаголы</h2>
              <p className="mt-1 text-sm font-semibold text-slate-500">62 глагола · 3 формы</p>
            </header>

            <div className="grid gap-6 sm:grid-cols-2 sm:gap-x-8">
              <VerbTable rows={COLUMN_1} monochrome={monochrome} />
              <VerbTable rows={COLUMN_2} monochrome={monochrome} />
            </div>

            {!quota.isSubscriber && (
              <p className="mt-4 text-center text-[10px] font-semibold tracking-wide text-slate-400">Знаторика · znatorica.ru</p>
            )}
          </div>
        </section>

        <section className="no-print mx-auto mt-8 max-w-3xl rounded-2xl border border-white/15 bg-white/[0.06] p-6">
          <h2 className="text-2xl font-black">Как учить неправильные глаголы</h2>
          <p className="mt-3 leading-relaxed text-white/70">
            Учи группами по 8–10 глаголов, а не все сразу. Закрой два последних столбца и попробуй вспомнить формы
            past и participle по base — потом проверь себя по таблице.
          </p>
          <nav className="mt-5 flex flex-wrap gap-3" aria-label="Материалы по неправильным глаголам">
            <Link href="/trenazher/irregular-verbs" className="btn-primary px-5 py-2.5 text-sm">
              Тренажёр неправильных глаголов
            </Link>
          </nav>
        </section>
      </div>
    </main>
  );
}
