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

// Считаем выражение по обычным правилам приоритета операций (× и ÷ раньше + и -),
// используя реальные числа-операнды, а не строку и eval.
function evalExpr(tokens: (number | Op)[]): number {
  // Первый проход: схлопываем × и ÷
  const pass1: (number | Op)[] = [];
  let i = 0;
  while (i < tokens.length) {
    const t = tokens[i];
    if (typeof t === 'number') {
      pass1.push(t);
      i++;
    } else if (t === '×' || t === '÷') {
      const prev = pass1.pop() as number;
      const next = tokens[i + 1] as number;
      pass1.push(t === '×' ? prev * next : prev / next);
      i += 2;
    } else {
      pass1.push(t);
      i++;
    }
  }
  // Второй проход: + и - слева направо
  let result = pass1[0] as number;
  for (let j = 1; j < pass1.length; j += 2) {
    const op = pass1[j] as Op;
    const val = pass1[j + 1] as number;
    result = op === '+' ? result + val : result - val;
  }
  return result;
}

// Считаем выражение так же, как evalExpr, но дополнительно возвращаем
// минимальное промежуточное значение — нужно, чтобы отсеять примеры вида
// "3 - 17 + 20", где итог положительный, но промежуточный шаг уходит в минус
// (детям начальной школы, которые ещё не проходили отрицательные числа, такое считать нельзя).
function evalExprWithMin(tokens: (number | Op)[]): { answer: number; min: number } {
  const pass1: (number | Op)[] = [];
  let i = 0;
  while (i < tokens.length) {
    const t = tokens[i];
    if (typeof t === 'number') {
      pass1.push(t);
      i++;
    } else if (t === '×' || t === '÷') {
      const prev = pass1.pop() as number;
      const next = tokens[i + 1] as number;
      pass1.push(t === '×' ? prev * next : prev / next);
      i += 2;
    } else {
      pass1.push(t);
      i++;
    }
  }
  let result = pass1[0] as number;
  let min = result;
  for (let j = 1; j < pass1.length; j += 2) {
    const op = pass1[j] as Op;
    const val = pass1[j + 1] as number;
    result = op === '+' ? result + val : result - val;
    if (result < min) min = result;
  }
  return { answer: result, min };
}

function makeRound(): Round {
  const withBrackets = Math.random() < 0.5;
  const ops: Op[] = ['+', '-', '×', '÷'];

  // Пытаемся сгенерировать пример с целым положительным ответом.
  for (let attempt = 0; attempt < 200; attempt++) {
    if (withBrackets) {
      // (a OP1 b) OP2 c — скобки меняют порядок вычислений
      const op1 = randItem<Op>(['+', '-', '×']);
      const op2 = randItem<Op>(ops);
      let a: number, b: number, c: number;

      if (op1 === '÷') continue; // не используем деление внутри скобок здесь
      a = randInt(1, 20);
      b = randInt(1, 20);
      if (op1 === '-' && b > a) [a, b] = [b, a];
      const bracketValue = op1 === '+' ? a + b : op1 === '-' ? a - b : a * b;
      if (bracketValue < 1 || bracketValue > 20) continue;

      if (op2 === '÷') {
        // подбираем c так, чтобы bracketValue делился на c без остатка
        const divisors = [2, 3, 4, 5].filter((d) => bracketValue % d === 0 && d <= bracketValue);
        if (divisors.length === 0) continue;
        c = randItem(divisors);
      } else {
        c = randInt(1, 20);
      }
      if (op2 === '-' && c > bracketValue) continue;

      const answer = evalExpr([bracketValue, op2, c]);
      if (!Number.isInteger(answer) || answer <= 0 || answer > 400) continue;

      const expression = `(${a} ${op1} ${b}) ${op2} ${c}`;
      return { expression, answer, options: makeOptions(answer) };
    } else {
      // a OP1 b OP2 c без скобок — приоритет операций определяет порядок
      const op1 = randItem<Op>(ops);
      const op2 = randItem<Op>(ops);

      let a = randInt(1, 20);
      let b = randInt(1, 20);
      let c = randInt(1, 20);

      // Если op1 деление — a должно делиться на b
      if (op1 === '÷') {
        const divisors = [2, 3, 4, 5, 6, 7, 8, 9, 10];
        b = randItem(divisors);
        const q = randInt(1, 10);
        a = b * q;
        if (a > 20) continue;
      }
      // Если op2 деление — нужно поделить b или (b op c), проще: подбираем c делителем b, если op1/op2 приоритет совпадает
      if (op2 === '÷') {
        const divisors = [2, 3, 4, 5, 6, 7, 8, 9, 10].filter((d) => d <= 20);
        c = randItem(divisors);
        // b должно делиться на c ТОЛЬКО если op1 имеет тот же приоритет, что op2 (т.е. считается слева направо вместе)
        const op1IsMulDiv = op1 === '×' || op1 === '÷';
        if (op1IsMulDiv) {
          const q = randInt(1, 10);
          b = c * q;
          if (b > 20) continue;
        } else {
          const q = randInt(1, 10);
          b = c * q;
          if (b > 20) continue;
        }
      }

      // Проверка на вычитание — избегаем отрицательных промежуточных результатов у операций одного приоритета
      const tokens: (number | Op)[] = [a, op1, b, op2, c];
      const { answer, min } = evalExprWithMin(tokens);
      if (!Number.isInteger(answer) || answer <= 0 || answer > 400) continue;
      if (min < 0) continue;

      // Дополнительно проверим, что промежуточные шаги не уходят в минус нелепо (не обязательно, но для читаемости)
      const expression = `${a} ${op1} ${b} ${op2} ${c}`;
      return { expression, answer, options: makeOptions(answer) };
    }
  }

  // Фолбэк — простой гарантированно корректный пример
  const a = randInt(2, 10);
  const b = randInt(2, 10);
  const answer = a + b * 2;
  return { expression: `${a} + ${b} × 2`, answer, options: makeOptions(answer) };
}

function makeOptions(answer: number): number[] {
  const options = new Set<number>([answer]);
  let guard = 0;
  while (options.size < 4 && guard < 100) {
    guard++;
    const delta = randItem([1, -1, 2, -2, 3, -3, 4, -4]);
    const candidate = answer + delta;
    if (candidate >= 0 && candidate <= 500 && candidate !== answer) {
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

export default function PoryadokDeystviyTrainerPage() {
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
        <h1 className="text-2xl font-bold mt-2">🔢 Порядок действий</h1>
      </div>

      <TrainerGate type="trainer:poryadok-deystviy">
        <div className="max-w-2xl mx-auto py-8 px-6">
          {!started && (
            <div className="card mb-8 text-center">
              <p className="text-lg text-white/90 mb-4">
                Реши 10 примеров с несколькими действиями и скобками. Не забывай: умножение и деление
                считаются раньше сложения и вычитания, а скобки — раньше всего!
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
