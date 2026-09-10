import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Алфавит — генератор русского алфавита для печати',
  description:
    'Создайте русский алфавит с заглавными и строчными буквами. Печатный и письменный режимы, готовый лист для печати, PDF, Word и PNG.',
  alternates: { canonical: '/generator/alfavit' },
};

export default function AlphabetLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="generator" />
      {children}
    </>
  );
}
