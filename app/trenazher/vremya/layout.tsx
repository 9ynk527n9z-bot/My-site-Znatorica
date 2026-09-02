import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Определи время по часам — тренажёр для детей 6-7 лет',
  description:
    'Посмотри на циферблат и выбери правильный час. Тренажёр из 10 раундов учит детей читать время по часам со стрелками.',
  alternates: { canonical: '/trenazher/vremya' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
