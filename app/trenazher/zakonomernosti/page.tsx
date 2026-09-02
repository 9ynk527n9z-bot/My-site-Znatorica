'use client';

import Link from 'next/link';
import { useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import { praiseFor } from '@/lib/praise';

// Тематические наборы эмодзи — из каждого набора берём случайные элементы для паттерна
const EMOJI_SETS: string[][] = [
  ['🍎', '🍌', '🍇', '🍊', '🍓', '🍐'], // фрукты
  ['🐶', '🐱', '🐰', '🦊', '🐻', '🐸'], // животные
  ['🔴', '🔵', '🟡', '🟢', '🟣', '🟠'], // круги-цвета
  ['⭐', '🌙', '☀️', '☁️', '🌈', '⚡'], // небо и погода
  ['🚗', '🚕', '🚌', '🚓', '🚜', '🚒'], // транспорт
  ['🌸', '🌻', '🌷', '🌹', '🍀', '🌵'], // растения
  ['⚽', '🏀', '🎾', '🏐', '🎱', '🏈'], // мячи
  ['🔺', '🟦', '🟨', '🟩', '💜', '🧡'], // фигуры
];

// Типы паттернов: последовательность индексов (0=A, 1=B, 2=C)
const PATTERN_TYPES: number[][] = [
  [0, 1, 0, 1, 0, 1], // ABAB
  [0, 0, 1, 1, 0, 0], // AABB
  [0, 1, 2, 0, 1, 2], // ABC
  [0, 1, 1, 0, 0, 1], // ABBA
];

interface Round {
  sequence: string[]; // видимая часть ряда (без последнего)
  answer: string; // правильный следующий элемент
  options: string[]; // варианты ответа (перемешаны)
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Числовые закономерности (2, 4, 6, 8, ❓ → 10) — как в теории этой темы, не только
// эмодзи-паттерны. Шаг всегда одного знака и не нулевой, числа остаются в пределах 1..50.
function makeNumericRound(): Round {
  const step = [1, 2, 3, 5][Math.floor(Math.random() * 4)] * (Math.random() < 0.5 ? 1 : -1);
  const start = step > 0 ? 1 + Math.floor(Math.random() * 10) : 30 + Math.floor(Math.random() * 15);
  const full = [0, 1, 2, 3, 4].map((i) => start + step * i);
  const answer = String(full[full.length - 1]);
  const sequence = full.slice(0, -1).map(String);

  const wrongCandidates = new Set<number>([
    full[full.length - 1] + step, // ещё один шаг вперёд — частая ошибка
    full[full.length - 1] - step, // предыдущее число ряда
    full[full.length - 1] + (step > 0 ? 1 : -1), // близко, но не в ряду
  ]);
  const wrongs = shuffle([...wrongCandidates].filter((n) => n !== full[full.length - 1]).map(String)).slice(0, 3);

  return { sequence, answer, options: shuffle([answer, ...wrongs]) };
}

function makeRound(prevAnswer: string | null): Round {
  if (Math.random() < 0.3) {
    const numeric = makeNumericRound();
    if (!prevAnswer || numeric.answer !== prevAnswer) return numeric;
  }
  const set = shuffle(EMOJI_SETS[Math.floor(Math.random() * EMOJI_SETS.length)]);
  const pattern = PATTERN_TYPES[Math.floor(Math.random() * PATTERN_TYPES.length)];

  // A, B, C — случайные разные эмодзи из набора
  const symbols = [set[0], set[1], set[2]];
  const full = pattern.map((i) => symbols[i]);

  const answer = full[full.length - 1];
  // Если ответ совпал с прошлым раундом — попробуем ещё раз (чтобы не скучно)
  if (prevAnswer && answer === prevAnswer && Math.random() < 0.7) {
    return makeRound(null);
  }

  const sequence = full.slice(0, -1);

  // Варианты: правильный + 2-3 неправильных из того же набора
  const usedSymbols = new Set(pattern.map((i) => symbols[i]));
  const wrongPool = set.filter((e) => e !== answer);
  // Сначала берём эмодзи, которые уже есть в ряду (сложнее), потом остальные
  const inRow = wrongPool.filter((e) => usedSymbols.has(e));
  const outRow = wrongPool.filter((e) => !usedSymbols.has(e));
  const wrongs = [...inRow, ...shuffle(outRow)].slice(0, 3);

  return { sequence, answer, options: shuffle([answer, ...wrongs]) };
}

const ROUNDS_PER_SESSION = 10;

export default function ZakonomernostiTrainerPage() {
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
    setCurrent(makeRound(null));
    setFeedback(null);
    setPicked(null);
  }

  function nextRound() {
    if (round >= ROUNDS_PER_SESSION) {
      setFinished(true);
      return;
    }
    setRound((r) => r + 1);
    setCurrent((c) => makeRound(c?.answer ?? null));
    setFeedback(null);
    setPicked(null);
  }

  function handlePick(option: string) {
    if (feedback || !current) return;
    setPicked(option);
    const correct = option === current.answer;
    setFeedback(correct ? 'correct' : 'wrong');
    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    setTimeout(nextRound, correct ? 1000 : 1600);
  }

  return (
    <div className="min-h-screen">
      <div className="border-b border-white/15 px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">🔮 Закономерности: продолжи ряд</h1>
      </div>

      <TrainerGate type="trainer:zakonomernosti">
      <div className="max-w-2xl mx-auto py-8 px-6">
        {/* Старт */}
        {!started && (
          <div className="card bg-white text-center py-10">
            <p className="text-6xl mb-4">🍎🍌🍎🍌❓</p>
            <p className="text-2xl font-black text-[#3a1c6e] mb-3">Что будет дальше?</p>
            <p className="text-gray-600 mb-8 text-lg">
              Посмотри на ряд, найди повторение и выбери, какая картинка идёт следующей!
            </p>
            <button onClick={begin} className="btn-primary px-10 py-4 text-xl">
              🚀 Играть!
            </button>
          </div>
        )}

        {/* Игровое поле */}
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

            <p className="text-xl font-bold text-[#3a1c6e] mb-6">Продолжи ряд — что дальше?</p>

            {/* Ряд с пропуском */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
              {current.sequence.map((emoji, i) => (
                <span
                  key={i}
                  className="text-5xl sm:text-6xl w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-2xl bg-orange-50 border-2 border-orange-200"
                >
                  {emoji}
                </span>
              ))}
              <span
                className={`text-5xl sm:text-6xl w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-2xl border-4 border-dashed transition-all ${
                  feedback === 'correct'
                    ? 'bg-green-50 border-green-500 pop-in'
                    : 'bg-gray-100 border-gray-300'
                }`}
              >
                {feedback === 'correct' ? current.answer : '❓'}
              </span>
            </div>

            {/* Варианты ответа */}
            <div className={`grid gap-4 mb-6 ${current.options.length === 4 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-3'}`}>
              {current.options.map((option, i) => {
                const isPicked = picked === option;
                const isAnswer = option === current.answer;
                const showState = feedback && (isPicked || isAnswer);
                return (
                  <button
                    key={`${option}-${i}`}
                    onClick={() => handlePick(option)}
                    disabled={!!feedback}
                    className={`text-5xl py-6 rounded-2xl border-4 transition-all ${
                      showState
                        ? isAnswer
                          ? 'border-green-500 bg-green-50 pop-in'
                          : 'border-red-400 bg-red-50 shake'
                        : 'border-gray-200 bg-gray-50 hover:border-orange hover:scale-105'
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            <div className="h-8">
              {feedback === 'correct' && (
                <p className="text-green-600 font-black text-xl pop-in">✅ Верно!</p>
              )}
              {feedback === 'wrong' && (
                <p className="text-red-500 font-black text-xl">Смотри, что повторяется в ряду! 👀</p>
              )}
            </div>
          </div>
        )}

        {/* Итог */}
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
