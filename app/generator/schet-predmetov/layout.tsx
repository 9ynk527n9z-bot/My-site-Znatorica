import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Счёт предметов — генератор для дошкольников',
  description: 'Задания «посчитай и напиши число»: счёт фигурок до 5 и до 10 для дошкольников и 1 класса. Печать, PDF, Word, PNG.',
  alternates: { canonical: '/generator/schet-predmetov' },
};

export default function SchetPredmetovLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="generator" />
      {children}
    </>
  );
}
