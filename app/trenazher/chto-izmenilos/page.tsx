'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import ShapeSvg from '@/components/ShapeSvg';
import { SHAPES, COLORS, SIZES, shuffle, randItem, type ShapeKind } from '@/lib/shapes';

const ITEMS_COUNT = 5;
const ROUNDS_PER_SESSION = 10;
const MEMORIZE_SECONDS = 4;

interface Item {
  id: number;
  shape: ShapeKind;
  color: string;
  size: number;
}

type Phase = 'memorize' | 'answer' | 'result';

function makeItems(): Item[] {
  const shapes = shuffle(SHAPES).slice(0, ITEMS_COUNT);
  return shapes.map((shape, i) => ({
    id: i,
    shape,
    color: randItem(COLORS),
    size: randItem(SIZES),
  }));
}

// Меняем ровно один признак у одного случайного элемента — форму, цвет или размер.
function makeChanged(items: Item[]): { items: Item[]; changedId: number } {
  const idx = Math.floor(Math.random() * items.length);
  const target = items[idx];
  const attr = randItem(['shape', 'color', 'size'] as const);

  const changed: Item = { ...target };
  if (attr === 'shape') changed.shape = randItem(SHAPES, target.shape);
  if (attr === 'color') changed.color = randItem(COLORS, target.color);
  if (attr === 'size') changed.size = randItem(SIZES.filter((s) => s !== target.size));

  const next = items.map((it, i) => (i === idx ? changed : it));
  return { items: next, changedId: target.id };
}

export default function ChtoIzmenilosTrainerPage() {
  const [started, setStarted] = useState(false);
  const [round, setRound] = useState(0);
  const [original, setOriginal] = useState<Item[]>([]);
  const [current, setCurrent] = useState<Item[]>([]);
  const [changedId, setChangedId] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>('memorize');
  const [timer, setTimer] = useState(MEMORIZE_SECONDS);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [pickedId, setPickedId] = useState<number | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [finished, setFinished] = useState(false);

  function setupRound() {
    const items = makeItems();
    const { items: changed, changedId: cId } = makeChanged(items);
    setOriginal(items);
    setCurrent(changed);
    setChangedId(cId);
    setPhase('memorize');
    setTimer(MEMORIZE_SECONDS);
    setFeedback(null);
    setPickedId(null);
  }

  function begin() {
    setStarted(true);
    setFinished(false);
    setRound(1);
    setScore({ correct: 0, total: 0 });
    setupRound();
  }

  // Обратный отсчёт запоминания
  useEffect(() => {
    if (!started || phase !== 'memorize') return;
    if (timer <= 0) {
      setPhase('answer');
      return;
    }
    const t = setTimeout(() => setTimer((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [started, phase, timer]);

  function nextRound() {
    if (round >= ROUNDS_PER_SESSION) {
      setFinished(true);
      return;
    }
    setRound((r) => r + 1);
    setupRound();
  }

  function handlePick(item: Item) {
    if (phase !== 'answer' || feedback) return;
    setPickedId(item.id);
    const correct = item.id === changedId;
    setFeedback(correct ? 'correct' : 'wrong');
    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    setTimeout(nextRound, correct ? 900 : 1400);
  }

  const showItems = phase === 'memorize' ? original : current;

  return (
    <div className="min-h-screen">
      <div className="border-b border-white/15 px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">👀 Что изменилось?</h1>
      </div>

      <TrainerGate type="trainer:chto-izmenilos">
      <div className="max-w-2xl mx-auto py-8 px-6">
        {!started && (
          <div className="card text-center">
            <p className="text-white/80 mb-6">
              Запомни фигуры, а потом найди — какая из них изменилась (форма, цвет или размер).
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
                Верно: <span className="text-green-600 font-bold">{score.correct}</span> / {score.total}
              </span>
            </div>

            {phase === 'memorize' ? (
              <p className="text-xl font-bold text-[#3a1c6e] mb-4">
                Запоминай! ⏱️ {timer}
              </p>
            ) : (
              <p className="text-xl font-bold text-[#3a1c6e] mb-4">Что изменилось?</p>
            )}

            <div className="flex flex-wrap justify-center gap-4 min-h-[140px] items-center">
              {showItems.map((item) => {
                const isPicked = pickedId === item.id;
                const showState = feedback && (isPicked || item.id === changedId);
                return (
                  <button
                    key={item.id}
                    onClick={() => handlePick(item)}
                    disabled={phase !== 'answer' || !!feedback}
                    className={`p-3 rounded-2xl border-4 transition-all ${
                      showState
                        ? item.id === changedId
                          ? 'border-green-500 bg-green-50 pop-in'
                          : 'border-red-400 bg-red-50 shake'
                        : phase === 'answer'
                        ? 'border-gray-200 bg-gray-50 hover:border-orange hover:scale-105'
                        : 'border-transparent'
                    }`}
                  >
                    <ShapeSvg kind={item.shape} color={item.color} size={item.size} />
                  </button>
                );
              })}
            </div>

            <div className="h-8 mt-4">
              {feedback === 'correct' && <p className="text-green-600 font-black text-xl pop-in">✅ Верно!</p>}
              {feedback === 'wrong' && <p className="text-red-500 font-black text-xl">Вот эта — другая! 👀</p>}
            </div>
          </div>
        )}

        {finished && (
          <div className="card bg-white text-center py-10">
            <p className="text-3xl font-black text-[#3a1c6e] mb-2">🎉 Молодец!</p>
            <p className="text-gray-600 mb-1">Правильных ответов:</p>
            <p className="text-6xl font-black text-orange mb-6">{score.correct}</p>
            <p className="text-gray-500 mb-8">из {score.total}</p>
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
