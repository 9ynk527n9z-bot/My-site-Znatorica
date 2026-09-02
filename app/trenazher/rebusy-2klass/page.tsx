'use client';

import Link from 'next/link';
import { useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import { REBUSY_2KLASS, type Rebus } from '@/lib/rebusy-2klass';
import { praiseFor } from '@/lib/praise';

const ROUNDS_PER_SESSION = 10;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface Round {
  rebus: Rebus;
  options: string[];
}

function makeSession(): Round[] {
  const pool = shuffle(REBUSY_2KLASS).slice(0, ROUNDS_PER_SESSION);
  return pool.map((rebus) => ({ rebus, options: shuffle(rebus.options) }));
}

export default function RebusyTrainerPage() {
  const [started, setStarted] = useState(false);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [roundIndex, setRoundIndex] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [pickedOption, setPickedOption] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [finished, setFinished] = useState(false);

  function begin() {
    setRounds(makeSession());
    setRoundIndex(0);
    setStarted(true);
    setFinished(false);
    setScore({ correct: 0, total: 0 });
    setFeedback(null);
    setPickedOption(null);
  }

  function nextRound() {
    if (roundIndex + 1 >= ROUNDS_PER_SESSION) {
      setFinished(true);
      return;
    }
    setRoundIndex((r) => r + 1);
    setFeedback(null);
    setPickedOption(null);
  }

  function handlePick(option: string) {
    if (feedback) return;
    const current = rounds[roundIndex];
    setPickedOption(option);
    const correct = option === current.rebus.answer;
    setFeedback(correct ? 'correct' : 'wrong');
    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    setTimeout(nextRound, correct ? 1000 : 1600);
  }

  const current = rounds[roundIndex];

  return (
    <div className="min-h-screen">
      <div className="border-b border-white/15 px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">🧩 Ребусы (2 класс)</h1>
      </div>

      <TrainerGate type="trainer:rebusy-2klass">
        <div className="max-w-2xl mx-auto py-8 px-6">
          {!started && (
            <div className="card text-center py-10">
              <div className="text-6xl mb-4">🧩</div>
              <p className="text-2xl font-black text-[#3a1c6e] mb-2">Разгадай ребус!</p>
              <p className="text-gray-600 mb-8">
                Прочитай буквы и цифры вслух, слитно — и выбери правильное слово из четырёх. 10 раундов, без повторов.
              </p>
              <button onClick={begin} className="btn-primary px-8 py-4 text-lg">
                ▶️ Начать игру
              </button>
            </div>
          )}

          {started && !finished && current && (
            <div className="card bg-white text-center">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-500 text-sm">
                  Раунд {roundIndex + 1} из {ROUNDS_PER_SESSION}
                </span>
                <span className="text-gray-600 text-sm">
                  Верно: <span className="text-green-600 font-bold">{score.correct}</span> / {score.total}
                </span>
              </div>

              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-6">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${((roundIndex + 1) / ROUNDS_PER_SESSION) * 100}%`,
                    background: 'linear-gradient(90deg, #F97316, #f72585)',
                  }}
                />
              </div>

              <div
                className="rounded-2xl p-8 mb-6 text-white"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #6B21A8)' }}
              >
                <p className="text-4xl md:text-5xl font-black tracking-wide">{current.rebus.display}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {current.options.map((option) => {
                  const isPicked = pickedOption === option;
                  const isAnswer = option === current.rebus.answer;
                  const showState = feedback && (isPicked || isAnswer);
                  return (
                    <button
                      key={option}
                      onClick={() => handlePick(option)}
                      disabled={!!feedback}
                      className={`flex items-center justify-center text-center rounded-2xl border-4 transition-all px-4 py-6 ${
                        showState
                          ? isAnswer
                            ? 'border-green-500 bg-green-50 pop-in'
                            : 'border-red-400 bg-red-50 shake'
                          : 'border-gray-200 bg-gray-50 hover:border-orange hover:scale-105'
                      }`}
                    >
                      <span className="text-lg font-bold text-[#3a1c6e]">{option}</span>
                    </button>
                  );
                })}
              </div>

              <div className="h-8">
                {feedback === 'correct' && <p className="text-green-600 font-black text-xl pop-in">✅ Верно!</p>}
                {feedback === 'wrong' && (
                  <p className="text-red-500 font-black text-xl">Правильный ответ: {current.rebus.answer}</p>
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
                <Link href="/2-klass/logika/rebusy" className="btn-secondary px-6 py-3">
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
