'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import ExportToolbar from '@/components/ExportToolbar';
import { useGeneratorQuota } from '@/lib/useGeneratorQuota';

const ZONES = [
  {
    icon: '🧊', name: 'Арктические пустыни', place: 'Острова Северного Ледовитого океана',
    climate: 'Очень холодно; долгая зима, короткое лето',
    plants: 'Мхи, лишайники, полярный мак', animals: 'Белый медведь, морж, тюлень, кайра',
    color: '#0369a1', pale: '#f0f9ff',
  },
  {
    icon: '🦌', name: 'Тундра', place: 'Север России вдоль побережья океана',
    climate: 'Холодно и ветрено; вечная мерзлота',
    plants: 'Мхи, лишайники, карликовые берёза и ива', animals: 'Северный олень, песец, лемминг, белая куропатка',
    color: '#0f766e', pale: '#f0fdfa',
  },
  {
    icon: '🌲', name: 'Тайга', place: 'Широкая полоса к югу от тундры',
    climate: 'Зима холодная, лето тёплое и короткое',
    plants: 'Ель, сосна, лиственница, пихта, кедровая сосна', animals: 'Бурый медведь, лось, рысь, соболь, белка',
    color: '#166534', pale: '#f0fdf4',
  },
  {
    icon: '🍂', name: 'Смешанные и широколиственные леса', place: 'Европейская часть России и юг Дальнего Востока',
    climate: 'Зима мягче, лето длиннее и теплее, чем в тайге',
    plants: 'Ель, сосна, дуб, клён, липа, берёза', animals: 'Кабан, косуля, барсук, бобр, заяц',
    color: '#4d7c0f', pale: '#f7fee7',
  },
  {
    icon: '🌾', name: 'Степи', place: 'Юг европейской части России и юг Западной Сибири',
    climate: 'Жаркое сухое лето, малоснежная зима',
    plants: 'Ковыль, типчак, полынь, тюльпан', animals: 'Суслик, хомяк, сайгак, дрофа, степной орёл',
    color: '#a16207', pale: '#fffbeb',
  },
  {
    icon: '🏜️', name: 'Полупустыни и пустыни', place: 'Прикаспийская низменность',
    climate: 'Очень сухо; жаркое лето, холодная малоснежная зима',
    plants: 'Полынь, солянки, верблюжья колючка', animals: 'Сайгак, тушканчик, ушастый ёж, ящерицы',
    color: '#c2410c', pale: '#fff7ed',
  },
  {
    icon: '🌴', name: 'Субтропики', place: 'Узкая полоса Черноморского побережья Кавказа',
    climate: 'Тёплая влажная зима, жаркое лето',
    plants: 'Дуб, бук, каштан; в парках — пальмы и магнолии', animals: 'Косуля, кабан, шакал, ящерицы, цикады',
    color: '#be185d', pale: '#fdf2f8',
  },
] as const;

export default function NaturalZonesPage() {
  const quota = useGeneratorQuota();
  const [monochrome, setMonochrome] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  return (
    <main className="min-h-screen px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Link href="/tablicy" className="no-print mb-4 inline-block text-sm text-orange hover:underline">← Все таблицы</Link>

        <header className="no-print mx-auto mb-7 max-w-3xl text-center">
          <p className="text-base font-black uppercase tracking-[0.2em] text-violet-200">🌍 Окружающий мир · 4 класс</p>
          <h1 className="mt-2 text-[26px] font-black sm:text-[44px]">Природные зоны России</h1>
          <p className="mt-3 text-white/70">Расположение, климат, характерные растения и животные семи природных зон.</p>
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
            <span className="text-base font-bold text-slate-500">Готовый учебный лист · 7 природных зон</span>
            <ExportToolbar targetRef={printRef} filename="prirodnye-zony-rossii" />
          </div>

          <div ref={printRef} className={`mx-auto rounded-[28px] border-[3px] bg-white p-4 sm:p-6 ${monochrome ? 'border-slate-700 grayscale' : 'border-emerald-500'}`}>
            <header className={`mb-4 rounded-2xl px-4 py-3 text-center ${monochrome ? 'border-2 border-slate-700' : 'bg-gradient-to-r from-sky-100 via-emerald-50 to-amber-50'}`}>
              <p className={`text-xs font-black uppercase tracking-[0.22em] ${monochrome ? 'text-slate-600' : 'text-emerald-700'}`}>Окружающий мир · 4 класс</p>
              <h2 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">Природные зоны России</h2>
              <p className="mt-1 text-sm font-semibold text-slate-600">С севера на юг меняются климат, почвы, растения и животные</p>
            </header>

            <div className="space-y-2">
              {ZONES.map((zone, index) => (
                <section key={zone.name} className="grid overflow-hidden rounded-xl border-2 sm:grid-cols-[220px_1fr]" style={{ borderColor: monochrome ? '#94a3b8' : zone.color }}>
                  <div className="flex items-center gap-3 px-3 py-2.5" style={{ backgroundColor: monochrome ? '#f1f5f9' : zone.pale }}>
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-3xl shadow-sm" aria-hidden="true">{zone.icon}</span>
                    <div>
                      <div className="mb-1 flex items-center gap-1.5">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full text-base font-black text-white" style={{ backgroundColor: monochrome ? '#334155' : zone.color }}>{index + 1}</span>
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">с севера на юг</span>
                      </div>
                      <h3 className="text-sm font-black leading-tight" style={{ color: monochrome ? '#0f172a' : zone.color }}>{zone.name}</h3>
                    </div>
                  </div>
                  <div className="grid gap-x-3 gap-y-1 px-3 py-2.5 text-[11px] leading-snug sm:grid-cols-2 sm:text-xs">
                    <p><b className="text-slate-900">Где:</b> {zone.place}</p>
                    <p><b className="text-slate-900">Климат:</b> {zone.climate}</p>
                    <p><b className="text-slate-900">Растения:</b> {zone.plants}</p>
                    <p><b className="text-slate-900">Животные:</b> {zone.animals}</p>
                  </div>
                </section>
              ))}
            </div>

            {!quota.isSubscriber && <p className="mt-3 text-center text-[10px] font-semibold tracking-wide text-slate-400">Знаторика · znatorica.ru</p>}
          </div>
        </section>

        <section className="no-print mx-auto mt-8 max-w-3xl rounded-2xl border border-white/15 bg-white/[0.06] p-6">
          <h2 className="text-2xl font-black">Как пользоваться таблицей</h2>
          <p className="mt-3 leading-relaxed text-white/70">Читай строки сверху вниз: в таком порядке природные зоны в целом сменяют друг друга от северных островов к югу России. Границы зон на карте неровные, а в горах природа меняется с высотой.</p>
          <h3 className="mt-6 text-xl font-black">Проверь себя</h3>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-white/75">
            <li>В какой природной зоне преобладают хвойные леса?</li>
            <li>Почему в тундре почти нет высоких деревьев?</li>
            <li>Какая природная зона занимает узкую полосу Черноморского побережья Кавказа?</li>
            <li>Назови два приспособления растений или животных к засушливому климату.</li>
          </ol>
          <nav className="mt-5 flex flex-wrap gap-3" aria-label="Материалы по теме">
            <Link href="/tablicy/tsep-pitaniya" className="rounded-lg border border-white/20 px-5 py-2.5 text-sm font-bold hover:border-orange">Цепь питания</Link>
            <Link href="/tablicy/krugovorot-vody" className="rounded-lg border border-white/20 px-5 py-2.5 text-sm font-bold hover:border-orange">Круговорот воды</Link>
          </nav>
        </section>
      </div>
    </main>
  );
}
