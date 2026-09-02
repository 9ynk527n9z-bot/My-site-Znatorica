'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { getCookieConsent, onCookieConsentChange } from '@/lib/cookieConsent';

const COUNTER_ID = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;

// Счётчик грузится только после явного согласия на необязательные cookie (баннер
// CookieConsentBanner) — ФЗ-152 2026 запрещает неявное согласие, поэтому по умолчанию
// счётчик не активен ни для одного анонимного посетителя.
export default function YandexMetrika() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    setAllowed(getCookieConsent() === 'all');
    return onCookieConsentChange((value) => setAllowed(value === 'all'));
  }, []);

  if (!COUNTER_ID || !allowed) return null;

  return (
    <Script id="yandex-metrika" strategy="afterInteractive">
      {`
        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

        ym(${COUNTER_ID}, "init", { webvisor: false, clickmap: false, trackLinks: true, accurateTrackBounce: true });
      `}
    </Script>
  );
}

// Вызывается из кода регистрации — стреляет только если счётчик реально загружен
// (согласие дано и ID настроен), иначе тихо ничего не делает.
export function reachGoal(goalName: string) {
  if (typeof window === 'undefined') return;
  const w = window as unknown as { ym?: (...args: unknown[]) => void };
  if (COUNTER_ID && typeof w.ym === 'function') {
    w.ym(Number(COUNTER_ID), 'reachGoal', goalName);
  }
}
