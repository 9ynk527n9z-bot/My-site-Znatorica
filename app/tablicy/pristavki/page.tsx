'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import ExportToolbar from '@/components/ExportToolbar';
import { useGeneratorQuota } from '@/lib/useGeneratorQuota';

const UNCHANGING = [
  { prefix: 'ЗА-', example: 'забежать, закрыть, записать' },
  { prefix: 'НА-', example: 'написать, наклеить, найти' },
  { prefix: 'ПОД-', example: 'подойти, подписать, подъехать' },
];

const PRI = [
  { name: 'Приближение', example: 'приехать, прилететь, прибежать' },
  { name: 'Присоединение', example: 'приклеить, пришить, прицепить' },
  { name: 'Близость', example: 'пришкольный, прибрежный, придорожный' },
  { name: 'Неполное действие', example: 'присесть, приоткрыть, притормозить' },
];

const PRE = [
  { name: 'Высшая степень (= очень)', example: 'прекрасный, премудрый, преважный' },
  { name: 'Значение ПЕРЕ-', example: 'преградить, прервать, преодолеть' },
];

export default function PristavkiTablePage() {
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
          <h1 className="text-3xl font-black leading-tight sm:text-4xl">Приставки</h1>
          <p className="mt-3 text-white/70 leading-relaxed">
            Неизменяемые приставки, различение при-/пре- и правило написания на з/с — с примерами.
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
            <ExportToolbar targetRef={printRef} filename="pristavki" />
          </div>

          <div
            ref={printRef}
            className={`mx-auto rounded-[28px] border-[3px] bg-white p-5 sm:p-8 ${monochrome ? 'border-slate-700 grayscale' : 'border-violet-400'}`}
          >
            <header className={`mb-5 rounded-2xl px-5 py-4 text-center ${monochrome ? 'border-2 border-slate-700' : 'bg-gradient-to-r from-violet-100 via-fuchsia-50 to-orange-50'}`}>
              <p className={`text-xs font-black uppercase tracking-[0.22em] ${monochrome ? 'text-slate-600' : 'text-violet-600'}`}>Таблица</p>
              <h2 className="mt-1 text-3xl font-black text-slate-900">Приставки</h2>
            </header>

            <section className={`rounded-2xl border-2 p-4 ${monochrome ? 'border-slate-500' : 'border-emerald-300 bg-emerald-50'}`}>
              <h3 className="text-sm font-black text-slate-900">Неизменяемые приставки — пишутся всегда одинаково</h3>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {UNCHANGING.map((item) => (
                  <div key={item.prefix} className="rounded-xl bg-white/70 p-3">
                    <p className="text-lg font-black" style={{ color: monochrome ? '#0f172a' : '#047857' }}>{item.prefix}</p>
                    <p className="mt-1 text-xs font-semibold text-slate-600">{item.example}</p>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-xs font-semibold text-slate-500">Исключение: перед гласной ПОД- превращается в ПОДЪ- (подъехать).</p>
            </section>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <section className={`rounded-2xl border-2 p-4 ${monochrome ? 'border-slate-500' : 'border-sky-300 bg-sky-50'}`}>
                <h3 className="text-lg font-black" style={{ color: monochrome ? '#0f172a' : '#0369a1' }}>ПРИ-</h3>
                <div className="mt-2 space-y-2">
                  {PRI.map((item) => (
                    <div key={item.name}>
                      <p className="text-xs font-black text-slate-700">{item.name}</p>
                      <p className="text-xs font-semibold text-slate-500">{item.example}</p>
                    </div>
                  ))}
                </div>
              </section>
              <section className={`rounded-2xl border-2 p-4 ${monochrome ? 'border-slate-500' : 'border-rose-300 bg-rose-50'}`}>
                <h3 className="text-lg font-black" style={{ color: monochrome ? '#0f172a' : '#be123c' }}>ПРЕ-</h3>
                <div className="mt-2 space-y-2">
                  {PRE.map((item) => (
                    <div key={item.name}>
                      <p className="text-xs font-black text-slate-700">{item.name}</p>
                      <p className="text-xs font-semibold text-slate-500">{item.example}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-xs font-semibold text-slate-500">Сомневаешься — попробуй заменить на «очень» или «пере-».</p>
              </section>
            </div>

            <section className={`mt-4 rounded-2xl border-2 p-4 ${monochrome ? 'border-slate-500' : 'border-amber-300 bg-amber-50'}`}>
              <h3 className="text-sm font-black text-slate-900">На з / с — без-/бес-, раз-/рас- и другие</h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-white/70 p-3">
                  <p className="text-xs font-black text-slate-700">Перед звонким согласным — З</p>
                  <p className="mt-1 text-xs font-semibold text-slate-500">безвкусный, бездомный, разбить, раздать</p>
                </div>
                <div className="rounded-xl bg-white/70 p-3">
                  <p className="text-xs font-black text-slate-700">Перед глухим согласным — С</p>
                  <p className="mt-1 text-xs font-semibold text-slate-500">бесполезный, бесшумный, распилить, расставить</p>
                </div>
              </div>
              <p className="mt-2 text-xs font-semibold text-slate-500">Звонкие: б, в, г, д, ж, з, л, м, н, р. Глухие: п, ф, к, т, ш, с, х, ч, щ, ц.</p>
            </section>

            {!quota.isSubscriber && (
              <p className="mt-4 text-center text-[10px] font-semibold tracking-wide text-slate-400">Знаторика · znatorica.ru</p>
            )}
          </div>
        </section>

        <section className="no-print mx-auto mt-8 max-w-3xl rounded-2xl border border-white/15 bg-white/[0.06] p-6">
          <h2 className="text-2xl font-black">Как пользоваться таблицей</h2>
          <p className="mt-3 leading-relaxed text-white/70">
            Неизменяемые приставки не нужно проверять — они пишутся одинаково независимо от произношения.
            При- и пре- различай по значению слова. А в приставках на з/с ориентируйся на звук, идущий сразу после приставки.
          </p>
          <nav className="mt-5 flex flex-wrap gap-3" aria-label="Материалы по приставкам">
            <Link href="/trenazher/pristavki" className="btn-primary px-5 py-2.5 text-sm">
              Тренажёр приставок
            </Link>
          </nav>
        </section>
      </div>
    </main>
  );
}
