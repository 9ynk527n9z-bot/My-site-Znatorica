'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { VOCAB_WORDS, generateVocabExercise, pickVocabList, type VocabGrade, type VocabExerciseItem } from '@/lib/vocab-words';
import { trackUsage } from '@/lib/track';
import ExportToolbar from '@/components/ExportToolbar';
import { useGeneratorQuota } from '@/lib/useGeneratorQuota';
import GeneratorQuotaBanner from '@/components/GeneratorQuotaBanner';
import { pluralizeCount } from '@/lib/pluralize';

const GRADES: VocabGrade[] = [1, 2, 3, 4];
const COUNTS = [10, 15, 20] as const;
const wordsCount = (n: number) => pluralizeCount(n, ['слово', 'слова', 'слов']);

type Mode = 'list' | 'exercise';

export default function SlovarnyeSlovaGeneratorPage() {
  const [grade, setGrade] = useState<VocabGrade>(2);
  const [mode, setMode] = useState<Mode>('exercise');
  const [count, setCount] = useState<number>(15);
  const [list, setList] = useState<string[] | null>(null);
  const [exercise, setExercise] = useState<VocabExerciseItem[] | null>(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);
  const quota = useGeneratorQuota();

  function handleGenerate() {
    if (!quota.guard()) return;
    if (mode === 'list') {
      setList(pickVocabList(grade, count));
      setExercise(null);
    } else {
      setExercise(generateVocabExercise(grade, count));
      setList(null);
    }
    setShowAnswers(false);
    trackUsage('generator:slovarnye-slova');
    quota.consume();
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/generator" className="text-orange hover:underline text-sm">
          ← Все генераторы
        </Link>
        <h1 className="text-3xl font-bold mt-2 mb-2">📖 Генератор словарных слов</h1>
        <p className="text-white/75 mb-8">
          Слова с непроверяемым написанием, которые нужно просто запомнить — подобраны по классам (1–4).
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
                    setList(null);
                    setExercise(null);
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
              Всего слов в списке {grade} класса: {VOCAB_WORDS[grade].length}
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">Количество слов</label>
            <div className="flex gap-3 flex-wrap">
              {COUNTS.map((c) => (
                <button
                  key={c}
                  onClick={() => setCount(c)}
                  className={`px-5 py-2 rounded-lg font-bold transition-colors text-sm ${
                    count === c
                      ? 'bg-orange text-white'
                      : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
                  }`}
                >
                  {wordsCount(c)}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">Режим</label>
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => setMode('exercise')}
                className={`px-4 py-2 rounded-lg font-bold transition-colors text-sm ${
                  mode === 'exercise'
                    ? 'bg-orange text-white'
                    : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
                }`}
              >
                ✏️ Вставь букву
              </button>
              <button
                onClick={() => setMode('list')}
                className={`px-4 py-2 rounded-lg font-bold transition-colors text-sm ${
                  mode === 'list'
                    ? 'bg-orange text-white'
                    : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
                }`}
              >
                📋 Список для заучивания
              </button>
            </div>
          </div>

          <GeneratorQuotaBanner quota={quota} />

          <button onClick={handleGenerate} disabled={!quota.guard()} className="btn-primary w-full disabled:opacity-50">
            Сгенерировать
          </button>
        </div>

        {exercise && (
          <div ref={printRef} className="card print-page bg-white">
            <div className="no-print mb-4 flex justify-between items-center flex-wrap gap-3">
              <span className="text-sm text-gray-500">
                {grade} класс · вставь пропущенную букву · {wordsCount(exercise.length)}
              </span>
              <ExportToolbar targetRef={printRef} filename={`slovarnye-slova-${grade}-klass`} />
            </div>

            <h2 className="no-print text-xl font-bold text-black mb-4">Вставь пропущенную букву</h2>
            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-3 list-decimal list-inside">
              {exercise.map((item, i) => (
                <li key={i} className="text-black text-lg">
                  {item.display}
                </li>
              ))}
            </ol>

            <div className="mt-6 no-print">
              <button onClick={() => setShowAnswers((v) => !v)} className="text-orange font-bold hover:underline">
                {showAnswers ? 'Скрыть ответы' : 'Показать ответы'}
              </button>
              {showAnswers && (
                <ol className="grid grid-cols-1 sm:grid-cols-2 gap-3 list-decimal list-inside mt-4">
                  {exercise.map((item, i) => (
                    <li key={i} className="text-gray-700">
                      {item.word}
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </div>
        )}

        {list && (
          <div ref={printRef} className="card print-page bg-white">
            <div className="no-print mb-4 flex justify-between items-center flex-wrap gap-3">
              <span className="text-sm text-gray-500">
                {grade} класс · список для заучивания · {wordsCount(list.length)}
              </span>
              <ExportToolbar targetRef={printRef} filename={`slovarnye-slova-spisok-${grade}-klass`} />
            </div>

            <h2 className="no-print text-xl font-bold text-black mb-4">Словарные слова — {grade} класс</h2>
            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-3 list-decimal list-inside">
              {list.map((word, i) => (
                <li key={i} className="text-black text-lg">
                  {word}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}
