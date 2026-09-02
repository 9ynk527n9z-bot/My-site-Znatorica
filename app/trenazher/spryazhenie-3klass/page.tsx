'use client';

import Link from 'next/link';
import { useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import { VERBS, VerbEntry, Spryazhenie } from '@/lib/spryazhenie-3klass';
import { praiseFor } from '@/lib/praise';

const ANSWERS: { value: Spryazhenie; label: string }[] = [
  { value: 1, label: 'I спряжение' },
  { value: 2, label: 'II спряжение' },
];

const ROUNDS_PER_SESSION = 10;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeSession(): VerbEntry[] {
  return shuffle(VERBS).slice(0, ROUNDS_PER_SESSION);
}

export default function SpryazhenieTrainerPage() {
  const [started, setStarted] = useState(false);
  const [session, setSession] = useState<VerbEntry[]>([]);
  const [round, setRound] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [picked, setPicked] = useState<Spryazhenie | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [finished, setFinished] = useState(false);

  const current = session[round - 1];

  function begin() {
    setStarted(true);
    setFinished(false);
    setSession(makeSession());
    setRound(1);
    setScore({ correct: 0, total: 0 });
    setFeedback(null);
    setPicked(null);
  }

  function nextRound() {
    if (round >= ROUNDS_PER_SESSION) {
      setFinished(true);
      return;
    }
    setRound((r) => r + 1);
    setFeedback(null);
    setPicked(null);
  }

  function handlePick(value: Spryazhenie) {
    if (feedback || !current) return;
    setPicked(value);
    const correct = value === current.spryazhenie;
    setFeedback(correct ? 'correct' : 'wrong');
    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    setTimeout(nextRound, correct ? 900 : 1500);
  }

  return (
    <div className="min-h-screen">
      <div className="border-b border-white/15 px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">🔤 Спряжение глаголов</h1>
      </div>

      <TrainerGate type="trainer:spryazhenie-3klass">
        <div className="max-w-2xl mx-auto py-8 px-6">
          {!started && (
            <div className="card bg-white text-center py-10">
              <p className="text-3xl font-black text-[#3a1c6e] mb-4">🔤 Спряжение глаголов</p>
              <p className="text-gray-600 mb-8 text-lg">
                Прочитай глагол в неопределённой форме и выбери — I или II спряжение?
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

              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-8">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${(round / ROUNDS_PER_SESSION) * 100}%`,
                    background: 'linear-gradient(90deg, #F97316, #f72585)',
                  }}
                />
              </div>

              <p className="text-lg text-gray-500 mb-4">Какое это спряжение?</p>

              <div
                key={round}
                className={`text-5xl sm:text-6xl font-black text-[#3a1c6e] mb-10 pop-in ${
                  feedback === 'wrong' ? 'shake' : ''
                }`}
              >
                {current.verb}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {ANSWERS.map((answer) => {
                  const isPicked = picked === answer.value;
                  const isCorrectAnswer = feedback && answer.value === current.spryazhenie;
                  const showWrong = feedback && isPicked && answer.value !== current.spryazhenie;
                  return (
                    <button
                      key={answer.value}
                      onClick={() => handlePick(answer.value)}
                      disabled={!!feedback}
                      className={`px-4 py-6 rounded-2xl border-4 font-black text-lg sm:text-xl transition-all ${
                        isCorrectAnswer
                          ? 'border-green-500 bg-green-50 text-green-700 pop-in'
                          : showWrong
                          ? 'border-red-400 bg-red-50 text-red-500 shake'
                          : 'border-gray-200 bg-gray-50 text-gray-700 hover:scale-105'
                      }`}
                    >
                      {answer.label}
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
                    Правильно: {current.spryazhenie === 1 ? 'I спряжение' : 'II спряжение'} 👀
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
