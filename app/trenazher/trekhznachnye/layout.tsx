import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Трёхзначные числа — тренажёр по разрядам для 3 класса',
  description:
    'Тренажёр учит определять количество сотен, десятков и единиц в трёхзначном числе. 10 раундов с вариантами ответов и мгновенной проверкой.',
  alternates: { canonical: '/trenazher/trekhznachnye' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
