import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Сравнение предметов — тренажёр для дошкольников',
  description:
    'Сравни фигуры, полоски и предметы по размеру, длине и количеству: 10 раундов игры для детей дошкольного возраста.',
  alternates: { canonical: '/trenazher/sravnenie-predmetov' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
