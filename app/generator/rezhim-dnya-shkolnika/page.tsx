'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { trackUsage } from '@/lib/track';
import ExportToolbar from '@/components/ExportToolbar';
import PageAbout from '@/components/PageAbout';

interface RowTemplate {
  emoji: string;
  activity: string;
  time: string;
}

const YOUNGER: RowTemplate[] = [
  { emoji: '🛌', activity: 'Подъём', time: '07:00' },
  { emoji: '🚿', activity: 'Гигиена, зарядка', time: '07:00–07:20' },
  { emoji: '🍳', activity: 'Завтрак', time: '07:20–07:40' },
  { emoji: '🎒', activity: 'Дорога в школу', time: '07:40–08:20' },
  { emoji: '📚', activity: 'Уроки в школе', time: '08:30–12:30' },
  { emoji: '🍲', activity: 'Обед', time: '12:30–13:00' },
  { emoji: '🌳', activity: 'Прогулка на свежем воздухе', time: '13:00–14:30' },
  { emoji: '📝', activity: 'Домашнее задание', time: '14:30–15:30' },
  { emoji: '🎨', activity: 'Кружки, секции', time: '15:30–17:00' },
  { emoji: '🧸', activity: 'Свободное время, игры', time: '17:00–19:00' },
  { emoji: '🍽️', activity: 'Ужин', time: '19:00–19:30' },
  { emoji: '📖', activity: 'Чтение, спокойные игры', time: '19:30–20:15' },
  { emoji: '🛁', activity: 'Гигиена перед сном', time: '20:15–20:45' },
  { emoji: '😴', activity: 'Сон', time: '20:45–07:00' },
];

const OLDER: RowTemplate[] = [
  { emoji: '🛌', activity: 'Подъём', time: '07:00' },
  { emoji: '🚿', activity: 'Гигиена, зарядка', time: '07:00–07:20' },
  { emoji: '🍳', activity: 'Завтрак', time: '07:20–07:40' },
  { emoji: '🎒', activity: 'Дорога в школу', time: '07:40–08:20' },
  { emoji: '📚', activity: 'Уроки в школе', time: '08:30–14:00' },
  { emoji: '🍲', activity: 'Обед', time: '14:00–14:30' },
  { emoji: '🌳', activity: 'Прогулка, отдых', time: '14:30–15:30' },
  { emoji: '📝', activity: 'Домашнее задание', time: '15:30–17:30' },
  { emoji: '🎨', activity: 'Кружки, секции', time: '17:30–19:00' },
  { emoji: '🍽️', activity: 'Ужин', time: '19:00–19:30' },
  { emoji: '🧸', activity: 'Свободное время', time: '19:30–21:30' },
  { emoji: '🛁', activity: 'Гигиена перед сном', time: '21:30–22:00' },
  { emoji: '😴', activity: 'Сон', time: '22:00–07:00' },
];

type Band = 'younger' | 'older';

export default function RezhimDnyaShkolnikaPage() {
  const [name, setName] = useState('');
  const [klass, setKlass] = useState('');
  const [band, setBand] = useState<Band>('younger');
  const [rows, setRows] = useState<RowTemplate[]>(YOUNGER);
  const printRef = useRef<HTMLDivElement>(null);
  const trackedRef = useRef(false);

  function switchBand(next: Band) {
    setBand(next);
    setRows(next === 'younger' ? YOUNGER : OLDER);
  }

  function updateRow(index: number, field: 'activity' | 'time', value: string) {
    setRows((prev) => prev.map((r, i) => (i === index ? { ...r, [field]: value } : r)));
  }

  function handleFirstPrint() {
    if (!trackedRef.current) {
      trackUsage('generator:rezhim-dnya-shkolnika');
      trackedRef.current = true;
    }
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/generator" className="text-orange hover:underline text-sm">
          ← Все генераторы
        </Link>
        <h1 className="text-3xl font-bold mt-2 mb-2">🕗 Режим дня школьника</h1>
        <p className="text-white/75 mb-8">
          Готовый распорядок дня с учётом рекомендованного времени сна и отдыха — можно
          редактировать под свой день и распечатать как памятку на стену.
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
                placeholder="Например, 2 «Б»"
                className="w-full px-4 py-2 rounded-lg bg-black border border-[#2D2350] text-white placeholder-gray-500 focus:border-orange outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">Возраст</label>
            <div className="flex gap-3">
              <button
                onClick={() => switchBand('younger')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                  band === 'younger' ? 'bg-orange text-white' : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
                }`}
              >
                1–4 класс
              </button>
              <button
                onClick={() => switchBand('older')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                  band === 'older' ? 'bg-orange text-white' : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
                }`}
              >
                5–9 класс
              </button>
            </div>
            <p className="text-gray-500 text-xs mt-2">
              Время можно отредактировать под свой день — это просто ориентир.
            </p>
          </div>
        </div>

        <div ref={printRef} onClickCapture={handleFirstPrint} className="card print-page bg-white">
          <div className="no-print mb-4 flex justify-end">
            <ExportToolbar targetRef={printRef} filename="rezhim-dnya-shkolnika" />
          </div>

          <div className="no-print flex items-center gap-3 mb-6">
            <Image src="/logo.png" alt="Знаторика" width={48} height={48} className="no-print rounded-full flex-shrink-0" />
            <h2 className="text-xl font-bold text-black">
              Режим дня{name ? ` — ${name}` : ''}{klass ? `, ${klass} класс` : ''}
            </h2>
          </div>
          <h2 className="hidden print:block text-xl font-bold text-black mb-4">
            Режим дня{name ? ` — ${name}` : ''}{klass ? `, ${klass} класс` : ''}
          </h2>

          <table className="w-full border-collapse text-black">
            <thead>
              <tr>
                <th className="border-2 border-violet bg-violet text-white text-sm font-bold py-2 px-2 w-14"> </th>
                <th className="border-2 border-violet bg-violet text-white text-sm font-bold py-2 px-2 text-left">Дело</th>
                <th className="border-2 border-violet bg-violet text-white text-sm font-bold py-2 px-2 w-40">Время</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-orange/10'}>
                  <td className="border-2 border-gray-300 text-center text-2xl py-1">{row.emoji}</td>
                  <td className="border-2 border-gray-300 p-0">
                    <input
                      type="text"
                      value={row.activity}
                      onChange={(e) => updateRow(i, 'activity', e.target.value)}
                      className="w-full h-11 text-black text-sm outline-none bg-transparent focus:bg-orange/20 px-3"
                    />
                  </td>
                  <td className="border-2 border-gray-300 p-0">
                    <input
                      type="text"
                      value={row.time}
                      onChange={(e) => updateRow(i, 'time', e.target.value)}
                      className="w-full h-11 text-center text-black text-sm outline-none bg-transparent focus:bg-orange/20 px-1"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <PageAbout route="/generator/rezhim-dnya-shkolnika" />
    </div>
  );
}
