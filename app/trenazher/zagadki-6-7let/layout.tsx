import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Загадки — тренажёр для детей 6-7 лет',
  description:
    'Отгадай загадку и выбери верный ответ из четырёх вариантов. Тренажёр развивает логику и мышление у детей 6-7 лет.',
  alternates: { canonical: '/trenazher/zagadki-6-7let' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
