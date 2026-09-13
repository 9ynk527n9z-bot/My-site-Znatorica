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

type DigitStyle = 'cursive' | 'printed';

export const DIGITS = Array.from({ length: 21 }, (_, i) => String(i)); // 0–20 — числа первого класса

// Прописи цифр — тот же генератор, что и прописи букв (components/generators/PropisiLettersGenerator),
// но без регистра (у цифр нет заглавной/строчной формы) и с фиксированным набором 0–20.
export default function PropisiDigitsGenerator({
  h1,
  intro,
  filenamePrefix,
  aboutRoute,
  worksheetTitle,
  showStudentFields = false,
}: {
  h1: string;
  intro: string;
  filenamePrefix: string;
  aboutRoute: string;
  worksheetTitle?: string;
  showStudentFields?: boolean;
}) {
  const [digitStyle, setDigitStyle] = useState<DigitStyle>('printed');
  const [generatedStyle, setGeneratedStyle] = useState<DigitStyle>('printed');
  const [selected, setSelected] = useState<Set<string>>(new Set(DIGITS));
  const [generated, setGenerated] = useState<string[]>([]);
  const printRef = useRef<HTMLDivElement>(null);
  const quota = useGeneratorQuota();

  function toggle(digit: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(digit)) next.delete(digit);
      else next.add(digit);
      return next;
    });
  }

  function handleGenerate() {
    if (!quota.guard()) return;
    const digits = DIGITS.filter((d) => selected.has(d));
    setGenerated(digits);
    setGeneratedStyle(digitStyle);
    trackUsage('generator:propisi-cifr');
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
            <span className="block text-sm font-medium mb-3">Формат цифр</span>
            <div className="flex gap-3 flex-wrap">
              {([{ value: 'cursive', label: 'Письменные' }, { value: 'printed', label: 'Печатные' }] as const).map((option) => (
                <button key={option.value} onClick={() => setDigitStyle(option.value)} aria-pressed={digitStyle === option.value}
                  className={`px-4 py-2 rounded-lg font-bold transition-colors text-sm ${digitStyle === option.value ? 'bg-orange text-white' : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'}`}>
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4 flex gap-3 flex-wrap">
            <button onClick={() => setSelected(new Set(DIGITS.slice(0, 10)))} className="text-orange text-sm font-bold hover:underline">
              0–9
            </button>
            <button onClick={() => setSelected(new Set(DIGITS.slice(10)))} className="text-orange text-sm font-bold hover:underline">
              10–20
            </button>
            <button onClick={() => setSelected(new Set(DIGITS))} className="text-orange text-sm font-bold hover:underline">
              Все числа
            </button>
            <button onClick={() => setSelected(new Set())} className="text-gray-500 text-sm hover:underline">
              Очистить
            </button>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium mb-3">Числа ({selected.size} выбрано)</label>
            <div className="grid grid-cols-6 sm:grid-cols-7 gap-2">
              {DIGITS.map((digit) => (
                <button
                  key={digit}
                  onClick={() => toggle(digit)}
                  aria-pressed={selected.has(digit)}
                  className={`aspect-square rounded-lg font-bold text-lg transition-colors ${
                    selected.has(digit)
                      ? 'bg-orange text-white'
                      : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
                  }`}
                >
                  {digit}
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
                {generated.map((digit) => (
                  <div key={digit} className="propisi-letter-block mb-8">
                    <div className={`propisi-line relative mb-3${digit.length > 1 ? ' propisi-lower' : ''}`}>
                      <div className="propisi-guide propisi-guide-top" />
                      <div className="propisi-guide propisi-guide-middle" />
                      <div className="propisi-guide propisi-guide-base" />

                      <div className="propisi-glyphs">
                        <span className="propisi-model">{digit}</span>
                        {Array.from({ length: 4 }).map((_, i) => (
                          <span key={i} className="propisi-trace">
                            {digit}
                          </span>
                        ))}
                        <span className="propisi-free" />
                      </div>
                    </div>
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
