import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Который час? — генератор циферблатов для печати',
  description: 'Лист с циферблатами для печати: целые часы для 1–2 класса, время с минутами кратно 5 для 2–3 класса. Печать, PDF, Word, PNG.',
  alternates: { canonical: '/generator/kotoryy-chas' },
};

export default function KotoryyChasLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="generator" />
      {children}
    </>
  );
}
