import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Счёт до 5 — тренажёр для дошкольников',
  description:
    'Изучи числа от 1 до 5 с озвучкой и потренируйся считать предметы, выбирая правильное число. Для детей дошкольного возраста.',
  alternates: { canonical: '/trenazher/schet-do-5' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
