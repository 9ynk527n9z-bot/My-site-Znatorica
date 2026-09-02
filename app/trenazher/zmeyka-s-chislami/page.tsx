'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import TrainerGate from '@/components/TrainerGate';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Speed = 'slow' | 'fast';

interface Cell {
  x: number;
  y: number;
}

interface NumberCell extends Cell {
  value: number;
}

const GRID_SIZE = 10;
const TARGET_MAX = 10;
const START_CELL: Cell = { x: 4, y: 5 };

const OPPOSITE: Record<Direction, Direction> = {
  UP: 'DOWN',
  DOWN: 'UP',
  LEFT: 'RIGHT',
  RIGHT: 'LEFT',
};

function placeNumbers(snake: Cell[]): NumberCell[] {
  const occupied = new Set(snake.map((s) => `${s.x},${s.y}`));
  const free: Cell[] = [];
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (!occupied.has(`${x},${y}`)) free.push({ x, y });
    }
  }
  // Перемешиваем свободные клетки
  for (let i = free.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [free[i], free[j]] = [free[j], free[i]];
  }
  return free.slice(0, TARGET_MAX).map((cell, i) => ({ ...cell, value: i + 1 }));
}

export default function ZmeykaSChislamiTrainerPage() {
  const [speed, setSpeed] = useState<Speed>('slow');
  const [started, setStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [eatenCount, setEatenCount] = useState(0);
  const [nextTarget, setNextTarget] = useState(1);
  const [, forceRender] = useState(0);

  // Игровые данные храним в ref-ах, чтобы каждый тик читал самое свежее
  // состояние без пересоздания интервала — и чтобы точно не плодить таймеры.
  const snakeRef = useRef<Cell[]>([{ ...START_CELL }]);
  const numbersRef = useRef<NumberCell[]>([]);
  const directionRef = useRef<Direction>('RIGHT');
  const nextTargetRef = useRef(1);
  const eatenRef = useRef(0);

  const resetGame = useCallback(() => {
    snakeRef.current = [{ ...START_CELL }];
    directionRef.current = 'RIGHT';
    numbersRef.current = placeNumbers(snakeRef.current);
    nextTargetRef.current = 1;
    eatenRef.current = 0;
    setEatenCount(0);
    setNextTarget(1);
    setGameOver(false);
    setWin(false);
    setStarted(true);
    forceRender((t) => t + 1);
  }, []);

  const setDirection = useCallback((dir: Direction) => {
    if (OPPOSITE[directionRef.current] === dir) return;
    directionRef.current = dir;
  }, []);

  // Клавиатура (десктоп)
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowUp') { e.preventDefault(); setDirection('UP'); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); setDirection('DOWN'); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); setDirection('LEFT'); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); setDirection('RIGHT'); }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [setDirection]);

  // Игровой цикл — один таймер, всегда чистится при остановке/размонтировании
  useEffect(() => {
    if (!started || gameOver || win) return;

    const intervalMs = speed === 'fast' ? 250 : 450;
    const id = setInterval(() => {
      const snake = snakeRef.current;
      const head = snake[0];
      const dir = directionRef.current;

      let newHead: Cell = { x: head.x, y: head.y };
      if (dir === 'UP') newHead.y -= 1;
      else if (dir === 'DOWN') newHead.y += 1;
      else if (dir === 'LEFT') newHead.x -= 1;
      else if (dir === 'RIGHT') newHead.x += 1;

      // Столкновение со стеной
      if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
        setGameOver(true);
        return;
      }

      const hitNumber = numbersRef.current.find((n) => n.x === newHead.x && n.y === newHead.y);
      const isCorrect = !!hitNumber && hitNumber.value === nextTargetRef.current;

      // Если змейка не ест — хвост в этот тик освобождает свою клетку,
      // поэтому его не считаем при проверке столкновения с собой.
      const bodyToCheck = isCorrect ? snake : snake.slice(0, -1);
      const hitsSelf = bodyToCheck.some((seg) => seg.x === newHead.x && seg.y === newHead.y);
      if (hitsSelf) {
        setGameOver(true);
        return;
      }

      const newSnake = [newHead, ...snake];
      if (!isCorrect) {
        newSnake.pop();
      }
      snakeRef.current = newSnake;

      if (isCorrect) {
        numbersRef.current = numbersRef.current.filter((n) => n !== hitNumber);
        eatenRef.current += 1;
        setEatenCount(eatenRef.current);

        const next = nextTargetRef.current + 1;
        if (next > TARGET_MAX) {
          setWin(true);
          return;
        }
        nextTargetRef.current = next;
        setNextTarget(next);
      }

      forceRender((t) => t + 1);
    }, intervalMs);

    return () => clearInterval(id);
  }, [started, gameOver, win, speed]);

  const snake = snakeRef.current;
  const numbers = numbersRef.current;
  const snakeMap = new Map<string, number>();
  snake.forEach((seg, idx) => snakeMap.set(`${seg.x},${seg.y}`, idx));
  const numberMap = new Map<string, number>();
  numbers.forEach((n) => numberMap.set(`${n.x},${n.y}`, n.value));

  const cells: React.ReactNode[] = [];
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      const key = `${x},${y}`;
      const snakeIdx = snakeMap.get(key);
      const numberValue = numberMap.get(key);

      let cellClass = 'bg-white/5 border border-white/10';
      let content: React.ReactNode = null;

      if (snakeIdx !== undefined) {
        content = null;
        cellClass = snakeIdx === 0
          ? 'bg-orange rounded-md shadow-lg scale-105 z-10'
          : 'bg-violet rounded-sm opacity-90';
      } else if (numberValue !== undefined) {
        cellClass = 'bg-white border border-gray-200 rounded-sm text-[#3a1c6e] font-black';
        content = <span className="text-[clamp(10px,2.2vw,16px)]">{numberValue}</span>;
      }

      cells.push(
        <div
          key={key}
          className={`aspect-square flex items-center justify-center transition-colors ${cellClass}`}
        >
          {content}
        </div>
      );
    }
  }

  return (
    <div className="min-h-screen">
      <div className="border-b border-white/15 px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">🐍 Змейка с числами</h1>
      </div>

      <TrainerGate type="trainer:zmeyka-s-chislami">
        <div className="max-w-2xl mx-auto py-8 px-6">
          {/* Настройки */}
          <div className="card mb-8">
            <label className="block text-sm font-medium mb-3 text-white/90">Скорость змейки</label>
            <div className="flex gap-3 mb-5">
              <button
                onClick={() => setSpeed('slow')}
                className={`flex-1 px-5 py-3 rounded-xl font-bold transition-all ${
                  speed === 'slow'
                    ? 'text-white'
                    : 'bg-white/10 border border-white/25 text-white/80 hover:bg-white/15'
                }`}
                style={speed === 'slow' ? { background: 'linear-gradient(135deg, #7C3AED, #f72585)' } : undefined}
              >
                🐢 Медленно
              </button>
              <button
                onClick={() => setSpeed('fast')}
                className={`flex-1 px-5 py-3 rounded-xl font-bold transition-all ${
                  speed === 'fast'
                    ? 'text-white'
                    : 'bg-white/10 border border-white/25 text-white/80 hover:bg-white/15'
                }`}
                style={speed === 'fast' ? { background: 'linear-gradient(135deg, #7C3AED, #f72585)' } : undefined}
              >
                🐇 Быстро
              </button>
            </div>
            <p className="text-white/60 text-sm mb-4">
              Веди змейку по полю и собирай числа от 1 до 10 по порядку. Управляй стрелками на клавиатуре
              или кнопками ниже поля.
            </p>
            {!started && (
              <button onClick={resetGame} className="btn-primary w-full py-3">
                ▶️ Начать игру
              </button>
            )}
          </div>

          {/* Игровое поле */}
          {started && !gameOver && !win && (
            <div className="card text-center">
              <p className="text-lg font-bold text-white mb-4">
                Следующее число: <span className="text-orange text-2xl">{nextTarget}</span>
              </p>

              <div className="grid grid-cols-10 gap-[2px] max-w-md mx-auto bg-black/20 rounded-xl p-2 mb-6">
                {cells}
              </div>

              {/* D-pad для мобильных/сенсорных устройств */}
              <div className="inline-grid grid-cols-3 grid-rows-3 gap-2 w-40 mx-auto">
                <div />
                <button
                  onClick={() => setDirection('UP')}
                  aria-label="Вверх"
                  className="bg-white/10 border border-white/25 rounded-lg py-2 text-xl text-white hover:bg-white/20 active:scale-95 transition-all"
                >
                  ▲
                </button>
                <div />
                <button
                  onClick={() => setDirection('LEFT')}
                  aria-label="Влево"
                  className="bg-white/10 border border-white/25 rounded-lg py-2 text-xl text-white hover:bg-white/20 active:scale-95 transition-all"
                >
                  ◀
                </button>
                <div />
                <button
                  onClick={() => setDirection('RIGHT')}
                  aria-label="Вправо"
                  className="bg-white/10 border border-white/25 rounded-lg py-2 text-xl text-white hover:bg-white/20 active:scale-95 transition-all"
                >
                  ▶
                </button>
                <div />
                <button
                  onClick={() => setDirection('DOWN')}
                  aria-label="Вниз"
                  className="bg-white/10 border border-white/25 rounded-lg py-2 text-xl text-white hover:bg-white/20 active:scale-95 transition-all"
                >
                  ▼
                </button>
                <div />
              </div>
            </div>
          )}

          {/* Проигрыш */}
          {gameOver && (
            <div className="card bg-white text-center py-10">
              <p className="text-3xl font-black text-[#3a1c6e] mb-2">Змейка врезалась!</p>
              <p className="text-gray-600 mb-1">Собрано чисел по порядку:</p>
              <p className="text-6xl font-black text-orange mb-8">{eatenCount}</p>
              <button onClick={resetGame} className="btn-primary px-6 py-3">
                🔁 Играть ещё
              </button>
            </div>
          )}

          {/* Победа */}
          {win && (
            <div className="card bg-white text-center py-10">
              <p className="text-3xl font-black text-[#3a1c6e] mb-6">
                🎉 Ты собрал все числа по порядку!
              </p>
              <button onClick={resetGame} className="btn-primary px-6 py-3">
                🔁 Играть ещё
              </button>
            </div>
          )}
        </div>
      </TrainerGate>
    </div>
  );
}
