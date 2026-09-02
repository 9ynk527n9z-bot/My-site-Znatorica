'use client';

import Link from 'next/link';
import { useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import { pickSafetyQuestions1Klass, type SafetyQuestion1Klass } from '@/lib/bezopasnost-1klass';
import { praiseFor } from '@/lib/praise';

const ROUNDS_PER_SESSION = 10;

const PALETTE = [
  'border-purple-600 bg-purple-500 text-white',
  'border-sky-600 bg-sky-500 text-white',
  'border-amber-600 bg-amber-500 text-white',
  'border-pink-600 bg-pink-500 text-white',
];

export default function Bezopasnost1KlassTrainerPage() {
  const [started, setStarted] = useState(false);
  const [rounds, setRounds] = useState<SafetyQuestion1Klass[]>([]);
  const [roundIndex, setRoundIndex] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [pickedIndex, setPickedIndex] = useState<number | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [finished, setFinished] = useState(false);

  function begin() {
    setStarted(true);
    setFinished(false);
    setRoundIndex(0);
    setScore({ correct: 0, total: 0 });
    setRounds(pickSafetyQuestions1Klass(ROUNDS_PER_SESSION));
    setFeedback(null);
    setPickedIndex(null);
  }

  function nextRound() {
    if (roundIndex >= rounds.length - 1) {
      setFinished(true);
      return;
    }
    setRoundIndex((i) => i + 1);
    setFeedback(null);
    setPickedIndex(null);
  }

  function handlePick(index: number) {
    if (feedback || !rounds[roundIndex]) return;
    setPickedIndex(index);
    const correct = index === rounds[roundIndex].correct;
    setFeedback(correct ? 'correct' : 'wrong');
    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    setTimeout(nextRound, correct ? 900 : 1800);
  }

  const current = rounds[roundIndex];

  return (
    <div className="min-h-screen">
      <div className="border-b border-white/15 px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">🚦 Правила безопасности</h1>
      </div>

      <TrainerGate type="trainer:bezopasnost-1klass">
        <div className="max-w-2xl mx-auto py-8 px-6">
          {!started && (
            <div className="card mb-8 text-center">
              <div className="text-6xl mb-4">🚦🔥🚪</div>
              <p className="text-2xl font-black text-[#3a1c6e] mb-2">Как поступить правильно?</p>
              <p className="text-lg text-white/90 mb-6">
                10 ситуаций про дорогу, огонь, электричество и незнакомых людей. Прочитай ситуацию
                внимательно и выбери правильный ответ.
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

              <div className="text-5xl mb-4">{current.emoji}</div>
              <p className="text-xl font-bold text-[#3a1c6e] mb-8 leading-snug">{current.text}</p>

              <div className="grid grid-cols-1 gap-4 mb-6">
                {current.options.map((opt, idx) => {
                  const isPicked = pickedIndex === idx;
                  const isRight = idx === current.correct;
                  const showState = feedback && (isPicked || isRight);
                  return (
                    <button
                      key={opt}
                      onClick={() => handlePick(idx)}
                      disabled={!!feedback}
                      className={`flex items-center justify-center py-4 px-4 rounded-2xl border-4 font-bold text-base transition-all text-left ${
                        showState
                          ? isRight
                            ? 'border-green-500 bg-green-50 text-green-600 pop-in'
                            : 'border-red-400 bg-red-50 text-red-500 shake'
                          : `${PALETTE[idx % PALETTE.length]} hover:brightness-110 hover:scale-[1.02]`
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
                    Правильный ответ: {current.options[current.correct]}
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
                <Link href="/1-klass/okruzhayushchiy/pravila-bezopasnosti" className="btn-secondary px-6 py-3">
                  📖 К теории
                </Link>
              </div>
            </div>
          )}
        </div>
      </TrainerGate>
    </div>
  );
}
