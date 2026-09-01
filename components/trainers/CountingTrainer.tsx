'use client';

import { useState } from 'react';
import { SHAPES, COLORS } from '@/lib/shapes';
import ShapeSvg from '@/components/ShapeSvg';

interface Question {
  shape: (typeof SHAPES)[number];
  color: string;
  count: number;
}

function makeQuestion(maxCount: number): Question {
  const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  const count = 1 + Math.floor(Math.random() * maxCount);
  return { shape, color, count };
}

export default function CountingTrainer({ maxCount }: { maxCount: number }) {
  const [question, setQuestion] = useState<Question>(() => makeQuestion(maxCount));
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [score, setScore] = useState(0);
  const [asked, setAsked] = useState(0);

  function handleAnswer(n: number) {
    if (feedback) return;
    const isCorrect = n === question.count;
    setFeedback(isCorrect ? 'correct' : 'wrong');
    setAsked((a) => a + 1);
    if (isCorrect) setScore((s) => s + 1);
  }

  function next() {
    setQuestion(makeQuestion(maxCount));
    setFeedback(null);
  }

  return (
    <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8">
      <div className="flex justify-between items-center mb-6 text-sm text-gray-400">
        <span>Правильных ответов: {score} из {asked}</span>
        <span>Считаем до {maxCount}</span>
      </div>

      <p className="text-center text-lg mb-4">Сколько фигурок?</p>

      <div className="flex flex-wrap justify-center gap-3 mb-8 min-h-[80px] items-center">
        {Array.from({ length: question.count }).map((_, i) => (
          <ShapeSvg key={i} kind={question.shape} color={question.color} size={40} />
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {Array.from({ length: maxCount }, (_, i) => i + 1).map((n) => {
          const isPicked = feedback && n === question.count;
          return (
            <button
              key={n}
              onClick={() => handleAnswer(n)}
              disabled={!!feedback}
              className={`w-12 h-12 rounded-lg font-bold text-lg transition-colors ${
                isPicked
                  ? 'bg-green-500 text-white'
                  : feedback
                  ? 'bg-black border border-[#2D2350] text-gray-600'
                  : 'bg-black border border-[#2D2350] hover:border-orange hover:text-orange'
              }`}
            >
              {n}
            </button>
          );
        })}
      </div>

      {feedback && (
        <div className="text-center">
          <p className={`font-bold mb-4 ${feedback === 'correct' ? 'text-green-400' : 'text-red-400'}`}>
            {feedback === 'correct' ? '✅ Верно!' : `❌ Неверно, правильный ответ — ${question.count}`}
          </p>
          <button onClick={next} className="btn-primary">
            Следующее задание →
          </button>
        </div>
      )}
    </div>
  );
}
