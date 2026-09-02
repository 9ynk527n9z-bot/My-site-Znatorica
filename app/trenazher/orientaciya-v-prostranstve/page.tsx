'use client';

import Link from 'next/link';
import { useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import { praiseFor } from '@/lib/praise';

type Direction = 'top' | 'bottom' | 'left' | 'right';

const LABELS: Record<Direction, string> = {
  top: 'Сверху',
  bottom: 'Снизу',
  left: 'Слева',
  right: 'Справа',
};

interface Scene {
  main: string;
  mainName: string;
  other: string;
  direction: Direction;
  axis: 'vertical' | 'horizontal';
  between?: BetweenRound;
}

// Тройки предметов для вопроса "что находится между...?" — как в теории этой темы
// (например "собака между кошкой и зайцем"), а не только про два предмета.
interface BetweenRound {
  left: string;
  leftName: string;
  middle: string;
  middleName: string;
  right: string;
  rightName: string;
}

const BETWEEN_SCENES: BetweenRound[] = [
  { left: '🐱', leftName: 'кошки', middle: '🐶', middleName: 'собака', right: '🐰', rightName: 'зайца' },
  { left: '🚗', leftName: 'машинки', middle: '🧸', middleName: 'мишка', right: '⚽', rightName: 'мяча' },
  { left: '🍎', leftName: 'яблока', middle: '🍌', middleName: 'банан', right: '🍊', rightName: 'апельсина' },
  { left: '⭐', leftName: 'звезды', middle: '🌙', middleName: 'луна', right: '☀️', rightName: 'солнца' },
  { left: '🐘', leftName: 'слона', middle: '🐭', middleName: 'мышка', right: '🐻', rightName: 'медведя' },
];

function makeBetweenRound(): Scene {
  const b = randItem(BETWEEN_SCENES);
  return { main: '', mainName: '', other: '', direction: 'top', axis: 'horizontal', between: b };
}

// Пары эмодзи-сценок: главный объект — {direction} от второго объекта.
const SCENES: { a: string; aName: string; b: string; bName: string }[] = [
  { a: '🐱', aName: 'кот', b: '🐶', bName: 'собака' },
  { a: '🌳', aName: 'дерево', b: '🏠', bName: 'домик' },
  { a: '☀️', aName: 'солнце', b: '🌾', bName: 'поле' },
  { a: '🐦', aName: 'птичка', b: '🐢', bName: 'черепаха' },
  { a: '🎈', aName: 'шарик', b: '🎁', bName: 'подарок' },
  { a: '🍎', aName: 'яблоко', b: '🧺', bName: 'корзина' },
  { a: '⭐', aName: 'звезда', b: '🌙', bName: 'луна' },
  { a: '🚗', aName: 'машина', b: '🚲', bName: 'велосипед' },
  { a: '🐘', aName: 'слон', b: '🐭', bName: 'мышка' },
  { a: '☁️', aName: 'облако', b: '⛰️', bName: 'гора' },
];

const OPTIONS: Direction[] = ['top', 'bottom', 'left', 'right'];

function randItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function makeRound(): Scene {
  if (Math.random() < 0.3) return makeBetweenRound();

  const pair = randItem(SCENES);
  const axis: 'vertical' | 'horizontal' = Math.random() < 0.5 ? 'vertical' : 'horizontal';
  const direction: Direction =
    axis === 'vertical' ? randItem<Direction>(['top', 'bottom']) : randItem<Direction>(['left', 'right']);

  // Спрашиваем то про a, то про b — чтобы правильный ответ не был всегда одним и тем же объектом.
  const askAbout: 'a' | 'b' = Math.random() < 0.5 ? 'a' : 'b';
  const main = askAbout === 'a' ? pair.a : pair.b;
  const mainName = askAbout === 'a' ? pair.aName : pair.bName;
  const other = askAbout === 'a' ? pair.b : pair.a;

  // Если спрашиваем про b, направление зеркалим (b находится напротив a).
  const mirror: Record<Direction, Direction> = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' };
  const finalDirection = askAbout === 'a' ? direction : mirror[direction];

  return { main, mainName, other, direction: finalDirection, axis };
}

const ROUNDS_PER_SESSION = 10;

const PALETTE: Record<Direction, string> = {
  top: 'border-purple-600 bg-purple-500 text-white',
  bottom: 'border-sky-600 bg-sky-500 text-white',
  left: 'border-amber-600 bg-amber-500 text-white',
  right: 'border-pink-600 bg-pink-500 text-white',
};

export default function OrientaciyaVProstranstveTrainerPage() {
  const [started, setStarted] = useState(false);
  const [round, setRound] = useState(0);
  const [current, setCurrent] = useState<Scene | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [finished, setFinished] = useState(false);

  function begin() {
    setStarted(true);
    setFinished(false);
    setRound(1);
    setScore({ correct: 0, total: 0 });
    setCurrent(makeRound());
    setFeedback(null);
    setPicked(null);
  }

  function nextRound() {
    if (round >= ROUNDS_PER_SESSION) {
      setFinished(true);
      return;
    }
    setRound((r) => r + 1);
    setCurrent(makeRound());
    setFeedback(null);
    setPicked(null);
  }

  function handlePick(value: string) {
    if (feedback || !current) return;
    setPicked(value);
    const correct = current.between ? value === current.between.middle : value === current.direction;
    setFeedback(correct ? 'correct' : 'wrong');
    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    setTimeout(nextRound, correct ? 900 : 1400);
  }

  // Раскладываем сценку CSS-позиционированием так, чтобы наглядно
  // показать пространственное отношение, а не только текстом.
  function renderScene(scene: Scene) {
    const items = (
      <>
        <span className="text-6xl md:text-7xl drop-shadow">{scene.direction === 'top' || scene.direction === 'left' ? scene.main : scene.other}</span>
        <span className="text-6xl md:text-7xl drop-shadow">{scene.direction === 'top' || scene.direction === 'left' ? scene.other : scene.main}</span>
      </>
    );

    if (scene.axis === 'vertical') {
      return (
        <div className="flex flex-col items-center justify-center gap-6 py-6">
          {items}
        </div>
      );
    }
    return (
      <div className="flex flex-row items-center justify-center gap-10 py-10">
        {items}
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="border-b border-white/15 px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">🧭 Ориентация в пространстве</h1>
      </div>

      <TrainerGate type="trainer:orientaciya-v-prostranstve">
        <div className="max-w-2xl mx-auto py-8 px-6">
          {!started && (
            <div className="card text-center py-10">
              <p className="text-xl font-bold text-white mb-2">🐱🐶🌳🏠</p>
              <p className="text-xl font-bold text-white mb-6">
                Смотри на картинку и говори, где находится предмет: сверху, снизу, слева или справа
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

              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-6">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${(round / ROUNDS_PER_SESSION) * 100}%`,
                    background: 'linear-gradient(90deg, #F97316, #f72585)',
                  }}
                />
              </div>

              <div className="bg-gradient-to-b from-sky-50 to-amber-50 rounded-2xl border-4 border-gray-100 mb-6">
                {current.between ? (
                  <div className="flex flex-row items-center justify-center gap-6 py-10">
                    <span className="text-6xl md:text-7xl drop-shadow">{current.between.left}</span>
                    <span className="text-6xl md:text-7xl drop-shadow">
                      {feedback ? current.between.middle : '❓'}
                    </span>
                    <span className="text-6xl md:text-7xl drop-shadow">{current.between.right}</span>
                  </div>
                ) : (
                  renderScene(current)
                )}
              </div>

              <p className="text-2xl font-black text-[#3a1c6e] mb-6">
                {current.between
                  ? `Что находится между ${current.between.leftName} и ${current.between.rightName}?`
                  : `Где находится ${current.mainName} ${current.main}?`}
              </p>

              <div className={current.between ? 'grid grid-cols-3 gap-4 mb-6' : 'grid grid-cols-2 gap-4 mb-6'}>
                {(current.between
                  ? [current.between.left, current.between.middle, current.between.right]
                  : OPTIONS
                ).map((value) => {
                  const isPicked = picked === value;
                  const isAnswer = current.between ? value === current.between.middle : value === current.direction;
                  const showState = feedback && (isPicked || isAnswer);
                  return (
                    <button
                      key={value}
                      onClick={() => handlePick(value)}
                      disabled={!!feedback}
                      className={`flex items-center justify-center py-5 rounded-2xl border-4 font-black text-xl transition-all ${
                        showState
                          ? isAnswer
                            ? 'border-green-500 bg-green-50 text-green-600 pop-in'
                            : 'border-red-400 bg-red-50 text-red-500 shake'
                          : current.between
                            ? 'border-gray-200 bg-gray-50 hover:border-orange hover:scale-105 text-4xl'
                            : `${PALETTE[value as Direction]} hover:brightness-110 hover:scale-105`
                      }`}
                    >
                      {current.between ? value : LABELS[value as Direction]}
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
                    Правильный ответ: {current.between ? current.between.middleName : LABELS[current.direction]} 👀
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
