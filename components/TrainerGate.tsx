'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useGeneratorQuota } from '@/lib/useGeneratorQuota';
import { trackUsage } from '@/lib/track';

// Тренажёры входят в общий дневной лимит бесплатных использований (тот же
// пул, что и у генераторов, см. FREE_GENERATOR_LIMIT в lib/constants.ts) —
// 1 открытие тренажёра = 1 списание. Пока лимит ещё грузится — не блокируем
// (fail-open, как и у generator quota), чтобы не создавать ложное ощущение
// «сайт сломан» при медленной сети.
export default function TrainerGate({ type, children }: { type: string; children: React.ReactNode }) {
  const quota = useGeneratorQuota();
  const consumed = useRef(false);

  useEffect(() => {
    if (!consumed.current && quota.guard()) {
      consumed.current = true;
      trackUsage(type);
      quota.consume();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quota.loading]);

  if (!quota.loading && !quota.unlimited && quota.remaining <= 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-8 text-center">
          <p className="text-yellow-400 font-bold text-lg mb-2">
            Бесплатный лимит на сегодня исчерпан ({quota.limit} из {quota.limit})
          </p>
          <p className="text-gray-400 text-sm mb-6">
            Лимит общий на все тренажёры и генераторы. Обновится завтра, или{' '}
            <Link href="/podpiska" className="text-orange hover:underline font-bold">
              оформите подписку
            </Link>{' '}
            — доступ без ограничений.
          </p>
          <Link href="/podpiska" className="btn-primary inline-block">
            Оформить подписку
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
