import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Прописи — согласные буквы русского алфавита распечатать',
  description: 'Прописи для обводки согласных букв русского алфавита — письменные или печатные, заглавные и строчные. Печать и скачивание PDF.',
  alternates: { canonical: '/generator/propisi-soglasnye' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="generator" />
      {children}
    </>
  );
}
