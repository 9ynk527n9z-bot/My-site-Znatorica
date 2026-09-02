'use client';

import Link from 'next/link';
import { useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import { praiseFor } from '@/lib/praise';

const ROUNDS_PER_SESSION = 10;

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

// Форматируем число с одним знаком после запятой в русском виде (запятая вместо точки),
// убираем плавающую погрешность через toFixed(1).
function formatRu(n: number): string {
  return n.toFixed(1).replace('.', ',');
}

interface CompareRound {
  kind: 'compare';
  a: number;
  b: number;
  question: string;
  options: string[];
  answer: string;
}

interface SumRound {
  kind: 'sum';
  a: number;
  b: number;
  question: string;
  options: string[];
  answer: string;
}

type Round = CompareRound | SumRound;

function makeCompareRound(): CompareRound {
  // Числа с одним знаком после запятой, целая часть 0-9, дробная 0-9.
  let a = randInt(0, 99) / 10;
  let b = randInt(0, 99) / 10;

  // Иногда специально создаём "ловушку": одинаковая целая часть, разная дробная,
  // где число с меньшим количеством цифр в дробной части может выглядеть "больше" на глаз
  // (например 3,5 против 3,45) — но в этой теме дробная часть всегда одна цифра, поэтому
  // ловушку делаем через одинаковую целую часть и разные десятые.
  if (Math.random() < 0.5) {
    const whole = randInt(0, 9);
    const d1 = randInt(0, 9);
    let d2 = randInt(0, 9);
    while (d2 === d1) d2 = randInt(0, 9);
    a = Math.round((whole + d1 / 10) * 10) / 10;
    b = Math.round((whole + d2 / 10) * 10) / 10;
  }

  // Избегаем совпадения слишком часто, но оставляем шанс на "="
  if (Math.random() < 0.15) {
    b = a;
  }

  const aStr = formatRu(a);
  const bStr = formatRu(b);

  let answer: string;
  if (a > b) answer = '>';
  else if (a < b) answer = '<';
  else answer = '=';

  return {
    kind: 'compare',
    a,
    b,
    question: `Что больше: ${aStr} или ${bStr}?`,
    options: ['>', '<', '='],
    answer,
  };
}

function makeSumRound(): SumRound {
  // Сложение двух дробей с одним знаком после запятой, сумма в пределах 10.
  const a = randInt(0, 79) / 10;
  const maxB = Math.max(0, Math.min(79, Math.round((10 - a) * 10)));
  const b = randInt(0, maxB) / 10;

  const sum = Math.round((a + b) * 10) / 10;
  const correct = formatRu(sum);

  const wrongPool = new Set<string>();
  while (wrongPool.size < 3) {
    const delta = randInt(-15, 15) / 10;
    let wrong = Math.round((sum + delta) * 10) / 10;
    if (wrong < 0) wrong = Math.abs(wrong) + 0.3;
    const wrongStr = formatRu(wrong);
    if (wrongStr !== correct) wrongPool.add(wrongStr);
  }

  const options = shuffle([correct, ...wrongPool]);

  return {
    kind: 'sum',
    a,
    b,
    question: `${formatRu(a)} + ${formatRu(b)} = ?`,
    options,
    answer: correct,
  };
}

function makeRound(): Round {
  return Math.random() < 0.5 ? makeCompareRound() : makeSumRound();
}

export default function DesyatichnieDrobiTrainerPage() {
  const [started, setStarted] = useState(false);
  const [round, setRound] = useState(0);
  const [current, setCurrent] = useState<Round | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [finished, setFinished] = useState(false);

  function begin() {
    setStarted(true);
    setFinished(false);
    setRound(1);
    setScore({ correct: 0, total: 0 });
    setCurrent(makeRound());
    setFeedback(null);
    setPicked(null);
  }

  function nextRound() {
    if (round >= ROUNDS_PER_SESSION) {
      setFinished(true);
      return;
    }
    setRound((r) => r + 1);
    setCurrent(makeRound());
    setFeedback(null);
    setPicked(null);
  }

  function handlePick(option: string) {
    if (feedback || !current) return;
    setPicked(option);
    const correct = option === current.answer;
    setFeedback(correct ? 'correct' : 'wrong');
    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    setTimeout(nextRound, correct ? 900 : 1400);
  }

  return (
    <div className="bg-black min-h-screen">
      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">🔢 Десятичные дроби</h1>
      </div>

      <TrainerGate type="trainer:desyatichnie-drobi-4klass">
        <div className="max-w-2xl mx-auto py-8 px-6">
          {!started && (
            <div className="card mb-8 text-center">
              <p className="text-white/80 mb-6">
                Сравнивай десятичные дроби и складывай их в пределах 10. 10 раундов, вопросы двух типов чередуются.
              </p>
              <button onClick={begin} className="btn-primary text-lg px-8 py-4">
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

              <p className="text-2xl font-black text-[#3a1c6e] mb-8">{current.question}</p>

              <div
                className={`grid gap-4 mb-6 ${
                  current.kind === 'compare' ? 'grid-cols-3' : 'grid-cols-2'
                }`}
              >
                {current.options.map((option) => {
                  const isPicked = picked === option;
                  const isRight = option === current.answer;
                  const showState = feedback && (isPicked || isRight);
                  return (
                    <button
                      key={option}
                      onClick={() => handlePick(option)}
                      disabled={!!feedback}
                      className={`py-5 rounded-2xl border-4 font-black text-2xl transition-all ${
                        showState
                          ? isRight
                            ? 'border-green-500 bg-green-50 text-green-600 pop-in'
                            : 'border-red-400 bg-red-50 text-red-500 shake'
                          : 'border-gray-200 bg-gray-50 text-[#3a1c6e] hover:border-orange hover:scale-105'
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              <div className="h-8">
                {feedback === 'correct' && <p className="text-green-600 font-black text-xl pop-in">✅ Верно!</p>}
                {feedback === 'wrong' && (
                  <p className="text-red-500 font-black text-xl">
                    Правильный ответ: {current.answer} 👀
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
