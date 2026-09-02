'use client';

import Link from 'next/link';
import { useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import { praiseFor } from '@/lib/praise';

type Part = 'noun' | 'adj' | 'verb';

const PART_LABELS: Record<Part, string> = {
  noun: 'Существительное',
  adj: 'Прилагательное',
  verb: 'Глагол',
};

const PART_COLORS: Record<Part, string> = {
  noun: '#F97316',
  adj: '#7C3AED',
  verb: '#22C55E',
};

interface Word {
  word: string;
  part: Part;
}

// 20+ однозначных слов, по 7 на каждую часть речи, никаких спорных случаев
const WORDS: Word[] = [
  { word: 'СОБАКА', part: 'noun' },
  { word: 'ДЕРЕВО', part: 'noun' },
  { word: 'КНИГА', part: 'noun' },
  { word: 'ДОЖДЬ', part: 'noun' },
  { word: 'МАШИНА', part: 'noun' },
  { word: 'СОЛНЦЕ', part: 'noun' },
  { word: 'ДЕВОЧКА', part: 'noun' },
  { word: 'ГОРОД', part: 'noun' },
  { word: 'КРАСИВЫЙ', part: 'adj' },
  { word: 'БЫСТРЫЙ', part: 'adj' },
  { word: 'СИНИЙ', part: 'adj' },
  { word: 'ВЕСЁЛЫЙ', part: 'adj' },
  { word: 'БОЛЬШОЙ', part: 'adj' },
  { word: 'МЯГКИЙ', part: 'adj' },
  { word: 'СЛАДКИЙ', part: 'adj' },
  { word: 'ХОЛОДНЫЙ', part: 'adj' },
  { word: 'БЕЖАТЬ', part: 'verb' },
  { word: 'ЧИТАТЬ', part: 'verb' },
  { word: 'ПРЫГНУТЬ', part: 'verb' },
  { word: 'ПЕТЬ', part: 'verb' },
  { word: 'ПИСАТЬ', part: 'verb' },
  { word: 'СМЕЯТЬСЯ', part: 'verb' },
  { word: 'ЛЕТЕТЬ', part: 'verb' },
  { word: 'ИГРАТЬ', part: 'verb' },
];

const ROUNDS_PER_SESSION = 10;
const PARTS: Part[] = ['noun', 'adj', 'verb'];

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

export default function ChastiRechiTrainerPage() {
  const [started, setStarted] = useState(false);
  const [session, setSession] = useState<Word[]>([]);
  const [round, setRound] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [pickedPart, setPickedPart] = useState<Part | null>(null);
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
    setPickedPart(null);
  }

  function nextRound() {
    if (round >= ROUNDS_PER_SESSION) {
      setFinished(true);
      return;
    }
    setRound((r) => r + 1);
    setFeedback(null);
    setPickedPart(null);
  }

  function handlePick(part: Part) {
    if (feedback || !current) return;
    setPickedPart(part);
    const correct = part === current.part;
    setFeedback(correct ? 'correct' : 'wrong');
    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    setTimeout(nextRound, correct ? 900 : 1500);
  }

  return (
    <div className="min-h-screen">
      <div className="border-b border-white/15 px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">🔤 Части речи</h1>
      </div>

      <TrainerGate type="trainer:chasti-rechi">
        <div className="max-w-2xl mx-auto py-8 px-6">
          {!started && (
            <div className="card bg-white text-center py-10">
              <p className="text-3xl font-black text-[#3a1c6e] mb-4">🔤 Части речи</p>
              <p className="text-gray-600 mb-8 text-lg">
                Прочитай слово и выбери — это существительное, прилагательное или глагол?
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

              <p className="text-lg text-gray-500 mb-4">Какая это часть речи?</p>

              <div
                key={round}
                className={`text-6xl sm:text-7xl font-black text-[#3a1c6e] mb-10 pop-in ${
                  feedback === 'wrong' ? 'shake' : ''
                }`}
              >
                {current.word}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {PARTS.map((part) => {
                  const isPicked = pickedPart === part;
                  const isCorrectAnswer = feedback && part === current.part;
                  const showWrong = feedback && isPicked && part !== current.part;
                  return (
                    <button
                      key={part}
                      onClick={() => handlePick(part)}
                      disabled={!!feedback}
                      className={`px-4 py-6 rounded-2xl border-4 font-black text-lg sm:text-xl transition-all ${
                        isCorrectAnswer
                          ? 'border-green-500 bg-green-50 text-green-700 pop-in'
                          : showWrong
                          ? 'border-red-400 bg-red-50 text-red-500 shake'
                          : 'border-gray-200 bg-gray-50 text-gray-700 hover:scale-105'
                      }`}
                      style={!feedback ? { borderColor: `${PART_COLORS[part]}33` } : undefined}
                    >
                      {PART_LABELS[part]}
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
                    Правильно: {PART_LABELS[current.part]} 👀
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
