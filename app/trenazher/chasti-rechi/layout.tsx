import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Части речи — тренажёр для 2 класса',
  description:
    'Определи часть речи слова: существительное, прилагательное или глагол. 10 раундов, тренирует навык из курса русского языка 2 класса.',
  alternates: { canonical: '/trenazher/chasti-rechi' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
