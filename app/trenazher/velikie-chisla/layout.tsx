import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Большие числа — тренажёр по разрядам и классам для 4 класса',
  description:
    'Тренажёр на многозначные числа: сколько тысяч в числе и сколько единиц в классе единиц — 10 раундов с выбором ответа из вариантов.',
  alternates: { canonical: '/trenazher/velikie-chisla' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
