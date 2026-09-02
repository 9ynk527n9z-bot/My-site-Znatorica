'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import TrainerGate from '@/components/TrainerGate';

const CATEGORIES: { name: string; emoji: string; words: string[] }[] = [
  { name: 'Животные', emoji: '🐾', words: ['КОШКА', 'СОБАКА', 'СЛОН', 'ЖИРАФ', 'ЗАЯЦ', 'МЕДВЕДЬ', 'ЛИСА', 'ВОЛК', 'БЕЛКА', 'ТИГР'] },
  { name: 'Школа', emoji: '🎒', words: ['ПОРТФЕЛЬ', 'ТЕТРАДЬ', 'КАРАНДАШ', 'ДНЕВНИК', 'УЧЕБНИК', 'ЛИНЕЙКА', 'ДОСКА', 'ПЕНАЛ'] },
  { name: 'Природа', emoji: '🌳', words: ['ДЕРЕВО', 'ЦВЕТОК', 'РЕКА', 'ОБЛАКО', 'РАДУГА', 'ГОРА', 'ЛЕС', 'ОЗЕРО'] },
];

type Category = (typeof CATEGORIES)[number];

interface Tile {
  id: number;
  char: string;
}

function shuffleLetters(word: string): Tile[] {
  const original = word.split('');
  let shuffled = original;
  if (original.length > 1) {
    do {
      shuffled = [...original];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
    } while (shuffled.join('') === original.join(''));
  }
  return shuffled.map((char, i) => ({ id: i, char }));
}

function pickWord(category: Category, avoid?: string): string {
  const { words } = category;
  if (words.length <= 1) return words[0];
  let candidate = words[Math.floor(Math.random() * words.length)];
  while (candidate === avoid) {
    candidate = words[Math.floor(Math.random() * words.length)];
  }
  return candidate;
}

export default function SoberySlovoTrainerPage() {
  const [category, setCategory] = useState<Category | null>(null);
  const [word, setWord] = useState('');
  const [pool, setPool] = useState<Tile[]>([]);
  const [slots, setSlots] = useState<(Tile | null)[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [score, setScore] = useState(0);

  function startRound(cat: Category, avoid?: string) {
    const w = pickWord(cat, avoid);
    setWord(w);
    setPool(shuffleLetters(w));
    setSlots(Array(w.length).fill(null));
    setFeedback(null);
  }

  function chooseCategory(cat: Category) {
    setCategory(cat);
    setScore(0);
    startRound(cat);
  }

  // Проверяем ответ, когда все ячейки заполнены
  useEffect(() => {
    if (slots.length === 0 || !word) return undefined;
    if (slots.every((s) => s !== null)) {
      const assembled = slots.map((s) => s!.char).join('');
      if (assembled === word) {
        setFeedback('correct');
        setScore((s) => s + 1);
        const timer = setTimeout(() => {
          if (category) startRound(category, word);
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        setFeedback('wrong');
      }
    } else {
      setFeedback(null);
    }
    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slots, word]);

  function placeTile(tile: Tile) {
    if (feedback === 'correct') return;
    const emptyIndex = slots.findIndex((s) => s === null);
    if (emptyIndex === -1) return;
    const newSlots = [...slots];
    newSlots[emptyIndex] = tile;
    setSlots(newSlots);
    setPool((p) => p.filter((t) => t.id !== tile.id));
  }

  function removeTile(index: number) {
    if (feedback === 'correct') return;
    const tile = slots[index];
    if (!tile) return;
    const newSlots = [...slots];
    newSlots[index] = null;
    setSlots(newSlots);
    setPool((p) => [...p, tile]);
  }

  function resetRound() {
    if (feedback === 'correct') return;
    setPool(shuffleLetters(word));
    setSlots(Array(word.length).fill(null));
    setFeedback(null);
  }

  const hintDisabled = !!(slots[0] && slots[0]!.char === word[0]) || feedback === 'correct';

  function giveHint() {
    if (hintDisabled || !word) return;
    const targetChar = word[0];
    let newPool = [...pool];
    const newSlots = [...slots];

    // Если первая ячейка занята неправильной буквой — возвращаем её в набор
    if (newSlots[0]) {
      newPool = [...newPool, newSlots[0]];
      newSlots[0] = null;
    }

    let tile: Tile | null = null;
    const poolIndex = newPool.findIndex((t) => t.char === targetChar);
    if (poolIndex !== -1) {
      tile = newPool[poolIndex];
      newPool.splice(poolIndex, 1);
    } else {
      const slotIndex = newSlots.findIndex((s, i) => i !== 0 && s && s.char === targetChar);
      if (slotIndex !== -1) {
        tile = newSlots[slotIndex];
        newSlots[slotIndex] = null;
      }
    }

    if (tile) {
      newSlots[0] = tile;
      setPool(newPool);
      setSlots(newSlots);
    }
  }

  return (
    <div className="min-h-screen">
      <div className="border-b border-white/15 px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">🔡 Собери слово</h1>
      </div>

      <TrainerGate type="trainer:sobery-slovo">
        <div className="max-w-2xl mx-auto py-8 px-6">
          {/* Настройки */}
          <div className="card mb-8">
            <label className="block text-sm font-medium mb-3 text-white/90">Категория слов</label>
            <div className="flex flex-col gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => chooseCategory(cat)}
                  className={`text-left px-5 py-4 rounded-xl font-bold transition-all ${
                    category?.name === cat.name
                      ? 'text-white'
                      : 'bg-white/10 border border-white/25 text-white/80 hover:bg-white/15'
                  }`}
                  style={
                    category?.name === cat.name
                      ? { background: 'linear-gradient(135deg, #7C3AED, #f72585)' }
                      : undefined
                  }
                >
                  <span className="text-lg">
                    {cat.emoji} {cat.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Игровое поле */}
          {category && word && (
            <div className="card bg-white text-center">
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-500 text-sm">
                  {category.emoji} {category.name}
                </span>
                <span className="text-gray-600 text-sm">
                  Собрано слов: <span className="text-green-600 font-bold">{score}</span>
                </span>
              </div>

              <p className="text-sm text-gray-500 mb-2">Буквы в наличии</p>
              <div className="flex flex-wrap justify-center gap-2 mb-6 min-h-[3.5rem]">
                {pool.map((tile) => (
                  <button
                    key={tile.id}
                    onClick={() => placeTile(tile)}
                    disabled={feedback === 'correct'}
                    className="w-12 h-12 rounded-xl border-2 border-orange bg-orange/10 text-[#3a1c6e] text-xl font-black hover:bg-orange/20 hover:scale-105 transition-all"
                  >
                    {tile.char}
                  </button>
                ))}
              </div>

              <p className="text-sm text-gray-500 mb-2">Твой ответ</p>
              <div
                className={`flex flex-wrap justify-center gap-2 mb-6 ${
                  feedback === 'wrong' ? 'shake' : ''
                }`}
              >
                {slots.map((tile, i) => (
                  <button
                    key={i}
                    onClick={() => tile && removeTile(i)}
                    className={`w-12 h-12 rounded-xl border-2 text-xl font-black transition-all flex items-center justify-center ${
                      feedback === 'correct'
                        ? 'border-green-500 bg-green-50 text-green-600 pop-in'
                        : feedback === 'wrong'
                        ? 'border-red-400 bg-red-50 text-red-500'
                        : tile
                        ? 'border-[#7C3AED] bg-purple-50 text-[#3a1c6e]'
                        : 'border-dashed border-gray-300 bg-gray-50'
                    }`}
                  >
                    {tile?.char ?? ''}
                  </button>
                ))}
              </div>

              <div className="h-8 mb-4">
                {feedback === 'correct' && (
                  <p className="text-green-600 font-black text-xl pop-in">🎉 Верно!</p>
                )}
                {feedback === 'wrong' && (
                  <p className="text-red-500 font-bold">Не совсем, попробуй переставить буквы</p>
                )}
              </div>

              <div className="flex justify-center gap-3 flex-wrap">
                <button
                  onClick={resetRound}
                  disabled={feedback === 'correct'}
                  className="px-5 py-3 rounded-xl font-bold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  🔄 Сброс
                </button>
                <button
                  onClick={giveHint}
                  disabled={hintDisabled}
                  className="px-5 py-3 rounded-xl font-bold border border-orange text-orange hover:bg-orange/10 transition-colors disabled:opacity-40"
                >
                  💡 Подсказка
                </button>
              </div>
            </div>
          )}
        </div>
      </TrainerGate>
    </div>
  );
}
