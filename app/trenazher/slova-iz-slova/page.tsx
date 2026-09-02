'use client';

import Link from 'next/link';
import { useState } from 'react';
import TrainerGate from '@/components/TrainerGate';

const PUZZLES: { big: string; answers: string[] }[] = [
  { big: 'ТЕЛЕФОН', answers: ['ТЕЛО', 'ЛЕТО', 'ФЕН', 'ТОН', 'НЕТ', 'ЛОТ', 'ЕЛЕ', 'ФЛОТ'] },
  { big: 'КОМПЬЮТЕР', answers: ['КОТ', 'ТОК', 'РОТ', 'ТОМ', 'КОМ', 'ПОТ', 'КРЕМ', 'МЕТР'] },
  { big: 'МАТЕМАТИКА', answers: ['МАТ', 'ТИК', 'КИТ', 'АТАКА', 'ТЕМА', 'МАМА', 'ТАМ'] },
  { big: 'УЧИТЕЛЬНИЦА', answers: ['НИТЬ', 'ЛИЦА', 'ЦЕНА', 'ТУЧА'] },
  { big: 'ПОРТФЕЛЬ', answers: ['ПОРТ', 'ФОРТ', 'ЛЕТО', 'ТОРФ', 'ТЕЛО'] },
];

function normalize(word: string): string {
  return word.trim().toUpperCase().replace(/Ё/g, 'Е');
}

function randomPuzzleIndex(excludeIndex?: number): number {
  if (PUZZLES.length <= 1) return 0;
  let index = Math.floor(Math.random() * PUZZLES.length);
  while (index === excludeIndex) {
    index = Math.floor(Math.random() * PUZZLES.length);
  }
  return index;
}

export default function SlovaIzSlovaTrainerPage() {
  const [puzzleIndex, setPuzzleIndex] = useState(() => randomPuzzleIndex());
  const [found, setFound] = useState<string[]>([]);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'info' | 'error'; text: string } | null>(null);

  const puzzle = PUZZLES[puzzleIndex];
  const finished = found.length === puzzle.answers.length;

  function pickPuzzle(index: number) {
    setPuzzleIndex(index);
    setFound([]);
    setGuess('');
    setMessage(null);
  }

  function newPuzzle() {
    pickPuzzle(randomPuzzleIndex(puzzleIndex));
  }

  function handleSubmit() {
    if (finished) return;
    const normalizedGuess = normalize(guess);
    if (!normalizedGuess) return;

    const match = puzzle.answers.find((answer) => normalize(answer) === normalizedGuess);

    if (!match) {
      setMessage({ type: 'error', text: 'Такого слова нет в списке, попробуй другое' });
      setGuess('');
      return;
    }

    if (found.includes(match)) {
      setMessage({ type: 'info', text: 'Уже нашёл!' });
      setGuess('');
      return;
    }

    setFound((prev) => [...prev, match]);
    setMessage({ type: 'success', text: '✅ Верно!' });
    setGuess('');
  }

  function handleHint() {
    if (finished) return;
    const remaining = puzzle.answers.filter((answer) => !found.includes(answer));
    if (remaining.length === 0) return;
    const hint = remaining[Math.floor(Math.random() * remaining.length)];
    setFound((prev) => [...prev, hint]);
    setMessage({ type: 'info', text: `Подсказка: «${hint}»` });
  }

  return (
    <div className="min-h-screen">
      <div className="border-b border-white/15 px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">🧠 Слова из слова</h1>
      </div>

      <TrainerGate type="trainer:slova-iz-slova">
        <div className="max-w-2xl mx-auto py-8 px-6">
          {/* Выбор слова */}
          <div className="card mb-8">
            <label className="block text-sm font-medium mb-3 text-white/90">Выбери большое слово</label>
            <div className="flex flex-wrap gap-3">
              {PUZZLES.map((p, index) => (
                <button
                  key={p.big}
                  onClick={() => pickPuzzle(index)}
                  className={`px-5 py-3 rounded-xl font-bold transition-all ${
                    index === puzzleIndex
                      ? 'text-white'
                      : 'bg-white/10 border border-white/25 text-white/80 hover:bg-white/15'
                  }`}
                  style={
                    index === puzzleIndex
                      ? { background: 'linear-gradient(135deg, #7C3AED, #f72585)' }
                      : undefined
                  }
                >
                  {p.big}
                </button>
              ))}
            </div>
          </div>

          {/* Игровое поле */}
          {!finished && (
            <div className="card bg-white text-center">
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-500 text-sm">
                  Найдено {found.length} из {puzzle.answers.length}
                </span>
                <button
                  onClick={newPuzzle}
                  className="text-orange text-sm font-bold hover:underline"
                >
                  🔀 Другое слово
                </button>
              </div>

              <div className="flex justify-center flex-wrap gap-2 mb-8">
                {puzzle.big.split('').map((letter, index) => (
                  <span
                    key={index}
                    className="w-11 h-11 flex items-center justify-center rounded-xl bg-purple-100 text-[#3a1c6e] text-2xl font-black border-2 border-purple-200"
                  >
                    {letter}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 justify-center flex-wrap mb-4">
                <input
                  type="text"
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSubmit();
                  }}
                  placeholder="Введи слово..."
                  className="px-4 py-3 rounded-xl border-2 border-gray-200 text-[#3a1c6e] text-lg font-bold text-center focus:outline-none focus:border-orange"
                />
                <button onClick={handleSubmit} className="btn-primary px-6 py-3">
                  Проверить
                </button>
              </div>

              <div className="flex gap-3 justify-center mb-4">
                <button
                  onClick={handleHint}
                  className="px-5 py-2 rounded-xl font-bold bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors"
                >
                  💡 Подсказка
                </button>
              </div>

              <div className="h-8 mb-2">
                {message && (
                  <p
                    className={`font-black text-lg pop-in ${
                      message.type === 'success'
                        ? 'text-green-600'
                        : message.type === 'error'
                          ? 'text-red-500'
                          : 'text-gray-500'
                    }`}
                  >
                    {message.text}
                  </p>
                )}
              </div>

              {found.length > 0 && (
                <div className="flex flex-wrap gap-2 justify-center pt-4 border-t border-gray-100">
                  {found.map((word) => (
                    <span
                      key={word}
                      className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-bold"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Итог */}
          {finished && (
            <div className="card bg-white text-center py-10">
              <p className="text-3xl font-black text-[#3a1c6e] mb-2">🎉 Все слова найдены!</p>
              <p className="text-gray-600 mb-6">
                В слове «{puzzle.big}» ты нашёл {found.length} слов
              </p>
              <div className="flex flex-wrap gap-2 justify-center mb-8">
                {found.map((word) => (
                  <span
                    key={word}
                    className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-bold"
                  >
                    {word}
                  </span>
                ))}
              </div>
              <div className="flex justify-center gap-3 flex-wrap">
                <button onClick={newPuzzle} className="btn-primary px-6 py-3">
                  🔁 Другое слово
                </button>
              </div>
            </div>
          )}
        </div>
      </TrainerGate>
    </div>
  );
}
