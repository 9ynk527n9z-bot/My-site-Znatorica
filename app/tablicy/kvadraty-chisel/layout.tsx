import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Таблица квадратов чисел от 1 до 20 — распечатать',
  description:
    'Готовая таблица квадратов чисел от 1 до 20 для 3–5 класса: число и его квадрат, цветной и чёрно-белый варианты для печати.',
  alternates: { canonical: '/tablicy/kvadraty-chisel' },
};

export default function SquaresTableLayout({ children }: { children: React.ReactNode }) {
  return children;
}
