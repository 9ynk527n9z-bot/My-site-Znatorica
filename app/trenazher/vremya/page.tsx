'use client';

import Link from 'next/link';
import { useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import ClockFace from '@/components/ClockFace';
import { praiseFor } from '@/lib/praise';

const ROUNDS_PER_SESSION = 10;

const ANSWER_STYLES = [
  'bg-purple-500 hover:bg-purple-600',
  'bg-sky-500 hover:bg-sky-600',
  'bg-amber-500 hover:bg-amber-600',
  'bg-pink-500 hover:bg-pink-600',
];

function randHour(exclude?: number): number {
  let h = Math.floor(Math.random() * 12) + 1;
  while (h === exclude) {
    h = Math.floor(Math.random() * 12) + 1;
  }
  return h;
}

function hourLabel(h: number): string {
  // Склонение слова "час" для целых часов 1-12
  if (h === 1) return '1 час';
  if (h >= 2 && h <= 4) return `${h} часа`;
  return `${h} часов`;
}

interface Round {
  hour: number;
  options: { hour: number; label: string }[];
}

function makeRound(): Round {
  const hour = randHour();
  const wrongSet = new Set<number>();
  while (wrongSet.size < 3) {
    const w = randHour(hour);
    if (!wrongSet.has(w)) wrongSet.add(w);
  }
  const optionHours = [hour, ...Array.from(wrongSet)];
  // Перемешиваем
  for (let i = optionHours.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [optionHours[i], optionHours[j]] = [optionHours[j], optionHours[i]];
  }
  return {
    hour,
    options: optionHours.map((h) => ({ hour: h, label: hourLabel(h) })),
  };
}

export default function VremyaTrainerPage() {
  const [started, setStarted] = useState(false);
  const [round, setRound] = useState(0);
  const [current, setCurrent] = useState<Round | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [pickedHour, setPickedHour] = useState<number | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [finished, setFinished] = useState(false);

  function begin() {
    setStarted(true);
    setFinished(false);
    setRound(1);
    setScore({ correct: 0, total: 0 });
    setCurrent(makeRound());
    setFeedback(null);
    setPickedHour(null);
  }

  function nextRound() {
    if (round >= ROUNDS_PER_SESSION) {
      setFinished(true);
      return;
    }
    setRound((r) => r + 1);
    setCurrent(makeRound());
    setFeedback(null);
    setPickedHour(null);
  }

  function handlePick(optHour: number) {
    if (feedback || !current) return;
    setPickedHour(optHour);
    const correct = optHour === current.hour;
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
        <h1 className="text-2xl font-bold mt-2">🕒 Время</h1>
      </div>

      <TrainerGate type="trainer:vremya">
        <div className="max-w-2xl mx-auto py-8 px-6">
          {!started && (
            <div className="card text-center">
              <p className="text-lg text-white/90 mb-6">
                Посмотри на часы и выбери, сколько времени они показывают. Всего 10 вопросов!
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

              <ClockFace hour={current.hour} />

              <p className="text-xl font-bold text-[#3a1c6e] my-6">Сколько времени показывают часы?</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {current.options.map((opt, idx) => {
                  const isPicked = pickedHour === opt.hour;
                  const isCorrectOpt = opt.hour === current.hour;
                  const showState = feedback && (isPicked || isCorrectOpt);
                  return (
                    <button
                      key={opt.hour}
                      onClick={() => handlePick(opt.hour)}
                      disabled={!!feedback}
                      className={`py-6 rounded-2xl font-black text-xl text-white border-4 transition-all ${
                        showState
                          ? isCorrectOpt
                            ? 'border-green-500 bg-green-500 pop-in'
                            : 'border-red-400 bg-red-400 shake'
                          : `border-transparent ${ANSWER_STYLES[idx % ANSWER_STYLES.length]} hover:scale-105`
                      }`}
                    >
                      {opt.label}
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
                    Правильно: {hourLabel(current.hour)} 👀
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
