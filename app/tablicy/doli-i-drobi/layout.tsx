import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Доли и дроби — таблица со схемами кругов',
  description:
    'Таблица простых долей и дробей для 2–3 класса: половина, треть, четверть, 2/3 и 3/4 с наглядными схемами кругов.',
  alternates: { canonical: '/tablicy/doli-i-drobi' },
};

export default function FractionsTableLayout({ children }: { children: React.ReactNode }) {
  return children;
}
