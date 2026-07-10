'use client';

import Link from 'next/link';
import { useState } from 'react';
import TrackPageView from '@/components/TrackPageView';
import ShapeSvg from '@/components/ShapeSvg';
import { trackUsage } from '@/lib/track';
import { SHAPES, COLORS, randItem, shuffle, type ShapeKind } from '@/lib/shapes';

const SHAPE_NAMES: Record<ShapeKind, string> = {
  circle: 'Circle',
  square: 'Square',
  triangle: 'Triangle',
  star: 'Star',
  heart: 'Heart',
};

const ROUNDS_PER_SESSION = 10;

interface Round {
  shape: ShapeKind;
  color: string;
  options: ShapeKind[];
}

function makeRound(): Round {
  const shape = randItem(SHAPES);
  const distractors = shuffle(SHAPES.filter((s) => s !== shape)).slice(0, 2);
  return { shape, color: randItem(COLORS), options: shuffle([shape, ...distractors]) };
}

export default function EnglishShapesTrainerPage() {
  const [started, setStarted] = useState(false);
  const [round, setRound] = useState(0);
  const [current, setCurrent] = useState<Round | null>(null);
  const [pickedShape, setPickedShape] = useState<ShapeKind | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [finished, setFinished] = useState(false);

  function begin() {
    setStarted(true);
    setFinished(false);
    setRound(1);
    setScore({ correct: 0, total: 0 });
    setCurrent(makeRound());
    setPickedShape(null);
    setFeedback(null);
    trackUsage('trainer:english-shapes');
  }

  function nextRound() {
    if (round >= ROUNDS_PER_SESSION) {
      setFinished(true);
      return;
    }
    setRound((r) => r + 1);
    setCurrent(makeRound());
    setPickedShape(null);
    setFeedback(null);
  }

  function handlePick(option: ShapeKind) {
    if (feedback || !current) return;
    setPickedShape(option);
    const correct = option === current.shape;
    setFeedback(correct ? 'correct' : 'wrong');
    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    setTimeout(nextRound, correct ? 900 : 1400);
  }

  return (
    <div className="min-h-screen">
      <TrackPageView type="trainer:english-shapes" />

      <div className="border-b border-white/15 px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">🇬🇧 Формы на английском</h1>
      </div>

      <div className="max-w-2xl mx-auto py-8 px-6">
        {!started && (
          <div className="card text-center">
            <p className="text-white/80 mb-6">
              Смотри на фигуру и выбирай правильное название на английском: Circle, Square, Triangle, Star, Heart.
            </p>
            <button onClick={begin} className="btn-primary px-8 py-3">
              ▶️ Начать игру
            </button>
          </div>
        )}

        {started && !finished && current && (
          <div className="card bg-white text-center">
            <div className="flex justify-between items-center mb-6 text-sm text-gray-600">
              <span>
                Раунд {round} из {ROUNDS_PER_SESSION}
              </span>
              <span>
                Верно: <span className="text-green-600 font-bold">{score.correct}</span> / {score.total}
              </span>
            </div>

            <p className="text-xl font-bold text-[#3a1c6e] mb-6">What shape is this?</p>

            <div className="flex justify-center mb-8">
              <ShapeSvg kind={current.shape} color={current.color} size={120} />
            </div>

            <div className="grid grid-cols-3 gap-3">
              {current.options.map((opt) => {
                const isPicked = pickedShape === opt;
                const showState = feedback && (isPicked || opt === current.shape);
                return (
                  <button
                    key={opt}
                    onClick={() => handlePick(opt)}
                    disabled={!!feedback}
                    className={`py-4 rounded-xl font-black text-base transition-all border-4 ${
                      showState
                        ? opt === current.shape
                          ? 'border-green-500 bg-green-50 text-green-700 pop-in'
                          : 'border-red-400 bg-red-50 text-red-500 shake'
                        : 'border-transparent text-white hover:scale-105'
                    }`}
                    style={
                      !showState
                        ? { background: 'linear-gradient(135deg, #7C3AED, #f72585)' }
                        : undefined
                    }
                  >
                    {SHAPE_NAMES[opt]}
                  </button>
                );
              })}
            </div>

            <div className="h-8 mt-4">
              {feedback === 'correct' && <p className="text-green-600 font-black text-xl pop-in">✅ Correct!</p>}
              {feedback === 'wrong' && (
                <p className="text-red-500 font-black text-xl">Это {SHAPE_NAMES[current.shape]} 👀</p>
              )}
            </div>
          </div>
        )}

        {finished && (
          <div className="card bg-white text-center py-10">
            <p className="text-3xl font-black text-[#3a1c6e] mb-2">🎉 Well done!</p>
            <p className="text-gray-600 mb-1">Правильных ответов:</p>
            <p className="text-6xl font-black text-orange mb-6">{score.correct}</p>
            <p className="text-gray-500 mb-8">из {score.total}</p>
            <button onClick={begin} className="btn-primary px-6 py-3">
              🔁 Играть ещё
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
