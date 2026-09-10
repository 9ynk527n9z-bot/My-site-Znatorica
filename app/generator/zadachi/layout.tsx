import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Генератор задач по математике для 3–4 класса',
  description: 'Текстовые задачи по математике для 3 и 4 класса с готовым решением и ответом: сложение, вычитание, умножение, деление. Печать, PDF, Word.',
  alternates: { canonical: '/generator/zadachi' },
};

export default function ZadachiLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="generator" />
      {children}
    </>
  );
}
