import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ru.znatorica.app',
  appName: 'Знаторика',
  webDir: 'public',
  server: {
    // Приложение — обёртка вокруг живого сайта (SSR + API, не статичный экспорт).
    url: 'https://znatorica.ru',
    cleartext: false,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1200,
      backgroundColor: '#5B21A0',
      androidSplashResourceName: 'splash',
      showSpinner: false,
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#5B21A0',
    },
  },
};

export default config;
