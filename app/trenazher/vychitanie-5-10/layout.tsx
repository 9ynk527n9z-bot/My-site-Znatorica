import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Вычитание в пределах 10 — тренажёр для дошкольников и 1 класса',
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
