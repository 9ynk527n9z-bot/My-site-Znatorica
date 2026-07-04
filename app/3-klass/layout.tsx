import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '3 класс — сложные примеры, грамматика, английский',
  description:
    'Материалы для 3 класса: трёхзначные числа, примеры в столбик, доли и дроби, спряжение глаголов, английский язык. Теория, тренажёры и шпаргалки.',
  alternates: { canonical: '/3-klass' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
