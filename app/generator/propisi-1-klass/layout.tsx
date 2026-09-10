import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Прописи для 1 класса распечатать — письменные буквы',
  description: 'Прописи с письменными буквами русского алфавита, заглавные и строчные — как учат писать в первом классе. Печать и скачивание PDF.',
  alternates: { canonical: '/generator/propisi-1-klass' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="generator" />
      {children}
    </>
  );
}
