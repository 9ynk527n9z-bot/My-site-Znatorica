import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Цвета — тренажёр для малышей',
  description:
    'Ребёнок смотрит на цветной кружок и выбирает его название из четырёх вариантов с озвучкой ответа. 10 раундов, помогает запомнить названия цветов.',
  alternates: { canonical: '/trenazher/tsveta' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
