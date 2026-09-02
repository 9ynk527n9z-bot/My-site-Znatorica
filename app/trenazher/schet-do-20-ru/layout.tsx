import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Счёт до 20 — тренажёр для детей 6-7 лет с озвучкой',
  description:
    'Изучение чисел от 1 до 20 с озвучкой числительных и игра «сосчитай и выбери»: ребёнок считает предметы и выбирает правильное число.',
  alternates: { canonical: '/trenazher/schet-do-20-ru' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
