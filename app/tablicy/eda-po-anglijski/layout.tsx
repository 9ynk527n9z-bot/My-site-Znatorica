import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Еда по-английски — таблица слов с транскрипцией',
  description: '20 продуктов и блюд на английском языке с транскрипцией и переводом: apple, bread, milk, soup. Готовый лист для печати, PDF, Word и PNG.',
  alternates: { canonical: '/tablicy/eda-po-anglijski' },
};

export default function FoodTableLayout({ children }: { children: React.ReactNode }) {
  return children;
}
