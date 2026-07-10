'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { pickWordProblems, type ProblemGrade, type ProblemCategory, type WordProblem } from '@/lib/word-problems';
import { trackUsage } from '@/lib/track';
import ExportToolbar from '@/components/ExportToolbar';
import { useGeneratorQuota } from '@/lib/useGeneratorQuota';
import GeneratorQuotaBanner from '@/components/GeneratorQuotaBanner';

const GRADES: ProblemGrade[] = [3, 4];
const COUNTS = [1, 2, 3] as const;

type Category = ProblemCategory | 'mixed';

const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'plus_minus', label: '➕➖ Сложение и вычитание' },
  { value: 'multiply_divide', label: '✖️➗ Умножение и деление' },
  { value: 'mixed', label: '🔀 Смешанный режим' },
];

function countLabel(c: number): string {
  return c === 1 ? '1 задача' : `${c} задачи`;
}

export default function ZadachiGeneratorPage() {
  const [grade, setGrade] = useState<ProblemGrade>(3);
  const [count, setCount] = useState<number>(1);
  const [category, setCategory] = useState<Category>('mixed');
  const [problems, setProblems] = useState<WordProblem[] | null>(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);
  const quota = useGeneratorQuota();

  function handleGenerate() {
    if (!quota.guard()) return;
    setProblems(pickWordProblems(grade, count, category === 'mixed' ? undefined : category));
    setShowAnswers(false);
    trackUsage('generator:zadachi');
    quota.consume();
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/generator" className="text-orange hover:underline text-sm">
          ← Все генераторы
        </Link>
        <h1 className="text-3xl font-bold mt-2 mb-2">🧩 Генератор задач</h1>
        <p className="text-white/75 mb-8">
          Текстовые задачи по математике для 3 и 4 класса — с готовым решением и ответом.
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
                    setProblems(null);
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
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">Количество задач</label>
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
                  {countLabel(c)}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">Режим</label>
            <div className="flex gap-3 flex-wrap">
              {CATEGORIES.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setCategory(c.value)}
                  className={`px-4 py-2 rounded-lg font-bold transition-colors text-sm ${
                    category === c.value
                      ? 'bg-orange text-white'
                      : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <GeneratorQuotaBanner quota={quota} />

          <button onClick={handleGenerate} disabled={!quota.guard()} className="btn-primary w-full disabled:opacity-50">
            Сгенерировать
          </button>
        </div>

        {problems && (
          <div ref={printRef} className="card print-page bg-white">
            <div className="no-print mb-4 flex justify-between items-center flex-wrap gap-3">
              <span className="text-sm text-gray-500">
                {grade} класс · {problems.length} задач
              </span>
              <ExportToolbar targetRef={printRef} filename={`zadachi-${grade}-klass`} />
            </div>

            <h2 className="text-xl font-bold text-black mb-4">Задачи — {grade} класс</h2>
            <ol className="space-y-4 list-decimal list-inside">
              {problems.map((p, i) => (
                <li key={i} className="text-black text-lg">
                  {p.text}
                </li>
              ))}
            </ol>

            <div className="mt-6 no-print">
              <button onClick={() => setShowAnswers((v) => !v)} className="text-orange font-bold hover:underline">
                {showAnswers ? 'Скрыть ответы' : 'Показать ответы'}
              </button>
              {showAnswers && (
                <ol className="space-y-2 list-decimal list-inside mt-4">
                  {problems.map((p, i) => (
                    <li key={i} className="text-gray-700">
                      <span className="font-bold text-gray-900">{p.answer}</span>
                      <span className="text-gray-500"> ({p.solution})</span>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
