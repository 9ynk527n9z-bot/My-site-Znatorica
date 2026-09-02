'use client';

import Link from 'next/link';
import { useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import ListenButtonRu from '@/components/ListenButtonRu';
import { speakRu } from '@/lib/speak-ru';
import { praiseFor } from '@/lib/praise';

type Tab = 'study' | 'quiz';

const ROUNDS_PER_SESSION = 10;

interface RuNumber20 {
  digit: number;
  word: string;
}

const OBJECT_EMOJI = '🍓';

// Числительные от 1 до 20 на русском.
const NUMBERS_1_20: RuNumber20[] = [
  { digit: 1, word: 'Один' },
  { digit: 2, word: 'Два' },
  { digit: 3, word: 'Три' },
  { digit: 4, word: 'Четыре' },
  { digit: 5, word: 'Пять' },
  { digit: 6, word: 'Шесть' },
  { digit: 7, word: 'Семь' },
  { digit: 8, word: 'Восемь' },
  { digit: 9, word: 'Девять' },
  { digit: 10, word: 'Десять' },
  { digit: 11, word: 'Одиннадцать' },
  { digit: 12, word: 'Двенадцать' },
  { digit: 13, word: 'Тринадцать' },
  { digit: 14, word: 'Четырнадцать' },
  { digit: 15, word: 'Пятнадцать' },
  { digit: 16, word: 'Шестнадцать' },
  { digit: 17, word: 'Семнадцать' },
  { digit: 18, word: 'Восемнадцать' },
  { digit: 19, word: 'Девятнадцать' },
  { digit: 20, word: 'Двадцать' },
];

function randItem<T>(arr: T[], exclude?: T): T {
  let item = arr[Math.floor(Math.random() * arr.length)];
  if (exclude !== undefined) {
    while (item === exclude) {
      item = arr[Math.floor(Math.random() * arr.length)];
    }
  }
  return item;
}

interface QuizRound {
  answer: RuNumber20;
  options: RuNumber20[];
}

function makeRound(): QuizRound {
  const answer = randItem(NUMBERS_1_20);
  const options = [answer];
  while (options.length < 4) {
    const candidate = randItem(NUMBERS_1_20);
    if (!options.includes(candidate)) options.push(candidate);
  }
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return { answer, options };
}

export default function SchetDo20RuTrainerPage() {
  const [tab, setTab] = useState<Tab>('study');
  const [index, setIndex] = useState(0);

  const [quizStarted, setQuizStarted] = useState(false);
  const [round, setRound] = useState(0);
  const [quizRound, setQuizRound] = useState<QuizRound | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [pickedDigit, setPickedDigit] = useState<number | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [finished, setFinished] = useState(false);

  const current = NUMBERS_1_20[index];

  function goPrev() {
    setIndex((i) => (i - 1 + NUMBERS_1_20.length) % NUMBERS_1_20.length);
  }

  function goNext() {
    setIndex((i) => (i + 1) % NUMBERS_1_20.length);
  }

  function beginQuiz() {
    setQuizStarted(true);
    setFinished(false);
    setRound(1);
    setScore({ correct: 0, total: 0 });
    setQuizRound(makeRound());
    setFeedback(null);
    setPickedDigit(null);
  }

  function nextQuizRound() {
    if (round >= ROUNDS_PER_SESSION) {
      setFinished(true);
      return;
    }
    setRound((r) => r + 1);
    setQuizRound(makeRound());
    setFeedback(null);
    setPickedDigit(null);
  }

  function handlePick(option: RuNumber20) {
    if (feedback || !quizRound) return;
    setPickedDigit(option.digit);
    speakRu(option.word);
    const correct = option.digit === quizRound.answer.digit;
    setFeedback(correct ? 'correct' : 'wrong');
    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    setTimeout(nextQuizRound, correct ? 900 : 1400);
  }

  // Размер эмодзи-предметов уменьшается для больших чисел, чтобы всё влезало.
  const objectsSizeClass = current.digit > 10 ? 'text-3xl sm:text-4xl' : 'text-6xl';
  const quizObjectsSizeClass = quizRound && quizRound.answer.digit > 10 ? 'text-2xl sm:text-3xl' : 'text-5xl';

  return (
    <div className="bg-black min-h-screen">
      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4 flex items-center justify-between flex-wrap gap-4">
        <div>
          <Link href="/trenazher" className="text-orange hover:underline text-sm">
            ← Все тренажеры
          </Link>
          <h1 className="text-2xl font-bold mt-2">🔢 Счёт до 20</h1>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setTab('study')}
            className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${
              tab === 'study' ? 'bg-orange text-white' : 'bg-black border border-[#2D2350] text-gray-400'
            }`}
          >
            📖 Изучение
          </button>
          <button
            onClick={() => setTab('quiz')}
            className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${
              tab === 'quiz' ? 'bg-orange text-white' : 'bg-black border border-[#2D2350] text-gray-400'
            }`}
          >
            🎮 Сосчитай и выбери
          </button>
        </div>
      </div>

      <TrainerGate type="trainer:schet-do-20-ru">
        {tab === 'study' && (
          <div className="max-w-2xl mx-auto py-10 px-6">
            <p className="text-gray-400 mb-8 text-center">
              Листай числа стрелками и нажимай «Прослушать», чтобы услышать, как называется число.
            </p>

            <div className="card bg-white text-center py-10 px-6">
              <p className="text-gray-500 text-sm mb-4">
                Число {index + 1} из {NUMBERS_1_20.length}
              </p>
              <div className="text-8xl font-black text-[#3a1c6e] mb-4">{current.digit}</div>
              <div className={`${objectsSizeClass} mb-4 leading-relaxed break-all`}>
                {OBJECT_EMOJI.repeat(current.digit)}
              </div>
              <div className="font-bold text-2xl text-[#3a1c6e] mb-6">{current.word}</div>
              <ListenButtonRu text={current.word} label="🔊 Слушать" />
            </div>

            <div className="flex justify-between mt-6">
              <button onClick={goPrev} className="btn-primary px-6 py-3">
                ← Предыдущее
              </button>
              <button onClick={goNext} className="btn-primary px-6 py-3">
                Следующее →
              </button>
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 mt-10">
              {NUMBERS_1_20.map((item, i) => (
                <button
                  key={item.digit}
                  onClick={() => setIndex(i)}
                  className={`aspect-square rounded-lg font-bold text-lg transition-colors ${
                    i === index
                      ? 'bg-orange text-white'
                      : 'bg-white/10 border border-white/25 text-white/80 hover:bg-white/15'
                  }`}
                >
                  {item.digit}
                </button>
              ))}
            </div>
          </div>
        )}

        {tab === 'quiz' && (
          <div className="max-w-2xl mx-auto py-8 px-6">
            {!quizStarted && (
              <div className="card text-center py-10">
                <p className="text-xl font-bold mb-6">Сосчитай ягодки и выбери правильное число!</p>
                <button onClick={beginQuiz} className="btn-primary px-8 py-4 text-lg">
                  ▶️ Начать игру
                </button>
              </div>
            )}

            {quizStarted && !finished && quizRound && (
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

                <p className="text-xl font-bold text-[#3a1c6e] mb-2">Сколько здесь предметов?</p>
                <div className={`${quizObjectsSizeClass} mb-4 leading-relaxed break-all`}>
                  {OBJECT_EMOJI.repeat(quizRound.answer.digit)}
                </div>
                <div className="mb-6">
                  <ListenButtonRu text="Сколько здесь предметов?" label="🔊 Слушать вопрос" />
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6">
                  {quizRound.options.map((option) => {
                    const isPicked = pickedDigit === option.digit;
                    const isAnswer = option.digit === quizRound.answer.digit;
                    const showState = feedback && (isPicked || isAnswer);
                    return (
                      <button
                        key={option.digit}
                        onClick={() => handlePick(option)}
                        disabled={!!feedback}
                        className={`flex items-center justify-center aspect-square rounded-2xl border-4 text-3xl sm:text-4xl font-black transition-all ${
                          showState
                            ? isAnswer
                              ? 'border-green-500 bg-green-50 text-[#3a1c6e] pop-in'
                              : 'border-red-400 bg-red-50 text-[#3a1c6e] shake'
                            : 'border-gray-200 bg-gray-50 text-[#3a1c6e] hover:border-orange hover:scale-105'
                        }`}
                      >
                        {option.digit}
                      </button>
                    );
                  })}
                </div>

                <div className="h-8">
                  {feedback === 'correct' && (
                    <p className="text-green-600 font-black text-xl pop-in">✅ Верно!</p>
                  )}
                  {feedback === 'wrong' && (
                    <p className="text-red-500 font-black text-xl">
                      Правильно: «{quizRound.answer.digit}» 👀
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
                  <button onClick={beginQuiz} className="btn-primary px-6 py-3">
                    🔁 Играть ещё
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </TrainerGate>
    </div>
  );
}
