import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Закономерности — продолжи ряд, тренажёр для детей 6-7 лет',
  description:
    'Найди повторяющийся узор в ряду картинок и выбери, какая идёт следующей. Тренажёр из 10 раундов развивает логическое мышление у детей.',
  alternates: { canonical: '/trenazher/zakonomernosti' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
