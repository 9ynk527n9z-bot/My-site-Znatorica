'use client';

import Link from 'next/link';
import { useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import { WORKS, AUTHOR_LABELS, OTHER_AUTHOR_LABEL, Author, KlassikaQuestion } from '@/lib/klassika-4klass';
import { praiseFor } from '@/lib/praise';

const ROUNDS_PER_SESSION = 10;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface Round {
  question: KlassikaQuestion;
  options: string[]; // labels, one matches AUTHOR_LABELS[question.author]
}

function makeRound(question: KlassikaQuestion): Round {
  const wrongAuthors = (Object.keys(AUTHOR_LABELS) as Author[]).filter((a) => a !== question.author);
  const wrongLabels = wrongAuthors.map((a) => AUTHOR_LABELS[a]);
  const options = shuffle([AUTHOR_LABELS[question.author], ...wrongLabels, OTHER_AUTHOR_LABEL]);
  return { question, options };
}

function makeSession(): Round[] {
  return shuffle(WORKS)
    .slice(0, ROUNDS_PER_SESSION)
    .map(makeRound);
}

export default function KlassikaTrainerPage() {
  const [started, setStarted] = useState(false);
  const [session, setSession] = useState<Round[]>([]);
  const [round, setRound] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [pickedOption, setPickedOption] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [finished, setFinished] = useState(false);

  const current = session[round - 1];

  function begin() {
    setStarted(true);
    setFinished(false);
    setSession(makeSession());
    setRound(1);
    setScore({ correct: 0, total: 0 });
    setFeedback(null);
    setPickedOption(null);
  }

  function nextRound() {
    if (round >= ROUNDS_PER_SESSION) {
      setFinished(true);
      return;
    }
    setRound((r) => r + 1);
    setFeedback(null);
    setPickedOption(null);
  }

  function handlePick(option: string) {
    if (feedback || !current) return;
    setPickedOption(option);
    const correctLabel = AUTHOR_LABELS[current.question.author];
    const correct = option === correctLabel;
    setFeedback(correct ? 'correct' : 'wrong');
    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    setTimeout(nextRound, correct ? 900 : 1600);
  }

  return (
    <div className="min-h-screen">
      <div className="border-b border-white/15 px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">📚 Классика — угадай автора</h1>
      </div>

      <TrainerGate type="trainer:klassika-4klass">
        <div className="max-w-2xl mx-auto py-8 px-6">
          {!started && (
            <div className="card bg-white text-center py-10">
              <p className="text-3xl font-black text-[#3a1c6e] mb-4">📚 Классика</p>
              <p className="text-gray-600 mb-8 text-lg">
                Перед тобой название произведения — угадай, кто его написал: Пушкин, Толстой или Крылов.
              </p>
              <button onClick={begin} className="btn-primary px-8 py-4 text-lg">
                ▶️ Начать
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

              <p className="text-lg text-gray-500 mb-4">Кто автор этого произведения?</p>

              <div
                key={round}
                className={`text-2xl sm:text-3xl font-black text-[#3a1c6e] mb-10 pop-in ${
                  feedback === 'wrong' ? 'shake' : ''
                }`}
              >
                {current.question.work}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {current.options.map((option) => {
                  const correctLabel = AUTHOR_LABELS[current.question.author];
                  const isPicked = pickedOption === option;
                  const isCorrectAnswer = feedback && option === correctLabel;
                  const showWrong = feedback && isPicked && option !== correctLabel;
                  return (
                    <button
                      key={option}
                      onClick={() => handlePick(option)}
                      disabled={!!feedback}
                      className={`px-4 py-6 rounded-2xl border-4 font-black text-base sm:text-lg transition-all ${
                        isCorrectAnswer
                          ? 'border-green-500 bg-green-50 text-green-700 pop-in'
                          : showWrong
                          ? 'border-red-400 bg-red-50 text-red-500 shake'
                          : 'border-gray-200 bg-gray-50 text-gray-700 hover:scale-105'
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
                  <p className="text-red-500 font-black text-xl">
                    Правильно: {AUTHOR_LABELS[current.question.author]} 👀
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
