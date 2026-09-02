'use client';

import Link from 'next/link';
import { useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import { praiseFor } from '@/lib/praise';

interface Word {
  /** Слово с пропуском вместо безударной гласной, например "с_сна" */
  display: string;
  /** Правильная буква */
  answer: string;
  /** Проверочное слово целиком, например "сосны" */
  checkWord: string;
  /** Проверочное слово с выделенной ударной гласной для подсказки, например "сОсны" */
  checkHint: string;
  /** Варианты букв на выбор — только реальные орфографические пары (о/а или е/и/я) */
  options: string[];
}

const WORDS: Word[] = [
  { display: 'с_сна', answer: 'о', checkWord: 'сосны', checkHint: 'сОсны', options: ['о', 'а'] },
  { display: 'тр_ва', answer: 'а', checkWord: 'травы', checkHint: 'трАвы', options: ['о', 'а'] },
  { display: 'в_сна', answer: 'е', checkWord: 'вёсны', checkHint: 'вЁсны', options: ['е', 'и', 'я'] },
  { display: 'л_сной', answer: 'е', checkWord: 'лес', checkHint: 'лЕс', options: ['е', 'и', 'я'] },
  { display: 'м_ря', answer: 'о', checkWord: 'море', checkHint: 'мОре', options: ['о', 'а'] },
  { display: 'д_жди', answer: 'о', checkWord: 'дождь', checkHint: 'дОждь', options: ['о', 'а'] },
  { display: 'з_мля', answer: 'е', checkWord: 'земли', checkHint: 'зЕмли', options: ['е', 'и', 'я'] },
  { display: 'р_ка', answer: 'е', checkWord: 'реки', checkHint: 'рЕки', options: ['е', 'и', 'я'] },
  { display: 'в_да', answer: 'о', checkWord: 'воды', checkHint: 'вОды', options: ['о', 'а'] },
  { display: 'г_ра', answer: 'о', checkWord: 'горы', checkHint: 'гОры', options: ['о', 'а'] },
  { display: 'п_ля', answer: 'о', checkWord: 'поле', checkHint: 'пОле', options: ['о', 'а'] },
  { display: 'сл_ды', answer: 'е', checkWord: 'след', checkHint: 'слЕд', options: ['е', 'и', 'я'] },
  { display: 'в_лна', answer: 'о', checkWord: 'волны', checkHint: 'вОлны', options: ['о', 'а'] },
  { display: 'х_лодный', answer: 'о', checkWord: 'холод', checkHint: 'хОлод', options: ['о', 'а'] },
  { display: 'з_лёный', answer: 'е', checkWord: 'зелень', checkHint: 'зЕлень', options: ['е', 'и', 'я'] },
  { display: 'ст_на', answer: 'е', checkWord: 'стены', checkHint: 'стЕны', options: ['е', 'и', 'я'] },
  { display: 'с_ды', answer: 'а', checkWord: 'сад', checkHint: 'сАд', options: ['о', 'а'] },
  { display: 'стр_на', answer: 'а', checkWord: 'страны', checkHint: 'стрАны', options: ['о', 'а'] },
];

const ROUNDS_PER_SESSION = 10;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeSession(): Word[] {
  return shuffle(WORDS).slice(0, ROUNDS_PER_SESSION);
}

export default function BezudarnyeGlasnyeTrainerPage() {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [session, setSession] = useState<Word[]>([]);
  const [round, setRound] = useState(0);
  const [optionOrder, setOptionOrder] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [pickedLetter, setPickedLetter] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const current = session[round - 1];

  function begin() {
    const s = makeSession();
    setSession(s);
    setStarted(true);
    setFinished(false);
    setRound(1);
    setOptionOrder(shuffle(s[0].options));
    setScore({ correct: 0, total: 0 });
    setFeedback(null);
    setPickedLetter(null);
  }

  function nextRound() {
    if (round >= ROUNDS_PER_SESSION) {
      setFinished(true);
      return;
    }
    const nextIndex = round;
    setRound((r) => r + 1);
    setOptionOrder(shuffle(session[nextIndex].options));
    setFeedback(null);
    setPickedLetter(null);
  }

  function handlePick(letter: string) {
    if (feedback || !current) return;
    setPickedLetter(letter);
    const correct = letter === current.answer;
    setFeedback(correct ? 'correct' : 'wrong');
    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    setTimeout(nextRound, correct ? 900 : 2200);
  }

  return (
    <div className="min-h-screen">
      <div className="border-b border-white/15 px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">✏️ Безударные гласные</h1>
      </div>

      <TrainerGate type="trainer:bezudarnye-glasnye">
        <div className="max-w-2xl mx-auto py-8 px-6">
          {!started && (
            <div className="card text-center py-10">
              <p className="text-3xl font-black text-white mb-4">✏️ Проверь себя!</p>
              <p className="text-white/70 mb-8 text-lg">
                Вставь пропущенную букву в слово. Подсказка: подбери проверочное слово,
                где эта гласная стоит под ударением.
              </p>
              <button onClick={begin} className="btn-primary px-8 py-4 text-lg">
                🚀 Начать игру
              </button>
            </div>
          )}

          {started && !finished && current && (
            <div className="card bg-white text-center">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-500 text-sm">
                  Раунд {round} из {ROUNDS_PER_SESSION}
                </span>
                <span className="text-gray-600 text-sm">
                  Верно: <span className="text-green-600 font-bold">{score.correct}</span> / {score.total}
                </span>
              </div>

              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-8">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${(round / ROUNDS_PER_SESSION) * 100}%`,
                    background: 'linear-gradient(90deg, #F97316, #f72585)',
                  }}
                />
              </div>

              <p className="text-lg text-gray-500 mb-4">Какую букву нужно вставить?</p>

              <div className="mb-10">
                <span className="text-6xl sm:text-7xl font-black tracking-wide text-[#3a1c6e]">
                  {current.display.split('_')[0]}
                  <span
                    className={`inline-block mx-1 rounded-2xl border-4 align-middle ${
                      feedback
                        ? feedback === 'correct'
                          ? 'border-green-500 bg-green-50 text-green-600 pop-in'
                          : 'border-red-400 bg-red-50 text-red-500 shake'
                        : 'border-dashed border-orange bg-orange/10 text-orange'
                    }`}
                    style={{ width: '1.1em', height: '1.1em', lineHeight: '1.1em' }}
                  >
                    {pickedLetter ?? ''}
                  </span>
                  {current.display.split('_')[1]}
                </span>
              </div>

              <div className={`grid gap-4 mb-6 ${optionOrder.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                {optionOrder.map((letter) => {
                  const isPicked = pickedLetter === letter;
                  const isAnswer = letter === current.answer;
                  const showState = feedback && (isPicked || isAnswer);
                  return (
                    <button
                      key={letter}
                      onClick={() => handlePick(letter)}
                      disabled={!!feedback}
                      className={`flex items-center justify-center aspect-square rounded-2xl border-4 text-5xl font-black transition-all ${
                        showState
                          ? isAnswer
                            ? 'border-green-500 bg-green-50 text-green-600 pop-in'
                            : 'border-red-400 bg-red-50 text-red-500 shake'
                          : 'border-gray-200 bg-gray-50 text-[#3a1c6e] hover:border-orange hover:scale-105'
                      }`}
                    >
                      {letter}
                    </button>
                  );
                })}
              </div>

              <div className="min-h-[3rem]">
                {feedback === 'correct' && (
                  <p className="text-green-600 font-black text-xl pop-in">✅ Верно!</p>
                )}
                {feedback === 'wrong' && (
                  <p className="text-red-500 font-bold text-lg">
                    Проверочное слово: «{current.checkWord}» —{' '}
                    <span className="text-[#3a1c6e]">{current.checkHint}</span>
                  </p>
                )}
              </div>
            </div>
          )}

          {finished && (
            <div className="card bg-white text-center py-10">
              <p className="text-3xl font-black text-[#3a1c6e] mb-2">{praiseFor(score.correct, score.total).title}</p>
              <p className="text-gray-600 mb-1">Правильных ответов:</p>
              <p className="text-6xl font-black text-orange mb-6">{score.correct}</p>
              <p className="text-gray-500 mb-8">из {score.total}</p>
              <div className="flex justify-center gap-3 flex-wrap">
                <button onClick={begin} className="btn-primary px-6 py-3">
                  🔁 Играть ещё
                </button>
              </div>
            </div>
          )}
        </div>
      </TrainerGate>
    </div>
  );
}
