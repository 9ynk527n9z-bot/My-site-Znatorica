import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Прописи — гласные буквы русского алфавита распечатать',
  description: 'Прописи для обводки гласных букв (А, Е, Ё, И, О, У, Ы, Э, Ю, Я) — письменные или печатные, заглавные и строчные. Печать и скачивание PDF.',
  alternates: { canonical: '/generator/propisi-glasnye' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="generator" />
      {children}
    </>
  );
}
