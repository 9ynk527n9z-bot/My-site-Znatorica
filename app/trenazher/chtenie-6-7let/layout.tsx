import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Чтение по слогам — тренажёр для детей 6–7 лет',
  description:
    'Ребёнок читает слово по слогам, слушает его звучание и выбирает подходящую картинку из четырёх вариантов. Тренирует навык слогового чтения перед школой.',
  alternates: { canonical: '/trenazher/chtenie-6-7let' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
