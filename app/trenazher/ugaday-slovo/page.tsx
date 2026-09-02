'use client';

import Link from 'next/link';
import { useState } from 'react';
import TrainerGate from '@/components/TrainerGate';

const CATEGORIES: { name: string; emoji: string; words: string[] }[] = [
  {
    name: 'Животные',
    emoji: '🐾',
    words: [
      'КОШКА', 'СОБАКА', 'СЛОН', 'ЖИРАФ', 'ЗАЯЦ', 'МЕДВЕДЬ', 'ЛИСА', 'ВОЛК',
      'ЕЖИК', 'БЕЛКА', 'ТИГР', 'ЛЕВ', 'ОБЕЗЬЯНА', 'КРОКОДИЛ', 'ЧЕРЕПАХА',
    ],
  },
  {
    name: 'Школа',
    emoji: '🎒',
    words: [
      'ПОРТФЕЛЬ', 'ТЕТРАДЬ', 'КАРАНДАШ', 'ДНЕВНИК', 'УЧЕБНИК', 'ЛИНЕЙКА',
      'ДОСКА', 'ПЕНАЛ', 'ГЛОБУС', 'УЧИТЕЛЬ',
    ],
  },
  {
    name: 'Еда',
    emoji: '🍎',
    words: [
      'ЯБЛОКО', 'БАНАН', 'МОРКОВЬ', 'ХЛЕБ', 'МОЛОКО', 'СУП', 'КАША', 'ПИРОГ',
      'АРБУЗ', 'ВИНОГРАД',
    ],
  },
];

const ALPHABET =
  'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'.split('');

const MAX_LIVES = 6;

type Category = (typeof CATEGORIES)[number];
type Status = 'playing' | 'won' | 'lost';

function pickWord(category: Category): string {
  return category.words[Math.floor(Math.random() * category.words.length)];
}

export default function UgadaySlovoTrainerPage() {
  const [category, setCategory] = useState<Category | null>(null);
  const [word, setWord] = useState('');
  const [guessed, setGuessed] = useState<Set<string>>(new Set());
  const [lives, setLives] = useState(MAX_LIVES);
  const [status, setStatus] = useState<Status>('playing');

  function begin(cat: Category) {
    setCategory(cat);
    setWord(pickWord(cat));
    setGuessed(new Set());
    setLives(MAX_LIVES);
    setStatus('playing');
  }

  function playAgain() {
    if (category) begin(category);
  }

  function backToCategories() {
    setCategory(null);
  }

  function handleLetter(letter: string) {
    if (status !== 'playing' || guessed.has(letter)) return;

    const nextGuessed = new Set(guessed);
    nextGuessed.add(letter);
    setGuessed(nextGuessed);

    if (word.includes(letter)) {
      const allRevealed = word.split('').every((ch) => nextGuessed.has(ch));
      if (allRevealed) setStatus('won');
    } else {
      const livesLeft = lives - 1;
      setLives(livesLeft);
      if (livesLeft <= 0) setStatus('lost');
    }
  }

  return (
    <div className="min-h-screen">
      <div className="border-b border-white/15 px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">🔤 Угадай слово</h1>
      </div>

      <TrainerGate type="trainer:ugaday-slovo">
        <div className="max-w-2xl mx-auto py-8 px-6">
          {/* Выбор категории */}
          <div className="card mb-8">
            <label className="block text-sm font-medium mb-3 text-white/90">Категория слов</label>
            <div className="flex flex-col gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => begin(cat)}
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
                  <span className="block text-lg">
                    {cat.emoji} {cat.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Игровое поле */}
          {category && status === 'playing' && (
            <div className="card bg-white text-center">
              <p className="text-gray-500 text-sm mb-4">
                {category.emoji} Слово из категории «{category.name}»
              </p>

              <div className="text-2xl mb-4" aria-label="Оставшиеся жизни">
                {'❤️'.repeat(lives)}
                {'🤍'.repeat(MAX_LIVES - lives)}
              </div>

              <p className="text-3xl sm:text-4xl font-black tracking-[0.3em] text-[#3a1c6e] mb-8 break-all">
                {word
                  .split('')
                  .map((ch) => (guessed.has(ch) ? ch : '_'))
                  .join(' ')}
              </p>

              <div className="flex flex-wrap justify-center gap-2">
                {ALPHABET.map((letter) => {
                  const used = guessed.has(letter);
                  const correct = used && word.includes(letter);
                  return (
                    <button
                      key={letter}
                      onClick={() => handleLetter(letter)}
                      disabled={used}
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg font-bold text-sm transition-all ${
                        used
                          ? correct
                            ? 'bg-green-100 text-green-600 border border-green-300'
                            : 'bg-gray-100 text-gray-300 border border-gray-200'
                          : 'bg-gray-50 text-[#3a1c6e] border border-gray-200 hover:border-orange hover:scale-105'
                      }`}
                    >
                      {letter}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Победа */}
          {category && status === 'won' && (
            <div className="card bg-white text-center py-10">
              <p className="text-3xl font-black text-[#3a1c6e] mb-2">Отгадал! 🎉</p>
              <p className="text-gray-600 mb-1">Загаданное слово:</p>
              <p className="text-4xl font-black text-orange mb-8">{word}</p>
              <div className="flex justify-center gap-3 flex-wrap">
                <button onClick={playAgain} className="btn-primary px-6 py-3">
                  🔁 Играть ещё
                </button>
                <button
                  onClick={backToCategories}
                  className="px-6 py-3 rounded-lg font-bold border border-gray-200 text-gray-500 hover:text-[#3a1c6e] transition-colors"
                >
                  Сменить категорию
                </button>
              </div>
            </div>
          )}

          {/* Поражение */}
          {category && status === 'lost' && (
            <div className="card bg-white text-center py-10">
              <p className="text-3xl font-black text-[#3a1c6e] mb-2">Почти! 💜</p>
              <p className="text-gray-600 mb-1">Загаданное слово было:</p>
              <p className="text-4xl font-black text-orange mb-2">{word}</p>
              <p className="text-gray-500 mb-8">Попробуй ещё раз!</p>
              <div className="flex justify-center gap-3 flex-wrap">
                <button onClick={playAgain} className="btn-primary px-6 py-3">
                  🔁 Играть ещё
                </button>
                <button
                  onClick={backToCategories}
                  className="px-6 py-3 rounded-lg font-bold border border-gray-200 text-gray-500 hover:text-[#3a1c6e] transition-colors"
                >
                  Сменить категорию
                </button>
              </div>
            </div>
          )}
        </div>
      </TrainerGate>
    </div>
  );
}
