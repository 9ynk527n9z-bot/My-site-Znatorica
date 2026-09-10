import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Прописи для дошкольников распечатать — печатные буквы',
  description: 'Прописи с печатными буквами для детей 4–6 лет — проще письменных, подходят для первого знакомства с буквами перед школой. Печать и скачивание PDF.',
  alternates: { canonical: '/generator/propisi-dlya-doshkolnikov' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="generator" />
      {children}
    </>
  );
}
