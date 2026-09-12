import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Математические знаки и порядок действий — таблица 1–4 класс',
  description: 'Наглядная таблица математических знаков, компонентов арифметических действий и порядка вычислений для 1–4 класса.',
  alternates: { canonical: '/tablicy/matematicheskie-znaki' },
};

export default function MathSignsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
