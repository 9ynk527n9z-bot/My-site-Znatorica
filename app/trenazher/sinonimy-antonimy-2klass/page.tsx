'use client';

import Link from 'next/link';
import { useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import { SINONIMY_ANTONIMY_2KLASS, SinonimAntonimItem } from '@/lib/sinonimy-antonimy-2klass';
import { praiseFor } from '@/lib/praise';

const ROUNDS_PER_SESSION = 10;

interface Round {
  item: SinonimAntonimItem;
  options: string[];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeRound(item: SinonimAntonimItem): Round {
  return {
    item,
    options: shuffle([item.correct, ...item.distractors]),
  };
}

function makeSession(): Round[] {
  return shuffle(SINONIMY_ANTONIMY_2KLASS)
    .slice(0, ROUNDS_PER_SESSION)
    .map(makeRound);
}

export default function SinonimyAntonimyTrainerPage() {
  const [started, setStarted] = useState(false);
  const [session, setSession] = useState<Round[]>([]);
  const [round, setRound] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [pickedOption, setPickedOption] = useState<string | null>(null);
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
    setPickedOption(null);
  }

  function nextRound() {
    if (round >= ROUNDS_PER_SESSION) {
      setFinished(true);
      return;
    }
    setRound((r) => r + 1);
    setFeedback(null);
    setPickedOption(null);
  }

  function handlePick(option: string) {
    if (feedback || !current) return;
    setPickedOption(option);
    const correct = option === current.item.correct;
    setFeedback(correct ? 'correct' : 'wrong');
    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    setTimeout(nextRound, correct ? 900 : 1500);
  }

  const question = current
    ? current.item.type === 'synonym'
      ? 'Найди синоним — слово, близкое по значению'
      : 'Найди антоним — слово с противоположным значением'
    : '';

  return (
    <div className="min-h-screen">
      <div className="border-b border-white/15 px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">🔀 Синонимы и антонимы</h1>
      </div>

      <TrainerGate type="trainer:sinonimy-antonimy-2klass">
        <div className="max-w-2xl mx-auto py-8 px-6">
          {!started && (
            <div className="card bg-white text-center py-10">
              <p className="text-3xl font-black text-[#3a1c6e] mb-4">🔀 Синонимы и антонимы</p>
              <p className="text-gray-600 mb-8 text-lg">
                Прочитай слово и вопрос — найди синоним (близкое по значению) или антоним (противоположное).
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
                    background: 'linear-gradient(90deg, #F97316, #7C3AED)',
                  }}
                />
              </div>

              <p className="text-lg text-gray-500 mb-4">{question}</p>

              <div
                key={round}
                className={`text-5xl sm:text-6xl font-black text-[#3a1c6e] mb-10 pop-in ${
                  feedback === 'wrong' ? 'shake' : ''
                }`}
              >
                {current.item.word}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {current.options.map((option) => {
                  const isPicked = pickedOption === option;
                  const isCorrectAnswer = feedback && option === current.item.correct;
                  const showWrong = feedback && isPicked && option !== current.item.correct;
                  return (
                    <button
                      key={option}
                      onClick={() => handlePick(option)}
                      disabled={!!feedback}
                      className={`px-4 py-6 rounded-2xl border-4 font-black text-lg sm:text-xl transition-all ${
                        isCorrectAnswer
                          ? 'border-green-500 bg-green-50 text-green-700 pop-in'
                          : showWrong
                          ? 'border-red-400 bg-red-50 text-red-500 shake'
                          : 'border-gray-200 bg-gray-50 text-gray-700 hover:scale-105'
                      }`}
                    >
                      {option}
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
                    Правильно: {current.item.correct} 👀
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
