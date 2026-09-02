'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import { CHTENIE_6_7LET, type ChtenieSlovo } from '@/lib/chtenie-6-7let';
import { speakRu } from '@/lib/speak-ru';

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
  slovo: ChtenieSlovo;
  options: ChtenieSlovo[];
}

function makeSession(): Round[] {
  const pool = shuffle(CHTENIE_6_7LET).slice(0, ROUNDS_PER_SESSION);
  return pool.map((slovo) => {
    const distractors = shuffle(CHTENIE_6_7LET.filter((s) => s.id !== slovo.id)).slice(0, 3);
    return { slovo, options: shuffle([slovo, ...distractors]) };
  });
}

export default function ChtenieTrainerPage() {
  const [started, setStarted] = useState(false);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [roundIndex, setRoundIndex] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [pickedId, setPickedId] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [finished, setFinished] = useState(false);

  function begin() {
    setRounds(makeSession());
    setRoundIndex(0);
    setStarted(true);
    setFinished(false);
    setScore({ correct: 0, total: 0 });
    setFeedback(null);
    setPickedId(null);
  }

  function nextRound() {
    if (roundIndex + 1 >= ROUNDS_PER_SESSION) {
      setFinished(true);
      return;
    }
    setRoundIndex((r) => r + 1);
    setFeedback(null);
    setPickedId(null);
  }

  function handlePick(option: ChtenieSlovo) {
    if (feedback) return;
    const current = rounds[roundIndex];
    setPickedId(option.id);
    const correct = option.id === current.slovo.id;
    setFeedback(correct ? 'correct' : 'wrong');
    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    speakRu(correct ? 'Верно! ' + current.slovo.word : 'Это слово: ' + current.slovo.word);
    setTimeout(nextRound, correct ? 1200 : 1800);
  }

  const current = rounds[roundIndex];

  // Озвучиваем слово целиком при появлении нового раунда.
  useEffect(() => {
    if (started && !finished && current) {
      speakRu(current.slovo.word);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roundIndex, started]);

  return (
    <div className="min-h-screen">
      <div className="border-b border-white/15 px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">📖 Чтение — читаем слова по слогам (6–7 лет)</h1>
      </div>

      <TrainerGate type="trainer:chtenie-6-7let">
        <div className="max-w-2xl mx-auto py-8 px-6">
          {!started && (
            <div className="card text-center py-10">
              <div className="text-6xl mb-4">📖</div>
              <p className="text-2xl font-black text-[#3a1c6e] mb-2">Читаем слово по слогам!</p>
              <p className="text-gray-600 mb-8">
                Прочитай слово по слогам, послушай, как оно звучит, и выбери подходящую картинку из четырёх. 10 весёлых раундов!
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
                  Слово {roundIndex + 1} из {ROUNDS_PER_SESSION}
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

              <button
                onClick={() => speakRu(current.slovo.word)}
                title="Нажми, чтобы услышать слово ещё раз"
                className="w-full rounded-2xl p-6 mb-6 text-white relative hover:scale-[1.02] transition-transform"
                style={{ background: 'linear-gradient(135deg, #A855F7, #7C3AED)' }}
              >
                <span className="absolute top-3 right-3 text-2xl">🔊</span>
                <p className="text-4xl md:text-5xl font-black tracking-wide leading-snug break-words">
                  {current.slovo.syllables}
                </p>
              </button>
              <p className="text-gray-400 text-sm -mt-4 mb-6">🔊 Нажми на слово, чтобы услышать его ещё раз</p>

              <p className="text-lg font-bold text-[#3a1c6e] mb-4">Какая картинка подходит к этому слову?</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {current.options.map((option) => {
                  const isPicked = pickedId === option.id;
                  const isAnswer = option.id === current.slovo.id;
                  const showState = feedback && (isPicked || isAnswer);
                  return (
                    <button
                      key={option.id}
                      onClick={() => handlePick(option)}
                      disabled={!!feedback}
                      className={`flex flex-col items-center justify-center gap-2 aspect-square rounded-2xl border-4 transition-all p-4 ${
                        showState
                          ? isAnswer
                            ? 'border-green-500 bg-green-50 pop-in'
                            : 'border-red-400 bg-red-50 shake'
                          : 'border-gray-200 bg-gray-50 hover:border-amber-400 hover:scale-105'
                      }`}
                    >
                      <span className="text-6xl">{option.emoji}</span>
                    </button>
                  );
                })}
              </div>

              <div className="h-8">
                {feedback === 'correct' && <p className="text-green-600 font-black text-xl pop-in">✅ Молодец, верно!</p>}
                {feedback === 'wrong' && (
                  <p className="text-red-500 font-black text-xl">
                    Это слово: {current.slovo.word} {current.slovo.emoji}
                  </p>
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
                <Link href="/6-7-let/gramota/chtenie" className="btn-secondary px-6 py-3">
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
