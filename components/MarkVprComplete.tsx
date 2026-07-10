'use client';

import { useState } from 'react';
import { trackUsage } from '@/lib/track';

export default function MarkVprComplete({ trackType }: { trackType: string }) {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="no-print bg-green-500/20 border border-green-500/30 rounded-lg p-4 text-center text-green-400 font-bold mt-8">
        ✅ Отмечено как решённый вариант — записано в твой прогресс
      </div>
    );
  }

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
