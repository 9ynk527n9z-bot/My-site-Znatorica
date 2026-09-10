import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Вычитание до 10 — тренажёр, 1 класс',
  description:
    'Реши 10 примеров на вычитание чисел от 5 до 10 с наглядными шариками, которые помогают увидеть уменьшение количества.',
  alternates: { canonical: '/trenazher/vychitanie-5-10' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
