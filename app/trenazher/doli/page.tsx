'use client';

import Link from 'next/link';
import { useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import { praiseFor } from '@/lib/praise';

interface Fraction {
  num: number;
  den: number;
  label: string;
}

const FRACTIONS: Fraction[] = [
  { num: 1, den: 2, label: '1/2' },
  { num: 1, den: 3, label: '1/3' },
  { num: 1, den: 4, label: '1/4' },
  { num: 2, den: 3, label: '2/3' },
  { num: 3, den: 4, label: '3/4' },
];

const ROUNDS_PER_SESSION = 10;

function randItem<T>(arr: T[], exclude?: T): T {
  const pool = exclude === undefined ? arr : arr.filter((x) => x !== exclude);
  return pool[Math.floor(Math.random() * pool.length)];
}

interface Round {
  fraction: Fraction;
  shape: 'circle' | 'rect';
  options: string[];
}

function makeRound(): Round {
  const fraction = randItem(FRACTIONS);
  const shape = Math.random() < 0.5 ? 'circle' : 'rect';

  const wrongPool = FRACTIONS.filter((f) => f.label !== fraction.label);
  // Перемешиваем и берём 3 неверных варианта
  const shuffledWrong = [...wrongPool].sort(() => Math.random() - 0.5).slice(0, 3);
  const options = [fraction.label, ...shuffledWrong.map((f) => f.label)].sort(() => Math.random() - 0.5);

  return { fraction, shape, options };
}

// Круг рисуем через conic-gradient: закрашиваем первые M/N долей окружности,
// затем накладываем тонкие радиальные линии-разделители (border-подобные лучи)
// поверх, чтобы визуально показать границы всех N частей.
function CircleFraction({ num, den }: { num: number; den: number }) {
  const filledDeg = (num / den) * 360;
  const lines = Array.from({ length: den }, (_, i) => (i * 360) / den);

  return (
    <div
      className="relative w-48 h-48 rounded-full border-4 border-[#3a1c6e]"
      style={{
        background: `conic-gradient(#F97316 0deg ${filledDeg}deg, #f3f4f6 ${filledDeg}deg 360deg)`,
      }}
    >
      {lines.map((deg, i) => (
        <div
          key={i}
          className="absolute top-1/2 left-1/2 w-1/2 h-[2px] bg-[#3a1c6e] origin-left"
          style={{ transform: `rotate(${deg}deg)` }}
        />
      ))}
    </div>
  );
}

// Прямоугольник делим на N равных вертикальных полос через flex,
// закрашивая первые M полос оранжевым.
function RectFraction({ num, den }: { num: number; den: number }) {
  return (
    <div className="flex w-64 h-40 rounded-lg overflow-hidden border-4 border-[#3a1c6e]">
      {Array.from({ length: den }, (_, i) => (
        <div
          key={i}
          className={`flex-1 h-full ${i < num ? 'bg-amber-500' : 'bg-gray-100'} ${
            i > 0 ? 'border-l-2 border-[#3a1c6e]' : ''
          }`}
        />
      ))}
    </div>
  );
}

export default function DoliTrainerPage() {
  const [started, setStarted] = useState(false);
  const [round, setRound] = useState(0);
  const [current, setCurrent] = useState<Round | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [finished, setFinished] = useState(false);

  function begin() {
    setStarted(true);
    setFinished(false);
    setRound(1);
    setScore({ correct: 0, total: 0 });
    setCurrent(makeRound());
    setFeedback(null);
    setPicked(null);
  }

  function nextRound() {
    if (round >= ROUNDS_PER_SESSION) {
      setFinished(true);
      return;
    }
    setRound((r) => r + 1);
    setCurrent(makeRound());
    setFeedback(null);
    setPicked(null);
  }

  function handlePick(option: string) {
    if (feedback || !current) return;
    setPicked(option);
    const correct = option === current.fraction.label;
    setFeedback(correct ? 'correct' : 'wrong');
    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    setTimeout(nextRound, correct ? 900 : 1400);
  }

  return (
    <div className="min-h-screen">
      <div className="border-b border-white/15 px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">🍕 Доли и дроби</h1>
      </div>

      <TrainerGate type="trainer:doli">
        <div className="max-w-2xl mx-auto py-8 px-6">
          {!started && (
            <div className="card mb-8 text-center">
              <p className="text-white/80 mb-6">
                Посмотри на фигуру и выбери, какая доля закрашена. 10 раундов, простые дроби: 1/2, 1/3, 1/4, 2/3, 3/4.
              </p>
              <button onClick={begin} className="btn-primary text-lg px-8 py-4">
                ▶️ Начать
              </button>
            </div>
          )}

          {started && !finished && current && (
            <div className="card bg-white text-center">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-500 text-sm">
                  Раунд {round} из {ROUNDS_PER_SESSION}
                </span>
                <span className="text-gray-600 text-sm">
                  Верно: <span className="text-green-600 font-bold">{score.correct}</span> / {score.total}
                </span>
              </div>

              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-6">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${(round / ROUNDS_PER_SESSION) * 100}%`,
                    background: 'linear-gradient(90deg, #F97316, #f72585)',
                  }}
                />
              </div>

              <p className="text-xl font-bold text-[#3a1c6e] mb-6">Какая доля закрашена?</p>

              <div className="flex justify-center mb-8">
                {current.shape === 'circle' ? (
                  <CircleFraction num={current.fraction.num} den={current.fraction.den} />
                ) : (
                  <RectFraction num={current.fraction.num} den={current.fraction.den} />
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {current.options.map((option) => {
                  const isPicked = picked === option;
                  const isRight = option === current.fraction.label;
                  const showState = feedback && (isPicked || isRight);
                  return (
                    <button
                      key={option}
                      onClick={() => handlePick(option)}
                      disabled={!!feedback}
                      className={`py-5 rounded-2xl border-4 font-black text-2xl transition-all ${
                        showState
                          ? isRight
                            ? 'border-green-500 bg-green-50 text-green-600 pop-in'
                            : 'border-red-400 bg-red-50 text-red-500 shake'
                          : 'border-gray-200 bg-gray-50 text-[#3a1c6e] hover:border-orange hover:scale-105'
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              <div className="h-8">
                {feedback === 'correct' && <p className="text-green-600 font-black text-xl pop-in">✅ Верно!</p>}
                {feedback === 'wrong' && (
                  <p className="text-red-500 font-black text-xl">
                    Правильный ответ: {current.fraction.label} 👀
                  </p>
                )}
              </div>
            </div>
          )}

          {finished && (
            <div className="card bg-white text-center py-10">
              <p className="text-3xl font-black text-[#3a1c6e] mb-2">{praiseFor(score.correct, score.total).title}</p>
              <p className="text-gray-600 mb-1">Правильных ответов:</p>
              <p className="text-6xl font-black text-orange mb-6">{score.correct}</p>
              <p className="text-gray-500 mb-8">из {score.total}</p>
              <div className="flex justify-center gap-3 flex-wrap">
                <button onClick={begin} className="btn-primary px-6 py-3">
                  🔁 Играть ещё
                </button>
              </div>
            </div>
          )}
        </div>
      </TrainerGate>
    </div>
  );
}
