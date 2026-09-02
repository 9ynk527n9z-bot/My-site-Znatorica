'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import { speakRu } from '@/lib/speak-ru';
import { OBOBSHCHENIE_GROUPS, type ObobshchenieGroup } from '@/lib/slova-obobshchenie-4-5let';
import { praiseFor } from '@/lib/praise';

const ROUNDS_PER_SESSION = 10;

function shuffle<T>(arr: T[]): T[] {
  const pool = [...arr];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool;
}

interface Round {
  group: ObobshchenieGroup;
  options: string[];
}

function makeSession(): Round[] {
  const groups = shuffle(OBOBSHCHENIE_GROUPS).slice(0, ROUNDS_PER_SESSION);
  return groups.map((group) => ({ group, options: shuffle(group.options) }));
}

export default function SlovaObobshchenieTrainerPage() {
  const [started, setStarted] = useState(false);
  const [session, setSession] = useState<Round[]>([]);
  const [round, setRound] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = started && !finished ? session[round] : null;

  // Озвучиваем вопрос и предметы при показе нового раунда
  useEffect(() => {
    if (current && !feedback) {
      speakRu(`Как назвать одним словом: ${current.group.items.join(', ')}?`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, round]);

  const begin = useCallback(() => {
    setSession(makeSession());
    setRound(0);
    setScore(0);
    setFeedback(null);
    setPicked(null);
    setFinished(false);
    setStarted(true);
  }, []);

  function nextRound() {
    if (round + 1 >= ROUNDS_PER_SESSION) {
      setFinished(true);
      return;
    }
    setRound((r) => r + 1);
    setFeedback(null);
    setPicked(null);
  }

  function handlePick(option: string) {
    if (feedback || !current) return;
    setPicked(option);
    const correct = option === current.group.answer;
    setFeedback(correct ? 'correct' : 'wrong');
    if (correct) {
      setScore((s) => s + 1);
      speakRu('Верно! Это ' + current.group.answer.toLowerCase());
    } else {
      speakRu(`Это ${current.group.answer.toLowerCase()}`);
    }
    setTimeout(nextRound, correct ? 1100 : 2200);
  }

  return (
    <div className="bg-black min-h-screen">
      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">🍎🥕 Назови одним словом</h1>
      </div>

      <TrainerGate type="trainer:slova-obobshchenie-4-5let">
        <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6">
          {!started && (
            <div className="card bg-white text-center py-12 px-6">
              <div className="text-7xl mb-4">🍎🍌🍐</div>
              <p className="text-2xl font-black text-[#3a1c6e] mb-3">Как назвать одним словом?</p>
              <p className="text-gray-600 text-lg mb-8">
                Посмотри на три картинки и выбери слово, которое подходит им всем: фрукты, овощи,
                животные, мебель, посуда, одежда, транспорт или игрушки.
              </p>
              <button onClick={begin} className="btn-primary px-10 py-5 text-xl">
                ▶️ Начать игру
              </button>
            </div>
          )}

          {started && !finished && current && (
            <div className="card bg-white text-center px-4 py-6 sm:px-8">
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

              <div key={round} className="pop-in">
                <p className="text-xl font-bold text-[#3a1c6e] mb-4">Как назвать одним словом?</p>
                <div className="flex items-center justify-center gap-4 mb-2">
                  {current.group.emojis.map((emoji, i) => (
                    <button
                      key={i}
                      onClick={() => speakRu(current.group.items[i])}
                      className="text-7xl hover:scale-110 transition-transform"
                      aria-label={`Прослушать: ${current.group.items[i]}`}
                      title="Прослушать"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() =>
                    speakRu(`Как назвать одним словом: ${current.group.items.join(', ')}?`)
                  }
                  className="text-sm text-gray-400 hover:text-orange transition-colors mb-6"
                >
                  🔊 Повторить вопрос
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                {current.options.map((option) => {
                  const isPicked = picked === option;
                  const isAnswer = option === current.group.answer;
                  const showState = feedback && (isPicked || isAnswer);
                  return (
                    <button
                      key={option}
                      onClick={() => handlePick(option)}
                      disabled={!!feedback}
                      className={`rounded-3xl border-4 py-6 px-3 text-xl font-black transition-all ${
                        showState
                          ? isAnswer
                            ? 'border-green-500 bg-green-50 text-[#3a1c6e] pop-in'
                            : 'border-red-400 bg-red-50 text-[#3a1c6e] shake'
                          : 'border-purple-200 bg-purple-50 text-[#3a1c6e] hover:border-orange hover:scale-105'
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              <div className="h-9">
                {feedback === 'correct' && (
                  <p className="text-green-600 font-black text-2xl pop-in">✅ Верно!</p>
                )}
                {feedback === 'wrong' && (
                  <p className="text-red-500 font-black text-xl">
                    Правильно: «{current.group.answer}» 👀
                  </p>
                )}
              </div>
            </div>
          )}

          {finished && (
            <div className="card bg-white text-center py-12 px-6">
              <p className="text-4xl font-black text-[#3a1c6e] mb-2">
                {praiseFor(score, ROUNDS_PER_SESSION).title}
              </p>
              <p className="text-gray-600 mb-1">Правильных ответов:</p>
              <p className="text-7xl font-black text-orange mb-2">{score}</p>
              <p className="text-gray-500 mb-8">из {ROUNDS_PER_SESSION}</p>
              <div className="flex justify-center gap-3 flex-wrap">
                <button onClick={begin} className="btn-primary px-8 py-4 text-lg">
                  🔁 Играть ещё
                </button>
                <Link
                  href="/4-5-let/razvitie/slova"
                  className="px-8 py-4 rounded-lg border border-gray-300 text-[#3a1c6e] font-bold text-lg hover:border-orange transition-colors"
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
