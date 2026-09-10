'use client';

import Link from 'next/link';
import { useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import ShareButtons from '@/components/ShareButtons';

type Season = 'Зима' | 'Весна' | 'Лето' | 'Осень';

interface MonthEntry {
  month: string;
  season: Season;
  emoji: string;
}

const MONTHS: MonthEntry[] = [
  { month: 'ЯНВАРЬ', season: 'Зима', emoji: '❄️' },
  { month: 'ФЕВРАЛЬ', season: 'Зима', emoji: '⛄' },
  { month: 'МАРТ', season: 'Весна', emoji: '🌷' },
  { month: 'АПРЕЛЬ', season: 'Весна', emoji: '🌱' },
  { month: 'МАЙ', season: 'Весна', emoji: '🌸' },
  { month: 'ИЮНЬ', season: 'Лето', emoji: '☀️' },
  { month: 'ИЮЛЬ', season: 'Лето', emoji: '🏖️' },
  { month: 'АВГУСТ', season: 'Лето', emoji: '🌻' },
  { month: 'СЕНТЯБРЬ', season: 'Осень', emoji: '🍁' },
  { month: 'ОКТЯБРЬ', season: 'Осень', emoji: '🍂' },
  { month: 'НОЯБРЬ', season: 'Осень', emoji: '🌧️' },
  { month: 'ДЕКАБРЬ', season: 'Зима', emoji: '🎄' },
];

// Иконки кнопок-сезонов намеренно НЕ повторяют эмодзи ни одного месяца выше
// (у ❄️/🌸/☀️/🍂 было по совпадению с январём/маем/июнем/октябрём) — иначе
// кнопка сама подсказывала ответ вместо того, чтобы ребёнок его вспоминал.
const SEASONS: { season: Season; emoji: string }[] = [
  { season: 'Зима', emoji: '⛷️' },
  { season: 'Весна', emoji: '🌼' },
  { season: 'Лето', emoji: '🏊' },
  { season: 'Осень', emoji: '🍄' },
];

const ROUND_LENGTH = 10;

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildRound(): MonthEntry[] {
  return shuffle(MONTHS).slice(0, ROUND_LENGTH);
}

export default function MesyatsyISezonyTrainerPage() {
  const [round, setRound] = useState<MonthEntry[]>(() => buildRound());
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<Season | null>(null);
  const [finished, setFinished] = useState(false);

  const current = round[index];
  const answered = selected !== null;

  function handleAnswer(season: Season) {
    if (answered) return;
    setSelected(season);
    if (season === current.season) {
      setScore((s) => s + 1);
    }
  }

  function handleNext() {
    if (index + 1 >= round.length) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
  }

  function restart() {
    setRound(buildRound());
    setIndex(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
  }

  function praise(): string {
    const ratio = score / round.length;
    if (ratio === 1) return 'Идеально! Ты знаешь все месяцы и времена года!';
    if (ratio >= 0.7) return 'Отлично! Ещё чуть-чуть — и будет идеально!';
    if (ratio >= 0.4) return 'Хорошее начало! Потренируйся ещё немного.';
    return 'Не страшно — попробуй ещё раз, обязательно получится!';
  }

  return (
    <div className="min-h-screen">
      <div className="border-b border-white/15 px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">🍂❄️🌸☀️ Месяцы и времена года</h1>
      </div>

      <TrainerGate type="trainer:mesyatsy-i-sezony">
        <div className="max-w-2xl mx-auto py-8 px-6">
          {!finished && current && (
            <div className="card bg-white text-center">
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-500 text-sm">
                  Вопрос {index + 1} из {round.length}
                </span>
                <span className="text-gray-600 text-sm">
                  Правильно: <span className="font-bold text-orange">{score}</span>
                </span>
              </div>

              <div className="text-8xl mb-4 leading-none">{current.emoji}</div>
              <p className="text-4xl font-black text-[#3a1c6e] mb-8 tracking-wide">{current.month}</p>

              <p className="text-gray-500 mb-4">Какое это время года?</p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {SEASONS.map(({ season, emoji }) => {
                  let style = 'bg-white/10 border-2 border-gray-200 text-[#3a1c6e] hover:bg-gray-50';
                  if (answered) {
                    if (season === current.season) {
                      style = 'border-2 border-green-500 bg-green-50 text-green-700';
                    } else if (season === selected) {
                      style = 'border-2 border-red-400 bg-red-50 text-red-600';
                    } else {
                      style = 'border-2 border-gray-200 text-gray-400 opacity-60';
                    }
                  }
                  return (
                    <button
                      key={season}
                      onClick={() => handleAnswer(season)}
                      disabled={answered}
                      className={`px-4 py-5 rounded-xl font-bold text-lg transition-all ${style}`}
                    >
                      <span className="block text-6xl mb-1 leading-none">{emoji}</span>
                      {season}
                    </button>
                  );
                })}
              </div>

              <div className="h-14 flex items-center justify-center">
                {answered && selected === current.season && (
                  <p className="text-green-600 font-black text-xl">✅ Верно!</p>
                )}
                {answered && selected !== current.season && (
                  <p className="text-red-500 font-black text-xl">
                    ❌ Неверно, это {current.season.toLowerCase()}
                  </p>
                )}
              </div>

              {answered && (
                <button onClick={handleNext} className="btn-primary px-8 py-3">
                  {index + 1 >= round.length ? 'Посмотреть результат' : 'Дальше →'}
                </button>
              )}
            </div>
          )}

          {finished && (
            <div className="card bg-white text-center py-10">
              <p className="text-3xl font-black text-[#3a1c6e] mb-2">🎉 Раунд завершён!</p>
              <p className="text-gray-600 mb-1">Правильных ответов</p>
              <p className="text-6xl font-black text-orange mb-4">
                {score}/{round.length}
              </p>
              <p className="text-gray-500 mb-8">{praise()}</p>
              <div className="flex justify-center gap-3 flex-wrap mb-6">
                <button onClick={restart} className="btn-primary px-6 py-3">
                  🔁 Играть ещё
                </button>
              </div>
              <div className="pt-6 border-t border-gray-100">
                <ShareButtons
                  text={`Угадали ${score} из ${round.length} месяцев и времён года на Знаторике — попробуйте тоже:`}
                  url="https://znatorica.ru/trenazher/mesyatsy-i-sezony"
                  trackKey="mesyatsy-i-sezony"
                />
              </div>
            </div>
          )}
        </div>
      </TrainerGate>
    </div>
  );
}
