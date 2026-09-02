'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getCookieConsent, setCookieConsent } from '@/lib/cookieConsent';

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getCookieConsent() === null);
  }, []);

  if (!visible) return null;

  function choose(value: 'all' | 'necessary') {
    setCookieConsent(value);
    setVisible(false);
  }

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-white border-t border-gray-200 px-4 py-2.5 no-print shadow-[0_-1px_8px_rgba(0,0,0,0.08)]">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 flex-wrap">
        <p className="text-gray-600 text-xs max-w-2xl leading-snug">
          Используем cookie для работы сайта и, с вашего согласия, Яндекс.Метрику для оценки
          рекламы.{' '}
          <Link href="/privacy" className="text-gray-500 underline hover:text-gray-700">
            Подробнее
          </Link>
          .
        </p>
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={() => choose('necessary')}
            className="text-xs text-gray-500 hover:text-gray-700 px-3 py-1.5 rounded border border-gray-300 hover:border-gray-400 transition-colors"
          >
            Только необходимые
          </button>
          <button
            onClick={() => choose('all')}
            className="text-xs text-white bg-gray-800 hover:bg-gray-900 px-4 py-1.5 rounded transition-colors"
          >
            Принять
          </button>
        </div>
      </div>
    </div>
  );
}
