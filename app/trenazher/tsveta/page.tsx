'use client';

import Link from 'next/link';
import { useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import { speakRu } from '@/lib/speak-ru';
import { praiseFor } from '@/lib/praise';

const ROUNDS_PER_SESSION = 10;

interface ColorItem {
  name: string;
  hex: string;
}

const COLORS: ColorItem[] = [
  { name: 'Красный', hex: '#EF4444' },
  { name: 'Оранжевый', hex: '#F97316' },
  { name: 'Жёлтый', hex: '#EAB308' },
  { name: 'Зелёный', hex: '#22C55E' },
  { name: 'Голубой', hex: '#38BDF8' },
  { name: 'Синий', hex: '#3B82F6' },
  { name: 'Фиолетовый', hex: '#A855F7' },
  { name: 'Розовый', hex: '#EC4899' },
];

const BUTTON_STYLES = [
  'border-purple-400 hover:bg-purple-500/20',
  'border-sky-400 hover:bg-sky-500/20',
  'border-amber-400 hover:bg-amber-500/20',
  'border-pink-400 hover:bg-pink-500/20',
];

function randItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

interface QuizRound {
  answer: ColorItem;
  options: ColorItem[];
}

function makeRound(): QuizRound {
  const answer = randItem(COLORS);
  const options: ColorItem[] = [answer];
  while (options.length < 4) {
    const candidate = randItem(COLORS);
    if (!options.some((o) => o.name === candidate.name)) options.push(candidate);
  }
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return { answer, options };
}

export default function TsvetaTrainerPage() {
  const [started, setStarted] = useState(false);
  const [round, setRound] = useState(0);
  const [quizRound, setQuizRound] = useState<QuizRound | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [finished, setFinished] = useState(false);

  function beginQuiz() {
    setStarted(true);
    setFinished(false);
    setRound(1);
    setScore({ correct: 0, total: 0 });
    const first = makeRound();
    setQuizRound(first);
    setFeedback(null);
    setPicked(null);
  }

  function nextRound() {
    if (round >= ROUNDS_PER_SESSION) {
      setFinished(true);
      return;
    }
    setRound((r) => r + 1);
    const next = makeRound();
    setQuizRound(next);
    setFeedback(null);
    setPicked(null);
  }

  function handlePick(option: ColorItem) {
    if (feedback || !quizRound) return;
    setPicked(option.name);
    const correct = option.name === quizRound.answer.name;
    setFeedback(correct ? 'correct' : 'wrong');
    speakRu(correct ? 'Верно!' : `Нет. Это ${quizRound.answer.name.toLowerCase()}`);
    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    setTimeout(nextRound, correct ? 1200 : 1800);
  }

  return (
    <div className="bg-black min-h-screen">
      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4 flex items-center justify-between flex-wrap gap-4">
        <div>
          <Link href="/trenazher" className="text-orange hover:underline text-sm">
            ← Все тренажеры
          </Link>
          <h1 className="text-2xl font-bold mt-2">🌈 Цвета</h1>
        </div>
      </div>

      <TrainerGate type="trainer:tsveta">
        <div className="max-w-2xl mx-auto py-8 px-6">
          {!started && (
            <div className="card text-center py-10">
              <p className="text-xl font-bold mb-6">Посмотри на кружок и выбери правильный цвет!</p>
              <button onClick={beginQuiz} className="btn-primary px-8 py-4 text-lg">
                ▶️ Начать игру
              </button>
            </div>
          )}

          {started && !finished && quizRound && (
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

              <p className="text-xl font-bold text-[#3a1c6e] mb-4">Какой это цвет?</p>

              <div className="flex justify-center mb-6">
                <div
                  className="w-40 h-40 rounded-full shadow-lg border-4 border-white ring-4 ring-gray-100"
                  style={{ backgroundColor: quizRound.answer.hex }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {quizRound.options.map((option, i) => {
                  const isPicked = picked === option.name;
                  const isAnswer = option.name === quizRound.answer.name;
                  const showState = feedback && (isPicked || isAnswer);
                  return (
                    <button
                      key={option.name}
                      onClick={() => handlePick(option)}
                      disabled={!!feedback}
                      className={`flex items-center justify-center py-6 rounded-2xl border-4 text-xl font-black transition-all ${
                        showState
                          ? isAnswer
                            ? 'border-green-500 bg-green-50 text-[#3a1c6e] pop-in'
                            : 'border-red-400 bg-red-50 text-[#3a1c6e] shake'
                          : `bg-gray-50 text-[#3a1c6e] hover:scale-105 ${BUTTON_STYLES[i % BUTTON_STYLES.length]}`
                      }`}
                    >
                      {option.name}
                    </button>
                  );
                })}
              </div>

              <div className="h-8">
                {feedback === 'correct' && <p className="text-green-600 font-black text-xl pop-in">✅ Верно!</p>}
                {feedback === 'wrong' && (
                  <p className="text-red-500 font-black text-xl">Правильно: «{quizRound.answer.name}» 👀</p>
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
      </TrainerGate>
    </div>
  );
}
