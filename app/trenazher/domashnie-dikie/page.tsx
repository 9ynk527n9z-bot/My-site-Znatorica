'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import { speakRu } from '@/lib/speak-ru';
import { praiseFor } from '@/lib/praise';

const ROUNDS_PER_SESSION = 10;

type Habitat = 'domestic' | 'wild';

interface Animal {
  emoji: string;
  name: string;
  habitat: Habitat;
}

const ANIMALS: Animal[] = [
  // Домашние — живут рядом с человеком
  { emoji: '🐄', name: 'Корова', habitat: 'domestic' },
  { emoji: '🐱', name: 'Кошка', habitat: 'domestic' },
  { emoji: '🐶', name: 'Собака', habitat: 'domestic' },
  { emoji: '🐴', name: 'Лошадь', habitat: 'domestic' },
  { emoji: '🐷', name: 'Свинья', habitat: 'domestic' },
  { emoji: '🐐', name: 'Коза', habitat: 'domestic' },
  { emoji: '🐔', name: 'Курица', habitat: 'domestic' },
  { emoji: '🐑', name: 'Овца', habitat: 'domestic' },
  { emoji: '🐰', name: 'Кролик', habitat: 'domestic' },
  { emoji: '🦆', name: 'Утка', habitat: 'domestic' },
  // Дикие — живут в лесу
  { emoji: '🐺', name: 'Волк', habitat: 'wild' },
  { emoji: '🦊', name: 'Лиса', habitat: 'wild' },
  { emoji: '🐻', name: 'Медведь', habitat: 'wild' },
  { emoji: '🐇', name: 'Заяц', habitat: 'wild' },
  { emoji: '🦔', name: 'Ёж', habitat: 'wild' },
  { emoji: '🐿️', name: 'Белка', habitat: 'wild' },
  { emoji: '🫎', name: 'Лось', habitat: 'wild' },
  { emoji: '🐗', name: 'Кабан', habitat: 'wild' },
  { emoji: '🦉', name: 'Сова', habitat: 'wild' },
  { emoji: '🦫', name: 'Бобр', habitat: 'wild' },
];

function makeSession(): Animal[] {
  const pool = [...ANIMALS];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, ROUNDS_PER_SESSION);
}

export default function DomashnieDikieTrainerPage() {
  const [started, setStarted] = useState(false);
  const [session, setSession] = useState<Animal[]>([]);
  const [round, setRound] = useState(0); // индекс текущего животного
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [picked, setPicked] = useState<Habitat | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = started && !finished ? session[round] : null;

  // Озвучиваем название животного при показе
  useEffect(() => {
    if (current && !feedback) {
      speakRu(current.name);
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

  function handlePick(habitat: Habitat) {
    if (feedback || !current) return;
    setPicked(habitat);
    const correct = habitat === current.habitat;
    setFeedback(correct ? 'correct' : 'wrong');
    if (correct) {
      setScore((s) => s + 1);
      speakRu('Верно!');
    } else {
      speakRu(
        current.habitat === 'domestic'
          ? `${current.name} — домашнее животное`
          : `${current.name} — дикое животное`
      );
    }
    setTimeout(nextRound, correct ? 1100 : 2200);
  }

  return (
    <div className="bg-black min-h-screen">
      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">🏠🌲 Домашние и дикие животные</h1>
      </div>

      <TrainerGate type="trainer:domashnie-dikie">
        <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6">
          {!started && (
            <div className="card bg-white text-center py-12 px-6">
              <div className="text-7xl mb-4">🐄🐺</div>
              <p className="text-2xl font-black text-[#3a1c6e] mb-3">Кто где живёт?</p>
              <p className="text-gray-600 text-lg mb-8">
                Посмотри на животное и реши: оно домашнее или дикое?
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
                <div className="text-8xl mb-3 leading-none">{current.emoji}</div>
                <div className="flex items-center justify-center gap-3 mb-8">
                  <span className="text-4xl font-black text-[#3a1c6e]">{current.name}</span>
                  <button
                    onClick={() => speakRu(current.name)}
                    className="text-2xl hover:scale-110 transition-transform"
                    aria-label="Прослушать название"
                    title="Прослушать"
                  >
                    🔊
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {(
                  [
                    { habitat: 'domestic' as Habitat, emoji: '🏠', label: 'Домашнее' },
                    { habitat: 'wild' as Habitat, emoji: '🌲', label: 'Дикое' },
                  ]
                ).map((option) => {
                  const isPicked = picked === option.habitat;
                  const isAnswer = current.habitat === option.habitat;
                  const showState = feedback && (isPicked || isAnswer);
                  return (
                    <button
                      key={option.habitat}
                      onClick={() => handlePick(option.habitat)}
                      disabled={!!feedback}
                      className={`rounded-3xl border-4 py-8 px-4 transition-all ${
                        showState
                          ? isAnswer
                            ? 'border-green-500 bg-green-50 pop-in'
                            : 'border-red-400 bg-red-50 shake'
                          : option.habitat === 'domestic'
                            ? 'border-orange/40 bg-orange/10 hover:border-orange hover:scale-105'
                            : 'border-green-600/40 bg-green-600/10 hover:border-green-600 hover:scale-105'
                      }`}
                    >
                      <div className="text-6xl mb-2">{option.emoji}</div>
                      <div className="text-2xl font-black text-[#3a1c6e]">{option.label}</div>
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
                    {current.name} — {current.habitat === 'domestic' ? 'домашнее' : 'дикое'} животное{' '}
                    {current.habitat === 'domestic' ? '🏠' : '🌲'}
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
                  href="/4-5-let/okruzhayushchiy/domashnie-i-dikie-zhivotnye"
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
