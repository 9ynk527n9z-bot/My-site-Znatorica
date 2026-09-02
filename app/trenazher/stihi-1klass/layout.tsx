import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Подбери рифму — тренажёр по стихам для 1 класса',
  description:
    'Игра из 10 раундов: ребёнок читает строчку известного стихотворения и выбирает слово, которое рифмуется с последним словом строки.',
  alternates: { canonical: '/trenazher/stihi-1klass' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
