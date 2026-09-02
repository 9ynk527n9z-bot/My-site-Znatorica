'use client';

import { useMemo, useState } from 'react';
import { getQuizSource } from '@/lib/quiz/registry';
import type { QuizQuestion } from '@/lib/quiz/types';
import { trackUsage } from '@/lib/track';
import ShareButtons from '@/components/ShareButtons';
import { praiseFor, quizShareText } from '@/lib/praise';

const ROUND_SIZE = 10;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Перемешиваем и сами варианты ответов, чтобы правильный не стоял на одном месте
function prepareRound(pool: QuizQuestion[]): QuizQuestion[] {
  return shuffle(pool)
    .slice(0, ROUND_SIZE)
    .map((q) => {
      const order = shuffle(q.options.map((_, i) => i));
      return {
        ...q,
        options: order.map((i) => q.options[i]),
        correct: order.indexOf(q.correct),
      };
    });
}

export default function TopicQuiz({ topic }: { topic: string }) {
  const source = getQuizSource(topic);
  const [round, setRound] = useState<QuizQuestion[] | null>(null);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const stars = useMemo(() => (score >= 9 ? 3 : score >= 7 ? 2 : score >= 5 ? 1 : 0), [score]);

  if (!source) return null;

  function start() {
    setRound(prepareRound(source!()));
    setIndex(0);
    setPicked(null);
    setScore(0);
    setFinished(false);
    trackUsage(`quiz:${topic}`);
  }

  if (!round) {
    return (
      <div className="bg-gradient-to-r from-orange/20 to-violet/20 border border-orange rounded-lg p-8 text-left">
        <h3 className="text-3xl font-bold mb-4">Готов тренироваться?</h3>
        <p className="text-gray-300 text-xl mb-6">
          Викторина из {ROUND_SIZE} вопросов — каждый раз новые. Отвечай и сразу узнаешь результат!
        </p>
        <button onClick={start} className="btn-primary text-2xl px-8 py-4">
          🎮 Начать викторину
        </button>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="bg-gradient-to-r from-orange/20 to-violet/20 border border-orange rounded-lg p-8 text-left">
        <div className="text-5xl mb-4">{'⭐'.repeat(stars) || '💪'}</div>
        <h3 className="text-3xl font-bold mb-2">
          {score} из {round.length}!
        </h3>
        <p className="text-gray-300 text-xl mb-6">{praiseFor(score, round.length).title}</p>
        <button onClick={start} className="btn-primary text-2xl px-8 py-4">
          🔄 Играть ещё раз
        </button>

        {/* Момент, когда родителю есть чем поделиться: ребёнок только что
            прошёл викторину с результатом. Раньше здесь не было ничего,
            хотя до этого экрана доходит больше людей, чем до любой мини-игры. */}
        <div className="mt-6 pt-5 border-t border-white/15">
          <ShareButtons
            text={quizShareText(score, round.length)}
            url={typeof window !== 'undefined' ? window.location.href.split('#')[0] : 'https://znatorica.ru'}
            trackKey={`quiz:${topic}`}
          />
        </div>
      </div>
    );
  }

  const q = round[index];
  const answered = picked !== null;

  function choose(i: number) {
    if (answered) return;
    setPicked(i);
    if (i === q.correct) setScore((s) => s + 1);
  }

  function next() {
    if (index + 1 >= round!.length) setFinished(true);
    else {
      setIndex((i) => i + 1);
      setPicked(null);
    }
  }

  return (
    <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6 sm:p-8 text-left">
      <div className="flex items-center justify-between mb-6 text-lg">
        <span className="text-gray-400 font-bold">
          Вопрос {index + 1} / {round.length}
        </span>
        <span className="text-orange font-bold">✅ {score}</span>
      </div>

      <p className="text-2xl sm:text-3xl font-bold mb-6 leading-relaxed break-words text-left">{q.prompt}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {q.options.map((opt, i) => {
          let cls = 'bg-transparent border-2 border-solid border-orange hover:bg-orange/10 text-white';
          if (answered) {
            if (i === q.correct) cls = 'bg-orange border-2 border-solid border-orange text-white';
            else if (i === picked) cls = 'bg-red-600/70 border-2 border-solid border-red-500 text-white';
            else cls = 'bg-transparent border-2 border-solid border-[#2D2350] text-gray-500';
          }
          return (
            <button
              key={i}
              onClick={() => choose(i)}
              disabled={answered}
              className={`px-4 py-4 rounded-lg font-bold text-2xl text-left transition-colors ${cls}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <p className={`font-bold text-xl ${picked === q.correct ? 'text-green-400' : 'text-red-400'}`}>
            {picked === q.correct ? '✅ Верно!' : `❌ Правильный ответ: ${q.options[q.correct]}`}
            {q.hint && <span className="text-gray-400 font-normal"> — {q.hint}</span>}
          </p>
          <button onClick={next} className="btn-primary text-xl px-6 py-2">
            {index + 1 >= round.length ? 'Результат' : 'Дальше →'}
          </button>
        </div>
      )}
    </div>
  );
}
