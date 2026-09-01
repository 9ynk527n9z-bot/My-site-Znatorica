'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView } from '@/lib/track';

// Считаем просмотр каждой страницы сайта для внутренней аналитики (/admin/analytics).
// Админский раздел и сама админка из статистики исключены, чтобы не засорять данные.
export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname.startsWith('/admin')) return;
    trackPageView(pathname);
  }, [pathname]);

  return null;
}
