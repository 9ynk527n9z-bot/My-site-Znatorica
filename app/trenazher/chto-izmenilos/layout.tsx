import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Что изменилось? — тренажёр памяти и внимания для детей',
  description: 'Запомни расположение фигур и найди, что изменилось. Интерактивный тренажёр памяти и внимания для дошкольников.',
  alternates: { canonical: '/trenazher/chto-izmenilos' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
