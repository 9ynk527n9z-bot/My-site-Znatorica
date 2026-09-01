'use client';

import Link from 'next/link';
import { useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import ShapeSvg from '@/components/ShapeSvg';
import { SHAPES, COLORS, shuffle, type ShapeKind } from '@/lib/shapes';

const PAIRS_COUNT = 6; // 6 пар = 12 карточек

interface Card {
  id: number;
  pairId: number;
  shape: ShapeKind;
  color: string;
  matched: boolean;
}

function makeDeck(): Card[] {
  const shapePool = shuffle(SHAPES);
  const colorPool = shuffle(COLORS);
  const pairs: { shape: ShapeKind; color: string }[] = [];
  for (let i = 0; i < PAIRS_COUNT; i++) {
    pairs.push({ shape: shapePool[i % shapePool.length], color: colorPool[i % colorPool.length] });
  }
  const cards: Card[] = pairs.flatMap((p, pairId) => [
    { id: pairId * 2, pairId, shape: p.shape, color: p.color, matched: false },
    { id: pairId * 2 + 1, pairId, shape: p.shape, color: p.color, matched: false },
  ]);
  return shuffle(cards);
}

export default function NaydiParuTrainerPage() {
  const [started, setStarted] = useState(false);
  const [deck, setDeck] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]); // id открытых сейчас карточек (0-2)
  const [busy, setBusy] = useState(false); // блокируем клики во время показа несовпавшей пары
  const [moves, setMoves] = useState(0);
  const [matchedCount, setMatchedCount] = useState(0);

  function begin() {
    setDeck(makeDeck());
    setFlipped([]);
    setBusy(false);
    setMoves(0);
    setMatchedCount(0);
    setStarted(true);
  }

  function handleFlip(card: Card) {
    if (busy || card.matched || flipped.includes(card.id) || flipped.length === 2) return;

    const next = [...flipped, card.id];
    setFlipped(next);

    if (next.length === 2) {
      setMoves((m) => m + 1);
      const [firstId, secondId] = next;
      const first = deck.find((c) => c.id === firstId)!;
      const second = deck.find((c) => c.id === secondId)!;

      if (first.pairId === second.pairId) {
        setTimeout(() => {
          setDeck((d) => d.map((c) => (c.pairId === first.pairId ? { ...c, matched: true } : c)));
          setMatchedCount((n) => n + 1);
          setFlipped([]);
        }, 500);
      } else {
        setBusy(true);
        setTimeout(() => {
          setFlipped([]);
          setBusy(false);
        }, 900);
      }
    }
  }

  const finished = started && matchedCount === PAIRS_COUNT;

  return (
    <div className="min-h-screen">
      <div className="border-b border-white/15 px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">🃏 Найди пару</h1>
      </div>

      <TrainerGate type="trainer:naydi-paru">
      <div className="max-w-2xl mx-auto py-8 px-6">
        {!started && (
          <div className="card text-center">
            <p className="text-white/80 mb-6">
              Переворачивай карточки по две и находи одинаковые фигуры. Запоминай, где что лежит!
            </p>
            <button onClick={begin} className="btn-primary px-8 py-3">
              ▶️ Начать игру
            </button>
          </div>
        )}

        {started && !finished && (
          <div className="card bg-white">
            <div className="flex justify-between items-center mb-6 text-sm text-gray-600">
              <span>
                Найдено пар: <span className="font-bold text-green-600">{matchedCount}</span> / {PAIRS_COUNT}
              </span>
              <span>Ходов: {moves}</span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {deck.map((card) => {
                const isOpen = card.matched || flipped.includes(card.id);
                return (
                  <button
                    key={card.id}
                    onClick={() => handleFlip(card)}
                    disabled={card.matched}
                    className={`aspect-square rounded-xl flex items-center justify-center transition-all ${
                      card.matched
                        ? 'bg-green-50 border-2 border-green-400'
                        : isOpen
                        ? 'bg-white border-2 border-orange pop-in'
                        : 'border-2 border-transparent hover:scale-105'
                    }`}
                    style={
                      !isOpen
                        ? { background: 'linear-gradient(135deg, #7C3AED, #f72585)' }
                        : undefined
                    }
                  >
                    {isOpen ? (
                      <ShapeSvg kind={card.shape} color={card.color} size={44} />
                    ) : (
                      <span className="text-white text-2xl font-black">✦</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {finished && (
          <div className="card bg-white text-center py-10">
            <p className="text-3xl font-black text-[#3a1c6e] mb-2">🎉 Все пары найдены!</p>
            <p className="text-gray-600 mb-1">Понадобилось ходов:</p>
            <p className="text-6xl font-black text-orange mb-8">{moves}</p>
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
