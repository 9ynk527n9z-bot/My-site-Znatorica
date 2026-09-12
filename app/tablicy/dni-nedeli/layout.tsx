import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Дни недели по порядку — таблица для распечатки',
  description:
    'Таблица 7 дней недели по порядку для дошкольников и 1 класса: будни и выходные, с наглядными значками.',
  alternates: { canonical: '/tablicy/dni-nedeli' },
};

export default function WeekdaysTableLayout({ children }: { children: React.ReactNode }) {
  return children;
}
