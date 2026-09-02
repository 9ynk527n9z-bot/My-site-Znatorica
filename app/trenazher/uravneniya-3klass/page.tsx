'use client';

import Link from 'next/link';
import { useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import { EQUATIONS_3, type Equation } from '@/lib/uravneniya-3klass';
import { praiseFor } from '@/lib/praise';

const ROUNDS_PER_SESSION = 10;

function randItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

interface Round {
  equation: Equation;
  options: number[];
}

// Строим 3 неверных варианта рядом с верным ответом (не повторяются, не отрицательные).
function buildOptions(answer: number): number[] {
  const wrong = new Set<number>();
  const offsets = [-3, -2, -1, 1, 2, 3, 4, -4];
  let i = 0;
  while (wrong.size < 3 && i < offsets.length) {
    const candidate = answer + offsets[i];
    i += 1;
    if (candidate > 0 && candidate !== answer) wrong.add(candidate);
  }
  const options = [answer, ...Array.from(wrong)];
  return options.sort(() => Math.random() - 0.5);
}

function makeRound(): Round {
  const equation = randItem(EQUATIONS_3);
  return { equation, options: buildOptions(equation.answer) };
}

export default function UravneniyaTrainerPage() {
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
    const correct = option === current.equation.answer;
    setFeedback(correct ? 'correct' : 'wrong');
    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    setTimeout(nextRound, correct ? 900 : 1600);
  }

  return (
    <div className="min-h-screen">
      <div className="border-b border-white/15 px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">🟰 Уравнения</h1>
      </div>

      <TrainerGate type="trainer:uravneniya-3klass">
        <div className="max-w-2xl mx-auto py-8 px-6">
          {!started && (
            <div className="card mb-8 text-center">
              <p className="text-white/80 mb-6">
                Найди, чему равен x. 10 раундов, простые уравнения на сложение, вычитание, умножение и деление.
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

              <p className="text-lg font-bold text-[#3a1c6e] mb-6">Чему равен x?</p>

              <div className="flex justify-center mb-8">
                <div className="px-8 py-6 rounded-2xl bg-purple-50 border-4 border-purple-200">
                  <span className="text-4xl font-black text-[#3a1c6e]">{current.equation.expression}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {current.options.map((option) => {
                  const isPicked = picked === option;
                  const isRight = option === current.equation.answer;
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
                      x = {option}
                    </button>
                  );
                })}
              </div>

              <div className="h-12">
                {feedback === 'correct' && <p className="text-green-600 font-black text-xl pop-in">✅ Верно! {current.equation.hint}</p>}
                {feedback === 'wrong' && (
                  <p className="text-red-500 font-black text-lg">
                    Правильный ответ: x = {current.equation.answer} ({current.equation.hint}) 👀
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
