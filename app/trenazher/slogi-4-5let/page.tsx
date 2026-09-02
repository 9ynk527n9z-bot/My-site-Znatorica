'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import { SLOGI_WORDS, type SlogSlovo } from '@/lib/slogi-4-5let';
import { speakRu } from '@/lib/speak-ru';
import { praiseFor } from '@/lib/praise';

const ROUNDS_PER_SESSION = 10;
const ALL_OPTIONS = [1, 2, 3, 4];

function shuffle<T>(arr: T[]): T[] {
  const pool = [...arr];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool;
}

interface Round {
  slovo: SlogSlovo;
  options: number[];
}

function makeSession(): Round[] {
  const words = shuffle(SLOGI_WORDS).slice(0, ROUNDS_PER_SESSION);
  return words.map((slovo) => ({ slovo, options: shuffle(ALL_OPTIONS) }));
}

export default function SlogiTrainerPage() {
  const [started, setStarted] = useState(false);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [round, setRound] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = rounds[round];

  // Озвучиваем слово при каждом показе раунда
  useEffect(() => {
    if (started && !finished && current) {
      speakRu(current.slovo.word);
    }
  }, [started, finished, current]);

  function begin() {
    setRounds(makeSession());
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
    setRound((r) => r + 1);
    setFeedback(null);
    setPicked(null);
  }

  function handlePick(n: number) {
    if (feedback || !current) return;
    setPicked(n);
    const correct = n === current.slovo.syllables;
    setFeedback(correct ? 'correct' : 'wrong');
    if (correct) setScore((s) => s + 1);
    speakRu(
      correct
        ? 'Верно!'
        : `Нет. В слове «${current.slovo.word}» ${current.slovo.syllables} слога: ${current.slovo.syllableBreak}.`
    );
    setTimeout(nextRound, correct ? 1100 : 2400);
  }

  return (
    <div className="bg-black min-h-screen">
      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">🧩 Слоги — сколько слогов в слове?</h1>
      </div>

      <TrainerGate type="trainer:slogi-4-5let">
        <div className="max-w-2xl mx-auto py-8 px-6">
          {!started && (
            <div className="card bg-white text-center py-12 px-6">
              <div className="text-7xl mb-4">🧩</div>
              <p className="text-2xl font-black text-[#3a1c6e] mb-3">Сосчитай слоги</p>
              <p className="text-gray-600 text-lg mb-8">
                Послушай слово и посмотри на картинку. Сосчитай, сколько в нём слогов, и выбери число!
              </p>
              <button onClick={begin} className="btn-primary px-10 py-5 text-xl">
                ▶️ Начать игру
              </button>
            </div>
          )}

          {started && !finished && current && (
            <div className="card bg-white text-center px-6 py-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-500 text-sm">
                  Слово {round + 1} из {ROUNDS_PER_SESSION}
                </span>
                <span className="text-gray-600 text-sm">
                  Верно: <span className="text-green-600 font-bold">{score}</span>
                </span>
              </div>

              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-8">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${((round + 1) / ROUNDS_PER_SESSION) * 100}%`,
                    background: 'linear-gradient(90deg, #F97316, #f72585)',
                  }}
                />
              </div>

              <button
                onClick={() => speakRu(current.slovo.word)}
                title="Нажми, чтобы услышать слово ещё раз"
                className="inline-flex flex-col items-center justify-center w-52 h-52 sm:w-60 sm:h-60 rounded-3xl border-8 border-[#3a1c6e]/20 bg-gradient-to-br from-purple-50 to-pink-50 mb-4 pop-in hover:scale-105 transition-all"
              >
                <span className="text-8xl leading-none mb-2">{current.slovo.emoji}</span>
                <span className="text-3xl font-black text-[#3a1c6e]">{current.slovo.word}</span>
              </button>
              <p className="text-gray-400 text-sm mb-6">🔊 Нажми на картинку, чтобы послушать слово ещё раз</p>

              <p className="text-lg font-bold text-[#3a1c6e] mb-4">Сколько слогов в этом слове?</p>

              <div className="grid grid-cols-4 gap-3 mb-6">
                {current.options.map((n) => {
                  const isPicked = picked === n;
                  const isCorrectNumber = n === current.slovo.syllables;
                  let classes =
                    'py-6 rounded-2xl text-3xl sm:text-4xl font-black text-white transition-all bg-purple-500 hover:bg-purple-600 hover:scale-105 shadow-lg';
                  if (feedback) {
                    if (isCorrectNumber) {
                      classes =
                        'py-6 rounded-2xl text-3xl sm:text-4xl font-black text-white bg-green-500 ring-4 ring-green-300 pop-in';
                    } else if (isPicked) {
                      classes = 'py-6 rounded-2xl text-3xl sm:text-4xl font-black text-white bg-red-400 shake';
                    } else {
                      classes = 'py-6 rounded-2xl text-3xl sm:text-4xl font-black text-white bg-gray-300';
                    }
                  }
                  return (
                    <button
                      key={n}
                      onClick={() => handlePick(n)}
                      disabled={!!feedback}
                      className={classes}
                    >
                      {n}
                    </button>
                  );
                })}
              </div>

              <div className="h-8">
                {feedback === 'correct' && (
                  <p className="text-green-600 font-black text-2xl pop-in">✅ Верно!</p>
                )}
                {feedback === 'wrong' && (
                  <p className="text-red-500 font-black text-lg">
                    «{current.slovo.word}» — {current.slovo.syllableBreak} ({current.slovo.syllables}{' '}
                    {current.slovo.syllables === 1 ? 'слог' : 'слога'}) 👀
                  </p>
                )}
              </div>
            </div>
          )}

          {finished && (
            <div className="card bg-white text-center py-12 px-6">
              <p className="text-4xl font-black text-[#3a1c6e] mb-2">{praiseFor(score, ROUNDS_PER_SESSION).title}</p>
              <p className="text-gray-600 mb-1">Правильных ответов:</p>
              <p className="text-7xl font-black text-orange mb-2">{score}</p>
              <p className="text-gray-500 mb-8">из {ROUNDS_PER_SESSION}</p>
              <div className="flex justify-center gap-3 flex-wrap">
                <button onClick={begin} className="btn-primary px-8 py-4 text-lg">
                  🔁 Играть ещё
                </button>
                <Link
                  href="/4-5-let/gramota/slogov"
                  className="px-8 py-4 text-lg rounded-lg border border-gray-300 text-[#3a1c6e] font-bold hover:bg-gray-50"
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
