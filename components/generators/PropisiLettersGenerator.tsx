'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { Neucha } from 'next/font/google';
import localFont from 'next/font/local';
import { trackUsage } from '@/lib/track';
import ExportToolbar from '@/components/ExportToolbar';
import { useGeneratorQuota } from '@/lib/useGeneratorQuota';
import GeneratorQuotaBanner from '@/components/GeneratorQuotaBanner';
import PageAbout from '@/components/PageAbout';

const neucha = Neucha({ weight: '400', subsets: ['cyrillic'], display: 'swap' });
const schoolScript = localFont({ src: '../../public/fonts/russkopis/Russkopis-Normalny.otf', display: 'swap' });

type LetterStyle = 'cursive' | 'printed';
type CaseMode = 'upper' | 'lower' | 'both';
type Preset = 'vowels' | 'consonants' | 'all' | 'none';

export const VOWELS = ['А', 'Е', 'Ё', 'И', 'О', 'У', 'Ы', 'Э', 'Ю', 'Я'];
export const CONSONANTS = ['Б', 'В', 'Г', 'Д', 'Ж', 'З', 'Й', 'К', 'Л', 'М', 'Н', 'П', 'Р', 'С', 'Т', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ'];
const OTHER = ['Ъ', 'Ь'];
const ALPHABET = [...VOWELS, ...CONSONANTS, ...OTHER].sort((a, b) => a.localeCompare(b, 'ru'));

function toCase(letter: string, mode: CaseMode): string[] {
  if (letter === 'Ь' || letter === 'Ъ' || letter === 'Ы') return [letter.toLowerCase()];
  if (mode === 'upper') return [letter];
  if (mode === 'lower') return [letter.toLowerCase()];
  return [letter, letter.toLowerCase()];
}

function lettersForPreset(preset: Preset): string[] {
  if (preset === 'vowels') return VOWELS;
  if (preset === 'consonants') return CONSONANTS;
  if (preset === 'all') return ALPHABET;
  return [];
}

// Общий генератор прописей русских букв — используется как самой страницей
// /generator/propisi-ru (весь выбор открыт), так и её узкими SEO-вариантами
// (гласные/согласные/дошкольники/1 класс/алфавит), которые отличаются только
// начальными настройками, заголовком и текстом под генератором.
export default function PropisiLettersGenerator({
  h1,
  intro,
  defaultLetterStyle = 'cursive',
  defaultCaseMode = 'both',
  defaultPreset = 'none',
  filenamePrefix,
  aboutRoute,
  worksheetTitle,
  showStudentFields = false,
}: {
  h1: string;
  intro: string;
  defaultLetterStyle?: LetterStyle;
  defaultCaseMode?: CaseMode;
  defaultPreset?: Preset;
  filenamePrefix: string;
  aboutRoute: string;
  worksheetTitle?: string;
  showStudentFields?: boolean;
}) {
  const [letterStyle, setLetterStyle] = useState<LetterStyle>(defaultLetterStyle);
  const [generatedStyle, setGeneratedStyle] = useState<LetterStyle>(defaultLetterStyle);
  const [selected, setSelected] = useState<Set<string>>(new Set(defaultPreset === 'none' ? ['А', 'Б', 'В'] : lettersForPreset(defaultPreset)));
  const [caseMode, setCaseMode] = useState<CaseMode>(defaultCaseMode);
  const [generated, setGenerated] = useState<string[]>([]);
  const [generatedCase, setGeneratedCase] = useState<CaseMode>(defaultCaseMode);
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

  function selectPreset(preset: Preset) {
    setSelected(new Set(lettersForPreset(preset)));
  }

  function handleGenerate() {
    if (!quota.guard()) return;
    const letters = ALPHABET.filter((l) => selected.has(l));
    setGenerated(letters);
    setGeneratedCase(caseMode);
    setGeneratedStyle(letterStyle);
    trackUsage('generator:propisi-ru');
    quota.consume();
  }

  return (
    <div className="generator-propisi-page bg-[#28134f] min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/generator" className="no-print text-orange hover:underline text-sm">
          ← Все генераторы
        </Link>
        <h1 className="no-print text-3xl font-bold mt-2 mb-2">{h1}</h1>
        <p className="no-print text-gray-400 mb-8">{intro}</p>

        <div className="card mb-8 no-print">
          <div className="mb-6">
            <span className="block text-sm font-medium mb-3">Формат букв</span>
            <div className="flex gap-3 flex-wrap">
              {([{ value: 'cursive', label: 'Письменные' }, { value: 'printed', label: 'Печатные' }] as const).map((option) => (
                <button key={option.value} onClick={() => setLetterStyle(option.value)} aria-pressed={letterStyle === option.value}
                  className={`px-4 py-2 rounded-lg font-bold transition-colors text-sm ${letterStyle === option.value ? 'bg-orange text-white' : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'}`}>
                  {option.label}
                </button>
              ))}
            </div>
          </div>

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
                  aria-pressed={caseMode === opt.value}
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

          <div className="mb-8">
            <label className="block text-sm font-medium mb-3">Буквы ({selected.size} выбрано)</label>
            <div className="grid grid-cols-8 sm:grid-cols-11 gap-2">
              {ALPHABET.map((letter) => (
                <button
                  key={letter}
                  onClick={() => toggle(letter)}
                  aria-pressed={selected.has(letter)}
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
          <div className="propisi-sheet card print-page bg-white">
            <div className="no-print mb-6 flex justify-between items-center gap-4 flex-wrap">
              <p className="text-sm text-slate-500">Образец → обводка → самостоятельное письмо</p>
              <ExportToolbar targetRef={printRef} filename={`${filenamePrefix}-${generatedStyle}`} />
            </div>

            <div
              ref={printRef}
              className={worksheetTitle ? 'propisi-print-content propisi-lines rounded-2xl border-[3px] border-[#A78BFA] p-5 md:p-7' : ''}
              style={worksheetTitle ? { display: 'block' } : undefined}
            >
              {worksheetTitle && (
                <h2 className="mb-5 text-center text-2xl font-black text-[#8B5CF6]">{worksheetTitle}</h2>
              )}
              {showStudentFields && (
                <div className="mb-6 grid grid-cols-2 gap-8 text-base font-semibold text-slate-700">
                  <div className="flex items-end gap-2">
                    <span>Имя</span>
                    <span className="h-6 flex-1 border-b-2 border-slate-400" />
                  </div>
                  <div className="flex items-end gap-2">
                    <span>Класс</span>
                    <span className="h-6 flex-1 border-b-2 border-slate-400" />
                  </div>
                </div>
              )}

              <div className={`${generatedStyle === 'cursive' ? schoolScript.className + ' propisi-cursive' : neucha.className} propisi-lines`}>
                {generated.map((letter) => (
                  <div key={letter} className="propisi-letter-block mb-8">
                    {toCase(letter, generatedCase).map((letterForm, idx) => (
                      <div key={idx} className={`propisi-line relative mb-3${letterForm === letterForm.toLowerCase() ? " propisi-lower" : ""}`}>
                        <div className="propisi-guide propisi-guide-top" />
                        <div className="propisi-guide propisi-guide-middle" />
                        <div className="propisi-guide propisi-guide-base" />

                        <div className="propisi-glyphs">
                          <span className="propisi-model">{letterForm}</span>
                          {Array.from({ length: 4 }).map((_, i) => (
                            <span key={i} className="propisi-trace">
                              {letterForm}
                            </span>
                          ))}
                          <span className="propisi-free" />
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <PageAbout route={aboutRoute} />
    </div>
  );
}
