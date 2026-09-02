'use client';

import { useEffect } from 'react';

// Активируется только внутри VK Mini App (когда сайт открыт как iframe/webview из VK) —
// на обычном сайте/PWA/Capacitor-приложении не делает ничего.
export default function VkBridge() {
  useEffect(() => {
    const isVkMiniApp = new URLSearchParams(window.location.search).has('vk_app_id');
    if (!isVkMiniApp) return;

    let cancelled = false;

    (async () => {
      const bridge = (await import('@vkontakte/vk-bridge')).default;
      if (cancelled) return;

      // Обязательный вызов — сообщает VK, что приложение готово, убирает заглушку загрузки.
      await bridge.send('VKWebAppInit').catch(() => {});
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
