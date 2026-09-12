import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Таблица умножения от 2 до 9 — распечатать',
  description: 'Красивая таблица умножения от 2 до 9 для начальной школы. Цветной и чёрно-белый варианты: скачать в PDF, Word, PNG или распечатать.',
  alternates: { canonical: '/tablicy/tablitsa-umnozheniya' },
};

export default function MultiplicationTableLayout({ children }: { children: React.ReactNode }) {
  return children;
}
