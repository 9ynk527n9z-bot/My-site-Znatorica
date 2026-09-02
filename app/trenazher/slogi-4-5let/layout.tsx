import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Сколько слогов в слове — тренажёр для детей 4-5 лет',
  description:
    'Послушай слово, посмотри на картинку и посчитай слоги: 10 раундов с озвучкой для детей 4-5 лет, готовит к обучению грамоте.',
  alternates: { canonical: '/trenazher/slogi-4-5let' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
