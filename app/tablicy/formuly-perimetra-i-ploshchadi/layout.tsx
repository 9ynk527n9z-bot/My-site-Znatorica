import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Формулы периметра и площади — таблица для 2–4 класса',
  description: 'Формулы периметра и площади квадрата, прямоугольника, треугольника и многоугольника с примерами вычислений. Лист для печати, PDF, Word и PNG.',
  alternates: { canonical: '/tablicy/formuly-perimetra-i-ploshchadi' },
};

export default function PerimeterAreaTableLayout({ children }: { children: React.ReactNode }) {
  return children;
}
