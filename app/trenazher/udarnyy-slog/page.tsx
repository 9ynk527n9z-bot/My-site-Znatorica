'use client';

import Link from 'next/link';
import { useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import ShareButtons from '@/components/ShareButtons';

// Слова для 2 класса: длиннее и сложнее, чем в общем банке вопросов
// UDARENIE_1 (lib/quiz/banks-1-klass.ts — молоко, стол, автобус, тетрадь,
// карандаш, школа, река) — тут другой набор слов, без пересечений, и другая
// механика ответа: клик по номеру слога вместо выбора текстового варианта.
interface StressWord {
  syllables: string[];
  stressIndex: number; // 1-based номер ударного слога
}

const WORDS: StressWord[] = [
  { syllables: ['ВЕ', 'ЛО', 'СИ', 'ПЕД'], stressIndex: 4 },
  { syllables: ['КАР', 'ТО', 'ФЕЛЬ'], stressIndex: 2 },
  { syllables: ['МА', 'ГА', 'ЗИН'], stressIndex: 3 },
  { syllables: ['ТЕ', 'ЛЕ', 'ФОН'], stressIndex: 3 },
  { syllables: ['У', 'ЧИ', 'ТЕЛЬ'], stressIndex: 2 },
  { syllables: ['КРО', 'КО', 'ДИЛ'], stressIndex: 3 },
  { syllables: ['А', 'ПЕЛЬ', 'СИН'], stressIndex: 3 },
  { syllables: ['БАЛ', 'КОН'], stressIndex: 2 },
  { syllables: ['КОМ', 'ПЬЮ', 'ТЕР'], stressIndex: 2 },
  { syllables: ['О', 'ГУ', 'РЕЦ'], stressIndex: 3 },
  { syllables: ['СА', 'ХАР'], stressIndex: 1 },
  { syllables: ['СОЛ', 'ДАТ'], stressIndex: 2 },
  { syllables: ['РО', 'МАШ', 'КА'], stressIndex: 2 },
  { syllables: ['БЕ', 'РЁ', 'ЗА'], stressIndex: 2 },
  { syllables: ['ДО', 'РО', 'ГА'], stressIndex: 2 },
  { syllables: ['КОР', 'ЗИ', 'НА'], stressIndex: 2 },
  { syllables: ['ЛЯ', 'ГУШ', 'КА'], stressIndex: 2 },
  { syllables: ['ПИ', 'РО', 'ЖОК'], stressIndex: 3 },
  { syllables: ['ПО', 'ДУШ', 'КА'], stressIndex: 2 },
  { syllables: ['СТО', 'ЛИ', 'ЦА'], stressIndex: 2 },
  { syllables: ['КУХ', 'НЯ'], stressIndex: 1 },
  { syllables: ['ФО', 'НАРЬ'], stressIndex: 2 },
  { syllables: ['КА', 'НИ', 'КУ', 'ЛЫ'], stressIndex: 2 },
  { syllables: ['ВОС', 'КРЕ', 'СЕ', 'НЬЕ'], stressIndex: 3 },
];

const ROUND_SIZE = 10;
const VOWELS = /[аеёиоуыэюя]/i;

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Собирает слово целиком, делая ударную гласную в ударном слоге заглавной,
// остальные буквы — строчными. Например ['МО','ЛО','КО'], 3 → «молокО».
function stressedWord(word: StressWord): string {
  return word.syllables
    .map((syl, idx) => {
      const lower = syl.toLowerCase();
      if (idx + 1 !== word.stressIndex) return lower;
      const match = lower.match(VOWELS);
      if (!match || match.index === undefined) return lower;
      const pos = match.index;
      return lower.slice(0, pos) + lower[pos].toUpperCase() + lower.slice(pos + 1);
    })
    .join('');
}

function ordinalLabel(n: number): string {
  return `${n}-й`;
}

export default function UdarnyySlogTrainerPage() {
  const [round, setRound] = useState<StressWord[] | null>(null);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  function startRound() {
    setRound(shuffle(WORDS).slice(0, ROUND_SIZE));
    setIndex(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
  }

  function handleAnswer(syllableNumber: number) {
    if (selected !== null || !round) return;
    setSelected(syllableNumber);
    if (syllableNumber === round[index].stressIndex) {
      setScore((s) => s + 1);
    }
  }

  function handleNext() {
    if (!round) return;
    if (index + 1 >= round.length) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
  }

  const current = round && !finished ? round[index] : null;

  let praise = '';
  if (finished) {
    if (score === ROUND_SIZE) praise = '🏆 Идеально! Все слова угаданы верно!';
    else if (score >= ROUND_SIZE * 0.7) praise = '🎉 Отличный результат!';
    else if (score >= ROUND_SIZE * 0.4) praise = '👍 Неплохо, потренируемся ещё!';
    else praise = '💪 Продолжай тренироваться — обязательно получится!';
  }

  return (
    <div className="bg-[#28134f] min-h-screen">
      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">📢 Ударный слог</h1>
      </div>

      <TrainerGate type="trainer:udarnyy-slog">
        <div className="max-w-2xl mx-auto py-8 px-6">
          {!round && !finished && (
            <div className="card bg-white text-center py-10">
              <p className="text-xl font-bold text-[#3a1c6e] mb-3">Найди ударный слог!</p>
              <p className="text-gray-600 mb-8">
                Слово покажется по слогам. Нажми на номер слога, на который падает ударение.
                10 слов за раунд — 2 класс, слова посложнее.
              </p>
              <button onClick={startRound} className="btn-primary px-8 py-3">
                ▶️ Начать
              </button>
            </div>
          )}

          {current && (
            <div className="card bg-white text-center">
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-500 text-sm">
                  Слово {index + 1} из {round!.length}
                </span>
                <span className="text-gray-600 text-sm">
                  Счёт: <span className="font-bold text-orange">{score}</span>
                </span>
              </div>

              <p className="text-4xl font-black text-[#3a1c6e] mb-8 tracking-wide">
                {current.syllables.join('-')}
              </p>

              <div className="flex justify-center gap-3 flex-wrap mb-6">
                {current.syllables.map((_, i) => {
                  const num = i + 1;
                  const isCorrect = num === current.stressIndex;
                  const isSelected = selected === num;
                  let style = 'bg-white/10 border border-gray-200 text-[#3a1c6e] hover:bg-orange/10';
                  if (selected !== null) {
                    if (isCorrect) style = 'bg-green-500 border-green-500 text-white';
                    else if (isSelected) style = 'bg-red-500 border-red-500 text-white';
                    else style = 'bg-gray-100 border-gray-200 text-gray-400';
                  }
                  return (
                    <button
                      key={num}
                      onClick={() => handleAnswer(num)}
                      disabled={selected !== null}
                      className={`px-6 py-4 rounded-xl font-bold text-lg transition-all ${style}`}
                    >
                      {ordinalLabel(num)}
                    </button>
                  );
                })}
              </div>

              {selected !== null && (
                <div className="mb-6">
                  {selected === current.stressIndex ? (
                    <p className="text-green-600 font-black text-xl mb-2">✅ Верно!</p>
                  ) : (
                    <p className="text-red-500 font-black text-xl mb-2">❌ Неверно</p>
                  )}
                  <p className="text-gray-600">
                    Правильно: <span className="font-bold text-[#3a1c6e] text-2xl">{stressedWord(current)}</span>
                  </p>
                </div>
              )}

              <button
                onClick={handleNext}
                disabled={selected === null}
                className="btn-primary px-8 py-3 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {index + 1 >= round!.length ? 'Результат →' : 'Дальше →'}
              </button>
            </div>
          )}

          {finished && (
            <div className="card bg-white text-center py-10">
              <p className="text-3xl font-black text-[#3a1c6e] mb-2">{praise}</p>
              <p className="text-gray-600 mb-1">Правильных ответов</p>
              <p className="text-6xl font-black text-orange mb-8">
                {score} / {ROUND_SIZE}
              </p>
              <div className="flex justify-center gap-3 flex-wrap mb-6">
                <button onClick={startRound} className="btn-primary px-6 py-3">
                  🔁 Играть ещё
                </button>
              </div>
              <div className="pt-6 border-t border-gray-100">
                <ShareButtons
                  text={`Угадали ударение в ${score} из ${ROUND_SIZE} слов на Знаторике — попробуйте тоже:`}
                  url="https://znatorica.ru/trenazher/udarnyy-slog"
                  trackKey="udarnyy-slog"
                />
              </div>
            </div>
          )}
        </div>
      </TrainerGate>
    </div>
  );
}
