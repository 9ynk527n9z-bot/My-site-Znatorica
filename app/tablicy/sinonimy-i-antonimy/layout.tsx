import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Синонимы и антонимы — таблица с примерами для 2–4 класса',
  description: '20 пар слов, близких и противоположных по значению, с объяснением разницы между синонимами и антонимами. Лист для печати, PDF, Word и PNG.',
  alternates: { canonical: '/tablicy/sinonimy-i-antonimy' },
};

export default function SynonymsAntonymsTableLayout({ children }: { children: React.ReactNode }) {
  return children;
}
