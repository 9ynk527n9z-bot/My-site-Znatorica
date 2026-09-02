import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Состав числа — генератор «домиков» для 1 класса',
  description: 'Классические «домики» состава числа от 2 до 10 для 1 класса: ребёнок вписывает недостающее слагаемое. Печать, PDF, Word, PNG.',
  alternates: { canonical: '/generator/sostav-chisla' },
};

export default function SostavChislaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="generator" />
      {children}
    </>
  );
}
