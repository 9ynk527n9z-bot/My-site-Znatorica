'use client';

import Link from 'next/link';
import { useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import { PRIRODA_ITEMS, shufflePriroda, type PrirodaItem } from '@/lib/priroda-2klass';
import { praiseFor } from '@/lib/praise';

const ROUNDS_PER_SESSION = 10;

function makeSession(): PrirodaItem[] {
  return shufflePriroda(PRIRODA_ITEMS).slice(0, ROUNDS_PER_SESSION);
}

export default function PrirodaZhivayaNezhivayaTrainerPage() {
  const [started, setStarted] = useState(false);
  const [session, setSession] = useState<PrirodaItem[]>([]);
  const [round, setRound] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [pickedKind, setPickedKind] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [finished, setFinished] = useState(false);

  function begin() {
    setStarted(true);
    setFinished(false);
    setSession(makeSession());
    setRound(1);
    setScore({ correct: 0, total: 0 });
    setFeedback(null);
    setPickedKind(null);
  }

  const current = session[round - 1];

  function nextRound() {
    if (round >= ROUNDS_PER_SESSION) {
      setFinished(true);
      return;
    }
    setRound((r) => r + 1);
    setFeedback(null);
    setPickedKind(null);
  }

  function handlePick(kind: 'zhivaya' | 'nezhivaya') {
    if (feedback || !current) return;
    setPickedKind(kind);
    const correct = kind === current.kind;
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
        <h1 className="text-2xl font-bold mt-2">🌳 Живая и неживая природа</h1>
      </div>

      <TrainerGate type="trainer:priroda-zhivaya-nezhivaya-2klass">
        <div className="max-w-2xl mx-auto py-8 px-6">
          {!started && (
            <div className="card bg-white text-center py-10">
              <p className="text-xl font-bold text-[#3a1c6e] mb-4">
                Определи: перед тобой живая или неживая природа?
              </p>
              <p className="text-gray-600 mb-8">
                Растения, животные и грибы растут и размножаются — это живая природа.
                Камни, вода, солнце и облака — неживая природа.
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

              <div
                className={`mb-6 py-8 rounded-2xl border-4 transition-all ${
                  feedback
                    ? feedback === 'correct'
                      ? 'border-green-500 bg-green-50 pop-in'
                      : 'border-red-400 bg-red-50 shake'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <span className="text-8xl block mb-3">{current.emoji}</span>
                <span className="text-xl font-bold text-[#3a1c6e]">{current.name}</span>
              </div>

              <p className="text-lg font-bold text-[#3a1c6e] mb-4">Это живая или неживая природа?</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => handlePick('zhivaya')}
                  disabled={!!feedback}
                  className={`px-4 py-5 rounded-2xl border-4 font-bold text-lg transition-all ${
                    feedback && pickedKind === 'zhivaya'
                      ? current.kind === 'zhivaya'
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-red-400 bg-red-50 text-red-600'
                      : 'border-gray-200 bg-gray-50 text-[#3a1c6e] hover:border-orange hover:scale-105'
                  }`}
                >
                  🌱 Живая
                </button>
                <button
                  onClick={() => handlePick('nezhivaya')}
                  disabled={!!feedback}
                  className={`px-4 py-5 rounded-2xl border-4 font-bold text-lg transition-all ${
                    feedback && pickedKind === 'nezhivaya'
                      ? current.kind === 'nezhivaya'
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-red-400 bg-red-50 text-red-600'
                      : 'border-gray-200 bg-gray-50 text-[#3a1c6e] hover:border-orange hover:scale-105'
                  }`}
                >
                  🪨 Неживая
                </button>
              </div>

              <div className="h-8">
                {feedback === 'correct' && (
                  <p className="text-green-600 font-black text-xl pop-in">✅ Верно!</p>
                )}
                {feedback === 'wrong' && (
                  <p className="text-red-500 font-black text-xl">
                    Правильно: {current.kind === 'zhivaya' ? '🌱 Живая природа' : '🪨 Неживая природа'}
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
