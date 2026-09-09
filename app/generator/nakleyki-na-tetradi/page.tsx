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

interface Subject {
  key: string;
  label: string;
  emoji: string;
}

const SUBJECTS: Subject[] = [
  { key: 'rus', label: 'Русский язык', emoji: '📕' },
  { key: 'math', label: 'Математика', emoji: '🔢' },
  { key: 'reading', label: 'Литературное чтение', emoji: '📖' },
  { key: 'world', label: 'Окружающий мир', emoji: '🌍' },
  { key: 'english', label: 'Английский язык', emoji: '🇬🇧' },
  { key: 'art', label: 'ИЗО', emoji: '🎨' },
  { key: 'music', label: 'Музыка', emoji: '🎵' },
  { key: 'tech', label: 'Технология', emoji: '✂️' },
  { key: 'pe', label: 'Физическая культура', emoji: '⚽' },
  { key: 'diary', label: 'Дневник', emoji: '📔' },
  { key: 'control', label: 'Тетрадь для контрольных работ', emoji: '📝' },
  { key: 'propisi', label: 'Прописи', emoji: '✍️' },
  { key: 'draft', label: 'Черновик', emoji: '📄' },
];

const DEFAULT_SELECTED = new Set(['rus', 'math', 'reading', 'world', 'diary']);
const COPIES_OPTIONS = [1, 2, 3] as const;
const PER_PAGE = 10;

interface LabelData {
  emoji: string;
  subject: string;
}

export default function NakleykiNaTetradiPage() {
  const [name, setName] = useState('');
  const [klass, setKlass] = useState('');
  const [school, setSchool] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set(DEFAULT_SELECTED));
  const [customText, setCustomText] = useState('');
  const [copies, setCopies] = useState<number>(1);
  const [bold, setBold] = useState(false);
  const [font, setFont] = useState<FontChoice>('default');
  const fontClassName = FONTS.find((f) => f.key === font)?.className ?? '';
  const printRef = useRef<HTMLDivElement>(null);
  const trackedRef = useRef(false);

  function toggle(key: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function handleFirstPrint() {
    if (!trackedRef.current) {
      trackUsage('generator:nakleyki-na-tetradi');
      trackedRef.current = true;
    }
  }

  const labels: LabelData[] = useMemo(() => {
    const list: LabelData[] = [];
    for (const s of SUBJECTS) {
      if (!selected.has(s.key)) continue;
      for (let i = 0; i < copies; i++) list.push({ emoji: s.emoji, subject: s.label });
    }
    const custom = customText
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    for (const c of custom) {
      for (let i = 0; i < copies; i++) list.push({ emoji: '📓', subject: c });
    }
    return list;
  }, [selected, customText, copies]);

  const pages: LabelData[][] = [];
  for (let i = 0; i < labels.length; i += PER_PAGE) {
    pages.push(labels.slice(i, i + PER_PAGE));
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/generator" className="text-orange hover:underline text-sm">
          ← Все генераторы
        </Link>
        <h1 className="text-3xl font-bold mt-2 mb-2">🏷️ Наклейки для подписи тетрадей и учебников</h1>
        <p className="text-white/75 mb-8">
          Впиши имя ученика и класс один раз — получи наклейки для подписи всех тетрадей и
          учебников сразу, без переписывания имени вручную на каждой. Распечатай на обычной или
          самоклеящейся бумаге и разрежь по пунктиру.
        </p>

        <div className="card mb-8 no-print space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Имя и фамилия ученика</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Например, Аня Смирнова"
                className="w-full px-4 py-2 rounded-lg bg-black border border-[#2D2350] text-white placeholder-gray-500 focus:border-orange outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Класс</label>
              <input
                type="text"
                value={klass}
                onChange={(e) => setKlass(e.target.value)}
                placeholder="Например, 3 «А»"
                className="w-full px-4 py-2 rounded-lg bg-black border border-[#2D2350] text-white placeholder-gray-500 focus:border-orange outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Школа (необязательно)</label>
            <input
              type="text"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              placeholder="Например, школа №5"
              className="w-full sm:max-w-sm px-4 py-2 rounded-lg bg-black border border-[#2D2350] text-white placeholder-gray-500 focus:border-orange outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">Предметы</label>
            <div className="flex flex-wrap gap-2">
              {SUBJECTS.map((s) => (
                <button
                  key={s.key}
                  onClick={() => toggle(s.key)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                    selected.has(s.key)
                      ? 'bg-orange text-white'
                      : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
                  }`}
                >
                  {s.emoji} {s.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Свой вариант (через запятую)</label>
            <input
              type="text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Например, Второй иностранный язык, Шахматы"
              className="w-full px-4 py-2 rounded-lg bg-black border border-[#2D2350] text-white placeholder-gray-500 focus:border-orange outline-none"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-3">Копий каждой наклейки</label>
              <div className="flex gap-3">
                {COPIES_OPTIONS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCopies(c)}
                    className={`px-5 py-2 rounded-lg font-bold transition-colors text-sm ${
                      copies === c ? 'bg-orange text-white' : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-3">Шрифт</label>
              <div className="flex gap-3 flex-wrap">
                {FONTS.map((f) => (
                  <button
                    key={f.key}
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

          <div>
            <button
              onClick={() => setBold((b) => !b)}
              className={`px-5 py-2 rounded-lg font-bold transition-colors text-sm ${
                bold ? 'bg-orange text-white' : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
              }`}
            >
              Ж Жирный шрифт
            </button>
          </div>
        </div>

        {labels.length > 0 && (
          <div ref={printRef} onClickCapture={handleFirstPrint} className="print-page bg-white rounded-xl overflow-hidden">
            <div className="no-print p-4 flex justify-between items-center flex-wrap gap-3 bg-gray-50">
              <span className="text-sm text-gray-500">{labels.length} наклеек · {pages.length} стр.</span>
              <ExportToolbar targetRef={printRef} filename="nakleyki-na-tetradi" />
            </div>

            {pages.map((pageLabels, pageIndex) => (
              <div
                key={pageIndex}
                className={`grid grid-cols-2 gap-4 p-6 ${
                  pageIndex < pages.length - 1 ? 'print:break-after-page' : ''
                }`}
              >
                {pageLabels.map((label, i) => (
                  <div
                    key={i}
                    className={`border-2 border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center text-center gap-1 h-[52mm] ${fontClassName}`}
                  >
                    <div className="text-4xl">{label.emoji}</div>
                    <div className={`text-lg text-black leading-tight ${bold ? 'font-bold' : ''}`}>{label.subject}</div>
                    <div className={`text-base text-gray-700 mt-1 ${bold ? 'font-bold' : ''}`}>{name || 'Имя ученика'}</div>
                    <div className="text-sm text-gray-500">
                      {klass && `${klass} класс`}
                      {school && `${klass ? ' · ' : ''}${school}`}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      <PageAbout route="/generator/nakleyki-na-tetradi" />
    </div>
  );
}
