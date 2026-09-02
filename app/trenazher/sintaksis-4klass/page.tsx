'use client';

import Link from 'next/link';
import { useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import { SINTAKSIS_SENTENCES, ROLE_LABELS, ALL_ROLES, SintaksisRole, SintaksisItem } from '@/lib/sintaksis-4klass';
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

function makeSession(): SintaksisItem[] {
  return shuffle(SINTAKSIS_SENTENCES).slice(0, ROUNDS_PER_SESSION);
}

function makeOptions(correct: SintaksisRole): SintaksisRole[] {
  const others = shuffle(ALL_ROLES.filter((r) => r !== correct)).slice(0, 3);
  return shuffle([correct, ...others]);
}

function renderSentence(item: SintaksisItem, isWrong: boolean) {
  const idx = item.sentence.indexOf(item.targetWord);
  if (idx === -1) {
    return <>{item.sentence}</>;
  }
  const before = item.sentence.slice(0, idx);
  const target = item.sentence.slice(idx, idx + item.targetWord.length);
  const after = item.sentence.slice(idx + item.targetWord.length);
  return (
    <>
      {before}
      <span className={`underline decoration-4 decoration-orange text-orange ${isWrong ? 'shake' : ''}`}>
        {target}
      </span>
      {after}
    </>
  );
}

export default function SintaksisTrainerPage() {
  const [started, setStarted] = useState(false);
  const [session, setSession] = useState<SintaksisItem[]>([]);
  const [round, setRound] = useState(0);
  const [options, setOptions] = useState<SintaksisRole[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [pickedRole, setPickedRole] = useState<SintaksisRole | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [finished, setFinished] = useState(false);

  const current = session[round - 1];

  function begin() {
    const newSession = makeSession();
    setStarted(true);
    setFinished(false);
    setSession(newSession);
    setRound(1);
    setOptions(makeOptions(newSession[0].role));
    setScore({ correct: 0, total: 0 });
    setFeedback(null);
    setPickedRole(null);
  }

  function nextRound() {
    if (round >= ROUNDS_PER_SESSION) {
      setFinished(true);
      return;
    }
    const nextIndex = round;
    setRound((r) => r + 1);
    setOptions(makeOptions(session[nextIndex].role));
    setFeedback(null);
    setPickedRole(null);
  }

  function handlePick(role: SintaksisRole) {
    if (feedback || !current) return;
    setPickedRole(role);
    const correct = role === current.role;
    setFeedback(correct ? 'correct' : 'wrong');
    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    setTimeout(nextRound, correct ? 900 : 1700);
  }

  return (
    <div className="min-h-screen">
      <div className="border-b border-white/15 px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">🧩 Члены предложения</h1>
      </div>

      <TrainerGate type="trainer:sintaksis-4klass">
        <div className="max-w-2xl mx-auto py-8 px-6">
          {!started && (
            <div className="card bg-white text-center py-10">
              <p className="text-3xl font-black text-[#3a1c6e] mb-4">🧩 Члены предложения</p>
              <p className="text-gray-600 mb-8 text-lg">
                Прочитай предложение и определи, каким членом предложения является выделенное слово.
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

              <p className="text-lg text-gray-500 mb-4">Каким членом предложения является выделенное слово?</p>

              <div
                key={round}
                className="text-2xl sm:text-3xl font-bold text-[#3a1c6e] mb-10 pop-in leading-relaxed"
              >
                {renderSentence(current, feedback === 'wrong')}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {options.map((role) => {
                  const isPicked = pickedRole === role;
                  const isCorrectAnswer = feedback && role === current.role;
                  const showWrong = feedback && isPicked && role !== current.role;
                  return (
                    <button
                      key={role}
                      onClick={() => handlePick(role)}
                      disabled={!!feedback}
                      className={`px-4 py-6 rounded-2xl border-4 font-black text-base sm:text-lg transition-all ${
                        isCorrectAnswer
                          ? 'border-green-500 bg-green-50 text-green-700 pop-in'
                          : showWrong
                          ? 'border-red-400 bg-red-50 text-red-500 shake'
                          : 'border-gray-200 bg-gray-50 text-gray-700 hover:scale-105'
                      }`}
                    >
                      {ROLE_LABELS[role]}
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
                    Правильно: {ROLE_LABELS[current.role]} 👀
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
