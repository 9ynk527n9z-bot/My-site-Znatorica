'use client';

import Link from 'next/link';
import { useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import { praiseFor } from '@/lib/praise';

const ROUNDS_PER_SESSION = 10;

type SeasonId = 'winter' | 'spring' | 'summer' | 'autumn';

interface Season {
  id: SeasonId;
  emoji: string;
  name: string;
  color: string; // цвет рамки кнопки
  bg: string; // фон кнопки
}

const SEASONS: Season[] = [
  { id: 'winter', emoji: '❄️', name: 'Зима', color: 'border-sky-400', bg: 'bg-sky-50' },
  { id: 'spring', emoji: '🌷', name: 'Весна', color: 'border-pink-400', bg: 'bg-pink-50' },
  { id: 'summer', emoji: '☀️', name: 'Лето', color: 'border-yellow-400', bg: 'bg-yellow-50' },
  { id: 'autumn', emoji: '🍂', name: 'Осень', color: 'border-orange-400', bg: 'bg-orange-50' },
];

interface SeasonItem {
  emoji: string;
  word: string; // подпись под предметом
  season: SeasonId;
}

// Только однозначные ассоциации: у каждого предмета ОДНО правильное время года
const ITEMS: SeasonItem[] = [
  // Зима
  { emoji: '⛄', word: 'Снеговик', season: 'winter' },
  { emoji: '❄️', word: 'Снежинка', season: 'winter' },
  { emoji: '🛷', word: 'Санки', season: 'winter' },
  { emoji: '🧤', word: 'Варежки', season: 'winter' },
  // Весна
  { emoji: '🌷', word: 'Подснежник', season: 'spring' },
  { emoji: '💧', word: 'Тает снег, бегут ручьи', season: 'spring' },
  { emoji: '🐦', word: 'Птицы прилетают, строим скворечник', season: 'spring' },
  { emoji: '🌱', word: 'Первая травка', season: 'spring' },
  // Лето
  { emoji: '🍓', word: 'Клубника', season: 'summer' },
  { emoji: '🏖️', word: 'Купание на пляже', season: 'summer' },
  { emoji: '🦋', word: 'Бабочка', season: 'summer' },
  { emoji: '🍦', word: 'Мороженое в жару', season: 'summer' },
  // Осень
  { emoji: '🍁', word: 'Жёлтые листья падают', season: 'autumn' },
  { emoji: '☂️', word: 'Зонтик от дождя', season: 'autumn' },
  { emoji: '🍄', word: 'Грибы в лесу', season: 'autumn' },
  { emoji: '🎃', word: 'Собираем урожай', season: 'autumn' },
];

const QUESTION = 'Выбери время года';

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function VremenaGodaTrainerPage() {
  const [started, setStarted] = useState(false);
  const [rounds, setRounds] = useState<SeasonItem[]>([]);
  const [round, setRound] = useState(0); // индекс текущего раунда
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [picked, setPicked] = useState<SeasonId | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = rounds[round] ?? null;

  function begin() {
    const session = shuffle(ITEMS).slice(0, ROUNDS_PER_SESSION);
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
    setRound((r) => r + 1);
    setFeedback(null);
    setPicked(null);
  }

  function handlePick(season: Season) {
    if (feedback || !current) return;
    setPicked(season.id);
    const correct = season.id === current.season;
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
        <h1 className="text-2xl font-bold mt-2">🍂❄️ Времена года</h1>
      </div>

      <TrainerGate type="trainer:vremena-goda">
        <div className="max-w-2xl mx-auto py-8 px-6">
          {!started && (
            <div className="card bg-white text-center py-12 px-6">
              <div className="text-7xl mb-6">❄️🌷☀️🍂</div>
              <p className="text-2xl font-black text-[#3a1c6e] mb-3">Угадай время года!</p>
              <p className="text-gray-600 text-lg mb-8">
                Смотри на картинку и выбирай: зима, весна, лето или осень?
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

              <p className="text-xl font-bold text-[#3a1c6e] mb-4">{QUESTION}</p>

              <div key={round} className="pop-in">
                <div className="text-8xl mb-3 leading-none">{current.emoji}</div>
                <div className="font-black text-2xl text-[#3a1c6e] mb-4">{current.word}</div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {SEASONS.map((season) => {
                  const isPicked = picked === season.id;
                  const isAnswer = season.id === current.season;
                  const showState = feedback && (isPicked || isAnswer);
                  return (
                    <button
                      key={season.id}
                      onClick={() => handlePick(season)}
                      disabled={!!feedback}
                      className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-4 py-5 px-2 transition-all ${
                        showState
                          ? isAnswer
                            ? 'border-green-500 bg-green-50 pop-in'
                            : 'border-red-400 bg-red-50 shake'
                          : `${season.color} ${season.bg} hover:scale-105`
                      }`}
                    >
                      <span className="text-6xl leading-none">{season.emoji}</span>
                      <span className="font-black text-xl text-[#3a1c6e]">{season.name}</span>
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
                    Правильно: «{SEASONS.find((s) => s.id === current.season)?.name}» 👀
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
                  href="/4-5-let/okruzhayushchiy/vremena-goda"
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
