'use client';

import { useRef, useState } from 'react';
import { Neucha } from 'next/font/google';
import { trackUsage } from '@/lib/track';
import ExportToolbar from '@/components/ExportToolbar';
import { useGeneratorQuota } from '@/lib/useGeneratorQuota';
import GeneratorQuotaBanner from '@/components/GeneratorQuotaBanner';

const neucha = Neucha({ weight: '400', subsets: ['cyrillic'], display: 'swap' });

const VOWELS = ['А', 'Е', 'Ё', 'И', 'О', 'У', 'Ы', 'Э', 'Ю', 'Я'];
const CONSONANTS = ['Б', 'В', 'Г', 'Д', 'Ж', 'З', 'Й', 'К', 'Л', 'М', 'Н', 'П', 'Р', 'С', 'Т', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ'];
const OTHER = ['Ъ', 'Ь'];
const ALPHABET = [...VOWELS, ...CONSONANTS, ...OTHER].sort((a, b) => a.localeCompare(b, 'ru'));

type CaseMode = 'upper' | 'lower' | 'both';

function toCase(letter: string, mode: CaseMode): string[] {
  if (mode === 'upper') return [letter];
  if (mode === 'lower') return [letter.toLowerCase()];
  return [letter, letter.toLowerCase()];
}

export default function PropisiRuPage() {
  const [selected, setSelected] = useState<Set<string>>(new Set(['А', 'Б', 'В']));
  const [caseMode, setCaseMode] = useState<CaseMode>('both');
  const [generated, setGenerated] = useState<string[]>([]);
  const printRef = useRef<HTMLDivElement>(null);
  const quota = useGeneratorQuota();

  function toggle(letter: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(letter)) next.delete(letter);
      else next.add(letter);
      return next;
    });
  }

  function selectPreset(preset: 'vowels' | 'consonants' | 'all' | 'none') {
    if (preset === 'vowels') setSelected(new Set(VOWELS));
    else if (preset === 'consonants') setSelected(new Set(CONSONANTS));
    else if (preset === 'all') setSelected(new Set(ALPHABET));
    else setSelected(new Set());
  }

  function handleGenerate() {
    if (!quota.guard()) return;
    const letters = ALPHABET.filter((l) => selected.has(l));
    setGenerated(letters);
    trackUsage('generator:propisi-ru');
    quota.consume();
  }

  return (
    <div className="bg-black min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Генератор прописей</h1>
        <p className="text-gray-400 mb-8">
          Выбери буквы русского алфавита — получится страница для обводки и самостоятельного письма.
        </p>

        <div className="card mb-8 no-print">
          {/* Регистр */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">Регистр букв</label>
            <div className="flex gap-3 flex-wrap">
              {[
                { value: 'upper' as const, label: 'Заглавные' },
                { value: 'lower' as const, label: 'Строчные' },
                { value: 'both' as const, label: 'Заглавные и строчные' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setCaseMode(opt.value)}
                  className={`px-4 py-2 rounded-lg font-bold transition-colors text-sm ${
                    caseMode === opt.value
                      ? 'bg-orange text-white'
                      : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Пресеты */}
          <div className="mb-4 flex gap-3 flex-wrap">
            <button onClick={() => selectPreset('vowels')} className="text-orange text-sm font-bold hover:underline">
              Только гласные
            </button>
            <button onClick={() => selectPreset('consonants')} className="text-orange text-sm font-bold hover:underline">
              Только согласные
            </button>
            <button onClick={() => selectPreset('all')} className="text-orange text-sm font-bold hover:underline">
              Весь алфавит
            </button>
            <button onClick={() => selectPreset('none')} className="text-gray-500 text-sm hover:underline">
              Очистить
            </button>
          </div>

          {/* Буквы */}
          <div className="mb-8">
            <label className="block text-sm font-medium mb-3">Буквы ({selected.size} выбрано)</label>
            <div className="grid grid-cols-8 sm:grid-cols-11 gap-2">
              {ALPHABET.map((letter) => (
                <button
                  key={letter}
                  onClick={() => toggle(letter)}
                  className={`aspect-square rounded-lg font-bold text-lg transition-colors ${
                    selected.has(letter)
                      ? 'bg-orange text-white'
                      : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>

          <GeneratorQuotaBanner quota={quota} />

          <button onClick={handleGenerate} disabled={selected.size === 0 || !quota.guard()} className="btn-primary w-full disabled:opacity-50">
            Создать прописи
          </button>
        </div>

        {generated.length > 0 && (
          <div ref={printRef} className="card print-page bg-white">
            <div className="no-print mb-4 flex justify-end">
              <ExportToolbar targetRef={printRef} filename="propisi-ru" />
            </div>

            <div className={neucha.className}>
              {generated.map((letter) => (
                <div key={letter} className="mb-8">
                  {toCase(letter, caseMode).map((letterForm, idx) => (
                    <div key={idx} className="relative mb-3">
                      {/* Направляющие линии — имитация линованной тетради */}
                      <div className="absolute left-0 right-0 top-1/2 border-t border-dashed border-gray-300" />
                      <div className="absolute left-0 right-0 bottom-0 border-t-2 border-gray-400" />

                      <div className="relative flex items-end gap-2 text-6xl leading-none pb-1">
                        {/* Образец — сплошная буква для примера */}
                        <span className="text-black">{letterForm}</span>
                        <span className="text-black">{letterForm}</span>

                        {/* Буквы для обводки — контур */}
                        {Array.from({ length: 4 }).map((_, i) => (
                          <span
                            key={i}
                            style={{
                              color: 'transparent',
                              WebkitTextStroke: '1.5px #999',
                            }}
                          >
                            {letterForm}
                          </span>
                        ))}

                        {/* Пустое место для самостоятельного письма */}
                        <span className="flex-1" />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
