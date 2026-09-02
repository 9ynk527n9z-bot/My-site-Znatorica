'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackPageView } from '@/lib/track';

const UTM_STORAGE_KEY = 'znatorika_utm_source';
const REFERRER_STORAGE_KEY = 'znatorika_referrer';

// Считаем просмотр каждой страницы сайта для внутренней аналитики (/admin/analytics).
// Админский раздел и сама админка из статистики исключены, чтобы не засорять данные.
//
// utm_source (метка "откуда пришёл", например ?utm_source=vk_ads) запоминается в
// localStorage при первом заходе по такой ссылке и дальше прикладывается ко ВСЕМ
// просмотрам в рамках визита — это "first-touch"-атрибуция: важно знать, с чего
// начался визит, а не только на какой странице стоит метка.
//
// yclid/gclid — клик-метки, которые Яндекс.Директ и Google Ads сами добавляют в
// ссылку объявления, даже если в самой рекламе не настроен ?utm_source=. Без этого
// платный трафик выглядел бы как "прямые заходы / без метки" и был бы неотличим от
// органики — используем их как запасной источник, если utm_source не задан явно.
export default function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname || pathname.startsWith('/admin')) return;

    let utmSource: string | undefined;
    let referrer: string | undefined;
    try {
      const fromUrl =
        searchParams.get('utm_source') ||
        (searchParams.get('yclid') ? 'yandex-direct' : null) ||
        (searchParams.get('gclid') ? 'google-ads' : null);
      if (fromUrl) {
        localStorage.setItem(UTM_STORAGE_KEY, fromUrl.slice(0, 100));
      }
      utmSource = localStorage.getItem(UTM_STORAGE_KEY) || undefined;

      // Referrer — только с ПЕРВОЙ страницы визита: дальше document.referrer при
      // переходах внутри сайта станет самим сайтом и перезатрёт настоящий источник.
      if (!localStorage.getItem(REFERRER_STORAGE_KEY)) {
        let host = 'direct';
        if (document.referrer) {
          try {
            host = new URL(document.referrer).hostname || 'direct';
          } catch {
            host = 'direct';
          }
        }
        localStorage.setItem(REFERRER_STORAGE_KEY, host.slice(0, 100));
      }
      referrer = localStorage.getItem(REFERRER_STORAGE_KEY) || undefined;
    } catch {
      // localStorage недоступен (приватный режим и т.п.) — просто не размечаем источник
    }

    trackPageView(pathname, utmSource, referrer);
  }, [pathname, searchParams]);

  return null;
}
