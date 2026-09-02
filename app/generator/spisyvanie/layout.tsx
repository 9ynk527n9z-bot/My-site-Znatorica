import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Генератор текстов для списывания — 1, 2, 3, 4 класс',
  description: 'Тексты для переписывания от руки по русскому языку с 1 по 4 класс — тренирует внимательность, аккуратность и грамотность. Печать, PDF, Word.',
  alternates: { canonical: '/generator/spisyvanie' },
};

export default function SpisyvanieLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="generator" />
      {children}
    </>
  );
}
