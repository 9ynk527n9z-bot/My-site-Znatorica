'use client';

import Link from 'next/link';
import { useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import { STORIES_4_5, type Story } from '@/lib/pereskaz-4-5let';
import { shuffle } from '@/lib/shapes';
import { praiseFor } from '@/lib/praise';

const ROUNDS_PER_SESSION = STORIES_4_5.length;

interface DisplayStep {
  originalIndex: number;
  emoji: string;
  text: string;
}

function makeRoundOrder(story: Story): DisplayStep[] {
  return shuffle(story.steps.map((step, originalIndex) => ({ originalIndex, emoji: step.emoji, text: step.text })));
}

export default function Pereskaz45LetTrainerPage() {
  const [started, setStarted] = useState(false);
  const [sessionStories, setSessionStories] = useState<Story[]>([]);
  const [round, setRound] = useState(0);
  const [displaySteps, setDisplaySteps] = useState<DisplayStep[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<number[]>([]); // originalIndex-ы в порядке клика
  const [wrongIndex, setWrongIndex] = useState<number | null>(null);
  const [roundDone, setRoundDone] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [finished, setFinished] = useState(false);

  const currentStory = sessionStories[round - 1];

  function setupRound(story: Story) {
    setDisplaySteps(makeRoundOrder(story));
    setSelectedOrder([]);
    setWrongIndex(null);
    setRoundDone(false);
  }

  function begin() {
    const order = shuffle(STORIES_4_5);
    setSessionStories(order);
    setStarted(true);
    setFinished(false);
    setRound(1);
    setScore({ correct: 0, total: 0 });
    setupRound(order[0]);
  }

  function nextRound() {
    if (round >= ROUNDS_PER_SESSION) {
      setFinished(true);
      return;
    }
    const nextR = round + 1;
    setRound(nextR);
    setupRound(sessionStories[nextR - 1]);
  }

  function handlePick(step: DisplayStep) {
    if (wrongIndex !== null || roundDone) return;
    const expected = selectedOrder.length;

    if (step.originalIndex === expected) {
      const newOrder = [...selectedOrder, step.originalIndex];
      setSelectedOrder(newOrder);

      if (newOrder.length === displaySteps.length) {
        setRoundDone(true);
        setScore((s) => ({ correct: s.correct + 1, total: s.total + 1 }));
        setTimeout(nextRound, 1600);
      }
    } else {
      setWrongIndex(step.originalIndex);
      setScore((s) => ({ correct: s.correct, total: s.total + 1 }));
      setTimeout(() => {
        setWrongIndex(null);
        setSelectedOrder([]);
      }, 800);
    }
  }

  return (
    <div className="min-h-screen">
      <div className="border-b border-white/15 px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">🖼️ Пересказ по картинкам (4–5 лет)</h1>
      </div>

      <TrainerGate type="trainer:pereskaz-4-5let">
        <div className="max-w-2xl mx-auto py-8 px-6">
          {!started && (
            <div className="card text-center">
              <p className="text-white/80 mb-6">
                Перед тобой карточки истории вперемешку. Нажимай на них по порядку — от начала до конца — и
                собери историю правильно!
              </p>
              <button onClick={begin} className="btn-primary px-8 py-3">
                ▶️ Начать игру
              </button>
            </div>
          )}

          {started && !finished && currentStory && (
            <div className="card bg-white text-center">
              <div className="flex justify-between items-center mb-2 text-sm text-gray-600">
                <span>
                  Раунд {round} из {ROUNDS_PER_SESSION}
                </span>
                <span>
                  Собрано историй: <span className="text-green-600 font-bold">{score.correct}</span>
                </span>
              </div>

              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-amber-500 transition-all duration-300"
                  style={{ width: `${((round - 1) / ROUNDS_PER_SESSION) * 100}%` }}
                />
              </div>

              <p className="text-xl font-bold text-[#3a1c6e] mb-6">
                История «{currentStory.title}» — собери по порядку
              </p>

              <div className="flex flex-wrap justify-center items-stretch gap-4">
                {displaySteps.map((step) => {
                  const positionInSelection = selectedOrder.indexOf(step.originalIndex);
                  const isSelected = positionInSelection !== -1;
                  return (
                    <button
                      key={step.originalIndex}
                      onClick={() => handlePick(step)}
                      disabled={isSelected}
                      className={`relative w-32 h-32 flex flex-col items-center justify-center gap-2 p-3 rounded-xl border-4 transition-all ${
                        isSelected
                          ? 'border-green-500 bg-green-50 pop-in'
                          : wrongIndex === step.originalIndex
                          ? 'border-red-400 bg-red-50 shake'
                          : 'border-gray-200 bg-gray-50 hover:border-orange hover:scale-105'
                      }`}
                    >
                      {isSelected && (
                        <span className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-amber-500 text-white font-black flex items-center justify-center text-sm shadow">
                          {positionInSelection + 1}
                        </span>
                      )}
                      <span className="text-4xl">{step.emoji}</span>
                      <span className="text-xs text-gray-700 leading-snug">{step.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {finished && (
            <div className="card bg-white text-center py-10">
              <p className="text-3xl font-black text-[#3a1c6e] mb-2">{praiseFor(score.correct, ROUNDS_PER_SESSION).title}</p>
              <p className="text-gray-600 mb-1">Собрано историй правильно:</p>
              <p className="text-6xl font-black text-orange mb-6">{score.correct}</p>
              <p className="text-gray-500 mb-8">из {ROUNDS_PER_SESSION}</p>
              <button onClick={begin} className="btn-primary px-6 py-3">
                🔁 Играть ещё
              </button>
            </div>
          )}
        </div>
      </TrainerGate>
    </div>
  );
}
