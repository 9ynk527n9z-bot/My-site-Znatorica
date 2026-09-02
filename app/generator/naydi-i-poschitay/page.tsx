'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import {
  generateFindCountSheet,
  CATEGORY_LABELS,
  type FindCountCategory,
  type FindCountSheet,
} from '@/lib/naydi-i-poschitay';
import { trackUsage } from '@/lib/track';
import ExportToolbar from '@/components/ExportToolbar';
import { useGeneratorQuota } from '@/lib/useGeneratorQuota';
import GeneratorQuotaBanner from '@/components/GeneratorQuotaBanner';

const CATEGORIES: FindCountCategory[] = ['zhivotnye', 'frukty', 'transport', 'figury'];
const KINDS_OPTIONS = [4, 5, 6] as const;

export default function NaydiIPoschitayPage() {
  const [category, setCategory] = useState<FindCountCategory>('zhivotnye');
  const [kindsCount, setKindsCount] = useState<number>(5);
  const [sheet, setSheet] = useState<FindCountSheet | null>(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);
  const quota = useGeneratorQuota();

  function handleGenerate() {
    if (!quota.guard()) return;
    setSheet(generateFindCountSheet(category, kindsCount));
    setShowAnswers(false);
    trackUsage('generator:naydi-i-poschitay');
    quota.consume();
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/generator" className="text-orange hover:underline text-sm">
          ← Все генераторы
        </Link>
        <h1 className="text-3xl font-bold mt-2 mb-2">🔍 Найди и посчитай</h1>
        <p className="text-white/75 mb-8">
          На листе вразброс перемешаны картинки разных видов. Найди и посчитай, сколько
          каждого вида, и впиши числа в таблицу.
        </p>

        <div className="card mb-8 no-print">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">Категория</label>
            <div className="flex gap-3 flex-wrap">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-5 py-2 rounded-lg font-bold transition-colors text-sm ${
                    category === c
                      ? 'bg-orange text-white'
                      : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
                  }`}
                >
                  {CATEGORY_LABELS[c]}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">Количество видов</label>
            <div className="flex gap-3 flex-wrap">
              {KINDS_OPTIONS.map((k) => (
                <button
                  key={k}
                  onClick={() => setKindsCount(k)}
                  className={`px-5 py-2 rounded-lg font-bold transition-colors text-sm ${
                    kindsCount === k
                      ? 'bg-orange text-white'
                      : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>
          </div>

          <GeneratorQuotaBanner quota={quota} />

          <button onClick={handleGenerate} disabled={!quota.guard()} className="btn-primary w-full disabled:opacity-50">
            Сгенерировать
          </button>
        </div>

        {sheet && (
          <div ref={printRef} className="card print-page bg-white">
            <div className="no-print mb-4 flex justify-between items-center flex-wrap gap-3">
              <span className="text-sm text-gray-500">
                {CATEGORY_LABELS[sheet.category]} · {sheet.kinds.length} видов
              </span>
              <ExportToolbar targetRef={printRef} filename={`naydi-i-poschitay-${sheet.category}`} />
            </div>

            <h2 className="no-print text-xl font-bold text-black mb-6">Найди и посчитай</h2>

            <div className="flex flex-wrap gap-3 mb-8 p-4 rounded-xl bg-gray-50 border border-gray-200">
              {sheet.shuffled.map((emoji, i) => (
                <span key={i} className="text-3xl leading-none select-none">
                  {emoji}
                </span>
              ))}
            </div>

            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left text-black font-bold pb-2 border-b-2 border-gray-300">Сколько?</th>
                  <th className="text-left text-black font-bold pb-2 border-b-2 border-gray-300 w-24">Ответ</th>
                </tr>
              </thead>
              <tbody>
                {sheet.kinds.map((k, i) => (
                  <tr key={i} className="border-b border-gray-200">
                    <td className="py-3 text-black text-lg">
                      <span className="text-2xl mr-2">{k.emoji}</span>
                      Сколько {k.name}?
                    </td>
                    <td className="py-3">
                      <div className="w-14 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center">
                        <span className="text-lg font-bold text-black">{showAnswers ? k.count : ''}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-6 no-print">
              <button onClick={() => setShowAnswers((v) => !v)} className="text-orange font-bold hover:underline">
                {showAnswers ? 'Скрыть ответы' : 'Показать ответы'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
