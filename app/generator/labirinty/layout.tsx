import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Лабиринты для детей — генератор для распечатки',
  description: 'Генератор лабиринтов трёх размеров: маленький (3–5 лет), средний и большой для школьников. Печать, PDF, Word, PNG.',
  alternates: { canonical: '/generator/labirinty' },
};

export default function LabirintyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="generator" />
      {children}
    </>
  );
}
