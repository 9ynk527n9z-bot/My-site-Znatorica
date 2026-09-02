import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Судоку для детей — интерактивная игра',
  description:
    'Заполни сетку числами так, чтобы они не повторялись в строке, столбце и блоке. Судоку для детей — 4×4 и 6×6.',
  alternates: { canonical: '/trenazher/sudoku-igra' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
