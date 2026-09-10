'use client';

import Link from 'next/link';
import { useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import ShareButtons from '@/components/ShareButtons';

const ROUND_LENGTH = 10;

type OpType = '+' | '-' | '×' | '÷';

interface Statement {
  text: string;
  correctAnswer: number;
  shownAnswer: number;
  isTrue: boolean;
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick<T>(arr: T[]): T {
  return arr[randInt(0, arr.length - 1)];
}

// Генерируем один пример: два операнда + правильный ответ, в пределах 100
// (умножение — таблица умножения, деление — только "ровные" случаи).
function generateOperands(): { a: number; b: number; op: OpType; correct: number } {
  const op: OpType = pick(['+', '-', '×', '÷']);

  if (op === '+') {
    const a = randInt(1, 89);
    const b = randInt(1, 99 - a);
    return { a, b, op, correct: a + b };
  }

  if (op === '-') {
    const a = randInt(2, 100);
    const b = randInt(1, a);
    return { a, b, op, correct: a - b };
  }

  if (op === '×') {
    const a = randInt(2, 10);
    const b = randInt(2, 10);
    return { a, b, op, correct: a * b };
  }

  // деление — подбираем так, чтобы делилось без остатка
  const b = randInt(2, 10);
  const result = randInt(2, 10);
  const a = b * result;
  return { a, b, op, correct: result };
}

// Портим правильный ответ, чтобы получить правдоподобное, но неверное число.
// Специально не всегда "+1" или "-1" — иначе ребёнок начнёт угадывать паттерн
// вместо того чтобы реально считать.
function spoilAnswer(correct: number): number {
  const deltas = [1, -1, 2, -2, 3, -3, 10, -10];
  let wrong = correct;
  let attempts = 0;
  while (wrong === correct || wrong < 0) {
    const delta = pick(deltas);
    wrong = correct + delta;
    attempts++;
    if (attempts > 20) {
      wrong = correct + 1;
      break;
    }
  }
  return wrong;
}

function generateStatement(): Statement {
  const { a, b, op, correct } = generateOperands();
  const makeTrue = Math.random() < 0.5;
  const shownAnswer = makeTrue ? correct : spoilAnswer(correct);

  return {
    text: `${a} ${op} ${b} = ${shownAnswer}`,
    correctAnswer: correct,
    shownAnswer,
    isTrue: shownAnswer === correct,
  };
}

function generateRound(): Statement[] {
  return Array.from({ length: ROUND_LENGTH }, () => generateStatement());
}

type AnswerFeedback = 'correct' | 'wrong' | null;

export default function VernoIliNevernoMatematikaPage() {
  const [statements, setStatements] = useState<Statement[]>(() => generateRound());
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<AnswerFeedback>(null);
  const [finished, setFinished] = useState(false);

  const current = statements[index];

  function handleAnswer(userSaysTrue: boolean) {
    if (feedback !== null) return; // защита от двойного клика во время показа фидбека

    const isCorrect = userSaysTrue === current.isTrue;
    if (isCorrect) setScore((s) => s + 1);
    setFeedback(isCorrect ? 'correct' : 'wrong');

    setTimeout(() => {
      setFeedback(null);
      if (index + 1 >= ROUND_LENGTH) {
        setFinished(true);
      } else {
        setIndex((i) => i + 1);
      }
    }, 1400);
  }

  function playAgain() {
    setStatements(generateRound());
    setIndex(0);
    setScore(0);
    setFeedback(null);
    setFinished(false);
  }

  function praise(): string {
    if (score === ROUND_LENGTH) return '🏆 Идеально! Ты настоящий магистр математики!';
    if (score >= 8) return '🌟 Отличный результат!';
    if (score >= 5) return '👍 Хорошо, но можно ещё лучше!';
    return '💪 Тренируйся ещё — обязательно получится!';
  }

  return (
    <div className="min-h-screen">
      <div className="border-b border-white/15 px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">✅❌ Верно или неверно: математика</h1>
      </div>

      <TrainerGate type="trainer:verno-ili-neverno-matematika">
        <div className="max-w-2xl mx-auto py-8 px-6">
          {!finished ? (
            <div className="card bg-white text-center py-10">
              <div className="flex justify-between items-center mb-6 px-2">
                <span className="text-gray-500 text-sm">
                  Вопрос <span className="font-bold text-[#3a1c6e]">{index + 1}</span> из {ROUND_LENGTH}
                </span>
                <span className="text-gray-500 text-sm">
                  Счёт: <span className="font-bold text-orange">{score}</span>
                </span>
              </div>

              <p className="text-gray-500 mb-3">Это утверждение верное?</p>
              <p className="text-5xl font-black text-[#3a1c6e] mb-8 tabular-nums">{current.text}</p>

              {feedback === null ? (
                <div className="flex justify-center gap-4 flex-wrap">
                  <button
                    onClick={() => handleAnswer(true)}
                    className="px-10 py-6 rounded-2xl font-black text-2xl text-white bg-green-500 hover:bg-green-600 transition-colors shadow-md"
                  >
                    Верно ✅
                  </button>
                  <button
                    onClick={() => handleAnswer(false)}
                    className="px-10 py-6 rounded-2xl font-black text-2xl text-white bg-red-500 hover:bg-red-600 transition-colors shadow-md"
                  >
                    Неверно ❌
                  </button>
                </div>
              ) : (
                <div
                  className={`rounded-2xl py-6 px-4 font-bold text-xl ${
                    feedback === 'correct'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {feedback === 'correct' ? (
                    <p>🎉 Правильно!</p>
                  ) : current.isTrue ? (
                    <p>Неверно! Это утверждение на самом деле верное.</p>
                  ) : (
                    <p>
                      Неверно! {current.text.split('=')[0].trim()} = {current.correctAnswer}
                    </p>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="card bg-white text-center py-10">
              <p className="text-3xl font-black text-[#3a1c6e] mb-2">{praise()}</p>
              <p className="text-gray-600 mb-1">Правильных ответов</p>
              <p className="text-6xl font-black text-orange mb-8">
                {score} / {ROUND_LENGTH}
              </p>
              <div className="flex justify-center gap-3 flex-wrap mb-6">
                <button onClick={playAgain} className="btn-primary px-6 py-3">
                  🔁 Играть ещё раз
                </button>
              </div>
              <div className="pt-6 border-t border-gray-100">
                <ShareButtons
                  text={`Набрали ${score} из ${ROUND_LENGTH} в тренажёре «Верно или неверно: математика» на Знаторике — попробуйте тоже:`}
                  url="https://znatorica.ru/trenazher/verno-ili-neverno-matematika"
                  trackKey="verno-ili-neverno-matematika"
                />
              </div>
            </div>
          )}
        </div>
      </TrainerGate>
    </div>
  );
}
