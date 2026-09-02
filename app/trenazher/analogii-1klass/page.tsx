'use client';

import Link from 'next/link';
import { useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import { ANALOGIES, type Analogy } from '@/lib/analogii-1klass';
import { praiseFor } from '@/lib/praise';

const ROUNDS_PER_SESSION = 10;

interface Option {
  emoji: string;
  word: string;
  correct: boolean;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickSession(): Analogy[] {
  return shuffle(ANALOGIES).slice(0, Math.min(ROUNDS_PER_SESSION, ANALOGIES.length));
}

function buildOptions(item: Analogy): Option[] {
  const options: Option[] = [
    { emoji: item.correctEmoji, word: item.correctWord, correct: true },
    ...item.wrongOptions.map((o) => ({ ...o, correct: false })),
  ];
  return shuffle(options);
}

export default function AnalogiiTrainerPage() {
  const [started, setStarted] = useState(false);
  const [session, setSession] = useState<Analogy[]>([]);
  const [round, setRound] = useState(0);
  const [options, setOptions] = useState<Option[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [pickedWord, setPickedWord] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [finished, setFinished] = useState(false);

  function begin() {
    const s = pickSession();
    setSession(s);
    setStarted(true);
    setFinished(false);
    setRound(1);
    setScore({ correct: 0, total: 0 });
    setOptions(buildOptions(s[0]));
    setFeedback(null);
    setPickedWord(null);
  }

  function nextRound() {
    if (round >= session.length) {
      setFinished(true);
      return;
    }
    const nextIdx = round; // 0-based index of the next item
    setRound((r) => r + 1);
    setOptions(buildOptions(session[nextIdx]));
    setFeedback(null);
    setPickedWord(null);
  }

  function handlePick(option: Option) {
    if (feedback) return;
    setPickedWord(option.word);
    setFeedback(option.correct ? 'correct' : 'wrong');
    setScore((s) => ({ correct: s.correct + (option.correct ? 1 : 0), total: s.total + 1 }));
    setTimeout(nextRound, option.correct ? 900 : 1400);
  }

  const current = session[round - 1];

  return (
    <div className="min-h-screen">
      <div className="border-b border-white/15 px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">🧩 Аналогии</h1>
      </div>

      <TrainerGate type="trainer:analogii-1klass">
        <div className="max-w-2xl mx-auto py-8 px-6">
          {!started && (
            <div className="card text-center py-10">
              <p className="text-xl font-bold text-white mb-4">Найди пару по тому же правилу</p>
              <p className="text-white/70 mb-8">
                Например: 🐕 Собака относится к 🏠 Будке, как 🐦 Птица относится к... 🪺 Гнезду!
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
                  Раунд {round} из {session.length}
                </span>
                <span className="text-gray-600 text-sm">
                  Верно: <span className="text-green-600 font-bold">{score.correct}</span> / {score.total}
                </span>
              </div>

              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-6">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${(round / session.length) * 100}%`,
                    background: 'linear-gradient(90deg, #F97316, #f72585)',
                  }}
                />
              </div>

              <div className="flex items-center justify-center gap-3 flex-wrap text-3xl mb-2">
                <span>{current.fromEmoji}</span>
                <span className="text-gray-400 text-xl">→</span>
                <span>{current.toEmoji}</span>
              </div>
              <p className="text-gray-500 text-sm mb-4">
                {current.fromWord} — {current.toWord}
              </p>

              <div className="flex items-center justify-center gap-3 flex-wrap text-4xl mb-1">
                <span>{current.from2Emoji}</span>
                <span className="text-gray-400 text-2xl">→</span>
                <span className="text-purple-600">❓</span>
              </div>
              <p className="text-xl font-bold text-[#3a1c6e] mb-6">
                {current.from2Word} — ?
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {options.map((opt) => {
                  const isPicked = pickedWord === opt.word;
                  const showState = feedback && (isPicked || opt.correct);
                  return (
                    <button
                      key={opt.word}
                      onClick={() => handlePick(opt)}
                      disabled={!!feedback}
                      className={`flex flex-col items-center justify-center gap-1 py-5 rounded-2xl border-4 transition-all ${
                        showState
                          ? opt.correct
                            ? 'border-green-500 bg-green-50 pop-in'
                            : 'border-red-400 bg-red-50 shake'
                          : 'border-gray-200 bg-gray-50 hover:border-orange hover:scale-105'
                      }`}
                    >
                      <span className="text-4xl">{opt.emoji}</span>
                      <span className="font-bold text-[#3a1c6e]">{opt.word}</span>
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
                    Правильный ответ: {current.correctEmoji} {current.correctWord}
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
