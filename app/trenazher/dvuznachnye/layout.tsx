import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Двузначные числа — тренажёр по разрядам для 2 класса',
  description:
    'Тренажёр учит определять количество десятков и единиц в двузначном числе. 10 раундов с вариантами ответов и мгновенной проверкой.',
  alternates: { canonical: '/trenazher/dvuznachnye' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
