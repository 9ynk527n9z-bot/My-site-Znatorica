import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Простое и сложное предложение — тренажёр для 3 класса',
  description:
    'Определи, простое предложение перед тобой или сложное. Тренажёр из 10 раундов помогает ученикам 3 класса научиться различать типы предложений.',
  alternates: { canonical: '/trenazher/slozhnie-predlozheniya-3klass' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
