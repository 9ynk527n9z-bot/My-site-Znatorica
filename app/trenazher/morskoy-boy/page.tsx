'use client';

import Link from 'next/link';
import { useState } from 'react';
import TrainerGate from '@/components/TrainerGate';

const GRID_SIZE = 6;
const COLS = ['А', 'Б', 'В', 'Г', 'Д', 'Е'];
const SHIP_LENGTHS = [3, 2, 2];
const TOTAL_SHIP_CELLS = SHIP_LENGTHS.reduce((sum, len) => sum + len, 0);
const MAX_ATTEMPTS_PER_SHIP = 200;

interface Cell {
  row: number;
  col: number;
}

interface Ship {
  cells: Cell[];
}

function cellKey(row: number, col: number): string {
  return `${row},${col}`;
}

function randInt(max: number): number {
  return Math.floor(Math.random() * max);
}

function attemptPlaceShip(length: number, occupied: Set<string>): Cell[] | null {
  for (let attempt = 0; attempt < MAX_ATTEMPTS_PER_SHIP; attempt++) {
    const horizontal = Math.random() < 0.5;
    let row: number;
    let col: number;
    if (horizontal) {
      row = randInt(GRID_SIZE);
      col = randInt(GRID_SIZE - length + 1);
    } else {
      row = randInt(GRID_SIZE - length + 1);
      col = randInt(GRID_SIZE);
    }
    const cells: Cell[] = [];
    for (let i = 0; i < length; i++) {
      cells.push(horizontal ? { row, col: col + i } : { row: row + i, col });
    }
    if (cells.every((c) => !occupied.has(cellKey(c.row, c.col)))) {
      return cells;
    }
  }
  return null;
}

function generateFleet(): Ship[] {
  const occupied = new Set<string>();
  const ships: Ship[] = [];
  for (const length of SHIP_LENGTHS) {
    const cells = attemptPlaceShip(length, occupied);
    if (!cells) {
      // Крайне маловероятный случай для сетки 6×6 — начинаем расстановку заново
      return generateFleet();
    }
    cells.forEach((c) => occupied.add(cellKey(c.row, c.col)));
    ships.push({ cells });
  }
  return ships;
}

type ShotStatus = 'hit' | 'miss';

export default function MorskoyBoyTrainerPage() {
  const [fleet, setFleet] = useState<Ship[]>(() => generateFleet());
  const [shots, setShots] = useState<Map<string, ShotStatus>>(new Map());
  const [shotCount, setShotCount] = useState(0);
  const [hitCount, setHitCount] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const [won, setWon] = useState(false);

  function isShipSunk(ship: Ship, shotsMap: Map<string, ShotStatus>): boolean {
    return ship.cells.every((c) => shotsMap.get(cellKey(c.row, c.col)) === 'hit');
  }

  function newGame() {
    setFleet(generateFleet());
    setShots(new Map());
    setShotCount(0);
    setHitCount(0);
    setMessage(null);
    setWon(false);
  }

  function fire(row: number, col: number) {
    if (won) return;
    const k = cellKey(row, col);
    if (shots.has(k)) return;

    const ship = fleet.find((s) => s.cells.some((c) => c.row === row && c.col === col));
    const newShots = new Map(shots);
    const newShotCount = shotCount + 1;
    let newHitCount = hitCount;

    if (ship) {
      newShots.set(k, 'hit');
      newHitCount += 1;
      if (isShipSunk(ship, newShots)) {
        setMessage('🚢 Корабль потоплен!');
        setTimeout(() => setMessage(null), 1800);
      }
    } else {
      newShots.set(k, 'miss');
    }

    setShots(newShots);
    setShotCount(newShotCount);
    setHitCount(newHitCount);

    if (newHitCount === TOTAL_SHIP_CELLS) {
      setWon(true);
    }
  }

  return (
    <div className="min-h-screen">
      <div className="border-b border-white/15 px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">🚢 Морской бой</h1>
      </div>

      <TrainerGate type="trainer:morskoy-boy">
        <div className="max-w-xl mx-auto py-8 px-6">
          {/* Подсказка */}
          <div className="card mb-8">
            <p className="text-white/90 text-sm">
              На поле спрятаны <span className="text-orange font-bold">3 корабля</span> компьютера.
              Нажимай на клетки по буквам и цифрам — так же, как ищут координаты в настоящем «Морском
              бое». Потопи все корабли!
            </p>
          </div>

          {!won && (
            <div className="card bg-white text-center">
              <div className="flex justify-between items-center mb-4 text-sm">
                <span className="text-gray-500">Выстрелов: {shotCount}</span>
                <span className="text-gray-600">
                  Попаданий: <span className="text-orange font-bold">{hitCount}</span> из{' '}
                  {TOTAL_SHIP_CELLS}
                </span>
              </div>

              <div
                className="grid gap-1 sm:gap-2 max-w-md mx-auto mb-4"
                style={{ gridTemplateColumns: `repeat(${GRID_SIZE + 1}, minmax(0, 1fr))` }}
              >
                <div />
                {COLS.map((letter) => (
                  <div
                    key={letter}
                    className="flex items-center justify-center font-black text-[#3a1c6e] text-sm sm:text-base"
                  >
                    {letter}
                  </div>
                ))}

                {Array.from({ length: GRID_SIZE }).map((_, row) => (
                  <div key={row} className="contents">
                    <div className="flex items-center justify-center font-black text-[#3a1c6e] text-sm sm:text-base">
                      {row + 1}
                    </div>
                    {Array.from({ length: GRID_SIZE }).map((_, col) => {
                      const k = cellKey(row, col);
                      const status = shots.get(k);
                      const ship = fleet.find((s) =>
                        s.cells.some((c) => c.row === row && c.col === col)
                      );
                      const sunk = ship ? isShipSunk(ship, shots) : false;

                      let cellClasses =
                        'aspect-square rounded-lg border-2 transition-all flex items-center justify-center text-sm sm:text-lg';

                      if (status === 'hit') {
                        cellClasses += sunk
                          ? ' bg-red-200 border-4 border-red-600 text-red-700'
                          : ' bg-orange-100 border-orange-400 text-orange-600';
                      } else if (status === 'miss') {
                        cellClasses += ' bg-gray-100 border-gray-300 text-gray-400';
                      } else {
                        cellClasses +=
                          ' bg-blue-50 border-blue-200 hover:bg-blue-100 hover:scale-105 cursor-pointer';
                      }

                      return (
                        <button
                          key={k}
                          onClick={() => fire(row, col)}
                          disabled={!!status}
                          aria-label={`${COLS[col]}${row + 1}`}
                          className={cellClasses}
                        >
                          {status === 'hit' && '💥'}
                          {status === 'miss' && '〰️'}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>

              <div className="h-8">
                {message && <p className="text-orange font-black text-lg pop-in">{message}</p>}
              </div>
            </div>
          )}

          {won && (
            <div className="card bg-white text-center py-10">
              <p className="text-3xl font-black text-[#3a1c6e] mb-2">🎉 Все корабли потоплены!</p>
              <p className="text-gray-600 mb-6">Выстрелов: {shotCount}</p>
              <button onClick={newGame} className="btn-primary px-6 py-3">
                🔁 Играть ещё
              </button>
            </div>
          )}
        </div>
      </TrainerGate>
    </div>
  );
}
