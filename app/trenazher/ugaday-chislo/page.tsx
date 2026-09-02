'use client';

import Link from 'next/link';
import { useState } from 'react';
import TrainerGate from '@/components/TrainerGate';

interface Difficulty {
  min: number;
  max: number;
  label: string;
  hint: string;
}

const DIFFICULTIES: Difficulty[] = [
  { min: 1, max: 20, label: '🟢 От 1 до 20', hint: '4–7 лет' },
  { min: 1, max: 50, label: '🟡 От 1 до 50', hint: '7–9 лет' },
  { min: 1, max: 100, label: '🔴 От 1 до 100', hint: '9–11 лет' },
];

interface GuessRecord {
  guess: number;
  hint: 'higher' | 'lower';
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function UgadayChisloTrainerPage() {
  const [range, setRange] = useState<Difficulty | null>(null);
  const [secret, setSecret] = useState<number | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [history, setHistory] = useState<GuessRecord[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [won, setWon] = useState(false);

  function startGame(d: Difficulty) {
    setRange(d);
    setSecret(randInt(d.min, d.max));
    setAttempts(0);
    setHistory([]);
    setInputValue('');
    setError(null);
    setWon(false);
  }

  function backToDifficulty() {
    setRange(null);
    setSecret(null);
    setAttempts(0);
    setHistory([]);
    setInputValue('');
    setError(null);
    setWon(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!range || secret === null) return;

    const parsed = Number(inputValue);
    if (inputValue.trim() === '' || !Number.isInteger(parsed) || parsed < range.min || parsed > range.max) {
      setError(`Введи число от ${range.min} до ${range.max}`);
      return;
    }
    setError(null);

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (parsed === secret) {
      setWon(true);
      setInputValue('');
      return;
    }

    const hint: 'higher' | 'lower' = parsed < secret ? 'higher' : 'lower';
    setHistory((h) => [...h, { guess: parsed, hint }]);
    setInputValue('');
  }

  return (
    <div className="min-h-screen">
      <div className="border-b border-white/15 px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">🎲 Угадай число</h1>
      </div>

      <TrainerGate type="trainer:ugaday-chislo">
        <div className="max-w-2xl mx-auto py-8 px-6">
          {/* Настройки / выбор диапазона */}
          <div className="card mb-8">
            <label className="block text-sm font-medium mb-3 text-white/90">Диапазон чисел</label>
            <div className="flex flex-col gap-3">
              {DIFFICULTIES.map((d) => (
                <button
                  key={d.max}
                  onClick={() => startGame(d)}
                  className={`text-left px-5 py-4 rounded-xl font-bold transition-all ${
                    range?.max === d.max && !won
                      ? 'text-white'
                      : 'bg-white/10 border border-white/25 text-white/80 hover:bg-white/15'
                  }`}
                  style={
                    range?.max === d.max && !won
                      ? { background: 'linear-gradient(135deg, #7C3AED, #f72585)' }
                      : undefined
                  }
                >
                  <span className="block text-lg">{d.label}</span>
                  <span className="block text-sm font-normal opacity-80">{d.hint}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Игровое поле */}
          {range && !won && (
            <div className="card bg-white text-center">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-500 text-sm">
                  Диапазон: {range.min}–{range.max}
                </span>
                <span className="text-gray-600 text-sm">
                  Попытка №<span className="font-bold text-orange">{attempts + 1}</span>
                </span>
              </div>

              <p className="text-xl font-bold text-[#3a1c6e] mb-6">Я загадал число. Угадаешь?</p>

              <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3 mb-4">
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={`${range.min}–${range.max}`}
                  className="w-40 text-center text-2xl font-bold px-4 py-3 rounded-xl border-2 border-gray-200 text-[#3a1c6e] focus:outline-none focus:border-orange"
                  autoFocus
                />
                <button type="submit" className="btn-primary px-8 py-3">
                  Проверить
                </button>
              </form>

              <div className="h-8 mb-2">
                {error && <p className="text-red-500 font-bold">{error}</p>}
                {!error && history.length > 0 && (
                  <>
                    {history[history.length - 1].hint === 'higher' && (
                      <p className="text-orange font-black text-xl">⬆️ Больше!</p>
                    )}
                    {history[history.length - 1].hint === 'lower' && (
                      <p className="text-orange font-black text-xl">⬇️ Меньше!</p>
                    )}
                  </>
                )}
              </div>

              {history.length > 0 && (
                <div className="text-left">
                  <p className="text-sm text-gray-500 mb-2">Твои попытки:</p>
                  <div className="max-h-40 overflow-y-auto rounded-xl bg-gray-50 border border-gray-200 p-3 flex flex-col-reverse gap-1">
                    {history.map((h, i) => (
                      <div key={i} className="text-sm text-gray-700 flex justify-between">
                        <span className="font-bold text-[#3a1c6e]">{h.guess}</span>
                        <span>{h.hint === 'higher' ? '→ больше ⬆️' : '→ меньше ⬇️'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Победа */}
          {won && secret !== null && (
            <div className="card bg-white text-center py-10">
              <p className="text-3xl font-black text-[#3a1c6e] mb-2">🎉 Угадал!</p>
              <p className="text-gray-600 mb-1">Число было</p>
              <p className="text-6xl font-black text-orange mb-6">{secret}</p>
              <p className="text-gray-500 mb-8">Попыток: {attempts}</p>
              <div className="flex justify-center gap-3 flex-wrap">
                <button onClick={backToDifficulty} className="btn-primary px-6 py-3">
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
