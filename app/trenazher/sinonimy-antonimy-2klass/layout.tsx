import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Синонимы и антонимы — тренажёр для 2 класса',
  description:
    'Найди синоним или антоним к слову из предложенных вариантов. 10 раундов, тренирует словарный запас по русскому языку для 2 класса.',
  alternates: { canonical: '/trenazher/sinonimy-antonimy-2klass' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
