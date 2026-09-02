'use client';

import Link from 'next/link';
import { useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import { praiseFor } from '@/lib/praise';

interface Round {
  dividend: number;
  divisor: number;
  quotient: number;
  remainder: number;
  answer: string;
  options: string[];
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function fmt(quotient: number, remainder: number): string {
  return `${quotient} (ост. ${remainder})`;
}

function makeRound(): Round {
  const divisor = randInt(2, 9);
  // Ненулевой остаток обязателен: remainder от 1 до divisor-1.
  const remainder = randInt(1, divisor - 1);
  let quotient = randInt(1, 9);
  let dividend = divisor * quotient + remainder;

  // Держим делимое в диапазоне 10..99
  while (dividend < 10 || dividend > 99) {
    quotient = randInt(1, 9);
    dividend = divisor * quotient + remainder;
  }

  const answer = fmt(quotient, remainder);

  // Правдоподобные неверные варианты: ошибка в частном ±1 или в остатке ±1,
  // но остаток неверных вариантов держим в разумных пределах (0..divisor-1 не обязателен,
  // т.к. это "неверные" варианты — ошибки в остатке могут выходить за divisor, это тоже
  // правдоподобная детская ошибка).
  const candidates: string[] = [];

  function addCandidate(q: number, r: number) {
    if (q <= 0 || r < 0) return;
    const str = fmt(q, r);
    if (str === answer) return;
    if (candidates.includes(str)) return;
    candidates.push(str);
  }

  addCandidate(quotient + 1, remainder);
  addCandidate(quotient - 1, remainder);
  addCandidate(quotient, remainder + 1);
  addCandidate(quotient, remainder - 1);
  addCandidate(quotient + 1, remainder - 1);
  addCandidate(quotient - 1, remainder + 1);

  // Добор случайными вариациями, если не хватило
  while (candidates.length < 3) {
    const dq = randItem([1, -1, 2, -2]);
    const dr = randItem([0, 1, -1]);
    addCandidate(quotient + dq, remainder + dr);
  }

  const wrongOptions = candidates.slice(0, 3);
  const options = shuffle([answer, ...wrongOptions]);

  return { dividend, divisor, quotient, remainder, answer, options };
}

function randItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const ROUNDS_PER_SESSION = 10;

export default function DelenieSOstatkomTrainerPage() {
  const [started, setStarted] = useState(false);
  const [round, setRound] = useState(0);
  const [current, setCurrent] = useState<Round | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [pickedValue, setPickedValue] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [finished, setFinished] = useState(false);

  function begin() {
    setStarted(true);
    setFinished(false);
    setRound(1);
    setScore({ correct: 0, total: 0 });
    setCurrent(makeRound());
    setFeedback(null);
    setPickedValue(null);
  }

  function nextRound() {
    if (round >= ROUNDS_PER_SESSION) {
      setFinished(true);
      return;
    }
    setRound((r) => r + 1);
    setCurrent(makeRound());
    setFeedback(null);
    setPickedValue(null);
  }

  function handlePick(value: string) {
    if (feedback || !current) return;
    setPickedValue(value);
    const correct = value === current.answer;
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
        <h1 className="text-2xl font-bold mt-2">➗ Деление с остатком</h1>
      </div>

      <TrainerGate type="trainer:delenie-s-ostatkom">
        <div className="max-w-2xl mx-auto py-8 px-6">
          {!started && (
            <div className="card mb-8 text-center">
              <p className="text-lg text-white/90 mb-4">
                Реши 10 примеров на деление с остатком. Выбирай правильный ответ из вариантов!
              </p>
              <button onClick={begin} className="btn-primary px-8 py-4 text-lg">
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

              <p className="text-4xl font-black text-[#3a1c6e] mb-8">
                {current.dividend} : {current.divisor} = ?
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {current.options.map((opt) => {
                  const isPicked = pickedValue === opt;
                  const isCorrectOpt = opt === current.answer;
                  const showState = feedback && (isPicked || isCorrectOpt);
                  const palette = [
                    'border-purple-600 bg-purple-500 text-white',
                    'border-sky-600 bg-sky-500 text-white',
                    'border-amber-600 bg-amber-500 text-white',
                    'border-pink-600 bg-pink-500 text-white',
                  ];
                  const idx = current.options.indexOf(opt);
                  return (
                    <button
                      key={opt}
                      onClick={() => handlePick(opt)}
                      disabled={!!feedback}
                      className={`flex items-center justify-center py-4 rounded-2xl border-4 font-black text-xl transition-all ${
                        showState
                          ? isCorrectOpt
                            ? 'border-green-500 bg-green-50 text-green-600 pop-in'
                            : 'border-red-400 bg-red-50 text-red-500 shake'
                          : `${palette[idx % palette.length]} hover:brightness-110 hover:scale-105`
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              <div className="h-8">
                {feedback === 'correct' && (
                  <p className="text-green-600 font-black text-xl pop-in">✅ Верно!</p>
                )}
                {feedback === 'wrong' && (
                  <p className="text-red-500 font-black text-xl">
                    Правильный ответ: {current.answer} 👀
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
