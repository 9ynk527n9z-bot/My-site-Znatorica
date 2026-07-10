import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

// Защита материалов: обычным поисковикам (Google, Яндекс и т.д.) сайт открыт полностью —
// это нужно для SEO. Но известным AI-краулерам, которые скачивают контент для обучения
// моделей или массового пересказа (а не для того, чтобы привести живых посетителей на сайт),
// доступ закрыт явно. Это не техническая защита от целенаправленного копирования (боты могут
// не соблюдать robots.txt), но снижает автоматический сбор контента и подкрепляет запрет
// на скрапинг, зафиксированный в /terms.
const AI_CRAWLERS = [
  'GPTBot',
  'ChatGPT-User',
  'CCBot',
  'anthropic-ai',
  'ClaudeBot',
  'Claude-Web',
  'Google-Extended',
  'Bytespider',
  'Omgili',
  'FacebookBot',
  'Amazonbot',
  'Applebot-Extended',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/', '/account', '/account/', '/api/', '/confirm-email'],
      },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, disallow: '/' })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
