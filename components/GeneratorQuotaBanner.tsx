'use client';

import Link from 'next/link';

interface Quota {
  remaining: number;
  limit: number;
  unlimited: boolean;
  isSubscriber: boolean;
  loading: boolean;
}

// Показывается рядом с кнопкой «Сгенерировать» на всех генераторах. Три состояния:
// подписчик (безлимит), есть остаток бесплатных генераций сегодня, лимит исчерпан.
export default function GeneratorQuotaBanner({ quota }: { quota: Quota }) {
  if (quota.loading) return null;

  if (quota.unlimited) {
    return (
      <p className="no-print text-sm text-green-400 mb-4">
        ⭐ Безлимитный доступ по подписке — генерируйте сколько нужно
      </p>
    );
  }

  if (quota.remaining <= 0) {
    return (
      <div className="no-print bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-4">
        <p className="text-yellow-400 font-bold mb-1">
          Бесплатный лимит на сегодня исчерпан ({quota.limit} из {quota.limit})
        </p>
        <p className="text-gray-400 text-sm">
          Лимит обновится завтра, или{' '}
          <Link href="/podpiska" className="text-orange hover:underline font-bold">
            оформите подписку
          </Link>{' '}
          — генератор без ограничений.
        </p>
      </div>
    );
  }

  return (
    <p className="no-print text-sm text-gray-400 mb-4">
      Осталось {quota.remaining} из {quota.limit} бесплатных генераций сегодня ·{' '}
      <Link href="/podpiska" className="text-orange hover:underline">
        снять лимит
      </Link>
    </p>
  );
}
