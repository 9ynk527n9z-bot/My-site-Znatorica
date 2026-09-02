'use client';

import Link from 'next/link';
import { useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import { pickWordProblems1Klass, type WordProblem1Klass } from '@/lib/word-problems-1klass';
import { praiseFor } from '@/lib/praise';

interface Round {
  problem: WordProblem1Klass;
  options: number[];
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeOptions(answer: number): number[] {
  const wrongPool = new Set<number>();
  while (wrongPool.size < 3) {
    const delta = randInt(-3, 3);
    const candidate = answer + delta;
    if (candidate !== answer && candidate >= 0 && candidate <= 20) {
      wrongPool.add(candidate);
    }
  }
  const wrongs = shuffle(Array.from(wrongPool)).slice(0, 3);
  return shuffle([answer, ...wrongs]);
}

function makeRounds(count: number): Round[] {
  return pickWordProblems1Klass(count).map((problem) => ({
    problem,
    options: makeOptions(problem.answer),
  }));
}

const ROUNDS_PER_SESSION = 10;

export default function Zadachi1KlassTrainerPage() {
  const [started, setStarted] = useState(false);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [roundIndex, setRoundIndex] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [pickedValue, setPickedValue] = useState<number | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [finished, setFinished] = useState(false);

  function begin() {
    setStarted(true);
    setFinished(false);
    setRoundIndex(0);
    setScore({ correct: 0, total: 0 });
    setRounds(makeRounds(ROUNDS_PER_SESSION));
    setFeedback(null);
    setPickedValue(null);
  }

  function nextRound() {
    if (roundIndex >= rounds.length - 1) {
      setFinished(true);
      return;
    }
    setRoundIndex((i) => i + 1);
    setFeedback(null);
    setPickedValue(null);
  }

  function handlePick(value: number) {
    if (feedback || !rounds[roundIndex]) return;
    setPickedValue(value);
    const correct = value === rounds[roundIndex].problem.answer;
    setFeedback(correct ? 'correct' : 'wrong');
    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    setTimeout(nextRound, correct ? 900 : 1600);
  }

  const current = rounds[roundIndex];

  return (
    <div className="min-h-screen">
      <div className="border-b border-white/15 px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">📖 Задачи для 1 класса</h1>
      </div>

      <TrainerGate type="trainer:zadachi-1klass">
        <div className="max-w-2xl mx-auto py-8 px-6">
          {!started && (
            <div className="card mb-8 text-center">
              <p className="text-lg text-white/90 mb-6">
                Реши 10 простых текстовых задач на сложение и вычитание в пределах 10. Выбери правильный ответ из вариантов!
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
                  Раунд {roundIndex + 1} из {rounds.length}
                </span>
                <span className="text-gray-600 text-sm">
                  Верно: <span className="text-green-600 font-bold">{score.correct}</span> / {score.total}
                </span>
              </div>

              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-6">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${((roundIndex + 1) / rounds.length) * 100}%`,
                    background: 'linear-gradient(90deg, #F97316, #f72585)',
                  }}
                />
              </div>

              <p className="text-xl font-bold text-[#3a1c6e] mb-8 leading-snug">
                {current.problem.text}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {current.options.map((opt, idx) => {
                  const isPicked = pickedValue === opt;
                  const isRight = opt === current.problem.answer;
                  const showState = feedback && (isPicked || isRight);
                  const palette = ['border-purple-600 bg-purple-500 text-white', 'border-sky-600 bg-sky-500 text-white', 'border-amber-600 bg-amber-500 text-white', 'border-pink-600 bg-pink-500 text-white'];
                  return (
                    <button
                      key={opt}
                      onClick={() => handlePick(opt)}
                      disabled={!!feedback}
                      className={`flex flex-col items-center justify-center gap-1 py-4 rounded-2xl border-4 font-black transition-all ${
                        showState
                          ? isRight
                            ? 'border-green-500 bg-green-50 text-green-600 pop-in'
                            : 'border-red-400 bg-red-50 text-red-500 shake'
                          : `${palette[idx % palette.length]} hover:brightness-110 hover:scale-105`
                      }`}
                    >
                      <span className="text-lg leading-none">{current.problem.emoji.repeat(Math.max(0, Math.min(opt, 12)))}</span>
                      <span className="text-3xl">{opt}</span>
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
                    Правильный ответ: {current.problem.answer}
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
