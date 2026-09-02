'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { DICTATION_TEXTS, DICTATION_NORMS, wordCount, type DictationGrade, type DictationText } from '@/lib/dictation-texts';
import { trackUsage } from '@/lib/track';
import ExportToolbar from '@/components/ExportToolbar';
import { useGeneratorQuota } from '@/lib/useGeneratorQuota';
import GeneratorQuotaBanner from '@/components/GeneratorQuotaBanner';

const GRADES: DictationGrade[] = [1, 2, 3, 4];
const RULED_LINES = 6;

export default function SpisyvanieGeneratorPage() {
  const [grade, setGrade] = useState<DictationGrade>(1);
  const [result, setResult] = useState<DictationText | null>(null);
  const printRef = useRef<HTMLDivElement>(null);
  const quota = useGeneratorQuota();

  function handleGenerate() {
    if (!quota.guard()) return;
    const pool = DICTATION_TEXTS[grade];
    const picked = pool[Math.floor(Math.random() * pool.length)];
    setResult(picked);
    trackUsage('generator:spisyvanie');
    quota.consume();
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/generator" className="text-orange hover:underline text-sm">
          ← Все генераторы
        </Link>
        <h1 className="text-3xl font-bold mt-2 mb-2">✍️ Генератор для списывания</h1>
        <p className="text-white/75 mb-8">
          Текст для переписывания от руки (не под диктовку, а глазами — тренирует внимательность,
          аккуратность и грамотность). Длина текста подобрана по возрасту.
        </p>

        <div className="card mb-8 no-print">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">Класс</label>
            <div className="flex gap-3 flex-wrap">
              {GRADES.map((g) => (
                <button
                  key={g}
                  onClick={() => {
                    setGrade(g);
                    setResult(null);
                  }}
                  className={`px-5 py-2 rounded-lg font-bold transition-colors text-sm ${
                    grade === g
                      ? 'bg-orange text-white'
                      : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
                  }`}
                >
                  {g} класс
                </button>
              ))}
            </div>
            <p className="text-white/50 text-xs mt-3">
              Обычная длина текста для {grade} класса: {DICTATION_NORMS[grade]}
            </p>
          </div>

          <GeneratorQuotaBanner quota={quota} />

          <button onClick={handleGenerate} disabled={!quota.guard()} className="btn-primary w-full disabled:opacity-50">
            Сгенерировать текст
          </button>
        </div>

        {result && (
          <div ref={printRef} className="card print-page bg-white">
            <div className="no-print mb-4 flex justify-between items-center flex-wrap gap-3">
              <span className="text-sm text-gray-500">
                {grade} класс · «{result.title}» · {wordCount(result.text)} слов
              </span>
              <ExportToolbar targetRef={printRef} filename={`spisyvanie-${grade}-klass`} />
            </div>

            <h2 className="text-xl font-bold text-black mb-4">{result.title}</h2>
            <p className="text-black text-lg leading-relaxed mb-8">{result.text}</p>

            <p className="no-print text-gray-500 text-sm mb-2">Перепиши текст здесь:</p>
            <div>
              {Array.from({ length: RULED_LINES }).map((_, i) => (
                <div key={i} className="border-b border-gray-300 h-10" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
