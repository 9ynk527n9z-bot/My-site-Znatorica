import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Английский алфавит — генератор для печати',
  description:
    'Создайте английский алфавит с заглавными и строчными буквами. Два режима: печатные и письменные буквы. Скачайте или распечатайте готовый лист.',
  alternates: { canonical: '/generator/angliyskiy-alfavit' },
};

export default function EnglishAlphabetLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="generator" />
      {children}
    </>
  );
}
