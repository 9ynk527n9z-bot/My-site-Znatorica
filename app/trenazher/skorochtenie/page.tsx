'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import { DICTATION_TEXTS, wordCount, type DictationGrade, type DictationText } from '@/lib/dictation-texts';

const GRADES: DictationGrade[] = [1, 2, 3, 4];

type Stage = 'setup' | 'reading' | 'result';

export default function SkorochtenieTrainerPage() {
  const [grade, setGrade] = useState<DictationGrade>(1);
  const [stage, setStage] = useState<Stage>('setup');
  const [text, setText] = useState<DictationText | null>(null);
  const [elapsedMs, setElapsedMs] = useState(0);
  const startRef = useRef<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  function begin() {
    const pool = DICTATION_TEXTS[grade];
    const picked = pool[Math.floor(Math.random() * pool.length)];
    setText(picked);
    setElapsedMs(0);
    setStage('reading');
    startRef.current = Date.now();
    intervalRef.current = setInterval(() => {
      setElapsedMs(Date.now() - startRef.current);
    }, 100);
  }

  function finish() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setStage('result');
  }

  function reset() {
    setStage('setup');
    setText(null);
  }

  const seconds = elapsedMs / 1000;
  const words = text ? wordCount(text.text) : 0;
  const wpm = seconds > 0 ? Math.round((words / seconds) * 60) : 0;

  return (
    <div className="min-h-screen">
      <div className="border-b border-white/15 px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">⏱️ Скорочтение</h1>
      </div>

      <TrainerGate type="trainer:skorochtenie">
        <div className="max-w-2xl mx-auto py-8 px-6">
          {stage === 'setup' && (
            <div className="card text-center">
              <p className="text-lg text-white/90 mb-6">
                Прочитай текст на экране как можно быстрее и понятнее, а потом нажми «Дочитал» —
                мы посчитаем скорость чтения в словах в минуту.
              </p>
              <div className="flex gap-3 justify-center flex-wrap mb-6">
                {GRADES.map((g) => (
                  <button
                    key={g}
                    onClick={() => setGrade(g)}
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
              <button onClick={begin} className="btn-primary px-8 py-4 text-lg">
                ▶️ Начать
              </button>
            </div>
          )}

          {stage === 'reading' && text && (
            <div className="card bg-white text-center">
              <div className="text-orange font-bold text-2xl mb-4 tabular-nums">
                {seconds.toFixed(1)} сек
              </div>
              <h2 className="text-xl font-bold text-black mb-4">{text.title}</h2>
              <p className="text-black text-xl leading-relaxed text-left mb-8">{text.text}</p>
              <button onClick={finish} className="btn-primary px-8 py-4 text-lg">
                ✅ Дочитал!
              </button>
            </div>
          )}

          {stage === 'result' && (
            <div className="card bg-white text-center py-10">
              <p className="text-3xl font-black text-[#3a1c6e] mb-2">🎉 Готово!</p>
              <p className="text-gray-600 mb-1">Скорость чтения:</p>
              <p className="text-6xl font-black text-orange mb-2">{wpm}</p>
              <p className="text-gray-500 mb-8">слов в минуту (за {seconds.toFixed(1)} сек)</p>
              <div className="flex justify-center gap-3 flex-wrap">
                <button onClick={begin} className="btn-primary px-6 py-3">
                  🔁 Ещё раз
                </button>
                <button onClick={reset} className="px-6 py-3 rounded-lg font-bold border border-[#2D2350] text-gray-700 hover:text-black transition-colors">
                  Сменить класс
                </button>
              </div>
            </div>
          )}
        </div>
      </TrainerGate>
    </div>
  );
}
