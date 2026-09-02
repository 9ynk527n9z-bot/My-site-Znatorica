'use client';

import Link from 'next/link';
import { useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import ShapeSvg from '@/components/ShapeSvg';
import { SHAPES, COLORS, randItem, type ShapeKind } from '@/lib/shapes';
import { praiseFor } from '@/lib/praise';

type Mode = 'size' | 'length' | 'count';

const MODES: { value: Mode; label: string; question: string }[] = [
  { value: 'size', label: 'больше', question: 'Какая фигура БОЛЬШЕ?' },
  { value: 'length', label: 'длиннее', question: 'Какая полоска ДЛИННЕЕ?' },
  { value: 'count', label: 'количество', question: 'Где предметов БОЛЬШЕ?' },
];

const COUNT_EMOJI = ['🍎', '⭐', '🎈', '🍓', '🐝', '🌸', '🚗', '⚽', '🍌', '🧸'];

interface SizeRound {
  kind: 'size';
  shape: ShapeKind;
  color: string;
  leftSize: number;
  rightSize: number;
  correctSide: 'left' | 'right';
}

interface LengthRound {
  kind: 'length';
  color: string;
  leftLen: number;
  rightLen: number;
  correctSide: 'left' | 'right';
}

interface CountRound {
  kind: 'count';
  emoji: string;
  leftCount: number;
  rightCount: number;
  correctSide: 'left' | 'right';
}

type Round = SizeRound | LengthRound | CountRound;

function makeRound(mode: Mode): Round {
  if (mode === 'size') {
    const shape = randItem(SHAPES);
    const color = randItem(COLORS);
    // Два отчётливо разных размера
    const small = 44 + Math.floor(Math.random() * 20); // 44-64
    const large = 110 + Math.floor(Math.random() * 30); // 110-140
    const leftIsLarge = Math.random() < 0.5;
    return {
      kind: 'size',
      shape,
      color,
      leftSize: leftIsLarge ? large : small,
      rightSize: leftIsLarge ? small : large,
      correctSide: leftIsLarge ? 'left' : 'right',
    };
  }
  if (mode === 'length') {
    const color = randItem(COLORS);
    const shortLen = 60 + Math.floor(Math.random() * 30); // 60-90
    const longLen = 200 + Math.floor(Math.random() * 60); // 200-260
    const leftIsLong = Math.random() < 0.5;
    return {
      kind: 'length',
      color,
      leftLen: leftIsLong ? longLen : shortLen,
      rightLen: leftIsLong ? shortLen : longLen,
      correctSide: leftIsLong ? 'left' : 'right',
    };
  }
  const emoji = randItem(COUNT_EMOJI);
  const a = 2 + Math.floor(Math.random() * 3); // 2-4
  let b = 2 + Math.floor(Math.random() * 3);
  while (b === a) b = 2 + Math.floor(Math.random() * 3);
  const leftIsMore = a > b ? Math.random() < 0.7 : Math.random() < 0.3;
  const more = Math.max(a, b);
  const less = Math.min(a, b);
  return {
    kind: 'count',
    emoji,
    leftCount: leftIsMore ? more : less,
    rightCount: leftIsMore ? less : more,
    correctSide: leftIsMore ? 'left' : 'right',
  };
}

const ROUNDS_PER_SESSION = 10;

export default function SravneniePredmetovTrainerPage() {
  const [started, setStarted] = useState(false);
  const [round, setRound] = useState(0);
  const [current, setCurrent] = useState<Round | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [pickedSide, setPickedSide] = useState<'left' | 'right' | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [finished, setFinished] = useState(false);

  function begin() {
    setStarted(true);
    setFinished(false);
    setRound(1);
    setScore({ correct: 0, total: 0 });
    setCurrent(makeRound(randItem(MODES.map((m) => m.value))));
    setFeedback(null);
    setPickedSide(null);
  }

  function nextRound() {
    if (round >= ROUNDS_PER_SESSION) {
      setFinished(true);
      return;
    }
    setRound((r) => r + 1);
    setCurrent(makeRound(randItem(MODES.map((m) => m.value))));
    setFeedback(null);
    setPickedSide(null);
  }

  function handlePick(side: 'left' | 'right') {
    if (feedback || !current) return;
    setPickedSide(side);
    const correct = side === current.correctSide;
    setFeedback(correct ? 'correct' : 'wrong');
    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    setTimeout(nextRound, correct ? 900 : 1400);
  }

  const question = current ? MODES.find((m) => m.value === current.kind)!.question : '';

  return (
    <div className="min-h-screen">
      <div className="border-b border-white/15 px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">📏 Сравнение предметов</h1>
      </div>

      <TrainerGate type="trainer:sravnenie-predmetov">
        <div className="max-w-2xl mx-auto py-8 px-6">
          {!started && (
            <div className="card bg-white text-center py-10">
              <p className="text-3xl mb-4">📏🔺🍎</p>
              <p className="text-xl font-bold text-[#3a1c6e] mb-2">Сравнение предметов</p>
              <p className="text-gray-600 mb-8">
                Смотри на две картинки и выбирай: что больше, что длиннее, а чего больше по счёту!
              </p>
              <button onClick={begin} className="btn-primary px-8 py-4 text-lg">
                ▶️ Начать игру
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

              <p className="text-2xl font-black text-[#3a1c6e] mb-8">{question}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {(['left', 'right'] as const).map((side) => {
                  const isPicked = pickedSide === side;
                  const isCorrectSide = current.correctSide === side;
                  const showState = feedback && (isPicked || isCorrectSide);
                  return (
                    <button
                      key={side}
                      onClick={() => handlePick(side)}
                      disabled={!!feedback}
                      className={`flex flex-col items-center justify-center gap-3 rounded-2xl border-4 p-4 min-h-[220px] transition-all ${
                        showState
                          ? isCorrectSide
                            ? 'border-green-500 bg-green-50 pop-in'
                            : 'border-red-400 bg-red-50 shake'
                          : 'border-gray-200 bg-gray-50 hover:border-orange hover:scale-105'
                      }`}
                    >
                      {current.kind === 'size' && (
                        <ShapeSvg
                          kind={current.shape}
                          color={current.color}
                          size={side === 'left' ? current.leftSize : current.rightSize}
                        />
                      )}
                      {current.kind === 'length' && (
                        <div
                          className="rounded-full"
                          style={{
                            width: side === 'left' ? current.leftLen : current.rightLen,
                            height: 28,
                            maxWidth: '100%',
                            background: current.color,
                          }}
                        />
                      )}
                      {current.kind === 'count' && (
                        <div className="flex flex-wrap justify-center gap-1 max-w-[180px]">
                          {Array.from({
                            length: side === 'left' ? current.leftCount : current.rightCount,
                          }).map((_, i) => (
                            <span key={i} className="text-4xl leading-none">
                              {current.emoji}
                            </span>
                          ))}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="h-8">
                {feedback === 'correct' && (
                  <p className="text-green-600 font-black text-xl pop-in">✅ Верно!</p>
                )}
                {feedback === 'wrong' && (
                  <p className="text-red-500 font-black text-xl">Смотри внимательнее! 👀</p>
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
