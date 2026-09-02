import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Счёт до 10 — тренажёр для дошкольников',
  description:
    'Изучение чисел от 1 до 10 с озвучкой и картинками, плюс игра «Сосчитай и выбери число» — 10 раундов для детей 4-6 лет.',
  alternates: { canonical: '/trenazher/schet-do-10' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
