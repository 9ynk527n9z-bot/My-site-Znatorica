'use client';

import Link from 'next/link';
import { useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import { ANALIZ_TEKSTA_4KLASS_ITEMS, type AnalizTekstaItem } from '@/lib/analiz-teksta-4klass';
import { praiseFor } from '@/lib/praise';

const ROUNDS_PER_SESSION = Math.min(10, ANALIZ_TEKSTA_4KLASS_ITEMS.length);

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildSession(): AnalizTekstaItem[] {
  return shuffle(ANALIZ_TEKSTA_4KLASS_ITEMS).slice(0, ROUNDS_PER_SESSION);
}

export default function AnalizTeksta4KlassTrainerPage() {
  const [started, setStarted] = useState(false);
  const [session, setSession] = useState<AnalizTekstaItem[]>([]);
  const [round, setRound] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [pickedIndex, setPickedIndex] = useState<number | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [finished, setFinished] = useState(false);

  const item = session[round - 1];

  function begin() {
    setStarted(true);
    setFinished(false);
    setSession(buildSession());
    setRound(1);
    setShowQuestion(false);
    setFeedback(null);
    setPickedIndex(null);
    setScore({ correct: 0, total: 0 });
  }

  function nextRound() {
    if (round >= ROUNDS_PER_SESSION) {
      setFinished(true);
      return;
    }
    setRound((r) => r + 1);
    setShowQuestion(false);
    setFeedback(null);
    setPickedIndex(null);
  }

  function handlePick(index: number) {
    if (feedback || !item) return;
    setPickedIndex(index);
    const correct = index === item.correctIndex;
    setFeedback(correct ? 'correct' : 'wrong');
    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    setTimeout(nextRound, correct ? 1200 : 2000);
  }

  return (
    <div className="min-h-screen">
      <div className="border-b border-white/15 px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">📚 Анализ текста — тема и главная мысль</h1>
      </div>

      <TrainerGate type="trainer:analiz-teksta-4klass">
        <div className="max-w-2xl mx-auto py-8 px-6">
          {!started && (
            <div className="card text-center">
              <p className="text-lg text-white/90 mb-6">
                Прочитай текст и определи его тему или главную мысль. Всего {ROUNDS_PER_SESSION} текстов.
              </p>
              <button onClick={begin} className="btn-primary px-8 py-4 text-lg">
                ▶️ Начать
              </button>
            </div>
          )}

          {started && !finished && item && (
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

              <p className="text-xl leading-relaxed text-[#3a1c6e] font-medium mb-6 text-left">
                {item.text}
              </p>

              {!showQuestion && (
                <button onClick={() => setShowQuestion(true)} className="btn-primary px-8 py-3 text-lg">
                  Дальше →
                </button>
              )}

              {showQuestion && (
                <>
                  <p className="text-lg font-bold text-[#3a1c6e] mb-4">{item.question}</p>
                  <div className="grid grid-cols-1 gap-3 mb-6">
                    {item.options.map((option, index) => {
                      const isPicked = pickedIndex === index;
                      const isCorrectOption = index === item.correctIndex;
                      const showState = feedback && (isPicked || isCorrectOption);
                      return (
                        <button
                          key={index}
                          onClick={() => handlePick(index)}
                          disabled={!!feedback}
                          className={`text-left px-5 py-4 rounded-xl border-4 font-bold transition-all ${
                            showState
                              ? isCorrectOption
                                ? 'border-green-500 bg-green-50 text-green-700 pop-in'
                                : 'border-red-400 bg-red-50 text-red-600 shake'
                              : 'border-gray-200 bg-gray-50 text-[#3a1c6e] hover:border-orange hover:scale-[1.02]'
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>

                  <div className="h-8">
                    {feedback === 'correct' && (
                      <p className="text-green-600 font-black text-xl pop-in">✅ Верно!</p>
                    )}
                    {feedback === 'wrong' && (
                      <p className="text-red-500 font-black text-xl">Перечитай текст ещё раз 👀</p>
                    )}
                  </div>
                </>
              )}
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
