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

  // Компактная карточка в углу экрана (не на всю ширину) — по образцу того, как
  // это принято оформлять у крупных образовательных сайтов (сверено визуально
  // с баннером Skysmart: маленькая карточка ~300px, а не полоса на весь экран).
  // Именно правый нижний угол — слева там же на многих страницах уже висит
  // плавающая кнопка «← Назад» (bottom-4 left-4), нельзя занимать то же место.
  return (
    <div className="fixed bottom-4 right-4 z-50 w-[290px] bg-white rounded-xl border border-gray-200 px-4 py-3.5 no-print shadow-[0_4px_20px_rgba(0,0,0,0.12)]">
      <p className="text-gray-600 text-xs leading-snug mb-3">
        Используем cookie для работы сайта и, с вашего согласия, Яндекс.Метрику для оценки
        рекламы.{' '}
        <Link href="/privacy" className="text-gray-500 underline hover:text-gray-700">
          Подробнее
        </Link>
        .
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => choose('necessary')}
          className="flex-1 text-xs text-gray-500 hover:text-gray-700 px-2 py-1.5 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors"
        >
          Только необходимые
        </button>
        <button
          onClick={() => choose('all')}
          className="flex-1 text-xs text-white bg-gray-800 hover:bg-gray-900 px-2 py-1.5 rounded-lg transition-colors"
        >
          Принять
        </button>
      </div>
    </div>
  );
}
