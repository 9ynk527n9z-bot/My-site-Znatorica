'use client';

import Link from 'next/link';
import { useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import { praiseFor } from '@/lib/praise';

type Op = '+' | '-' | '×' | '÷';

interface Round {
  expression: string;
  answer: number;
  options: number[];
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Считаем два действия слева направо реальным кодом (не строкой/eval).
function evalTwoStep(a: number, op1: Op, b: number, op2: Op, c: number): number {
  const step1 = op1 === '+' ? a + b : op1 === '-' ? a - b : op1 === '×' ? a * b : a / b;
  const step2 = op2 === '+' ? step1 + c : op2 === '-' ? step1 - c : op2 === '×' ? step1 * c : step1 / c;
  return step2;
}

// Пример в 2 действия с числами в пределах 100.
// Смешиваем сложение/вычитание (крупные числа до 100) и умножение/деление
// (в пределах таблицы умножения), гарантируя целый положительный результат.
function makeRound(): Round {
  const mode = randItem<'addsub' | 'muldiv' | 'mixed'>(['addsub', 'addsub', 'muldiv', 'mixed']);

  for (let attempt = 0; attempt < 300; attempt++) {
    let a: number, b: number, c: number, op1: Op, op2: Op;

    if (mode === 'addsub') {
      // Сложение/вычитание в пределах 100, например 45 + 23 - 18
      op1 = randItem<Op>(['+', '-']);
      op2 = randItem<Op>(['+', '-']);
      a = randInt(10, 90);
      b = randInt(5, 40);
      c = randInt(5, 40);

      if (op1 === '-' && b > a) continue;
      const step1 = op1 === '+' ? a + b : a - b;
      if (step1 < 0 || step1 > 100) continue;
      if (op2 === '-' && c > step1) continue;
    } else if (mode === 'muldiv') {
      // Умножение/деление в пределах таблицы умножения, например 8 × 6 - 15
      op1 = '×';
      a = randInt(2, 10);
      b = randInt(2, 10);
      const product = a * b;
      if (product > 100) continue;
      op2 = randItem<Op>(['+', '-']);
      c = randInt(2, 30);
      if (op2 === '-' && c > product) continue;
    } else {
      // Смешанный: умножение/деление + сложение/вычитание, например 7 × 8 + 12
      const first = randItem<'mul' | 'div'>(['mul', 'div']);
      if (first === 'mul') {
        op1 = '×';
        a = randInt(2, 10);
        b = randInt(2, 10);
      } else {
        op1 = '÷';
        b = randInt(2, 10);
        const q = randInt(2, 10);
        a = b * q;
      }
      op2 = randItem<Op>(['+', '-']);
      c = randInt(2, 40);
    }

    const answer = evalTwoStep(a, op1, b, op2, c);
    if (!Number.isInteger(answer) || answer < 0 || answer > 150) continue;
    if (op2 === '-' && answer < 0) continue;

    const expression = `${a} ${op1} ${b} ${op2} ${c}`;
    return { expression, answer, options: makeOptions(answer) };
  }

  // Фолбэк — простой гарантированно корректный пример
  const a = randInt(20, 60);
  const b = randInt(5, 30);
  const answer = a + b - 5;
  return { expression: `${a} + ${b} - 5`, answer, options: makeOptions(answer) };
}

function makeOptions(answer: number): number[] {
  const options = new Set<number>([answer]);
  let guard = 0;
  while (options.size < 4 && guard < 100) {
    guard++;
    const delta = randItem([1, -1, 2, -2, 3, -3, 5, -5, 10, -10]);
    const candidate = answer + delta;
    if (candidate >= 0 && candidate <= 200 && candidate !== answer) {
      options.add(candidate);
    }
  }
  const shuffled = Array.from(options);
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const ROUNDS_PER_SESSION = 10;

export default function SlozhniePrimery3klassTrainerPage() {
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
    setCurrent(makeRound());
    setFeedback(null);
    setPickedValue(null);
  }

  function nextRound() {
    if (round >= ROUNDS_PER_SESSION) {
      setFinished(true);
      return;
    }
    setRound((r) => r + 1);
    setCurrent(makeRound());
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
        <h1 className="text-2xl font-bold mt-2">🧮 Сложные примеры (3 класс)</h1>
      </div>

      <TrainerGate type="trainer:slozhnie-primery-3klass">
        <div className="max-w-2xl mx-auto py-8 px-6">
          {!started && (
            <div className="card mb-8 text-center">
              <p className="text-lg text-white/90 mb-4">
                Реши 10 примеров в два действия с числами в пределах 100: сложение, вычитание,
                умножение и деление. Считай по порядку — слева направо!
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

              <p className="text-4xl font-black text-[#3a1c6e] mb-8">{current.expression} = ?</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {current.options.map((opt, idx) => {
                  const isPicked = pickedValue === opt;
                  const isCorrectOpt = opt === current.answer;
                  const showState = feedback && (isPicked || isCorrectOpt);
                  const palette = [
                    'border-purple-600 bg-purple-500 text-white',
                    'border-sky-600 bg-sky-500 text-white',
                    'border-amber-600 bg-amber-500 text-white',
                    'border-pink-600 bg-pink-500 text-white',
                  ];
                  return (
                    <button
                      key={opt}
                      onClick={() => handlePick(opt)}
                      disabled={!!feedback}
                      className={`flex items-center justify-center py-6 rounded-2xl border-4 font-black text-3xl transition-all ${
                        showState
                          ? isCorrectOpt
                            ? 'border-green-500 bg-green-50 text-green-600 pop-in'
                            : 'border-red-400 bg-red-50 text-red-500 shake'
                          : `${palette[idx % palette.length]} hover:brightness-110 hover:scale-105`
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              <div className="h-8">
                {feedback === 'correct' && <p className="text-green-600 font-black text-xl pop-in">✅ Верно!</p>}
                {feedback === 'wrong' && (
                  <p className="text-red-500 font-black text-xl">Правильный ответ: {current.answer} 👀</p>
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
