'use client';

import { useEffect } from 'react';

// Активируется только внутри нативной обёртки (Capacitor) — на обычном сайте/PWA не делает ничего.
export default function CapacitorBridge() {
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const { Capacitor } = await import('@capacitor/core');
      if (!Capacitor.isNativePlatform() || cancelled) return;

      const [{ SplashScreen }, { StatusBar, Style }, { App: CapApp }] = await Promise.all([
        import('@capacitor/splash-screen'),
        import('@capacitor/status-bar'),
        import('@capacitor/app'),
      ]);

      await StatusBar.setStyle({ style: Style.Dark }).catch(() => {});
      await StatusBar.setBackgroundColor({ color: '#5B21A0' }).catch(() => {});
      await SplashScreen.hide().catch(() => {});

      // Аппаратная кнопка "назад" на Android — идти назад по истории сайта,
      // а не сразу закрывать приложение.
      CapApp.addListener('backButton', ({ canGoBack }) => {
        if (canGoBack) {
          window.history.back();
        } else {
          CapApp.exitApp();
        }
      });
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
