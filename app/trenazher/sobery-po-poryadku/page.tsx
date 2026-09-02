'use client';

import Link from 'next/link';
import { useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import ShapeSvg from '@/components/ShapeSvg';
import { SHAPES, COLORS, ORDER_SIZES, shuffle, randItem, type ShapeKind } from '@/lib/shapes';
import { praiseFor } from '@/lib/praise';

const ROUNDS_PER_SESSION = 8;

type Direction = 'asc' | 'desc'; // от маленького к большому / от большого к маленькому

interface Item {
  id: number;
  size: number;
  done: boolean;
}

function makeRound(): { items: Item[]; shape: ShapeKind; color: string; direction: Direction } {
  const items: Item[] = shuffle(ORDER_SIZES).map((size, id) => ({ id, size, done: false }));
  const direction: Direction = Math.random() < 0.5 ? 'asc' : 'desc';
  return { items, shape: randItem(SHAPES), color: randItem(COLORS), direction };
}

export default function SoberyPoPoryadkuTrainerPage() {
  const [started, setStarted] = useState(false);
  const [round, setRound] = useState(0);
  const [items, setItems] = useState<Item[]>([]);
  const [shape, setShape] = useState<ShapeKind>('circle');
  const [color, setColor] = useState('#4DABF7');
  const [direction, setDirection] = useState<Direction>('asc');
  const [nextIndex, setNextIndex] = useState(0); // сколько по порядку уже правильно собрано
  const [wrongId, setWrongId] = useState<number | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [finished, setFinished] = useState(false);

  function setupRound() {
    const r = makeRound();
    setItems(r.items);
    setShape(r.shape);
    setColor(r.color);
    setDirection(r.direction);
    setNextIndex(0);
    setWrongId(null);
  }

  function begin() {
    setStarted(true);
    setFinished(false);
    setRound(1);
    setScore({ correct: 0, total: 0 });
    setupRound();
  }

  // Порядок, в котором элементы должны быть собраны (по возрастанию/убыванию размера)
  const orderedIds = [...items]
    .sort((a, b) => (direction === 'asc' ? a.size - b.size : b.size - a.size))
    .map((it) => it.id);

  function nextRound() {
    if (round >= ROUNDS_PER_SESSION) {
      setFinished(true);
      return;
    }
    setRound((r) => r + 1);
    setupRound();
  }

  function handlePick(item: Item) {
    if (item.done || wrongId !== null) return;
    const expectedId = orderedIds[nextIndex];

    if (item.id === expectedId) {
      const isLast = nextIndex + 1 === items.length;
      setItems((prev) => prev.map((it) => (it.id === item.id ? { ...it, done: true } : it)));
      setNextIndex((i) => i + 1);
      if (isLast) {
        setScore((s) => ({ correct: s.correct + 1, total: s.total + 1 }));
        setTimeout(nextRound, 900);
      }
    } else {
      setWrongId(item.id);
      setScore((s) => ({ correct: s.correct, total: s.total + 1 }));
      setTimeout(() => setWrongId(null), 700);
    }
  }

  return (
    <div className="min-h-screen">
      <div className="border-b border-white/15 px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">📏 Собери по порядку</h1>
      </div>

      <TrainerGate type="trainer:sobery-po-poryadku">
      <div className="max-w-2xl mx-auto py-8 px-6">
        {!started && (
          <div className="card text-center">
            <p className="text-white/80 mb-6">
              Нажимай на фигуры по порядку — от самой маленькой до самой большой (или наоборот).
            </p>
            <button onClick={begin} className="btn-primary px-8 py-3">
              ▶️ Начать игру
            </button>
          </div>
        )}

        {started && !finished && (
          <div className="card bg-white text-center">
            <div className="flex justify-between items-center mb-2 text-sm text-gray-600">
              <span>
                Раунд {round} из {ROUNDS_PER_SESSION}
              </span>
              <span>
                Собрано раундов: <span className="text-green-600 font-bold">{score.correct}</span>
              </span>
            </div>

            <p className="text-xl font-bold text-[#3a1c6e] mb-6">
              {direction === 'asc' ? 'От самой маленькой к самой большой' : 'От самой большой к самой маленькой'}
            </p>

            <div className="flex flex-wrap justify-end items-end gap-3 min-h-[160px]">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handlePick(item)}
                  disabled={item.done}
                  className={`p-2 rounded-xl border-4 transition-all ${
                    item.done
                      ? 'border-green-500 bg-green-50 pop-in'
                      : wrongId === item.id
                      ? 'border-red-400 bg-red-50 shake'
                      : 'border-gray-200 bg-gray-50 hover:border-orange hover:scale-105'
                  }`}
                >
                  <ShapeSvg kind={shape} color={color} size={item.size} />
                </button>
              ))}
            </div>
          </div>
        )}

        {finished && (
          <div className="card bg-white text-center py-10">
            <p className="text-3xl font-black text-[#3a1c6e] mb-2">{praiseFor(score.correct, ROUNDS_PER_SESSION).title}</p>
            <p className="text-gray-600 mb-1">Собрано раундов правильно:</p>
            <p className="text-6xl font-black text-orange mb-6">{score.correct}</p>
            <p className="text-gray-500 mb-8">из {ROUNDS_PER_SESSION}</p>
            <button onClick={begin} className="btn-primary px-6 py-3">
              🔁 Играть ещё
            </button>
          </div>
        )}
      </div>
      </TrainerGate>
    </div>
  );
}
