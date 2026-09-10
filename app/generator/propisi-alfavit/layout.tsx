import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Прописи — весь алфавит распечатать',
  description: 'Прописи со всеми буквами русского алфавита по порядку — печатные или письменные, заглавные и строчные. Печать и скачивание PDF.',
  alternates: { canonical: '/generator/propisi-alfavit' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="generator" />
      {children}
    </>
  );
}
