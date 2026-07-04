import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Дошкольники 4–5 лет — счёт, буквы, цвета',
  description:
    'Занятия для детей 4–5 лет: счёт до 5 и до 10, геометрические фигуры, цвета, развитие речи и грамота. Теория, тренажёры и шпаргалки.',
  alternates: { canonical: '/4-5-let' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
