'use client';

import { usePathname, useRouter } from 'next/navigation';

// Маленькая плавающая кнопка «Назад» — видна на любой странице сайта, в любом
// состоянии (после прокрутки, после прохождения теста/тренажёра). Раньше
// ссылка "← Назад" была только в шапке конкретной страницы — после прокрутки
// вниз (например, дочитав до конца квиза после теории, или дойдя до экрана
// результата в тренажёре) её не было видно, и было неясно, как вернуться.
// Использует router.back() — ведёт туда, откуда реально пришёл человек,
// а не на фиксированную страницу (по разделам сайта это разные "назад").
const HIDDEN_ON = ['/', '/admin'];

export default function FloatingBackButton() {
  const pathname = usePathname();
  const router = useRouter();

  if (!pathname) return null;
  if (HIDDEN_ON.some((p) => (p === '/' ? pathname === '/' : pathname.startsWith(p)))) return null;

  return (
    <button
      onClick={() => router.back()}
      className="fixed bottom-4 left-4 z-40 bg-[#2A1B4D]/90 border border-[#2D2350] text-orange text-xs px-3 py-1.5 rounded-full shadow-lg hover:bg-[#2A1B4D] transition-colors backdrop-blur-sm"
    >
      ← Назад
    </button>
  );
}
