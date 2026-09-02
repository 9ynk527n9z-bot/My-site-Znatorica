// Простой список признаков бота/сканера по User-Agent — ловит честно
// представляющихся ботов (поисковые краулеры, security-сканеры, скрипты).
// Скрытые боты, маскирующиеся под обычный браузер, этим не ловятся —
// это защита "по возможности", а не гарантия.
const BOT_UA_PATTERN =
  /bot|spider|crawl|scan|scout|python|curl|wget|go-http|libredtail|monitor|headless|http-client|okhttp|axios|facebookexternalhit|whatsapp|semrush|ahrefs|mj12|dotbot|petalbot|bingpreview/i;

export function isBotUserAgent(userAgent: string | null | undefined): boolean {
  if (!userAgent) return true; // пустой User-Agent — почти всегда скрипт, не браузер
  return BOT_UA_PATTERN.test(userAgent);
}
