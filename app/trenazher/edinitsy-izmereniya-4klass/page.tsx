'use client';

import Link from 'next/link';
import { useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import { praiseFor } from '@/lib/praise';

type Category = 'length' | 'mass' | 'time';
type Direction = 'forward' | 'reverse';

interface UnitPair {
  big: string; // крупная единица (сокращение)
  small: string; // мелкая единица (сокращение)
  mult: number; // сколько мелких единиц в 1 крупной
  maxCount: number; // максимум крупных единиц для генерации вопроса
}

// Таблицы соотношений — ответы вычисляются кодом, а не хранятся заранее.
const PAIRS: Record<Category, UnitPair[]> = {
  length: [
    { big: 'км', small: 'м', mult: 1000, maxCount: 9 },
    { big: 'м', small: 'дм', mult: 10, maxCount: 9 },
    { big: 'м', small: 'см', mult: 100, maxCount: 9 },
    { big: 'дм', small: 'см', mult: 10, maxCount: 9 },
  ],
  mass: [{ big: 'кг', small: 'г', mult: 1000, maxCount: 9 }],
  time: [
    { big: 'ч', small: 'мин', mult: 60, maxCount: 9 },
    { big: 'мин', small: 'с', mult: 60, maxCount: 9 },
    { big: 'ч', small: 'с', mult: 3600, maxCount: 5 },
  ],
};

const CATEGORY_ORDER: Category[] = ['length', 'mass', 'time'];

interface Round {
  number: number;
  question: string;
  answer: number;
  options: number[];
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function formatNumber(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function makeRound(index: number): Round {
  const category = CATEGORY_ORDER[index % CATEGORY_ORDER.length];
  const pairsForCategory = PAIRS[category];
  const pair = pairsForCategory[randInt(0, pairsForCategory.length - 1)];
  const direction: Direction = Math.random() < 0.5 ? 'forward' : 'reverse';

  const count = randInt(2, pair.maxCount);
  const converted = count * pair.mult; // реальное вычисление по таблице

  let question: string;
  let answer: number;

  if (direction === 'forward') {
    // Сколько мелких единиц в N крупных?
    question = `Сколько ${pair.small} в ${count} ${pair.big}?`;
    answer = converted;
  } else {
    // Сколько крупных единиц в N мелких? (N подобрано так, чтобы делилось без остатка)
    question = `Сколько ${pair.big} в ${converted} ${pair.small}?`;
    answer = count;
  }

  // Правдоподобные ошибки: не умножили/поделили вовсе, перепутали множитель,
  // ошиблись на соседнее число. Плюс запасной вариант — случайное смещение.
  const candidatePool: number[] = [];
  if (direction === 'forward') {
    candidatePool.push(count); // забыли перевести вообще
    if (pair.mult % 10 === 0) candidatePool.push(count * (pair.mult / 10)); // перепутали множитель
    candidatePool.push(converted + pair.mult, converted - pair.mult);
  } else {
    candidatePool.push(converted); // забыли перевести вообще
    candidatePool.push(count + 1, count - 1, count + 2);
  }

  const wrongPool = new Set<number>();
  for (const candidate of candidatePool) {
    if (candidate > 0 && candidate !== answer) wrongPool.add(candidate);
    if (wrongPool.size >= 3) break;
  }
  let guard = 0;
  while (wrongPool.size < 3 && guard < 50) {
    guard++;
    const delta = randInt(-5, 5) || 1;
    const candidate = answer + delta;
    if (candidate > 0 && candidate !== answer) wrongPool.add(candidate);
  }
  const wrongs = shuffle(Array.from(wrongPool)).slice(0, 3);
  const options = shuffle([answer, ...wrongs]);

  return { number: index, question, answer, options };
}

const ROUNDS_PER_SESSION = 10;

export default function EdinitsyIzmereniyaTrainerPage() {
  const [started, setStarted] = useState(false);
  const [round, setRound] = useState(0);
  const [current, setCurrent] = useState<Round | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [pickedValue, setPickedValue] = useState<number | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [finished, setFinished] = useState(false);

  function begin() {
    setStarted(true);
    setFinished(false);
    setRound(1);
    setScore({ correct: 0, total: 0 });
    setCurrent(makeRound(0));
    setFeedback(null);
    setPickedValue(null);
  }

  function nextRound() {
    if (round >= ROUNDS_PER_SESSION) {
      setFinished(true);
      return;
    }
    const nextIndex = round;
    setRound((r) => r + 1);
    setCurrent(makeRound(nextIndex));
    setFeedback(null);
    setPickedValue(null);
  }

  function handlePick(value: number) {
    if (feedback || !current) return;
    setPickedValue(value);
    const correct = value === current.answer;
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
        <h1 className="text-2xl font-bold mt-2">📏 Единицы измерения</h1>
      </div>

      <TrainerGate type="trainer:edinitsy-izmereniya-4klass">
        <div className="max-w-2xl mx-auto py-8 px-6">
          {!started && (
            <div className="card mb-8 text-center">
              <p className="text-lg text-white/90 mb-6">
                Переводи длину (км, м, дм, см), массу (кг, г) и время (ч, мин, с) из одних единиц в другие. Выбери правильный ответ из вариантов!
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

              <p className="text-2xl sm:text-3xl font-black text-[#3a1c6e] mb-8">{current.question}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {current.options.map((opt, idx) => {
                  const isPicked = pickedValue === opt;
                  const isRight = opt === current.answer;
                  const showState = feedback && (isPicked || isRight);
                  const palette = ['border-purple-600 bg-purple-500 text-white', 'border-sky-600 bg-sky-500 text-white', 'border-amber-600 bg-amber-500 text-white', 'border-pink-600 bg-pink-500 text-white'];
                  return (
                    <button
                      key={`${opt}-${idx}`}
                      onClick={() => handlePick(opt)}
                      disabled={!!feedback}
                      className={`flex items-center justify-center py-6 rounded-2xl border-4 text-2xl sm:text-3xl font-black transition-all ${
                        showState
                          ? isRight
                            ? 'border-green-500 bg-green-50 text-green-600 pop-in'
                            : 'border-red-400 bg-red-50 text-red-500 shake'
                          : `${palette[idx % palette.length]} hover:brightness-110 hover:scale-105`
                      }`}
                    >
                      {formatNumber(opt)}
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
                    Правильный ответ: {formatNumber(current.answer)}
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
