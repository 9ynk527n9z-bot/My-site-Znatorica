'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import ClockFace from '@/components/ClockFace';
import { trackUsage } from '@/lib/track';
import ExportToolbar from '@/components/ExportToolbar';
import { useGeneratorQuota } from '@/lib/useGeneratorQuota';
import GeneratorQuotaBanner from '@/components/GeneratorQuotaBanner';
import { pluralizeCount } from '@/lib/pluralize';

type Mode = 'hours' | 'minutes';

const MODES: { value: Mode; label: string; desc: string }[] = [
  { value: 'hours', label: 'Только целые часы', desc: '1–2 класс' },
  { value: 'minutes', label: 'С минутами (кратно 5)', desc: '2–3 класс' },
];

const COUNTS = [6, 8, 9] as const;

const tasksCount = (n: number) => pluralizeCount(n, ['циферблат', 'циферблата', 'циферблатов']);

interface ClockTask {
  hour: number;
  minute: number;
}

function formatTime(hour: number, minute: number): string {
  return `${hour}:${String(minute).padStart(2, '0')}`;
}

function generateClocks(mode: Mode, count: number): ClockTask[] {
  const tasks: ClockTask[] = [];
  for (let i = 0; i < count; i++) {
    const hour = Math.floor(Math.random() * 12) + 1;
    const minute = mode === 'hours' ? 0 : Math.floor(Math.random() * 12) * 5;
    tasks.push({ hour, minute });
  }
  return tasks;
}

export default function KotoryyChasPage() {
  const [mode, setMode] = useState<Mode>('hours');
  const [count, setCount] = useState<number>(6);
  const [tasks, setTasks] = useState<ClockTask[] | null>(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);
  const quota = useGeneratorQuota();

  function handleGenerate() {
    if (!quota.guard()) return;
    setTasks(generateClocks(mode, count));
    setShowAnswers(false);
    trackUsage('generator:kotoryy-chas');
    quota.consume();
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/generator" className="text-orange hover:underline text-sm">
          ← Все генераторы
        </Link>
        <h1 className="text-3xl font-bold mt-2 mb-2">🕒 Который час?</h1>
        <p className="text-white/75 mb-8">
          Лист с циферблатами для печати: посмотри на стрелки и запиши время. Целые часы — для
          1–2 класса, время с минутами кратно 5 — для 2–3 класса.
        </p>

        <div className="card mb-8 no-print">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">Режим</label>
            <div className="flex gap-3 flex-wrap">
              {MODES.map((m) => (
                <button
                  key={m.value}
                  onClick={() => setMode(m.value)}
                  className={`px-5 py-2 rounded-lg font-bold transition-colors text-sm ${
                    mode === m.value
                      ? 'bg-orange text-white'
                      : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
                  }`}
                >
                  {m.label}
                  <span className="block text-xs font-normal opacity-75">{m.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">Количество циферблатов</label>
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
                  {tasksCount(c)}
                </button>
              ))}
            </div>
          </div>

          <GeneratorQuotaBanner quota={quota} />

          <button onClick={handleGenerate} disabled={!quota.guard()} className="btn-primary w-full disabled:opacity-50">
            Сгенерировать
          </button>
        </div>

        {tasks && (
          <div ref={printRef} className="card print-page bg-white">
            <div className="no-print mb-4 flex justify-between items-center flex-wrap gap-3">
              <span className="text-sm text-gray-500">
                {tasksCount(tasks.length)} · {mode === 'hours' ? 'целые часы' : 'с минутами'}
              </span>
              <ExportToolbar targetRef={printRef} filename={`kotoryy-chas-${mode}`} />
            </div>

            <h2 className="no-print text-xl font-bold text-black mb-6">Который час показывают часы?</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-8">
              {tasks.map((t, i) => (
                <div key={i} className="text-center">
                  <span className="text-gray-400 font-bold text-sm block mb-1">{i + 1}.</span>
                  <ClockFace hour={t.hour} minute={t.minute} size={140} />
                  <div className="mt-3 mx-auto w-28 h-10 border-b-2 border-gray-400 flex items-center justify-center">
                    <span className="text-lg font-bold text-black">
                      {showAnswers ? formatTime(t.hour, t.minute) : ''}
                    </span>
                  </div>
                </div>
              ))}
            </div>

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
