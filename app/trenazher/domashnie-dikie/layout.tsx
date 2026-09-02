import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Домашние и дикие животные — тренажёр для детей 4-5 лет',
  description:
    'Раздели животных на домашних и диких по картинке и озвученному названию. 10 раундов, развивает знания об окружающем мире у детей 4-5 лет.',
  alternates: { canonical: '/trenazher/domashnie-dikie' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
