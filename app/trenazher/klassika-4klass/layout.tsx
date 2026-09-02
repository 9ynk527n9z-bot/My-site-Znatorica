import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Угадай автора — классика для 4 класса',
  description:
    'По названию произведения угадай его автора: Пушкин, Толстой или Крылов. Тренажёр закрепляет знание русской классической литературы.',
  alternates: { canonical: '/trenazher/klassika-4klass' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
