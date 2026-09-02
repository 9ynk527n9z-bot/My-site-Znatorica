import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Судоку для детей — генератор 4×4, 6×6, 9×9 для распечатки',
  description:
    'Генератор судоку для детей: 4×4 с картинками для дошкольников, 6×6 для 2 класса, классическое 9×9 для 3–4 класса. Печать, PDF, Word, PNG.',
  alternates: { canonical: '/generator/sudoku' },
};

export default function SudokuLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="generator" />
      {children}
    </>
  );
}
