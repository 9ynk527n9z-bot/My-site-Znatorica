// Согласие на необязательные (аналитические) cookie — отдельно от общего согласия на
// обработку данных при регистрации, потому что банер должен видеть и анонимный посетитель,
// который никогда не регистрируется (а таких — большинство трафика с рекламы).
// ФЗ-152 2026: неявное согласие запрещено, поэтому по умолчанию — не согласился.

const STORAGE_KEY = 'znatorica_cookie_consent';
const EVENT_NAME = 'znatorica-cookie-consent-changed';

export type CookieConsent = 'all' | 'necessary';

export function getCookieConsent(): CookieConsent | null {
  if (typeof window === 'undefined') return null;
  const v = localStorage.getItem(STORAGE_KEY);
  return v === 'all' || v === 'necessary' ? v : null;
}

export function setCookieConsent(value: CookieConsent) {
  localStorage.setItem(STORAGE_KEY, value);
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: value }));
}

export function onCookieConsentChange(cb: (value: CookieConsent) => void): () => void {
  const handler = (e: Event) => cb((e as CustomEvent).detail);
  window.addEventListener(EVENT_NAME, handler);
  return () => window.removeEventListener(EVENT_NAME, handler);
}
