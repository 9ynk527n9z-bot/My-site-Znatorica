'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import TrainerGate from '@/components/TrainerGate';

type Cell = 'X' | 'O' | null;
type BoardT = Cell[];

const LINES: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function emptyBoard(): BoardT {
  return Array(9).fill(null);
}

function calculateWinner(board: BoardT): { winner: 'X' | 'O'; line: number[] } | null {
  for (const line of LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as 'X' | 'O', line };
    }
  }
  return null;
}

function getComputerMove(board: BoardT): number {
  const empties = board.map((c, i) => (c === null ? i : -1)).filter((i) => i !== -1);
  if (empties.length === 0) return -1;

  // 1. Выиграть, если можно
  for (const i of empties) {
    const trial = [...board];
    trial[i] = 'O';
    if (calculateWinner(trial)?.winner === 'O') return i;
  }
  // 2. Заблокировать победу игрока
  for (const i of empties) {
    const trial = [...board];
    trial[i] = 'X';
    if (calculateWinner(trial)?.winner === 'X') return i;
  }
  // 3. Центр
  if (board[4] === null) return 4;
  // 4. Случайный угол
  const corners = [0, 2, 6, 8].filter((i) => board[i] === null);
  if (corners.length > 0) return corners[Math.floor(Math.random() * corners.length)];
  // 5. Любая свободная клетка
  return empties[Math.floor(Math.random() * empties.length)];
}

export default function KrestikiNolikiTrainerPage() {
  const [board, setBoard] = useState<BoardT>(emptyBoard());
  const [xIsNext, setXIsNext] = useState(true); // true — ход игрока (X)
  const [score, setScore] = useState({ wins: 0, draws: 0, losses: 0 });
  const scoredRef = useRef(false);

  const winnerInfo = calculateWinner(board);
  const isDraw = !winnerInfo && board.every((c) => c !== null);
  const gameOver = !!winnerInfo || isDraw;

  // Ход компьютера
  useEffect(() => {
    if (gameOver || xIsNext) return;
    const timer = setTimeout(() => {
      setBoard((prev) => {
        if (calculateWinner(prev)) return prev;
        const move = getComputerMove(prev);
        if (move === -1) return prev;
        const next = [...prev];
        next[move] = 'O';
        return next;
      });
      setXIsNext(true);
    }, 500);
    return () => clearTimeout(timer);
  }, [board, xIsNext, gameOver]);

  // Подсчёт результата раунда (один раз за раунд)
  useEffect(() => {
    if (gameOver && !scoredRef.current) {
      scoredRef.current = true;
      if (winnerInfo?.winner === 'X') {
        setScore((s) => ({ ...s, wins: s.wins + 1 }));
      } else if (winnerInfo?.winner === 'O') {
        setScore((s) => ({ ...s, losses: s.losses + 1 }));
      } else {
        setScore((s) => ({ ...s, draws: s.draws + 1 }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver]);

  function handleCellClick(i: number) {
    if (gameOver || !xIsNext || board[i]) return;
    setBoard((prev) => {
      const next = [...prev];
      next[i] = 'X';
      return next;
    });
    setXIsNext(false);
  }

  function resetBoard() {
    setBoard(emptyBoard());
    setXIsNext(true);
    scoredRef.current = false;
  }

  let resultMessage = '';
  if (winnerInfo?.winner === 'X') resultMessage = 'Ты выиграл! 🎉';
  else if (winnerInfo?.winner === 'O') resultMessage = 'Компьютер выиграл, попробуй ещё раз';
  else if (isDraw) resultMessage = 'Ничья 🤝';

  return (
    <div className="min-h-screen">
      <div className="border-b border-white/15 px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">🎯 Крестики-нолики</h1>
      </div>

      <TrainerGate type="trainer:krestiki-noliki">
        <div className="max-w-2xl mx-auto py-8 px-6">
          <div className="card mb-8">
            <p className="text-white/90 text-center">
              Ты играешь крестиками (❌), компьютер — ноликами (⭕). Собери три в ряд быстрее соперника!
            </p>
          </div>

          <div className="card bg-white text-center">
            <div className="flex justify-center gap-6 mb-6">
              <div>
                <p className="text-gray-500 text-sm">Победы</p>
                <p className="text-2xl font-black text-orange">{score.wins}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Ничьи</p>
                <p className="text-2xl font-black text-[#3a1c6e]">{score.draws}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Поражения</p>
                <p className="text-2xl font-black text-gray-400">{score.losses}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto mb-6">
              {board.map((cell, i) => {
                const isWinningCell = !!winnerInfo?.line.includes(i);
                return (
                  <button
                    key={i}
                    onClick={() => handleCellClick(i)}
                    disabled={gameOver || !xIsNext || !!cell}
                    className={`flex items-center justify-center aspect-square rounded-2xl border-4 text-4xl sm:text-5xl font-black transition-all ${
                      isWinningCell
                        ? 'border-green-500 bg-green-50'
                        : cell
                          ? 'border-gray-200 bg-gray-50'
                          : 'border-gray-200 bg-gray-50 hover:border-orange hover:scale-105'
                    }`}
                  >
                    {cell === 'X' && '❌'}
                    {cell === 'O' && '⭕'}
                  </button>
                );
              })}
            </div>

            <div className="h-10 flex items-center justify-center">
              {gameOver && <p className="text-xl font-black text-[#3a1c6e]">{resultMessage}</p>}
              {!gameOver && !xIsNext && (
                <p className="text-gray-500">Компьютер думает…</p>
              )}
            </div>

            {gameOver && (
              <div className="mt-4">
                <button onClick={resetBoard} className="btn-primary px-6 py-3">
                  🔁 Играть снова
                </button>
              </div>
            )}
          </div>
        </div>
      </TrainerGate>
    </div>
  );
}
