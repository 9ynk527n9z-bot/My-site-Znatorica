'use client';

import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { trackUsage } from '@/lib/track';
import ExportToolbar from '@/components/ExportToolbar';
import PageAbout from '@/components/PageAbout';

type Band = '1' | '2-4' | '5-9';

interface Item {
  key: string;
  label: string;
  bands: Band[];
}

interface Category {
  title: string;
  emoji: string;
  items: Item[];
}

const CATEGORIES: Category[] = [
  {
    title: 'Канцелярия',
    emoji: '📚',
    items: [
      { key: 'notebooks-cage', label: 'Тетради в клетку', bands: ['1', '2-4', '5-9'] },
      { key: 'notebooks-line', label: 'Тетради в линейку', bands: ['1', '2-4', '5-9'] },
      { key: 'diary', label: 'Дневник', bands: ['1', '2-4', '5-9'] },
      { key: 'pencil-case', label: 'Пенал', bands: ['1', '2-4', '5-9'] },
      { key: 'pen-blue', label: 'Ручки синие (запасные)', bands: ['1', '2-4', '5-9'] },
      { key: 'pen-color', label: 'Ручки красная и зелёная', bands: ['1', '2-4', '5-9'] },
      { key: 'pencil-simple', label: 'Простые карандаши', bands: ['1', '2-4', '5-9'] },
      { key: 'pencil-color', label: 'Цветные карандаши', bands: ['1', '2-4'] },
      { key: 'felt-pens', label: 'Фломастеры', bands: ['1', '2-4'] },
      { key: 'eraser', label: 'Ластик', bands: ['1', '2-4', '5-9'] },
      { key: 'sharpener', label: 'Точилка', bands: ['1', '2-4', '5-9'] },
      { key: 'ruler', label: 'Линейка 15–20 см', bands: ['1', '2-4', '5-9'] },
      { key: 'triangle', label: 'Треугольник, транспортир', bands: ['2-4', '5-9'] },
      { key: 'compass', label: 'Циркуль', bands: ['5-9'] },
      { key: 'calculator', label: 'Калькулятор', bands: ['5-9'] },
      { key: 'glue', label: 'Клей-карандаш', bands: ['1', '2-4'] },
      { key: 'scissors', label: 'Ножницы с округлыми концами', bands: ['1', '2-4'] },
      { key: 'color-paper', label: 'Цветная бумага и картон', bands: ['1', '2-4'] },
      { key: 'covers', label: 'Обложки для тетрадей и учебников', bands: ['1', '2-4', '5-9'] },
      { key: 'folder-labour', label: 'Папка для труда / ИЗО', bands: ['1', '2-4'] },
    ],
  },
  {
    title: 'Форма и обувь',
    emoji: '👕',
    items: [
      { key: 'uniform', label: 'Школьная форма', bands: ['1', '2-4', '5-9'] },
      { key: 'indoor-shoes', label: 'Сменная обувь', bands: ['1', '2-4', '5-9'] },
      { key: 'pe-uniform', label: 'Форма для физкультуры', bands: ['1', '2-4', '5-9'] },
      { key: 'pe-shoes', label: 'Кроссовки для физкультуры', bands: ['1', '2-4', '5-9'] },
      { key: 'shoe-bag', label: 'Мешок для сменной обуви', bands: ['1', '2-4', '5-9'] },
    ],
  },
  {
    title: 'Портфель и мелочи',
    emoji: '🎒',
    items: [
      { key: 'backpack', label: 'Рюкзак / ранец', bands: ['1', '2-4', '5-9'] },
      { key: 'water-bottle', label: 'Бутылка для воды', bands: ['1', '2-4', '5-9'] },
      { key: 'lunch-box', label: 'Ланч-бокс / перекус', bands: ['1', '2-4', '5-9'] },
      { key: 'tissues', label: 'Носовые платки, влажные салфетки', bands: ['1', '2-4', '5-9'] },
      { key: 'mask-comb', label: 'Расчёска', bands: ['1', '2-4', '5-9'] },
    ],
  },
];

const DEFAULT_BAND: Band = '1';

export default function SpisokVShkoluPage() {
  const [name, setName] = useState('');
  const [klass, setKlass] = useState('');
  const [band, setBand] = useState<Band>(DEFAULT_BAND);
  const [unchecked, setUnchecked] = useState<Set<string>>(new Set());
  const [labelOverrides, setLabelOverrides] = useState<Record<string, string>>({});
  const [customText, setCustomText] = useState('');
  const printRef = useRef<HTMLDivElement>(null);
  const trackedRef = useRef(false);

  function toggle(key: string) {
    setUnchecked((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function getLabel(item: Item): string {
    return labelOverrides[item.key] ?? item.label;
  }

  function setLabelOverride(key: string, value: string) {
    setLabelOverrides((prev) => ({ ...prev, [key]: value }));
  }

  function handleFirstPrint() {
    if (!trackedRef.current) {
      trackUsage('generator:spisok-v-shkolu');
      trackedRef.current = true;
    }
  }

  const visibleCategories = useMemo(
    () =>
      CATEGORIES.map((cat) => ({
        ...cat,
        items: cat.items.filter((item) => item.bands.includes(band)),
      })).filter((cat) => cat.items.length > 0),
    [band]
  );

  const customItems = customText
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/generator" className="text-orange hover:underline text-sm">
          ← Все генераторы
        </Link>
        <h1 className="text-3xl font-bold mt-2 mb-2">🎒 Список вещей в школу</h1>
        <p className="text-white/75 mb-8">
          Готовый чек-лист — убери лишнее, добавь своё, переименуй любой пункт прямо в списке и
          распечатай, чтобы отмечать вещи галочкой при сборе портфеля.
        </p>

        <div className="card mb-8 no-print space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Имя ребёнка</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Например, Аня"
                className="w-full px-4 py-2 rounded-lg bg-black border border-[#2D2350] text-white placeholder-gray-500 focus:border-orange outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Класс</label>
              <input
                type="text"
                value={klass}
                onChange={(e) => setKlass(e.target.value)}
                placeholder="Например, 1 «А»"
                className="w-full px-4 py-2 rounded-lg bg-black border border-[#2D2350] text-white placeholder-gray-500 focus:border-orange outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">Класс обучения</label>
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => setBand('1')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                  band === '1' ? 'bg-orange text-white' : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
                }`}
              >
                1 класс
              </button>
              <button
                onClick={() => setBand('2-4')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                  band === '2-4' ? 'bg-orange text-white' : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
                }`}
              >
                2–4 класс
              </button>
              <button
                onClick={() => setBand('5-9')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                  band === '5-9' ? 'bg-orange text-white' : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
                }`}
              >
                5–9 класс
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {CATEGORIES.map((cat) => {
              const items = cat.items.filter((item) => item.bands.includes(band));
              if (items.length === 0) return null;
              return (
                <div key={cat.title}>
                  <label className="block text-sm font-medium mb-2">
                    {cat.emoji} {cat.title}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <button
                        key={item.key}
                        onClick={() => toggle(item.key)}
                        className={`px-3 py-1.5 rounded-lg font-medium transition-colors text-xs ${
                          unchecked.has(item.key)
                            ? 'bg-black border border-[#2D2350] text-gray-500 line-through hover:text-white'
                            : 'bg-orange/20 border border-orange text-white'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Свои пункты (через запятую)</label>
            <input
              type="text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Например, Справка от врача, Шахматы"
              className="w-full px-4 py-2 rounded-lg bg-black border border-[#2D2350] text-white placeholder-gray-500 focus:border-orange outline-none"
            />
          </div>
        </div>

        <div ref={printRef} onClickCapture={handleFirstPrint} className="card print-page bg-white">
          <div className="no-print mb-4 flex justify-end">
            <ExportToolbar targetRef={printRef} filename="spisok-v-shkolu" />
          </div>

          <div className="no-print flex items-center gap-3 mb-6">
            <Image src="/logo.png" alt="Знаторика" width={48} height={48} className="no-print rounded-full flex-shrink-0" />
            <h2 className="text-xl font-bold text-black">
              Список вещей в школу{name ? ` — ${name}` : ''}{klass ? `, ${klass} класс` : ''}
            </h2>
          </div>
          <h2 className="hidden print:block text-xl font-bold text-black mb-4">
            Список вещей в школу{name ? ` — ${name}` : ''}{klass ? `, ${klass} класс` : ''}
          </h2>

          <div className="grid sm:grid-cols-2 gap-x-8">
            {visibleCategories.map((cat) => (
              <div key={cat.title} className="mb-6 break-inside-avoid">
                <h3 className="font-bold text-black mb-2 border-b-2 border-violet pb-1">
                  {cat.emoji} {cat.title}
                </h3>
                <ul className="space-y-1.5">
                  {cat.items
                    .filter((item) => !unchecked.has(item.key))
                    .map((item) => (
                      <li key={item.key} className="flex items-center gap-2 text-sm text-black">
                        <span className="w-4 h-4 border-2 border-gray-400 flex-shrink-0" />
                        <input
                          type="text"
                          value={getLabel(item)}
                          onChange={(e) => setLabelOverride(item.key, e.target.value)}
                          className="w-full outline-none bg-transparent focus:bg-orange/20"
                        />
                      </li>
                    ))}
                </ul>
              </div>
            ))}

            {customItems.length > 0 && (
              <div className="mb-6 break-inside-avoid">
                <h3 className="font-bold text-black mb-2 border-b-2 border-violet pb-1">✏️ Своё</h3>
                <ul className="space-y-1.5">
                  {customItems.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-black">
                      <span className="w-4 h-4 border-2 border-gray-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <PageAbout route="/generator/spisok-v-shkolu" />
    </div>
  );
}
