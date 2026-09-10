'use client';

import Link from 'next/link';
import { useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import ShareButtons from '@/components/ShareButtons';

// Тренажёр смешивает два типа вопросов начального уровня английского:
// 1) выбор артикля a/an (an — перед словом, которое начинается со звука
//    гласной: a/e/i/o/u);
// 2) выбор правильно написанного множественного числа (простое +S,
//    шипящие +ES, исключение BABY → BABIES).
// Раунд — 10 вопросов, вперемешку, банк вопросов больше раунда, поэтому
// каждый раз собирается новый случайный набор.

interface ArticleQuestion {
  kind: 'article';
  word: string;
  emoji: string;
  correct: 'a' | 'an';
}

interface PluralQuestion {
  kind: 'plural';
  word: string;
  emoji: string;
  correct: string;
  options: string[];
}

type Question = ArticleQuestion | PluralQuestion;

const ARTICLE_BANK: ArticleQuestion[] = [
  { kind: 'article', word: 'APPLE', emoji: '🍎', correct: 'an' },
  { kind: 'article', word: 'ORANGE', emoji: '🍊', correct: 'an' },
  { kind: 'article', word: 'ELEPHANT', emoji: '🐘', correct: 'an' },
  { kind: 'article', word: 'UMBRELLA', emoji: '☂️', correct: 'an' },
  { kind: 'article', word: 'EGG', emoji: '🥚', correct: 'an' },
  { kind: 'article', word: 'ICE CREAM', emoji: '🍦', correct: 'an' },
  { kind: 'article', word: 'ANT', emoji: '🐜', correct: 'an' },
  { kind: 'article', word: 'DOG', emoji: '🐶', correct: 'a' },
  { kind: 'article', word: 'CAT', emoji: '🐱', correct: 'a' },
  { kind: 'article', word: 'BALL', emoji: '⚽️', correct: 'a' },
  { kind: 'article', word: 'HOUSE', emoji: '🏠', correct: 'a' },
  { kind: 'article', word: 'TABLE', emoji: '🍽️', correct: 'a' },
  { kind: 'article', word: 'BOOK', emoji: '📚', correct: 'a' },
  { kind: 'article', word: 'BANANA', emoji: '🍌', correct: 'a' },
];

const PLURAL_BANK: PluralQuestion[] = [
  { kind: 'plural', word: 'CAT', emoji: '🐱', correct: 'CATS', options: ['CATS', 'CATES', 'CAT\'S'] },
  { kind: 'plural', word: 'DOG', emoji: '🐶', correct: 'DOGS', options: ['DOGS', 'DOGES', 'DOGS\''] },
  { kind: 'plural', word: 'APPLE', emoji: '🍎', correct: 'APPLES', options: ['APPLES', 'APPLYS', 'APPLIES'] },
  { kind: 'plural', word: 'BOOK', emoji: '📚', correct: 'BOOKS', options: ['BOOKS', 'BOOKES', 'BOOK\'S'] },
  { kind: 'plural', word: 'BALL', emoji: '⚽️', correct: 'BALLS', options: ['BALLS', 'BALLES', 'BALLS\''] },
  { kind: 'plural', word: 'BOX', emoji: '📦', correct: 'BOXES', options: ['BOXES', 'BOXS', 'BOXIES'] },
  { kind: 'plural', word: 'BUS', emoji: '🚌', correct: 'BUSES', options: ['BUSES', 'BUSS', 'BUSIES'] },
  { kind: 'plural', word: 'FOX', emoji: '🦊', correct: 'FOXES', options: ['FOXES', 'FOXS', 'FOXIES'] },
  { kind: 'plural', word: 'DISH', emoji: '🍽️', correct: 'DISHES', options: ['DISHES', 'DISHS', 'DISHIES'] },
  { kind: 'plural', word: 'BABY', emoji: '👶', correct: 'BABIES', options: ['BABIES', 'BABYS', 'BABIES\''] },
  { kind: 'plural', word: 'CANDY', emoji: '🍬', correct: 'CANDIES', options: ['CANDIES', 'CANDYS', 'CANDYES'] },
  { kind: 'plural', word: 'HOUSE', emoji: '🏠', correct: 'HOUSES', options: ['HOUSES', 'HOUSEES', 'HOUSE\'S'] },
  { kind: 'plural', word: 'CAR', emoji: '🚗', correct: 'CARS', options: ['CARS', 'CARES', 'CAR\'S'] },
  { kind: 'plural', word: 'BIRD', emoji: '🐦', correct: 'BIRDS', options: ['BIRDS', 'BIRDES', 'BIRD\'S'] },
];

const ROUND_LENGTH = 10;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildRound(): { question: Question; buttons: string[] }[] {
  const pool: Question[] = shuffle([...ARTICLE_BANK, ...PLURAL_BANK]).slice(0, ROUND_LENGTH);
  return shuffle(pool).map((question) => {
    const buttons = question.kind === 'article' ? shuffle(['a', 'an']) : shuffle(question.options);
    return { question, buttons };
  });
}

type GameState = 'start' | 'playing' | 'finished';

export default function AngliyskiyArtikliTrainerPage() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [round, setRound] = useState<{ question: Question; buttons: string[] }[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);

  function startGame() {
    setRound(buildRound());
    setIndex(0);
    setScore(0);
    setSelected(null);
    setGameState('playing');
  }

  const current = round[index];

  function handleAnswer(option: string) {
    if (selected !== null || !current) return;
    setSelected(option);
    const isCorrect = option === current.question.correct;
    if (isCorrect) setScore((s) => s + 1);

    setTimeout(() => {
      if (index + 1 < round.length) {
        setIndex((i) => i + 1);
        setSelected(null);
      } else {
        setGameState('finished');
      }
    }, 900);
  }

  function praise(): string {
    const pct = round.length > 0 ? score / round.length : 0;
    if (pct === 1) return '🏆 Идеально! Ты настоящий знаток английского!';
    if (pct >= 0.8) return '🌟 Отличный результат!';
    if (pct >= 0.5) return '👍 Хорошо! Ещё немного практики — и будет идеально.';
    return '💪 Не сдавайся, попробуй ещё раз!';
  }

  return (
    <div className="bg-[#28134f] min-h-screen">
      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">🔤🇬🇧 Артикли и множественное число</h1>
      </div>

      <TrainerGate type="trainer:angliyskiy-artikli">
        <div className="max-w-2xl mx-auto py-8 px-6">
          {gameState === 'start' && (
            <div className="card bg-white text-center py-10">
              <p className="text-3xl mb-4">🔤🇬🇧</p>
              <h2 className="text-2xl font-black text-[#3a1c6e] mb-3">
                Артикли a/an и множественное число
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                В раунде — 10 вопросов вперемешку: где-то нужно выбрать верный артикль
                (a или an), а где-то — правильно написанное множественное число.
              </p>
              <button onClick={startGame} className="btn-primary px-8 py-3 text-lg">
                ▶️ Начать
              </button>
            </div>
          )}

          {gameState === 'playing' && current && (
            <div className="card bg-white text-center">
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-500 text-sm">
                  Вопрос <span className="font-bold text-[#3a1c6e]">{index + 1}</span> из{' '}
                  {round.length}
                </span>
                <span className="text-gray-600 text-sm">
                  Очки: <span className="font-bold text-orange">{score}</span>
                </span>
              </div>

              <div className="text-7xl mb-4">{current.question.emoji}</div>
              <div className="text-3xl font-black text-[#3a1c6e] mb-2 tracking-wide">
                {current.question.word}
              </div>
              <p className="text-gray-500 mb-6">
                {current.question.kind === 'article'
                  ? 'Выбери верный артикль'
                  : 'Выбери верное множественное число'}
              </p>

              <div
                className={`flex flex-wrap justify-center gap-3 ${
                  current.question.kind === 'article' ? '' : 'flex-col sm:flex-row'
                }`}
              >
                {current.buttons.map((option) => {
                  const isSelected = selected === option;
                  const isCorrectOption = option === current.question.correct;
                  let style = 'bg-white/10 border-2 border-gray-200 text-[#3a1c6e] hover:border-orange';
                  if (selected !== null) {
                    if (isCorrectOption) {
                      style = 'border-2 border-green-500 bg-green-50 text-green-700';
                    } else if (isSelected) {
                      style = 'border-2 border-red-500 bg-red-50 text-red-700';
                    } else {
                      style = 'border-2 border-gray-200 text-gray-400';
                    }
                  }
                  return (
                    <button
                      key={option}
                      onClick={() => handleAnswer(option)}
                      disabled={selected !== null}
                      className={`px-6 py-4 rounded-xl font-bold text-lg transition-all min-w-[110px] ${style}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              <div className="h-8 mt-5">
                {selected !== null && (
                  selected === current.question.correct ? (
                    <p className="text-green-600 font-black text-xl">✅ Верно!</p>
                  ) : (
                    <p className="text-red-500 font-black text-xl">
                      ❌ Правильный ответ: {current.question.correct}
                    </p>
                  )
                )}
              </div>
            </div>
          )}

          {gameState === 'finished' && (
            <div className="card bg-white text-center py-10">
              <p className="text-3xl font-black text-[#3a1c6e] mb-2">🎉 Раунд завершён!</p>
              <p className="text-gray-600 mb-1">Правильных ответов</p>
              <p className="text-6xl font-black text-orange mb-4">
                {score}/{round.length}
              </p>
              <p className="text-lg font-bold text-[#3a1c6e] mb-8">{praise()}</p>
              <div className="flex justify-center gap-3 flex-wrap mb-6">
                <button onClick={startGame} className="btn-primary px-6 py-3">
                  🔁 Играть ещё
                </button>
              </div>
              <div className="pt-6 border-t border-gray-100">
                <ShareButtons
                  text={`Прошли тренажёр английских артиклей и множественного числа на Знаторике — ${score} из ${round.length} правильно! Попробуйте тоже:`}
                  url="https://znatorica.ru/trenazher/angliyskiy-artikli"
                  trackKey="angliyskiy-artikli"
                />
              </div>
            </div>
          )}
        </div>
      </TrainerGate>
    </div>
  );
}
