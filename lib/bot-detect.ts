// Простой список признаков бота/сканера по User-Agent — ловит честно
// представляющихся ботов (поисковые краулеры, security-сканеры, скрипты).
// Скрытые боты, маскирующиеся под обычный браузер, этим не ловятся —
// это защита "по возможности", а не гарантия.
// Отдельно перечислены ИИ-краулеры и агенты (GPTBot, ClaudeBot и т.п.) — сами
// представляются явно в User-Agent, но не всегда содержат общее слово "bot"
// в узнаваемом месте, поэтому стоит проверять по имени явно, а не полагаться
// только на общий паттерн выше.
const BOT_UA_PATTERN =
  /bot|spider|crawl|scan|scout|python|curl|wget|go-http|libredtail|monitor|headless|http-client|okhttp|axios|facebookexternalhit|whatsapp|semrush|ahrefs|mj12|dotbot|petalbot|bingpreview|gptbot|chatgpt|oai-searchbot|claudebot|claude-web|claude-user|anthropic|perplexity|ccbot|bytespider|applebot-extended|cohere-ai|amazonbot|diffbot|meta-externalagent/i;

export function isBotUserAgent(userAgent: string | null | undefined): boolean {
  if (!userAgent) return true; // пустой User-Agent — почти всегда скрипт, не браузер
  return BOT_UA_PATTERN.test(userAgent);
}
