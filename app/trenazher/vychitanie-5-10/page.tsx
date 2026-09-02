'use client';

import Link from 'next/link';
import { useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import { praiseFor } from '@/lib/praise';

interface Round {
  a: number;
  b: number;
  answer: number;
  options: number[];
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeRound(): Round {
  const a = randInt(5, 10);
  const b = randInt(0, a);
  const answer = a - b;

  const optionsSet = new Set<number>([answer]);
  const maxWrong = 3;
  while (optionsSet.size < maxWrong + 1) {
    const delta = randInt(-3, 3);
    const candidate = answer + delta;
    if (candidate >= 0 && candidate <= 10 && candidate !== answer) {
      optionsSet.add(candidate);
    }
  }

  const options = Array.from(optionsSet);
  // Перемешиваем варианты ответа
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }

  return { a, b, answer, options };
}

const ROUNDS_PER_SESSION = 10;

export default function Vychitanie510TrainerPage() {
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

  function handlePick(value: number) {
    if (feedback || !current) return;
    setPicked(value);
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
        <h1 className="text-2xl font-bold mt-2">➖ Вычитание 5-10</h1>
      </div>

      <TrainerGate type="trainer:vychitanie-5-10">
        <div className="max-w-2xl mx-auto py-8 px-6">
          {!started && (
            <div className="card text-center py-10">
              <p className="text-xl font-bold text-white mb-6">
                Реши 10 примеров на вычитание чисел от 5 до 10
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

              <div className="flex items-center justify-center gap-1 flex-wrap mb-4 text-3xl">
                {Array.from({ length: current.a }).map((_, i) => {
                  const crossedOut = i >= current.a - current.b;
                  return (
                    <span key={i} className={crossedOut ? 'opacity-25 line-through' : ''}>
                      🎈
                    </span>
                  );
                })}
              </div>

              <p className="text-5xl font-black text-[#3a1c6e] mb-8">
                {current.a} − {current.b} = ?
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {current.options.map((value, idx) => {
                  const isPicked = picked === value;
                  const isAnswer = value === current.answer;
                  const showState = feedback && (isPicked || isAnswer);
                  const palette = ['border-purple-600 bg-purple-500 text-white', 'border-sky-600 bg-sky-500 text-white', 'border-amber-600 bg-amber-500 text-white', 'border-pink-600 bg-pink-500 text-white'];
                  return (
                    <button
                      key={value}
                      onClick={() => handlePick(value)}
                      disabled={!!feedback}
                      className={`flex flex-col items-center justify-center gap-1 py-4 rounded-2xl border-4 font-black transition-all ${
                        showState
                          ? isAnswer
                            ? 'border-green-500 bg-green-50 text-green-600 pop-in'
                            : 'border-red-400 bg-red-50 text-red-500 shake'
                          : `${palette[idx % palette.length]} hover:brightness-110 hover:scale-105`
                      }`}
                    >
                      <span className="text-lg leading-none">{'🎈'.repeat(Math.max(0, Math.min(value, 12)))}</span>
                      <span className="text-3xl">{value}</span>
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
