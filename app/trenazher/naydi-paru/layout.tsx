import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Найди пару — игра на память для детей',
  description: 'Игра на память «Найди пару»: переверни карточки и найди одинаковые фигуры. Интерактивный тренажёр для дошкольников.',
  alternates: { canonical: '/trenazher/naydi-paru' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
