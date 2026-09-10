'use client';

import { useState } from 'react';
import { trackUsage } from '@/lib/track';
import ShareButtons from './ShareButtons';

// Порог для предложения поделиться — в процентах, а не в баллах: максимум
// баллов у разных вариантов ВПР/МЦКО отличается в разы (от 5 до 43), поэтому
// фиксированное число баллов (например «больше 7» или «18 и более») подошло бы
// только части вариантов. 80% — это и «18 из ~20+» у больших вариантов ВПР,
// и «больше 7» у вариантов с максимумом около 8–10, то есть один порог,
// который на практике соответствует обоим ориентирам сразу.
const SHARE_THRESHOLD = 0.8;

export default function MarkVprComplete({
  trackType,
  maxScore,
  shareText,
  shareUrl,
}: {
  trackType: string;
  maxScore: number;
  shareText: string;
  shareUrl: string;
}) {
  const [done, setDone] = useState(false);
  const [score, setScore] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!done) {
    return (
      <button
        onClick={() => {
          trackUsage(trackType);
          setDone(true);
        }}
        className="no-print btn-primary w-full mt-8"
      >
        ✅ Я решил этот вариант
      </button>
    );
  }

  if (!submitted) {
    return (
      <div className="no-print bg-green-500/20 border border-green-500/30 rounded-lg p-4 mt-8">
        <p className="text-green-400 font-bold mb-3">✅ Отмечено как решённый вариант — записано в твой прогресс</p>
        <p className="text-gray-300 text-sm mb-2">Сколько баллов набрали? (необязательно, максимум {maxScore})</p>
        <div className="flex gap-3 items-center flex-wrap">
          <input
            type="number"
            min={0}
            max={maxScore}
            value={score}
            onChange={(e) => setScore(e.target.value)}
            className="w-24 px-3 py-2 rounded-lg bg-black border border-[#2D2350] focus:border-orange transition-colors"
          />
          <span className="text-gray-400 text-sm">из {maxScore}</span>
          <button onClick={() => setSubmitted(true)} className="btn-secondary">
            Готово
          </button>
          <button onClick={() => setSubmitted(true)} className="text-gray-500 text-sm hover:underline">
            Пропустить
          </button>
        </div>
      </div>
    );
  }

  const numericScore = score === '' ? null : Number(score);
  const goodScore = numericScore !== null && !Number.isNaN(numericScore) && numericScore / maxScore >= SHARE_THRESHOLD;

  return (
    <div className="no-print bg-green-500/20 border border-green-500/30 rounded-lg p-4 mt-8 text-center">
      <p className="text-green-400 font-bold mb-1">✅ Отмечено как решённый вариант</p>
      {goodScore ? (
        <>
          <p className="text-gray-300 text-sm mb-3">Отличный результат — {numericScore} из {maxScore}! Есть чем поделиться 🎉</p>
          <ShareButtons text={shareText} url={shareUrl} trackKey={trackType} />
        </>
      ) : (
        <p className="text-gray-400 text-sm">Результат записан в прогресс.</p>
      )}
    </div>
  );
}
