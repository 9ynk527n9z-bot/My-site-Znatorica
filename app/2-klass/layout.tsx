import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '2 класс — умножение, деление, окружающий мир',
  description:
    'Материалы для 2 класса: умножение, деление, двузначные числа, части речи, окружающий мир. Теория, тренажёры и шпаргалки.',
  alternates: { canonical: '/2-klass' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
