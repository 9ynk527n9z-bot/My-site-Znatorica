// Service worker для PWA — намеренно минимальный и осторожный.
// Кэширует ТОЛЬКО статику (картинки, шрифты, иконки, /_next/static/*).
// HTML-страницы, API и всё остальное — всегда идёт в сеть, без кеша:
// сайт показывает динамический контент из БД (статьи, CMS, авторизация,
// админка), и агрессивное кеширование легко привело бы к тому, что
// пользователь видит устаревшую версию страницы или пропущенный логин.
const CACHE_NAME = 'znatorica-static-v1';

const STATIC_EXTENSIONS = /\.(png|jpg|jpeg|svg|webp|gif|ico|woff2?|ttf)$/i;

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  const isStatic =
    url.pathname.startsWith('/_next/static/') || STATIC_EXTENSIONS.test(url.pathname);

  if (!isStatic) return; // всё остальное — обычным путём в сеть, без вмешательства

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(request);
      if (cached) return cached;
      const response = await fetch(request);
      if (response.ok) cache.put(request, response.clone());
      return response;
    })
  );
});
