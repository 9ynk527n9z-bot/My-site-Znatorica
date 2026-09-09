'use client';

import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';
import { Neucha } from 'next/font/google';
import localFont from 'next/font/local';
import { trackUsage } from '@/lib/track';
import ExportToolbar from '@/components/ExportToolbar';
import PageAbout from '@/components/PageAbout';

const neucha = Neucha({ weight: '400', subsets: ['cyrillic'], display: 'swap' });
const russkopis = localFont({ src: '../../../public/fonts/russkopis/Russkopis-Normalny.otf', display: 'swap' });

type FontChoice = 'default' | 'neucha' | 'russkopis';
const FONTS: { key: FontChoice; label: string; className: string }[] = [
  { key: 'default', label: 'Обычный', className: '' },
  { key: 'neucha', label: 'Рукописный', className: neucha.className },
  { key: 'russkopis', label: 'Прописной', className: russkopis.className },
];

interface ClothingItem {
  key: string;
  label: string;
  emoji: string;
}

const ITEMS: ClothingItem[] = [
  { key: 'jacket', label: 'Куртка', emoji: '🧥' },
  { key: 'hat', label: 'Шапка', emoji: '🧢' },
  { key: 'scarf', label: 'Шарф', emoji: '🧣' },
  { key: 'mittens', label: 'Варежки / перчатки', emoji: '🧤' },
  { key: 'sweater', label: 'Кофта / свитер', emoji: '👕' },
  { key: 'shoes-indoor', label: 'Сменная обувь', emoji: '👟' },
  { key: 'shoes-sport', label: 'Кроссовки', emoji: '👟' },
  { key: 'shoe-bag', label: 'Мешок для обуви', emoji: '👜' },
  { key: 'backpack', label: 'Рюкзак / ранец', emoji: '🎒' },
  { key: 'pencil-case', label: 'Пенал', emoji: '✏️' },
  { key: 'towel', label: 'Полотенце', emoji: '🏊' },
  { key: 'panama', label: 'Панамка (лагерь)', emoji: '👒' },
  { key: 'blank', label: 'Просто имя (без подписи вещи)', emoji: '🏷️' },
];

const DEFAULT_SELECTED = new Set(['jacket', 'hat', 'mittens', 'shoes-indoor', 'backpack']);
const COPIES_OPTIONS = [2, 4, 6, 10] as const;
const PER_PAGE = 15;

interface LabelData {
  emoji: string;
  item: string;
}
interface Settings {
  name: string;
  group: string;
  phone: string;
  labels: LabelData[];
  fontClassName: string;
}

export default function YarlychkiNaOdezhduPage() {
  const [name, setName] = useState('');
  const [group, setGroup] = useState('');
  const [phone, setPhone] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set(DEFAULT_SELECTED));
  const [customText, setCustomText] = useState('');
  const [copies, setCopies] = useState<number>(4);
  const [font, setFont] = useState<FontChoice>('default');
  const [result, setResult] = useState<Settings | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  function toggle(key: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  const previewCount = useMemo(() => {
    let n = 0;
    for (const it of ITEMS) if (selected.has(it.key)) n += copies;
    const custom = customText.split(',').map((t) => t.trim()).filter(Boolean);
    n += custom.length * copies;
    return n;
  }, [selected, customText, copies]);

  function handleGenerate() {
    const labels: LabelData[] = [];
    for (const it of ITEMS) {
      if (!selected.has(it.key)) continue;
      for (let i = 0; i < copies; i++) labels.push({ emoji: it.emoji, item: it.key === 'blank' ? '' : it.label });
    }
    const custom = customText.split(',').map((t) => t.trim()).filter(Boolean);
    for (const c of custom) {
      for (let i = 0; i < copies; i++) labels.push({ emoji: '🏷️', item: c });
    }
    const fontClassName = FONTS.find((f) => f.key === font)?.className ?? '';
    setResult({ name, group, phone, labels, fontClassName });
    trackUsage('generator:yarlychki-na-odezhdu');
  }

  const pages: LabelData[][] = [];
  if (result) {
    for (let i = 0; i < result.labels.length; i += PER_PAGE) {
      pages.push(result.labels.slice(i, i + PER_PAGE));
    }
  }

  return (
    <main className="min-h-screen px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link href="/generator" className="no-print text-sm text-orange hover:underline">
          ← Все генераторы
        </Link>

        <div className="no-print mt-3 mb-8 max-w-3xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold text-violet-100">
            🏷️ Для сада, школы и лагеря
          </div>
          <h1 className="text-3xl font-black leading-tight sm:text-4xl">Ярлычки на одежду и обувь</h1>
          <p className="mt-3 text-white/70">
            Впиши имя ребёнка один раз — получи ярлычки для подписи курток, шапок, варежек,
            сменной обуви и других вещей. Распечатай, разрежь по пунктиру и пришей, приклей или
            вложи в вещь — так забытая куртка быстрее найдёт хозяина.
          </p>
        </div>

        <section className="card no-print mb-8 overflow-hidden !p-4 sm:!p-6 space-y-6">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange/20 text-lg">1</span>
              <div>
                <h2 className="font-extrabold">Кто и куда</h2>
                <p className="text-sm text-white/55">Имя ребёнка попадёт на каждый ярлычок</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Имя и фамилия, например Аня Смирнова"
                className="w-full px-4 py-2 rounded-lg bg-black border border-[#2D2350] text-white placeholder-gray-500 focus:border-orange outline-none"
              />
              <input
                type="text"
                value={group}
                onChange={(e) => setGroup(e.target.value)}
                placeholder="Класс / группа, например 2 «Б»"
                className="w-full px-4 py-2 rounded-lg bg-black border border-[#2D2350] text-white placeholder-gray-500 focus:border-orange outline-none"
              />
            </div>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Телефон родителя (необязательно) — на случай, если вещь найдёт кто-то посторонний"
              className="w-full mt-4 sm:max-w-md px-4 py-2 rounded-lg bg-black border border-[#2D2350] text-white placeholder-gray-500 focus:border-orange outline-none"
            />
          </div>

          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange/20 text-lg">2</span>
              <div>
                <h2 className="font-extrabold">Выбери вещи</h2>
                <p className="text-sm text-white/55">Отметь всё, что нужно подписать</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {ITEMS.map((it) => (
                <button
                  key={it.key}
                  type="button"
                  aria-pressed={selected.has(it.key)}
                  onClick={() => toggle(it.key)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                    selected.has(it.key)
                      ? 'bg-orange text-white'
                      : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
                  }`}
                >
                  {it.emoji} {it.label}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Свой вариант через запятую, например Комбинезон, Санки"
              className="w-full mt-4 px-4 py-2 rounded-lg bg-black border border-[#2D2350] text-white placeholder-gray-500 focus:border-orange outline-none"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange/20 text-lg">3</span>
                <h2 className="font-extrabold">Копий каждого ярлычка</h2>
              </div>
              <div className="flex gap-3 flex-wrap">
                {COPIES_OPTIONS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    aria-pressed={copies === c}
                    onClick={() => setCopies(c)}
                    className={`px-5 py-2 rounded-lg font-bold transition-colors text-sm ${
                      copies === c ? 'bg-orange text-white' : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <p className="text-xs text-white/45 mt-2">Пары (варежки, обувь) требуют 2 ярлычка — по одному на каждый предмет.</p>
            </div>

            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange/20 text-lg">4</span>
                <h2 className="font-extrabold">Шрифт</h2>
              </div>
              <div className="flex gap-3 flex-wrap">
                {FONTS.map((f) => (
                  <button
                    key={f.key}
                    type="button"
                    aria-pressed={font === f.key}
                    onClick={() => setFont(f.key)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${f.className} ${
                      font === f.key ? 'bg-orange text-white' : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={previewCount === 0}
            className="btn-primary w-full py-3 text-base disabled:opacity-50"
          >
            ✨ Создать ярлычки {previewCount > 0 ? `(${previewCount} шт.)` : ''}
          </button>
        </section>

        {result && (
          <section className="card print-page bg-white !p-4 text-slate-900 sm:!p-6">
            <div className="no-print mb-5 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-medium text-slate-500">{result.labels.length} ярлычков · {pages.length} стр.</p>
              <ExportToolbar targetRef={printRef} filename="yarlychki-na-odezhdu" />
            </div>

            <div ref={printRef} className="rounded-2xl overflow-hidden">
              {pages.map((pageLabels, pageIndex) => (
                <div
                  key={pageIndex}
                  className={`grid grid-cols-3 gap-3 p-2 ${pageIndex < pages.length - 1 ? 'print:break-after-page' : ''}`}
                >
                  {pageLabels.map((label, i) => (
                    <div
                      key={i}
                      className={`border-2 border-dashed border-gray-300 rounded-xl p-2 flex flex-col items-center justify-center text-center gap-0.5 h-[30mm] ${result.fontClassName}`}
                    >
                      {label.item && <div className="text-2xl leading-none">{label.emoji}</div>}
                      {label.item && <div className="text-xs text-gray-500 leading-tight">{label.item}</div>}
                      <div className="text-base text-black font-bold leading-tight">{result.name || 'Имя ребёнка'}</div>
                      {result.group && <div className="text-xs text-gray-500">{result.group}</div>}
                      {result.phone && <div className="text-[10px] text-gray-500">{result.phone}</div>}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <PageAbout route="/generator/yarlychki-na-odezhdu" />
    </main>
  );
}
