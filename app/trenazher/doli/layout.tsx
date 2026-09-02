import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Доли и дроби — тренажёр для 3 класса',
  description:
    'Определи по рисунку круга или прямоугольника, какая доля закрашена: 1/2, 1/3, 1/4, 2/3 или 3/4. Тренирует понимание простых дробей.',
  alternates: { canonical: '/trenazher/doli' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
