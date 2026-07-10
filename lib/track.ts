function send(payload: { type: string } | { url: string }) {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    fetch('/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // отслеживание не должно ломать основной функционал сайта
  }
}

export function trackUsage(type: string) {
  send({ type });
}

// Анонимный учёт просмотров страниц для внутренней аналитики (без Google Analytics
// и без стороннего шаринга) — та же cookie znatorika_sid, что и trackUsage.
export function trackPageView(url: string) {
  send({ url });
}
