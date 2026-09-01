import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '4 класс — дроби, геометрия, литература',
  description:
    'Материалы для 4 класса: большие числа, десятичные дроби, геометрия, стили речи, синтаксис, анализ литературных текстов.',
  alternates: { canonical: '/4-klass' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
