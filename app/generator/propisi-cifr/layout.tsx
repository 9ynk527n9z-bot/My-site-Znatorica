import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Прописи цифр распечатать — от 0 до 20',
  description: 'Прописи с числами от 0 до 20, письменные или печатные, с направляющими линиями для обводки. Печать и скачивание PDF.',
  alternates: { canonical: '/generator/propisi-cifr' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="generator" />
      {children}
    </>
  );
}
