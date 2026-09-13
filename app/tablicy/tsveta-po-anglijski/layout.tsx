import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Цвета по-английски — таблица с транскрипцией и образцами',
  description: '11 цветов на английском языке с транскрипцией, переводом и цветным образцом: red, blue, green, yellow. Лист для печати, PDF, Word и PNG.',
  alternates: { canonical: '/tablicy/tsveta-po-anglijski' },
};

export default function ColoursTableLayout({ children }: { children: React.ReactNode }) {
  return children;
}
