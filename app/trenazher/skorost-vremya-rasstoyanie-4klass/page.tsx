'use client';

import Link from 'next/link';
import { useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import { pluralize } from '@/lib/pluralize';
import { praiseFor } from '@/lib/praise';

type QuestionType = 'distance' | 'speed' | 'time';

interface Mode {
  key: string;
  label: string;
  // Оба глагола — мужского рода (все подлежащие ниже мужского рода: пешеход, велосипедист, автомобиль, поезд).
  processVerb: string; // "шёл" / "ехал"
  doneVerb: string; // "прошёл" / "проехал"
  speeds: number[];
}

const MODES: Mode[] = [
  { key: 'pedestrian', label: 'Пешеход', processVerb: 'шёл', doneVerb: 'прошёл', speeds: [4, 5, 6] },
  { key: 'bike', label: 'Велосипедист', processVerb: 'ехал', doneVerb: 'проехал', speeds: [10, 12, 14, 15] },
  { key: 'car', label: 'Автомобиль', processVerb: 'ехал', doneVerb: 'проехал', speeds: [40, 50, 60, 70, 80, 90, 100] },
  { key: 'train', label: 'Поезд', processVerb: 'ехал', doneVerb: 'проехал', speeds: [60, 80, 90, 100, 120] },
];

const TIMES = [1, 2, 3, 4, 5, 6];

const QUESTION_ORDER: QuestionType[] = ['distance', 'speed', 'time'];

interface Round {
  mode: Mode;
  v: number;
  t: number;
  s: number;
  questionType: QuestionType;
  answer: number;
  options: number[];
  key: string;
}

function randItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function hoursLabel(t: number): string {
  return pluralize(t, ['час', 'часа', 'часов']);
}

function kmLabel(n: number): string {
  return pluralize(n, ['километр', 'километра', 'километров']);
}

function makeRound(roundIndex: number, usedKeys: Set<string>): Round {
  const questionType = QUESTION_ORDER[(roundIndex - 1) % 3];
  let mode: Mode;
  let v: number;
  let t: number;
  let key: string;
  let attempt = 0;

  do {
    mode = randItem(MODES);
    v = randItem(mode.speeds);
    t = randItem(TIMES);
    key = `${mode.key}-${v}-${t}-${questionType}`;
    attempt++;
  } while (usedKeys.has(key) && attempt < 50);

  usedKeys.add(key);
  const s = v * t; // всегда целое — числа подобраны так, чтобы деление в обе стороны было без остатка

  const candidates = new Set<number>();
  const tryAdd = (value: number, correctAnswer: number) => {
    if (value > 0 && value !== correctAnswer) candidates.add(value);
  };

  let answer: number;

  if (questionType === 'distance') {
    answer = s;
    tryAdd(v + t, answer); // типичная ошибка: сложили вместо умножения
    tryAdd(Math.abs(v - t), answer);
    tryAdd(v * (t + 1), answer);
    if (t > 1) tryAdd(v * (t - 1), answer);
    tryAdd(answer + v, answer);
    tryAdd(answer - v, answer);
    tryAdd(answer + 10, answer);
    tryAdd(answer - 10, answer);
    let extra = 1;
    while (candidates.size < 6) {
      tryAdd(answer + extra * 5, answer);
      tryAdd(answer - extra * 5, answer);
      extra++;
    }
  } else if (questionType === 'speed') {
    answer = v;
    tryAdd(s * t, answer); // типичная ошибка: умножили вместо деления
    tryAdd(t, answer);
    tryAdd(s, answer);
    tryAdd(answer + t, answer);
    tryAdd(Math.abs(answer - t), answer);
    tryAdd(answer + 5, answer);
    tryAdd(answer - 5, answer);
    tryAdd(answer + 10, answer);
    tryAdd(answer - 10, answer);
    let extra = 1;
    while (candidates.size < 6) {
      tryAdd(answer + extra * 3, answer);
      if (answer - extra * 3 > 0) tryAdd(answer - extra * 3, answer);
      extra++;
    }
  } else {
    answer = t;
    tryAdd(s * v, answer); // типичная ошибка: умножили вместо деления
    tryAdd(v, answer);
    tryAdd(s, answer);
    tryAdd(answer + 1, answer);
    if (answer > 1) tryAdd(answer - 1, answer);
    tryAdd(answer + 2, answer);
    if (answer > 2) tryAdd(answer - 2, answer);
    let extra = 3;
    while (candidates.size < 6) {
      tryAdd(answer + extra, answer);
      extra++;
    }
  }

  const wrongPool = shuffle(Array.from(candidates));
  const wrongOptions = wrongPool.slice(0, 3);
  const options = shuffle([answer, ...wrongOptions]);

  return { mode, v, t, s, questionType, answer, options, key };
}

const ROUNDS_PER_SESSION = 10;

function buildPrompt(round: Round): string {
  const { mode, v, t, s, questionType } = round;
  if (questionType === 'distance') {
    return `${mode.label} ${mode.processVerb} со скоростью ${v} км/ч в течение ${t} ${hoursLabel(t)}. Сколько километров он ${mode.doneVerb}?`;
  }
  if (questionType === 'speed') {
    return `${mode.label} ${mode.doneVerb} ${s} ${kmLabel(s)} за ${t} ${hoursLabel(t)}. С какой скоростью он ${mode.processVerb}?`;
  }
  return `${mode.label} ${mode.doneVerb} ${s} ${kmLabel(s)} со скоростью ${v} км/ч. Сколько времени он был в пути?`;
}

function answerUnit(questionType: QuestionType): string {
  if (questionType === 'distance') return 'км';
  if (questionType === 'speed') return 'км/ч';
  return 'ч';
}

export default function SkorostVremyaRasstoyanie4klassTrainerPage() {
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
    setCurrent(makeRound(1, keys));
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
    setCurrent(makeRound(nextIndex, usedKeys));
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

  const unit = current ? answerUnit(current.questionType) : '';

  return (
    <div className="min-h-screen">
      <div className="border-b border-white/15 px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">🚗 Задачи на движение</h1>
      </div>

      <TrainerGate type="trainer:skorost-vremya-rasstoyanie-4klass">
        <div className="max-w-2xl mx-auto py-8 px-6">
          {!started && (
            <div className="card mb-8 text-center">
              <p className="text-lg text-white/90 mb-4">
                Найди расстояние, скорость или время по формуле S = v × t. Вопросы чередуются — читай внимательно!
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
                    background: 'linear-gradient(90deg, #9333ea, #f59e0b)',
                  }}
                />
              </div>

              <p className="text-2xl font-black text-[#3a1c6e] mt-4 mb-8">{buildPrompt(current)}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {current.options.map((opt, idx) => {
                  const isPicked = pickedValue === opt;
                  const isCorrectOpt = opt === current.answer;
                  const showState = feedback && (isPicked || isCorrectOpt);
                  const palette = [
                    'border-purple-600 bg-purple-500 text-white',
                    'border-amber-600 bg-amber-500 text-white',
                    'border-sky-600 bg-sky-500 text-white',
                    'border-pink-600 bg-pink-500 text-white',
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
                      <span className="text-3xl">
                        {opt} {unit}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="h-8">
                {feedback === 'correct' && <p className="text-green-600 font-black text-xl pop-in">✅ Верно!</p>}
                {feedback === 'wrong' && (
                  <p className="text-red-500 font-black text-xl">
                    Правильный ответ: {current.answer} {unit} 👀
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
