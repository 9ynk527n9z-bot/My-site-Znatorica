import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Пятнашки — собери числа по порядку',
  description: 'Классическая головоломка пятнашки: передвигай плитки и собери числа по порядку. Тренирует логику и терпение.',
  alternates: { canonical: '/trenazher/pyatnashki' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
