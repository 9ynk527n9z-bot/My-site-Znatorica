import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Генератор диктантов по русскому языку — 1, 2, 3, 4 класс',
  description: 'Тренировочные тексты для диктантов по русскому языку с 1 по 4 класс. Длина текста подобрана по возрасту. Печать, PDF, Word.',
  alternates: { canonical: '/generator/diktanty' },
};

export default function DiktantyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="generator" />
      {children}
    </>
  );
}
