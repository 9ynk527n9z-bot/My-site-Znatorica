'use client';

import Link from 'next/link';
import { useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import { praiseFor } from '@/lib/praise';

type ShapeType = 'rectangle' | 'square';

interface Round {
  shape: ShapeType;
  a: number;
  b: number;
  answer: number;
  options: number[];
  key: string;
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Периметр считаем по формуле P = (a + b) × 2 — верно и для прямоугольника, и для квадрата (a = b).
function computePerimeter(a: number, b: number): number {
  return (a + b) * 2;
}

// Для 2 класса берём числа 2-9 — совсем маленькие, чтобы легко складывать в уме.
function makeRound(usedKeys: Set<string>): Round {
  let attempt = 0;
  let shape: ShapeType;
  let a: number;
  let b: number;
  let key: string;

  do {
    shape = Math.random() < 0.4 ? 'square' : 'rectangle';
    a = randInt(2, 9);
    b = shape === 'square' ? a : randInt(2, 9);
    attempt++;
    key = `${shape}-${a}-${b}`;
  } while (usedKeys.has(key) && attempt < 50);

  usedKeys.add(key);

  const answer = computePerimeter(a, b);
  const sumOnly = a + b; // типичная ошибка: забыли умножить на 2

  const candidates = new Set<number>();
  const tryAdd = (value: number) => {
    if (value > 0 && value !== answer) candidates.add(value);
  };

  tryAdd(sumOnly);
  tryAdd(answer + a);
  tryAdd(answer - a);
  tryAdd(answer + b);
  tryAdd(answer - b);
  tryAdd(answer + 2);
  tryAdd(answer - 2);
  tryAdd(answer + 4);
  tryAdd(answer - 4);
  let extra = 1;
  while (candidates.size < 6) {
    tryAdd(answer + extra * 3);
    tryAdd(answer - extra * 3);
    extra++;
  }

  const wrongPool = shuffle(Array.from(candidates));
  const wrongOptions = wrongPool.slice(0, 3);
  const options = shuffle([answer, ...wrongOptions]);

  return { shape, a, b, answer, options, key };
}

const ROUNDS_PER_SESSION = 10;
const SVG_SCALE = 18;

function ShapeSvg({ a, b }: { a: number; b: number }) {
  const width = b * SVG_SCALE;
  const height = a * SVG_SCALE;
  const pad = 40;
  const viewW = width + pad * 2;
  const viewH = height + pad * 2;

  return (
    <svg viewBox={`0 0 ${viewW} ${viewH}`} width="100%" height="180" className="mx-auto max-w-xs">
      <rect
        x={pad}
        y={pad}
        width={width}
        height={height}
        fill="rgba(147, 51, 234, 0.15)"
        stroke="#9333EA"
        strokeWidth={3}
        rx={4}
      />
      {/* Верхняя сторона (b) */}
      <text x={pad + width / 2} y={pad - 12} textAnchor="middle" fontSize="16" fontWeight="700" fill="#3a1c6e">
        {b} см
      </text>
      {/* Левая сторона (a) */}
      <text
        x={pad - 12}
        y={pad + height / 2}
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill="#3a1c6e"
        transform={`rotate(-90, ${pad - 12}, ${pad + height / 2})`}
      >
        {a} см
      </text>
    </svg>
  );
}

export default function Perimetr2klassTrainerPage() {
  const [started, setStarted] = useState(false);
  const [round, setRound] = useState(0);
  const [current, setCurrent] = useState<Round | null>(null);
  const [usedKeys, setUsedKeys] = useState<Set<string>>(new Set());
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [pickedValue, setPickedValue] = useState<number | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [finished, setFinished] = useState(false);

  function begin() {
    const keys = new Set<string>();
    setUsedKeys(keys);
    setStarted(true);
    setFinished(false);
    setRound(1);
    setScore({ correct: 0, total: 0 });
    setCurrent(makeRound(keys));
    setFeedback(null);
    setPickedValue(null);
  }

  function nextRound() {
    if (round >= ROUNDS_PER_SESSION) {
      setFinished(true);
      return;
    }
    const nextIndex = round + 1;
    setRound(nextIndex);
    setCurrent(makeRound(usedKeys));
    setFeedback(null);
    setPickedValue(null);
  }

  function handlePick(value: number) {
    if (feedback || !current) return;
    setPickedValue(value);
    const correct = value === current.answer;
    setFeedback(correct ? 'correct' : 'wrong');
    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    setTimeout(nextRound, correct ? 900 : 1600);
  }

  const shapeLabel = current?.shape === 'square' ? 'квадрата' : 'прямоугольника';

  return (
    <div className="min-h-screen">
      <div className="border-b border-white/15 px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">📐 Периметр (2 класс)</h1>
      </div>

      <TrainerGate type="trainer:perimetr-2klass">
        <div className="max-w-2xl mx-auto py-8 px-6">
          {!started && (
            <div className="card mb-8 text-center">
              <p className="text-lg text-white/90 mb-4">
                Найди периметр прямоугольника или квадрата — сложи длины всех сторон.
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
                    background: 'linear-gradient(90deg, #9333EA, #F59E0B)',
                  }}
                />
              </div>

              <ShapeSvg a={current.a} b={current.b} />

              <p className="text-2xl font-black text-[#3a1c6e] mt-4 mb-8">
                Найди периметр {shapeLabel}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {current.options.map((opt, idx) => {
                  const isPicked = pickedValue === opt;
                  const isCorrectOpt = opt === current.answer;
                  const showState = feedback && (isPicked || isCorrectOpt);
                  const palette = [
                    'border-purple-600 bg-purple-500 text-white',
                    'border-amber-600 bg-amber-500 text-white',
                    'border-purple-700 bg-purple-600 text-white',
                    'border-amber-700 bg-amber-600 text-white',
                  ];
                  return (
                    <button
                      key={opt}
                      onClick={() => handlePick(opt)}
                      disabled={!!feedback}
                      className={`flex flex-col items-center justify-center gap-1 py-4 rounded-2xl border-4 font-black transition-all ${
                        showState
                          ? isCorrectOpt
                            ? 'border-green-500 bg-green-50 text-green-600 pop-in'
                            : 'border-red-400 bg-red-50 text-red-500 shake'
                          : `${palette[idx % palette.length]} hover:brightness-110 hover:scale-105`
                      }`}
                    >
                      <span className="text-3xl">{opt} см</span>
                    </button>
                  );
                })}
              </div>

              <div className="h-8">
                {feedback === 'correct' && <p className="text-green-600 font-black text-xl pop-in">✅ Верно!</p>}
                {feedback === 'wrong' && (
                  <p className="text-red-500 font-black text-xl">
                    Правильный ответ: {current.answer} см 👀
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
