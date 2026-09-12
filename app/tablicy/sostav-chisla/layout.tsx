import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Состав числа до 10 и 20 — таблица для печати',
  description: 'Красивые таблицы состава числа до 10 и до 20 для 1–2 класса. Пары слагаемых, цветной и чёрно-белый варианты для печати, PDF, Word и PNG.',
  alternates: { canonical: '/tablicy/sostav-chisla' },
};

export default function NumberCompositionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
