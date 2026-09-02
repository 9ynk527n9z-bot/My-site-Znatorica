'use client';

import Link from 'next/link';
import { useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import { DIALOG_SITUATIONS, type DialogSituation } from '@/lib/dialogi-6-7let';

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
  situation: DialogSituation;
  options: string[];
  correctOption: string;
}

function makeSession(): Round[] {
  const pool = shuffle(DIALOG_SITUATIONS).slice(0, ROUNDS_PER_SESSION);
  return pool.map((situation) => ({
    situation,
    options: shuffle(situation.options),
    correctOption: situation.options[situation.correctIndex],
  }));
}

export default function DialogiTrainerPage() {
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
    const correct = option === current.correctOption;
    setFeedback(correct ? 'correct' : 'wrong');
    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    setTimeout(nextRound, correct ? 1200 : 1900);
  }

  const current = rounds[roundIndex];

  return (
    <div className="min-h-screen">
      <div className="border-b border-white/15 px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">💬 Диалоги</h1>
      </div>

      <TrainerGate type="trainer:dialogi-6-7let">
        <div className="max-w-2xl mx-auto py-8 px-6">
          {!started && (
            <div className="card text-center py-10">
              <div className="text-6xl mb-4">💬</div>
              <p className="text-2xl font-black text-[#3a1c6e] mb-2">Учимся вежливо отвечать!</p>
              <p className="text-gray-600 mb-8">
                Прочитай, что говорит собеседник, и выбери самый вежливый ответ из четырёх. 10 раундов!
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
                className="rounded-2xl p-6 mb-6 text-white relative"
                style={{ background: 'linear-gradient(135deg, #A855F7, #7C3AED)' }}
              >
                <p className="text-sm uppercase tracking-wide opacity-80 mb-2">Тебе говорят:</p>
                <p className="text-xl md:text-2xl font-bold leading-snug">«{current.situation.phrase}»</p>
              </div>

              <p className="text-lg font-bold text-[#3a1c6e] mb-4">Что ответить?</p>

              <div className="flex flex-col gap-3 mb-6">
                {current.options.map((option) => {
                  const isPicked = pickedOption === option;
                  const isAnswer = option === current.correctOption;
                  const showState = feedback && (isPicked || isAnswer);
                  return (
                    <button
                      key={option}
                      onClick={() => handlePick(option)}
                      disabled={!!feedback}
                      className={`text-left px-5 py-4 rounded-2xl border-4 font-bold transition-all ${
                        showState
                          ? isAnswer
                            ? 'border-green-500 bg-green-50 text-green-700 pop-in'
                            : 'border-red-400 bg-red-50 text-red-600 shake'
                          : 'border-gray-200 bg-gray-50 text-[#3a1c6e] hover:border-amber-400 hover:scale-[1.02]'
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              <div className="h-8">
                {feedback === 'correct' && <p className="text-green-600 font-black text-xl pop-in">✅ Молодец, вежливо и верно!</p>}
                {feedback === 'wrong' && (
                  <p className="text-red-500 font-black text-xl">Лучше сказать: «{current.correctOption}»</p>
                )}
              </div>
            </div>
          )}

          {finished && (
            <div className="card bg-white text-center py-10">
              <p className="text-3xl font-black text-[#3a1c6e] mb-2">🎉 Умница!</p>
              <p className="text-gray-600 mb-1">Правильных ответов:</p>
              <p className="text-6xl font-black text-orange mb-6">{score.correct}</p>
              <p className="text-gray-500 mb-8">из {score.total}</p>
              <div className="flex justify-center gap-3 flex-wrap">
                <button onClick={begin} className="btn-primary px-6 py-3">
                  🔁 Играть ещё
                </button>
                <Link href="/6-7-let/razvitie/dialogi" className="btn-secondary px-6 py-3">
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
