'use client';

import Link from 'next/link';
import { useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import { RAZBOR_WORDS, WordAnalysis, countMorphs, rootText } from '@/lib/razbor-sostav-3klass';
import { praiseFor } from '@/lib/praise';

type QuestionKind = 'приставка' | 'суффикс' | 'корень';

interface Round {
  word: WordAnalysis;
  kind: QuestionKind;
  question: string;
  options: string[];
  correct: string;
}

const ROUNDS_PER_SESSION = 10;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function formatBreakdown(word: WordAnalysis): string {
  return word.morphs
    .map((m) => `${m.type} «${m.text || '∅'}»`)
    .join(' + ');
}

function buildCountRound(word: WordAnalysis, kind: 'приставка' | 'суффикс'): Round {
  const morphType = kind === 'приставка' ? 'приставка' : 'суффикс';
  const correctCount = countMorphs(word, morphType);
  const pool = ['0', '1', '2', '3'].filter((n) => n !== String(correctCount));
  const options = shuffle([String(correctCount), ...shuffle(pool).slice(0, 3)]);
  const question =
    kind === 'приставка'
      ? `Сколько приставок в слове «${word.word}»?`
      : `Сколько суффиксов в слове «${word.word}»?`;
  return { word, kind, question, options, correct: String(correctCount) };
}

function buildRootRound(word: WordAnalysis, allWords: WordAnalysis[]): Round {
  const correct = rootText(word);
  const sameWordDistractors = word.morphs
    .filter((m) => m.type !== 'корень' && m.text && m.text !== correct)
    .map((m) => m.text);

  const otherRoots = shuffle(
    allWords
      .filter((w) => w.word !== word.word)
      .map((w) => rootText(w))
      .filter((r) => r && r !== correct)
  );

  const distractors: string[] = [];
  for (const d of [...sameWordDistractors, ...otherRoots]) {
    if (distractors.length >= 3) break;
    if (!distractors.includes(d) && d !== correct) distractors.push(d);
  }

  const options = shuffle([correct, ...distractors.slice(0, 3)]);
  return {
    word,
    kind: 'корень',
    question: `Найди корень в слове «${word.word}».`,
    options,
    correct,
  };
}

function makeSession(): Round[] {
  const words = shuffle(RAZBOR_WORDS).slice(0, ROUNDS_PER_SESSION);
  return words.map((word) => {
    const kinds: ('приставка' | 'суффикс' | 'корень')[] = ['приставка', 'суффикс', 'корень'];
    const kind = kinds[Math.floor(Math.random() * kinds.length)];
    if (kind === 'корень') return buildRootRound(word, RAZBOR_WORDS);
    return buildCountRound(word, kind);
  });
}

export default function RazborSostavTrainerPage() {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [session, setSession] = useState<Round[]>([]);
  const [round, setRound] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const current = session[round - 1];

  function begin() {
    setSession(makeSession());
    setStarted(true);
    setFinished(false);
    setRound(1);
    setScore({ correct: 0, total: 0 });
    setFeedback(null);
    setPicked(null);
  }

  function nextRound() {
    if (round >= session.length) {
      setFinished(true);
      return;
    }
    setRound((r) => r + 1);
    setFeedback(null);
    setPicked(null);
  }

  function handlePick(option: string) {
    if (feedback || !current) return;
    setPicked(option);
    const correct = option === current.correct;
    setFeedback(correct ? 'correct' : 'wrong');
    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    setTimeout(nextRound, correct ? 900 : 2600);
  }

  return (
    <div className="min-h-screen">
      <div className="border-b border-white/15 px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">🧩 Разбор слова по составу</h1>
      </div>

      <TrainerGate type="trainer:razbor-sostav-3klass">
        <div className="max-w-2xl mx-auto py-8 px-6">
          {!started && (
            <div className="card text-center py-10">
              <p className="text-3xl font-black text-white mb-4">🧩 Проверь себя!</p>
              <p className="text-white/70 mb-8 text-lg">
                Найди приставку, корень, суффикс и окончание в слове.
                10 раундов — считай морфемы и выбирай верный вариант.
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
                  Раунд {round} из {session.length}
                </span>
                <span className="text-gray-600 text-sm">
                  Верно: <span className="text-green-600 font-bold">{score.correct}</span> / {score.total}
                </span>
              </div>

              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-8">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${(round / session.length) * 100}%`,
                    background: 'linear-gradient(90deg, #F97316, #f72585)',
                  }}
                />
              </div>

              <div className="mb-8">
                <p className="text-4xl sm:text-5xl font-black tracking-wide text-[#3a1c6e] mb-4">
                  {current.word.word}
                </p>
                <p className="text-lg text-gray-500">{current.question}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {current.options.map((opt) => {
                  const isPicked = picked === opt;
                  const isAnswer = opt === current.correct;
                  const showState = feedback && (isPicked || isAnswer);
                  return (
                    <button
                      key={opt}
                      onClick={() => handlePick(opt)}
                      disabled={!!feedback}
                      className={`flex items-center justify-center rounded-2xl border-4 py-6 text-2xl sm:text-3xl font-black transition-all ${
                        showState
                          ? isAnswer
                            ? 'border-green-500 bg-green-50 text-green-600 pop-in'
                            : 'border-red-400 bg-red-50 text-red-500 shake'
                          : 'border-gray-200 bg-gray-50 text-[#3a1c6e] hover:border-orange hover:scale-105'
                      }`}
                    >
                      {opt}
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
                    Разбор слова: <span className="text-[#3a1c6e]">{formatBreakdown(current.word)}</span>
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
