'use client';

import Link from 'next/link';
import { useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import {
  genAddition,
  genSubtraction,
  genComparison,
  genMultiplication,
  genDivision,
  genTwoDigit,
} from '@/lib/quiz/math-generators';
import type { QuizQuestion } from '@/lib/quiz/types';

const TOTAL_STEPS = 10;
// «Несгораемые» ступеньки: с них не скатываешься до самого начала при ошибке.
const CHECKPOINTS = [1, 4, 7, 10];

// Подбираем вопрос под сложность конкретной ступеньки. Каждый вызов —
// свежая партия вопросов, из которой берём один случайный — так вопросы
// не повторяются при повторном прохождении той же ступеньки.
function questionForStep(step: number): QuizQuestion {
  let pool: QuizQuestion[];
  if (step <= 2) pool = genAddition(1, 10);
  else if (step <= 4) pool = genSubtraction(1, 20);
  else if (step <= 6) pool = genComparison(50);
  else if (step <= 8) pool = genMultiplication();
  else if (step === 9) pool = genDivision();
  else pool = genTwoDigit();
  return pool[Math.floor(Math.random() * pool.length)];
}

export default function MatematicheskayaLesenkaPage() {
  const [started, setStarted] = useState(false);
  const [won, setWon] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [safeStep, setSafeStep] = useState(1);
  const [bestStep, setBestStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  function goToStep(step: number) {
    setCurrentStep(step);
    setCurrentQuestion(questionForStep(step));
    setSelected(null);
    setFeedback(null);
    setBestStep((b) => Math.max(b, step));
  }

  function begin() {
    setStarted(true);
    setWon(false);
    setSafeStep(1);
    goToStep(1);
  }

  function handleAnswer(i: number) {
    if (selected !== null || !currentQuestion) return;
    setSelected(i);
    setFeedback(i === currentQuestion.correct ? 'correct' : 'wrong');
  }

  function advance() {
    if (feedback === 'correct') {
      if (currentStep === TOTAL_STEPS) {
        setWon(true);
        setStarted(false);
        return;
      }
      if (CHECKPOINTS.includes(currentStep)) {
        setSafeStep(currentStep);
      }
      goToStep(currentStep + 1);
      return;
    }

    // Ошибка. На несгораемой ступеньке скатываемся к предыдущей несгораемой
    // (или к самому началу, если это была первая несгораемая ступенька).
    // На обычной ступеньке — назад к последней пройденной несгораемой.
    if (CHECKPOINTS.includes(currentStep)) {
      const idx = CHECKPOINTS.indexOf(currentStep);
      const prevCheckpoint = idx > 0 ? CHECKPOINTS[idx - 1] : 1;
      setSafeStep(prevCheckpoint);
      goToStep(prevCheckpoint);
    } else {
      goToStep(safeStep);
    }
  }

  return (
    <div className="min-h-screen">
      <div className="border-b border-white/15 px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">🪜 Математическая лесенка</h1>
      </div>

      <TrainerGate type="trainer:matematicheskaya-lesenka">
        <div className="max-w-3xl mx-auto py-8 px-6">
          {!started && !won && (
            <div className="card text-center py-10">
              <p className="text-5xl mb-4">🪜</p>
              <p className="text-xl font-bold mb-2">Готов подняться по лесенке?</p>
              <p className="text-gray-400 max-w-lg mx-auto mb-2">
                10 примеров подряд — чем выше ступенька, тем сложнее задание. Ступеньки{' '}
                <span className="text-amber-400 font-bold">1, 4, 7 и 10</span> — несгораемые: если
                ошибёшься на обычной ступеньке, скатишься только до последней пройденной несгораемой,
                а не в самый низ.
              </p>
              {bestStep > 0 && (
                <p className="text-gray-400 mb-4">
                  Лучший результат за игру:{' '}
                  <span className="text-orange font-bold">ступенька {bestStep}</span>
                </p>
              )}
              <button onClick={begin} className="btn-primary px-8 py-4 text-lg mt-2">
                🚀 Начать
              </button>
            </div>
          )}

          {started && !won && currentQuestion && (
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              {/* Лесенка-индикатор ступенек */}
              <div className="card px-3 py-4 flex flex-col-reverse items-center gap-1 mx-auto sm:mx-0 sm:sticky sm:top-4">
                {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((step) => {
                  const isCheckpoint = CHECKPOINTS.includes(step);
                  const isDone = step < currentStep;
                  const isCurrent = step === currentStep;
                  let circleClass =
                    'relative w-9 h-9 rounded-full flex items-center justify-center text-sm font-black transition-all border-2 ';
                  let style: React.CSSProperties | undefined;
                  if (isDone) {
                    circleClass += 'bg-green-500 border-green-400 text-white';
                  } else if (isCurrent) {
                    circleClass += 'text-white border-white scale-110 shadow-lg';
                    style = { background: 'linear-gradient(135deg, #F97316, #f72585)' };
                  } else if (isCheckpoint) {
                    circleClass += 'bg-white/10 border-amber-400/70 text-amber-200/90';
                  } else {
                    circleClass += 'bg-white/10 border-white/15 text-white/40';
                  }
                  return (
                    <div key={step} className="flex flex-col-reverse items-center">
                      <div className={circleClass} style={style}>
                        {step}
                        {isCheckpoint && (
                          <span className="absolute -top-1.5 -right-1.5 text-[10px]">🚩</span>
                        )}
                      </div>
                      {step < TOTAL_STEPS && <div className="w-0.5 h-3 bg-white/15" />}
                    </div>
                  );
                })}
              </div>

              {/* Текущий вопрос */}
              <div className="card bg-white text-center flex-1 w-full">
                <div className="flex justify-between items-center mb-2 text-sm flex-wrap gap-2">
                  <span className="text-gray-500 font-bold">
                    Ступенька {currentStep} из {TOTAL_STEPS}
                  </span>
                  <span className="text-gray-500">
                    Лучший результат: <span className="text-orange font-bold">{bestStep}</span>
                  </span>
                </div>

                {CHECKPOINTS.includes(currentStep) && (
                  <p className="text-amber-600 text-xs font-bold mb-4">
                    🚩 Несгораемая ступенька — при ошибке здесь ты вернёшься только к предыдущей несгораемой
                  </p>
                )}

                <p className="text-xl sm:text-2xl font-bold text-[#3a1c6e] mb-6 leading-relaxed">
                  {currentQuestion.prompt}
                </p>

                <div
                  className={`grid gap-3 mb-6 ${
                    currentQuestion.options.length === 3 ? 'grid-cols-3' : 'grid-cols-2'
                  }`}
                >
                  {currentQuestion.options.map((opt, i) => {
                    let cls = 'border-2 border-orange text-[#3a1c6e] hover:bg-orange/10';
                    if (selected !== null) {
                      if (i === currentQuestion.correct) cls = 'bg-orange border-2 border-orange text-white';
                      else if (i === selected) cls = 'bg-red-100 border-2 border-red-400 text-red-600';
                      else cls = 'border-2 border-gray-200 text-gray-400';
                    }
                    return (
                      <button
                        key={i}
                        onClick={() => handleAnswer(i)}
                        disabled={selected !== null}
                        className={`px-4 py-3 rounded-lg font-bold transition-colors ${cls}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                <div className="min-h-[3rem]">
                  {selected !== null && (
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <p className={`font-bold ${feedback === 'correct' ? 'text-green-600' : 'text-red-500'}`}>
                        {feedback === 'correct'
                          ? '✅ Верно!'
                          : `❌ Верно: ${currentQuestion.options[currentQuestion.correct]}`}
                        {feedback === 'wrong' && currentQuestion.hint && (
                          <span className="text-gray-500 font-normal"> — {currentQuestion.hint}</span>
                        )}
                      </p>
                      <button onClick={advance} className="btn-primary px-6 py-2">
                        Дальше →
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {won && (
            <div className="card bg-white text-center py-10">
              <p className="text-6xl mb-4">🏆</p>
              <p className="text-2xl sm:text-3xl font-black text-[#3a1c6e] mb-2">
                Лесенка пройдена! Ты дошёл до самого верха!
              </p>
              <p className="text-gray-500 mb-8">Все {TOTAL_STEPS} ступенек позади — отличный результат!</p>
              <button onClick={begin} className="btn-primary px-6 py-3">
                🔁 Пройти снова
              </button>
            </div>
          )}
        </div>
      </TrainerGate>
    </div>
  );
}
