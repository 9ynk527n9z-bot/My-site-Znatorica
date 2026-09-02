'use client';

import Link from 'next/link';
import { useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import ShapeSvg from '@/components/ShapeSvg';
import GameShareBadge from '@/components/GameShareBadge';
import { SHAPES, COLORS, SIZES, randItem, type ShapeKind } from '@/lib/shapes';
import ShareButtons from '@/components/ShareButtons';
import { praiseFor, shareTextFor } from '@/lib/praise';

type Mode = 'shape' | 'color' | 'size' | 'category';

const MODES: { value: Mode; label: string; hint: string }[] = [
  { value: 'shape', label: '🔺 По форме', hint: 'Три фигуры одной формы, одна — другой' },
  { value: 'color', label: '🎨 По цвету', hint: 'Три фигуры одного цвета, одна — другого' },
  { value: 'size', label: '📏 По размеру', hint: 'Три фигуры одного размера, одна — другого' },
  { value: 'category', label: '🍎 По смыслу', hint: 'Три предмета одной группы, один — из другой' },
];

// Группы для режима "по смыслу" — как в теории (фрукты/транспорт/небо), а не форма/цвет.
const CATEGORY_GROUPS: string[][] = [
  ['🍎', '🍌', '🍊', '🍇', '🍓'],
  ['🚗', '🚌', '🚲', '🚂', '🚁'],
  ['☀️', '⭐', '🌙', '☁️', '🌈'],
  ['🐶', '🐱', '🐰', '🐻', '🦁'],
  ['🍕', '🍔', '🍟', '🌭', '🍩'],
  ['👕', '👗', '🧦', '👖', '🧢'],
];

interface Item {
  id: number;
  shape: ShapeKind;
  color: string;
  size: number;
  emoji?: string;
  odd: boolean;
}

function pickCategoryItems(): { emoji: string; odd: boolean }[] {
  const groupIndex = Math.floor(Math.random() * CATEGORY_GROUPS.length);
  let oddGroupIndex = Math.floor(Math.random() * CATEGORY_GROUPS.length);
  while (oddGroupIndex === groupIndex) {
    oddGroupIndex = Math.floor(Math.random() * CATEGORY_GROUPS.length);
  }
  const group = [...CATEGORY_GROUPS[groupIndex]];
  const same: string[] = [];
  while (same.length < 3) {
    const idx = Math.floor(Math.random() * group.length);
    same.push(group.splice(idx, 1)[0]);
  }
  const oddGroup = CATEGORY_GROUPS[oddGroupIndex];
  const odd = oddGroup[Math.floor(Math.random() * oddGroup.length)];
  return [...same.map((emoji) => ({ emoji, odd: false })), { emoji: odd, odd: true }];
}

function makeRound(mode: Mode): Item[] {
  if (mode === 'category') {
    const picked = pickCategoryItems();
    const items: Item[] = picked.map((p, i) => ({
      id: i,
      shape: 'circle' as ShapeKind,
      color: '',
      size: 1,
      emoji: p.emoji,
      odd: p.odd,
    }));
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items;
  }

  const baseShape = randItem(SHAPES);
  const baseColor = randItem(COLORS);
  const baseSize = randItem(SIZES);

  const oddShape = mode === 'shape' ? randItem(SHAPES, baseShape) : baseShape;
  const oddColor = mode === 'color' ? randItem(COLORS, baseColor) : baseColor;
  const oddSize = mode === 'size' ? randItem(SIZES.filter((s) => s !== baseSize)) : baseSize;

  const items: Item[] = [0, 1, 2, 3].map((i) => ({
    id: i,
    shape: baseShape,
    color: baseColor,
    size: baseSize,
    odd: false,
  }));
  const oddIndex = Math.floor(Math.random() * 4);
  items[oddIndex] = { id: oddIndex, shape: oddShape, color: oddColor, size: oddSize, odd: true };

  // Перемешиваем позиции карточек в сетке
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

const ROUNDS_PER_SESSION = 10;

export default function NaydiLishneeTrainerPage() {
  const [mode, setMode] = useState<Mode>('shape');
  const [started, setStarted] = useState(false);
  const [round, setRound] = useState(0);
  const [items, setItems] = useState<Item[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [pickedId, setPickedId] = useState<number | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [finished, setFinished] = useState(false);

  function begin(m: Mode) {
    setMode(m);
    setStarted(true);
    setFinished(false);
    setRound(1);
    setScore({ correct: 0, total: 0 });
    setItems(makeRound(m));
    setFeedback(null);
    setPickedId(null);
  }

  function nextRound() {
    if (round >= ROUNDS_PER_SESSION) {
      setFinished(true);
      return;
    }
    setRound((r) => r + 1);
    setItems(makeRound(mode));
    setFeedback(null);
    setPickedId(null);
  }

  function handlePick(item: Item) {
    if (feedback) return;
    setPickedId(item.id);
    const correct = item.odd;
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
        <h1 className="text-2xl font-bold mt-2">🧩 Найди лишнее</h1>
      </div>

      <TrainerGate type="trainer:naydi-lishnee">
      <div className="max-w-2xl mx-auto py-8 px-6">
        {/* Настройки */}
        <div className="card mb-8">
          <label className="block text-sm font-medium mb-3 text-white/90">Режим</label>
          <div className="flex flex-col gap-3">
            {MODES.map((m) => (
              <button
                key={m.value}
                onClick={() => begin(m.value)}
                className={`text-left px-5 py-4 rounded-xl font-bold transition-all ${
                  started && mode === m.value
                    ? 'text-white'
                    : 'bg-white/10 border border-white/25 text-white/80 hover:bg-white/15'
                }`}
                style={
                  started && mode === m.value
                    ? { background: 'linear-gradient(135deg, #7C3AED, #f72585)' }
                    : undefined
                }
              >
                <span className="block text-lg">{m.label}</span>
                <span className="block text-sm font-normal opacity-80">{m.hint}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Игровое поле */}
        {started && !finished && (
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

            <p className="text-xl font-bold text-[#3a1c6e] mb-6">{mode === 'category' ? 'Что здесь лишнее?' : 'Какая фигура лишняя?'}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {items.map((item) => {
                const isPicked = pickedId === item.id;
                const showState = feedback && (isPicked || item.odd);
                return (
                  <button
                    key={item.id}
                    onClick={() => handlePick(item)}
                    disabled={!!feedback}
                    className={`flex items-center justify-center aspect-square rounded-2xl border-4 transition-all ${
                      showState
                        ? item.odd
                          ? 'border-green-500 bg-green-50 pop-in'
                          : 'border-red-400 bg-red-50 shake'
                        : 'border-gray-200 bg-gray-50 hover:border-orange hover:scale-105'
                    }`}
                  >
                    {item.emoji ? (
                      <span className="text-6xl">{item.emoji}</span>
                    ) : (
                      <ShapeSvg kind={item.shape} color={item.color} size={item.size} />
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
                <p className="text-red-500 font-black text-xl">Вот эта — другая, смотри! 👀</p>
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
            <p className="text-gray-500 mb-6">из {score.total}</p>
            {praiseFor(score.correct, score.total).master && (

              <GameShareBadge gameTitle="Найди лишнее" statLine={`${score.correct} из ${score.total} правильных`} />

            )}
            <div className="flex justify-center gap-3 flex-wrap">
              <button onClick={() => begin(mode)} className="btn-primary px-6 py-3">
                🔁 Играть ещё
              </button>
            </div>
            <div className="mt-6 pt-5 border-t border-gray-200">
              <ShareButtons
                text={shareTextFor('Найди лишнее', score.correct, score.total)}
                url="https://znatorica.ru/trenazher/naydi-lishnee"
                trackKey="game:naydi-lishnee"
              />
            </div>
          </div>
        )}
      </div>
      </TrainerGate>
    </div>
  );
}
