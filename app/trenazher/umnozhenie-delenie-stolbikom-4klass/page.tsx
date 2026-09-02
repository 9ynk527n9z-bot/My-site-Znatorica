'use client';

import Link from 'next/link';
import { useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import { praiseFor } from '@/lib/praise';

const ROUNDS_PER_SESSION = 10;

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

interface MultiplyRound {
  kind: 'multiply';
  a: number;
  b: number;
  question: string;
  options: number[];
  answer: number;
}

interface DivideRound {
  kind: 'divide';
  a: number;
  b: number;
  question: string;
  options: number[];
  answer: number;
}

type Round = MultiplyRound | DivideRound;

// Умножение: трёхзначное число (100-999) умножаем на однозначное (2-9),
// но следим, чтобы результат не превышал 9999 (ограничение из задания).
function makeMultiplyRound(): MultiplyRound {
  let a: number;
  let b: number;
  let product: number;
  do {
    a = randInt(100, 999);
    b = randInt(2, 9);
    product = a * b;
  } while (product > 9999);

  const correct = product;
  const wrongPool = new Set<number>();
  while (wrongPool.size < 3) {
    const delta = randInt(-30, 30);
    let wrong = correct + delta;
    if (wrong <= 0 || wrong === correct) continue;
    wrongPool.add(wrong);
  }

  const options = shuffle([correct, ...wrongPool]);

  return {
    kind: 'multiply',
    a,
    b,
    question: `${a} × ${b} = ?`,
    options,
    answer: correct,
  };
}

// Деление: подбираем частное и делитель так, чтобы делимое (100-999) делилось без остатка.
function makeDivideRound(): DivideRound {
  const divisor = randInt(2, 9);
  const minQuotient = Math.ceil(100 / divisor);
  const maxQuotient = Math.floor(999 / divisor);
  const quotient = randInt(minQuotient, maxQuotient);
  const dividend = divisor * quotient;

  const correct = quotient;
  const wrongPool = new Set<number>();
  while (wrongPool.size < 3) {
    const delta = randInt(-8, 8);
    let wrong = correct + delta;
    if (wrong <= 0 || wrong === correct) continue;
    wrongPool.add(wrong);
  }

  const options = shuffle([correct, ...wrongPool]);

  return {
    kind: 'divide',
    a: dividend,
    b: divisor,
    question: `${dividend} ÷ ${divisor} = ?`,
    options,
    answer: correct,
  };
}

function makeRound(): Round {
  return Math.random() < 0.5 ? makeMultiplyRound() : makeDivideRound();
}

export default function UmnozhenieDelenieStolbikomTrainerPage() {
  const [started, setStarted] = useState(false);
  const [round, setRound] = useState(0);
  const [current, setCurrent] = useState<Round | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [picked, setPicked] = useState<number | null>(null);
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

  function handlePick(option: number) {
    if (feedback || !current) return;
    setPicked(option);
    const correct = option === current.answer;
    setFeedback(correct ? 'correct' : 'wrong');
    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    setTimeout(nextRound, correct ? 900 : 1400);
  }

  return (
    <div className="bg-black min-h-screen">
      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4">
        <Link href="/trenazher" className="text-amber-400 hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">🧮 Умножение и деление столбиком</h1>
      </div>

      <TrainerGate type="trainer:umnozhenie-delenie-stolbikom-4klass">
        <div className="max-w-2xl mx-auto py-8 px-6">
          {!started && (
            <div className="card mb-8 text-center">
              <p className="text-white/80 mb-6">
                Умножай трёхзначные числа на однозначные и дели без остатка — так, как мы разбирали в теории про
                вычисления столбиком. 10 раундов, вопросы двух типов чередуются.
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
                    background: 'linear-gradient(90deg, #F59E0B, #9333EA)',
                  }}
                />
              </div>

              <p className="text-2xl font-black text-[#3a1c6e] mb-8">{current.question}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {current.options.map((option) => {
                  const isPicked = picked === option;
                  const isRight = option === current.answer;
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
                          : 'border-gray-200 bg-gray-50 text-[#3a1c6e] hover:border-amber-400 hover:scale-105'
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
              <p className="text-6xl font-black text-amber-500 mb-6">{score.correct}</p>
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
