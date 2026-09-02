'use client';

import Link from 'next/link';
import { useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import { praiseFor } from '@/lib/praise';

const ROUNDS_PER_SESSION = 10;

interface OrganItem {
  id: string;
  emoji: string;
  name: string;
  question: string;
}

const ITEMS: OrganItem[] = [
  { id: 'glaza', emoji: '👀', name: 'Глаза', question: 'Каким органом мы видим?' },
  { id: 'ushi', emoji: '👂', name: 'Уши', question: 'Каким органом мы слышим звуки?' },
  { id: 'nos', emoji: '👃', name: 'Нос', question: 'Каким органом мы чувствуем запахи?' },
  { id: 'yazyk', emoji: '👅', name: 'Язык', question: 'Каким органом мы ощущаем вкус еды?' },
  { id: 'kozha', emoji: '✋', name: 'Кожа', question: 'Каким органом мы чувствуем прикосновения, тепло и холод?' },
  { id: 'serdce', emoji: '❤️', name: 'Сердце', question: 'Какой орган перекачивает кровь по всему телу?' },
  { id: 'legkie', emoji: '🫁', name: 'Лёгкие', question: 'Каким органом мы дышим?' },
  { id: 'mozg', emoji: '🧠', name: 'Мозг', question: 'Какой орган управляет всем телом и помогает думать?' },
  { id: 'zheludok', emoji: '🫃', name: 'Желудок', question: 'Какой орган переваривает пищу?' },
  { id: 'myshcy', emoji: '💪', name: 'Мышцы', question: 'Что помогает нам двигаться и быть сильными?' },
];

const BUTTON_COLORS = [
  'border-purple-600 bg-purple-500 hover:bg-purple-600',
  'border-sky-600 bg-sky-500 hover:bg-sky-600',
  'border-amber-600 bg-amber-500 hover:bg-amber-600',
  'border-pink-600 bg-pink-500 hover:bg-pink-600',
];

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

interface QuizRound {
  answer: OrganItem;
  options: OrganItem[];
}

function makeSequence(): OrganItem[] {
  return shuffle(ITEMS).slice(0, ROUNDS_PER_SESSION);
}

function makeRound(answer: OrganItem): QuizRound {
  const distractors = shuffle(ITEMS.filter((p) => p.id !== answer.id)).slice(0, 3);
  const options = shuffle([answer, ...distractors]);
  return { answer, options };
}

export default function ChelovekOrganyChuvstvTrainerPage() {
  const [started, setStarted] = useState(false);
  const [sequence, setSequence] = useState<OrganItem[]>([]);
  const [round, setRound] = useState(0);
  const [quizRound, setQuizRound] = useState<QuizRound | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [pickedId, setPickedId] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [finished, setFinished] = useState(false);

  function begin() {
    const seq = makeSequence();
    setSequence(seq);
    setStarted(true);
    setFinished(false);
    setRound(1);
    setScore({ correct: 0, total: 0 });
    const firstRound = makeRound(seq[0]);
    setQuizRound(firstRound);
    setFeedback(null);
    setPickedId(null);
  }

  function nextRound() {
    if (round >= ROUNDS_PER_SESSION) {
      setFinished(true);
      return;
    }
    const nextIndex = round;
    const nextQuiz = makeRound(sequence[nextIndex]);
    setRound((r) => r + 1);
    setQuizRound(nextQuiz);
    setFeedback(null);
    setPickedId(null);
  }

  function handlePick(option: OrganItem) {
    if (feedback || !quizRound) return;
    setPickedId(option.id);
    const correct = option.id === quizRound.answer.id;
    setFeedback(correct ? 'correct' : 'wrong');
    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    setTimeout(nextRound, correct ? 1000 : 1500);
  }

  return (
    <div className="bg-black min-h-screen">
      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">🧠 Органы чувств и организм</h1>
      </div>

      <TrainerGate type="trainer:chelovek-organy-chuvstv">
        <div className="max-w-2xl mx-auto py-8 px-6">
          {!started && (
            <div className="card text-center py-10">
              <p className="text-6xl mb-4">🧑‍⚕️</p>
              <p className="text-xl font-bold mb-2">Каким органом мы это делаем?</p>
              <p className="text-gray-400 mb-6">
                Читай вопрос и выбирай правильный орган среди четырёх ярких кнопок!
              </p>
              <button onClick={begin} className="btn-primary px-8 py-4 text-lg">
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
                    background: 'linear-gradient(90deg, #a855f7, #ec4899)',
                  }}
                />
              </div>

              <p className="text-xl font-bold text-[#3a1c6e] mb-4">{quizRound.answer.question}</p>
              <div className="text-8xl mb-6">🤔</div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {quizRound.options.map((option, i) => {
                  const isPicked = pickedId === option.id;
                  const isAnswer = option.id === quizRound.answer.id;
                  const showState = feedback && (isPicked || isAnswer);
                  return (
                    <button
                      key={option.id}
                      onClick={() => handlePick(option)}
                      disabled={!!feedback}
                      className={`flex flex-col items-center justify-center gap-1 py-6 px-4 rounded-2xl border-4 text-white transition-all ${
                        showState
                          ? isAnswer
                            ? 'border-green-500 bg-green-500 pop-in'
                            : 'border-red-500 bg-red-500 shake'
                          : `${BUTTON_COLORS[i % BUTTON_COLORS.length]} hover:scale-105`
                      }`}
                    >
                      <span className="text-4xl">{option.emoji}</span>
                      <span className="text-xl font-black">{option.name}</span>
                    </button>
                  );
                })}
              </div>

              <div className="h-8">
                {feedback === 'correct' && <p className="text-green-600 font-black text-xl pop-in">✅ Верно!</p>}
                {feedback === 'wrong' && (
                  <p className="text-red-500 font-black text-xl">
                    Правильно: «{quizRound.answer.name}» {quizRound.answer.emoji}
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
