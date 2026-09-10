'use client';

import Link from 'next/link';
import { useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import ShareButtons from '@/components/ShareButtons';
import { shuffle } from '@/lib/shapes';

// Слова на тему «Транспорт». Берём 8 штук про запас, в колоду каждый раз
// случайно попадают 6 из них — так игра не приедается при повторных заходах.
const TRANSPORT_WORDS = [
  { id: 'car', word: 'CAR', emoji: '🚗', translation: 'машина' },
  { id: 'bus', word: 'BUS', emoji: '🚌', translation: 'автобус' },
  { id: 'bike', word: 'BIKE', emoji: '🚲', translation: 'велосипед' },
  { id: 'plane', word: 'PLANE', emoji: '✈️', translation: 'самолёт' },
  { id: 'ship', word: 'SHIP', emoji: '🚢', translation: 'корабль' },
  { id: 'train', word: 'TRAIN', emoji: '🚂', translation: 'поезд' },
  { id: 'helicopter', word: 'HELICOPTER', emoji: '🚁', translation: 'вертолёт' },
  { id: 'taxi', word: 'TAXI', emoji: '🚕', translation: 'такси' },
];

const PAIRS_COUNT = 6; // 6 пар = 12 карточек (слово + картинка)

interface Card {
  id: number;
  conceptId: string;
  kind: 'word' | 'emoji';
  word: string;
  emoji: string;
  matched: boolean;
}

function makeDeck(): Card[] {
  const chosen = shuffle(TRANSPORT_WORDS).slice(0, PAIRS_COUNT);
  const cards: Card[] = chosen.flatMap((item, i) => [
    { id: i * 2, conceptId: item.id, kind: 'word' as const, word: item.word, emoji: item.emoji, matched: false },
    { id: i * 2 + 1, conceptId: item.id, kind: 'emoji' as const, word: item.word, emoji: item.emoji, matched: false },
  ]);
  return shuffle(cards);
}

export default function EnglishTransportTrainerPage() {
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

      // Пара верна, если это слово и картинка ОДНОГО понятия (не два одинаковых
      // вида карточки) — поэтому дополнительно проверяем, что виды разные.
      if (first.conceptId === second.conceptId && first.kind !== second.kind) {
        setTimeout(() => {
          setDeck((d) => d.map((c) => (c.conceptId === first.conceptId ? { ...c, matched: true } : c)));
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
  const usedConceptIds = Array.from(new Set(deck.map((c) => c.conceptId)));
  const usedWords = TRANSPORT_WORDS.filter((w) => usedConceptIds.includes(w.id));

  return (
    <div className="bg-[#28134f] min-h-screen">
      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">🚗 Транспорт по-английски</h1>
      </div>

      <TrainerGate type="trainer:english-transport">
        <div className="max-w-2xl mx-auto py-8 px-6">
          {!started && (
            <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 text-center">
              <p className="text-white/80 mb-6">
                Переворачивай карточки по две и находи пару: английское слово и картинку
                одного и того же транспорта. Запоминай, где что лежит!
              </p>
              <button onClick={begin} className="btn-primary px-8 py-3">
                ▶️ Начать игру
              </button>
            </div>
          )}

          {started && !finished && (
            <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6">
              <div className="flex justify-between items-center mb-6 text-sm text-white/70">
                <span>
                  Найдено пар: <span className="font-bold text-green-400">{matchedCount}</span> / {PAIRS_COUNT}
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
                          ? 'bg-green-500/10 border-2 border-green-400'
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
                        card.kind === 'emoji' ? (
                          <span className="text-4xl">{card.emoji}</span>
                        ) : (
                          <span className="font-black text-[#3a1c6e] text-sm sm:text-base text-center px-1">
                            {card.word}
                          </span>
                        )
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
            <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg text-center py-10 px-6">
              <p className="text-3xl font-black mb-2">🎉 Все пары найдены!</p>
              <p className="text-white/70 mb-1">Понадобилось ходов:</p>
              <p className="text-6xl font-black text-orange mb-6">{moves}</p>
              <button onClick={begin} className="btn-primary px-6 py-3">
                🔁 Играть ещё
              </button>
              <div className="mt-6 pt-5 border-t border-white/10">
                <ShareButtons
                  text={`Бесплатный тренажёр «Транспорт по-английски» для детей на Знаторике. Наш результат: за ${moves} ходов.`}
                  url="https://znatorica.ru/trenazher/english-transport"
                  trackKey="english-transport"
                />
              </div>
            </div>
          )}

          {usedWords.length > 0 && (
            <div className="mt-8 bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-5">
              <p className="text-white/60 text-sm mb-3">Слова в этой игре:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                {usedWords.map((w) => (
                  <div key={w.id} className="flex items-center gap-2 text-white/80">
                    <span className="text-xl">{w.emoji}</span>
                    <span className="font-bold">{w.word}</span>
                    <span className="text-white/50">— {w.translation}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </TrainerGate>
    </div>
  );
}
