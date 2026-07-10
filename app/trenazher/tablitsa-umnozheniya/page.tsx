'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import TrainerGate from '@/components/TrainerGate';

type Mode = 'table' | 'practice' | 'timed' | 'inverse';

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

interface Problem {
  a: number;
  b: number;
  answer: number;
  missing?: 'a' | 'b';
}

function makeProblem(): Problem {
  const a = randInt(2, 9);
  const b = randInt(1, 10);
  return { a, b, answer: a * b };
}

function makeInverseProblem(): Problem {
  const a = randInt(2, 9);
  const b = randInt(1, 10);
  const missing = Math.random() < 0.5 ? 'a' : 'b';
  return { a, b, answer: missing === 'a' ? a : b, missing };
}

export default function MultiplicationTablePage() {
  const [mode, setMode] = useState<Mode>('table');
  const [tableNumber, setTableNumber] = useState(2);

  const [problem, setProblem] = useState<Problem>(() => makeProblem());
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const [timeLeft, setTimeLeft] = useState(60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timedFinished, setTimedFinished] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (mode !== 'timed' || !timerRunning) return;
    if (timeLeft <= 0) {
      setTimerRunning(false);
      setTimedFinished(true);
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [mode, timerRunning, timeLeft]);

  function switchMode(newMode: Mode) {
    setMode(newMode);
    setFeedback(null);
    setInput('');
    setScore({ correct: 0, total: 0 });
    setTimerRunning(false);
    setTimedFinished(false);
    setTimeLeft(60);
    setProblem(newMode === 'inverse' ? makeInverseProblem() : makeProblem());
  }

  function nextProblem() {
    setInput('');
    setFeedback(null);
    setProblem(mode === 'inverse' ? makeInverseProblem() : makeProblem());
    inputRef.current?.focus();
  }

  function checkAnswer() {
    const value = parseInt(input, 10);
    if (isNaN(value)) return;

    const correct = value === problem.answer;
    setFeedback(correct ? 'correct' : 'wrong');
    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));

    if (mode === 'practice') {
      setTimeout(nextProblem, correct ? 700 : 1500);
    } else if (mode === 'timed') {
      setTimeout(nextProblem, correct ? 400 : 900);
    }
  }

  function startTimed() {
    setScore({ correct: 0, total: 0 });
    setTimeLeft(60);
    setTimerRunning(true);
    setTimedFinished(false);
    nextProblem();
  }

  const questionText =
    mode === 'inverse'
      ? problem.missing === 'a'
        ? `? × ${problem.b} = ${problem.a * problem.b}`
        : `${problem.a} × ? = ${problem.a * problem.b}`
      : `${problem.a} × ${problem.b} = ?`;

  return (
    <div className="bg-black min-h-screen">
      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">✖️ Таблица умножения</h1>
      </div>

      <TrainerGate type="trainer:tablitsa-umnozheniya">
      <div className="max-w-4xl mx-auto py-10 px-6">
        <div className="flex gap-3 mb-8 flex-wrap">
          <button
            onClick={() => switchMode('table')}
            className={`px-5 py-2 rounded-lg font-bold transition-colors ${
              mode === 'table' ? 'bg-orange text-white' : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
            }`}
          >
            📖 Таблица
          </button>
          <button
            onClick={() => switchMode('practice')}
            className={`px-5 py-2 rounded-lg font-bold transition-colors ${
              mode === 'practice' ? 'bg-orange text-white' : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
            }`}
          >
            🎯 Тренировка
          </button>
          <button
            onClick={() => switchMode('timed')}
            className={`px-5 py-2 rounded-lg font-bold transition-colors ${
              mode === 'timed' ? 'bg-orange text-white' : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
            }`}
          >
            ⏱️ На время
          </button>
          <button
            onClick={() => switchMode('inverse')}
            className={`px-5 py-2 rounded-lg font-bold transition-colors ${
              mode === 'inverse' ? 'bg-orange text-white' : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
            }`}
          >
            🔄 Найди множитель
          </button>
        </div>

        {/* Режим: Таблица */}
        {mode === 'table' && (
          <div className="card">
            <p className="text-gray-400 mb-4">Выбери число, чтобы увидеть его таблицу умножения</p>
            <div className="flex gap-2 flex-wrap mb-8">
              {Array.from({ length: 8 }, (_, i) => i + 2).map((n) => (
                <button
                  key={n}
                  onClick={() => setTableNumber(n)}
                  className={`w-12 h-12 rounded-lg font-bold text-lg transition-colors ${
                    tableNumber === n
                      ? 'bg-orange text-white'
                      : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Array.from({ length: 10 }, (_, i) => i + 1).map((i) => (
                <div key={i} className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-4 text-center text-xl font-mono">
                  {tableNumber} × {i} = <span className="text-orange font-bold">{tableNumber * i}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Режим: Тренировка / Найди множитель */}
        {(mode === 'practice' || mode === 'inverse') && (
          <div className="card text-center">
            <p className="text-gray-400 mb-2">
              Правильно: <span className="text-orange font-bold">{score.correct}</span> из {score.total}
            </p>
            <p className="text-6xl font-mono font-bold my-8">{questionText}</p>
            <input
              ref={inputRef}
              type="number"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
              autoFocus
              className="w-32 text-3xl text-center px-4 py-3 rounded-lg bg-black border border-[#2D2350] focus:border-orange transition-colors mb-6"
            />
            <div>
              <button onClick={checkAnswer} className="btn-primary px-8">
                Проверить
              </button>
            </div>
            {feedback === 'correct' && <p className="text-green-400 font-bold text-xl mt-6">✅ Верно!</p>}
            {feedback === 'wrong' && (
              <p className="text-red-400 font-bold text-xl mt-6">
                ❌ Правильный ответ: {problem.answer}
              </p>
            )}
          </div>
        )}

        {/* Режим: На время */}
        {mode === 'timed' && (
          <div className="card text-center">
            {!timerRunning && !timedFinished && (
              <>
                <p className="text-gray-300 mb-6">
                  60 секунд на как можно больше правильных ответов. Готов?
                </p>
                <button onClick={startTimed} className="btn-primary px-8 text-lg">
                  ▶️ Начать
                </button>
              </>
            )}

            {timerRunning && (
              <>
                <div className="flex justify-between items-center mb-6">
                  <p className="text-gray-400">
                    Правильно: <span className="text-orange font-bold">{score.correct}</span>
                  </p>
                  <p className="text-2xl font-bold text-orange">⏱️ {timeLeft}с</p>
                </div>
                <p className="text-6xl font-mono font-bold my-8">{questionText}</p>
                <input
                  ref={inputRef}
                  type="number"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                  autoFocus
                  className="w-32 text-3xl text-center px-4 py-3 rounded-lg bg-black border border-[#2D2350] focus:border-orange transition-colors mb-6"
                />
                <div>
                  <button onClick={checkAnswer} className="btn-primary px-8">
                    Проверить
                  </button>
                </div>
              </>
            )}

            {timedFinished && (
              <>
                <p className="text-2xl font-bold mb-2">⏱️ Время вышло!</p>
                <p className="text-gray-300 mb-6">
                  Правильных ответов: <span className="text-orange font-bold text-2xl">{score.correct}</span> из {score.total}
                </p>
                <button onClick={startTimed} className="btn-primary px-8">
                  🔁 Попробовать ещё раз
                </button>
              </>
            )}
          </div>
        )}
      </div>
      </TrainerGate>
    </div>
  );
}
