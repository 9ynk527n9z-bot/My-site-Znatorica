'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void;
        expand: () => void;
        setHeaderColor: (color: string) => void;
        setBackgroundColor: (color: string) => void;
        BackButton: { show: () => void; hide: () => void; onClick: (cb: () => void) => void };
      };
    };
  }
}

// Активируется только внутри Telegram Mini App (когда сайт открыт как Web App из Telegram) —
// на обычном сайте/PWA/Capacitor/VK-приложении не делает ничего.
export default function TelegramBridge() {
  useEffect(() => {
    const isTelegram = window.location.search.includes('tgWebAppData') || !!window.Telegram?.WebApp;
    if (!isTelegram) return;

    let cancelled = false;

    (async () => {
      // Telegram требует загрузку официального скрипта, а не npm-пакет —
      // он кладёт готовый объект window.Telegram.WebApp.
      if (!window.Telegram?.WebApp) {
        await new Promise<void>((resolve, reject) => {
          const s = document.createElement('script');
          s.src = 'https://telegram.org/js/telegram-web-app.js';
          s.onload = () => resolve();
          s.onerror = () => reject();
          document.head.appendChild(s);
        }).catch(() => {});
      }
      if (cancelled) return;

      const tg = window.Telegram?.WebApp;
      if (!tg) return;

      tg.ready();
      tg.expand();
      tg.setHeaderColor?.('#5B21A0');
      tg.setBackgroundColor?.('#5B21A0');

      // Кнопка "назад" Telegram — идти назад по истории сайта.
      tg.BackButton?.onClick(() => window.history.back());
      if (window.history.length > 1) {
        tg.BackButton?.show();
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
