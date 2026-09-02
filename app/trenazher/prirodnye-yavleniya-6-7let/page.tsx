'use client';

import Link from 'next/link';
import { useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import { PRIRODNYE_YAVLENIYA, PrirodnoeYavlenie } from '@/lib/prirodnye-yavleniya-6-7let';
import { praiseFor } from '@/lib/praise';

const ROUNDS_PER_SESSION = 10;

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

interface Round {
  item: PrirodnoeYavlenie;
  options: PrirodnoeYavlenie[];
}

function buildRounds(): Round[] {
  const chosen = shuffle(PRIRODNYE_YAVLENIYA).slice(0, ROUNDS_PER_SESSION);
  return chosen.map((item) => {
    const distractors = shuffle(PRIRODNYE_YAVLENIYA.filter((y) => y.id !== item.id)).slice(0, 3);
    return { item, options: shuffle([item, ...distractors]) };
  });
}

export default function PrirodnyeYavleniya67TrainerPage() {
  const [started, setStarted] = useState(false);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [round, setRound] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = rounds[round] ?? null;

  function begin() {
    const session = buildRounds();
    setRounds(session);
    setRound(0);
    setScore(0);
    setFeedback(null);
    setPicked(null);
    setFinished(false);
    setStarted(true);
  }

  function nextRound() {
    if (round + 1 >= ROUNDS_PER_SESSION) {
      setFinished(true);
      return;
    }
    const next = round + 1;
    setRound(next);
    setFeedback(null);
    setPicked(null);
  }

  function handlePick(option: PrirodnoeYavlenie) {
    if (feedback || !current) return;
    setPicked(option.id);
    const correct = option.id === current.item.id;
    setFeedback(correct ? 'correct' : 'wrong');
    if (correct) setScore((s) => s + 1);
    setTimeout(nextRound, correct ? 1200 : 2000);
  }

  return (
    <div className="bg-black min-h-screen">
      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">🌈⛈️ Природные явления</h1>
      </div>

      <TrainerGate type="trainer:prirodnye-yavleniya-6-7let">
        <div className="max-w-2xl mx-auto py-8 px-6">
          {!started && (
            <div className="card bg-white text-center py-12 px-6">
              <div className="text-7xl mb-6">🌧️❄️⛈️🌈</div>
              <p className="text-2xl font-black text-[#3a1c6e] mb-3">Угадай природное явление!</p>
              <p className="text-gray-600 text-lg mb-8">
                Читай подсказку и выбирай верное название: дождь, снег, гроза, радуга и другие явления природы.
              </p>
              <button onClick={begin} className="btn-primary px-10 py-5 text-xl">
                ▶️ Начать игру
              </button>
            </div>
          )}

          {started && !finished && current && (
            <div className="card bg-white text-center">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-500 text-sm">
                  Раунд {round + 1} из {ROUNDS_PER_SESSION}
                </span>
                <span className="text-gray-600 text-sm">
                  Верно: <span className="text-green-600 font-bold">{score}</span>
                </span>
              </div>

              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-6">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${((round + 1) / ROUNDS_PER_SESSION) * 100}%`,
                    background: 'linear-gradient(90deg, #F97316, #f72585)',
                  }}
                />
              </div>

              <p className="text-xl font-bold text-[#3a1c6e] mb-4">Что это за явление?</p>

              <div key={round} className="pop-in">
                <div className="text-8xl mb-3 leading-none">{current.item.emoji}</div>
                <div className="font-bold text-lg text-gray-600 mb-4">{current.item.hint}</div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {current.options.map((option) => {
                  const isPicked = picked === option.id;
                  const isAnswer = option.id === current.item.id;
                  const showState = feedback && (isPicked || isAnswer);
                  return (
                    <button
                      key={option.id}
                      onClick={() => handlePick(option)}
                      disabled={!!feedback}
                      className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-4 py-5 px-2 transition-all ${
                        showState
                          ? isAnswer
                            ? 'border-green-500 bg-green-50 pop-in'
                            : 'border-red-400 bg-red-50 shake'
                          : 'border-purple-300 bg-purple-50 hover:scale-105'
                      }`}
                    >
                      <span className="text-4xl leading-none">{option.emoji}</span>
                      <span className="font-black text-xl text-[#3a1c6e]">{option.name}</span>
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
                    Правильно: «{current.item.name}» 👀
                  </p>
                )}
              </div>
            </div>
          )}

          {finished && (
            <div className="card bg-white text-center py-10">
              <p className="text-3xl font-black text-[#3a1c6e] mb-2">{praiseFor(score, ROUNDS_PER_SESSION).title}</p>
              <p className="text-gray-600 mb-1">Правильных ответов:</p>
              <p className="text-6xl font-black text-orange mb-6">{score}</p>
              <p className="text-gray-500 mb-8">из {ROUNDS_PER_SESSION}</p>
              <div className="flex justify-center gap-3 flex-wrap">
                <button onClick={begin} className="btn-primary px-6 py-3">
                  🔁 Играть ещё
                </button>
                <Link
                  href="/6-7-let/okruzhayushchiy/prirodnye-yavleniya"
                  className="px-6 py-3 rounded-lg border border-[#2D2350] bg-black text-white font-bold hover:border-orange transition-colors"
                >
                  📝 К теории
                </Link>
              </div>
            </div>
          )}
        </div>
      </TrainerGate>
    </div>
  );
}
