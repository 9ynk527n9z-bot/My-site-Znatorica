'use client';

import Link from 'next/link';
import { useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import { RUSSIAN_ALPHABET } from '@/lib/russian-alphabet';
import { praiseFor } from '@/lib/praise';

const ROUNDS_PER_SESSION = 10;

const VOWELS = ['А', 'Е', 'Ё', 'И', 'О', 'У', 'Ы', 'Э', 'Ю', 'Я'];

// Ъ и Ь — не звуки: первокласснику нельзя предлагать их классифицировать.
const GAME_LETTERS = RUSSIAN_ALPHABET.map((l) => l.letter).filter(
  (letter) => letter !== 'Ъ' && letter !== 'Ь'
);

function isVowel(letter: string): boolean {
  return VOWELS.includes(letter);
}

// 10 случайных букв без повторов на сессию
function makeSession(): string[] {
  const pool = [...GAME_LETTERS];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, ROUNDS_PER_SESSION);
}

type Answer = 'vowel' | 'consonant';

export default function GlasnyeSoglasnyeTrainerPage() {
  const [started, setStarted] = useState(false);
  const [letters, setLetters] = useState<string[]>([]);
  const [round, setRound] = useState(0); // индекс текущей буквы
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [picked, setPicked] = useState<Answer | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const letter = letters[round];

  function begin() {
    setLetters(makeSession());
    setRound(0);
    setScore(0);
    setFeedback(null);
    setPicked(null);
    setFinished(false);
    setStarted(true);
  }

  function nextRound() {
    if (round + 1 >= ROUNDS_PER_SESSION) {
      setFinished(true);
      return;
    }
    setRound((r) => r + 1);
    setFeedback(null);
    setPicked(null);
  }

  function handlePick(answer: Answer) {
    if (feedback || !letter) return;
    setPicked(answer);
    const truth: Answer = isVowel(letter) ? 'vowel' : 'consonant';
    const correct = answer === truth;
    setFeedback(correct ? 'correct' : 'wrong');
    if (correct) setScore((s) => s + 1);
    setTimeout(nextRound, correct ? 1100 : 1800);
  }

  const truth: Answer | null = letter ? (isVowel(letter) ? 'vowel' : 'consonant') : null;

  return (
    <div className="bg-black min-h-screen">
      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">🔴🔵 Гласная или согласная?</h1>
      </div>

      <TrainerGate type="trainer:glasnye-soglasnye">
        <div className="max-w-2xl mx-auto py-8 px-6">
          {!started && (
            <div className="card bg-white text-center py-12 px-6">
              <div className="text-7xl mb-4">🅰️</div>
              <p className="text-2xl font-black text-[#3a1c6e] mb-3">Гласная или согласная?</p>
              <p className="text-gray-600 text-lg mb-8">
                Смотри на букву и выбирай:{' '}
                <span className="text-red-500 font-bold">гласная</span> — красная кнопка,{' '}
                <span className="text-blue-500 font-bold">согласная</span> — синяя!
              </p>
              <button onClick={begin} className="btn-primary px-10 py-5 text-xl">
                ▶️ Начать игру
              </button>
            </div>
          )}

          {started && !finished && letter && (
            <div className="card bg-white text-center px-6 py-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-500 text-sm">
                  Буква {round + 1} из {ROUNDS_PER_SESSION}
                </span>
                <span className="text-gray-600 text-sm">
                  Верно: <span className="text-green-600 font-bold">{score}</span>
                </span>
              </div>

              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-8">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${((round + 1) / ROUNDS_PER_SESSION) * 100}%`,
                    background: 'linear-gradient(90deg, #F97316, #f72585)',
                  }}
                />
              </div>

              <div
                className={`inline-flex items-center justify-center w-52 h-52 sm:w-60 sm:h-60 rounded-3xl border-8 mb-6 transition-all pop-in ${
                  feedback
                    ? truth === 'vowel'
                      ? 'border-red-400 bg-red-50'
                      : 'border-blue-400 bg-blue-50'
                    : 'border-[#3a1c6e]/20 bg-gradient-to-br from-orange-50 to-pink-50'
                }`}
              >
                <span
                  className={`text-9xl font-black leading-none ${
                    feedback ? (truth === 'vowel' ? 'text-red-500' : 'text-blue-600') : 'text-[#3a1c6e]'
                  }`}
                >
                  {letter}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => handlePick('vowel')}
                  disabled={!!feedback}
                  className={`py-8 rounded-2xl text-2xl sm:text-3xl font-black text-white transition-all ${
                    feedback && picked === 'vowel'
                      ? truth === 'vowel'
                        ? 'bg-red-500 ring-8 ring-green-300 pop-in'
                        : 'bg-red-300 shake'
                      : 'bg-red-500 hover:bg-red-600 hover:scale-105 shadow-lg shadow-red-500/40'
                  }`}
                >
                  🔴 Гласная
                </button>
                <button
                  onClick={() => handlePick('consonant')}
                  disabled={!!feedback}
                  className={`py-8 rounded-2xl text-2xl sm:text-3xl font-black text-white transition-all ${
                    feedback && picked === 'consonant'
                      ? truth === 'consonant'
                        ? 'bg-blue-500 ring-8 ring-green-300 pop-in'
                        : 'bg-blue-300 shake'
                      : 'bg-blue-500 hover:bg-blue-600 hover:scale-105 shadow-lg shadow-blue-500/40'
                  }`}
                >
                  🔵 Согласная
                </button>
              </div>

              <div className="h-8">
                {feedback === 'correct' && (
                  <p className="text-green-600 font-black text-2xl pop-in">✅ Верно!</p>
                )}
                {feedback === 'wrong' && (
                  <p className="text-red-500 font-black text-xl">
                    «{letter}» — {truth === 'vowel' ? 'гласная' : 'согласная'} 👀
                  </p>
                )}
              </div>
            </div>
          )}

          {finished && (
            <div className="card bg-white text-center py-12 px-6">
              <p className="text-4xl font-black text-[#3a1c6e] mb-2">{praiseFor(score, ROUNDS_PER_SESSION).title}</p>
              <p className="text-gray-600 mb-1">Правильных ответов:</p>
              <p className="text-7xl font-black text-orange mb-2">{score}</p>
              <p className="text-gray-500 mb-8">из {ROUNDS_PER_SESSION}</p>
              <div className="flex justify-center gap-3 flex-wrap">
                <button onClick={begin} className="btn-primary px-8 py-4 text-lg">
                  🔁 Играть ещё
                </button>
                <Link
                  href="/1-klass/russkiy/glasnye-i-soglasnye"
                  className="px-8 py-4 text-lg rounded-lg border border-gray-300 text-[#3a1c6e] font-bold hover:bg-gray-50"
                >
                  📝 К теории
                </Link>
              </div>
            </div>
          )}
        </div>
      </TrainerGate>
    </div>
  );
}
