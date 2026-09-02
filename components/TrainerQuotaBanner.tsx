'use client';

import Link from 'next/link';
import { useTrainerQuota } from '@/lib/useTrainerQuota';

// Показывается на /trenazher (список всех тренажёров) — чтобы человек видел
// остаток лимита ЗАРАНЕЕ, до того как откроет очередной тренажёр и упрётся
// в стену. Лимит общий на ВСЕ тренажёры вместе, а не по 3 на каждый — без
// этого баннера люди пробуют один тренажёр за другим, каждый раз натыкаясь
// на блокировку, будто впервые видят.
export default function TrainerQuotaBanner() {
  const quota = useTrainerQuota();

  if (quota.loading || quota.unlimited) return null;

  if (quota.remaining <= 0) {
    return (
      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
        <p className="text-yellow-400 font-bold mb-1">
          Лимит на сегодня исчерпан ({quota.limit} из {quota.limit})
        </p>
        <p className="text-gray-400 text-sm">
          {quota.registered ? (
            <>
              Завтра снова будут доступны {quota.limit}. А со{' '}
              <Link href="/podpiska" className="text-orange hover:underline font-bold">
                Знаторика PRO
              </Link>{' '}
              ограничений нет совсем.
            </>
          ) : (
            <>
              <Link href="/register" className="text-orange hover:underline font-bold">
                Зарегистрируйтесь
              </Link>{' '}
              — это бесплатно — и занятий станет 20 в день.
            </>
          )}
        </p>
      </div>
    );
  }

  return (
    <p className="text-sm text-gray-400 mb-6">
      Осталось {quota.remaining} из {quota.limit} занятий сегодня (лимит общий на тренажёры, игры и ВПР) ·{' '}
      {quota.registered ? (
        <Link href="/podpiska" className="text-orange hover:underline">
          Знаторика PRO — без ограничений
        </Link>
      ) : (
        <Link href="/register" className="text-orange hover:underline">
          зарегистрироваться — будет 20 в день
        </Link>
      )}
    </p>
  );
}
