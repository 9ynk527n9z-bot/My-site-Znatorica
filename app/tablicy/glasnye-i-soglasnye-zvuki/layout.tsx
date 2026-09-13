import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Гласные и согласные звуки — таблица для 1–2 класса',
  description: 'Гласные и согласные русского языка: пары звонких и глухих, твёрдые и мягкие звуки. Цветной и чёрно-белый лист для печати, PDF, Word и PNG.',
  alternates: { canonical: '/tablicy/glasnye-i-soglasnye-zvuki' },
};

export default function VowelsConsonantsTableLayout({ children }: { children: React.ReactNode }) {
  return children;
}
