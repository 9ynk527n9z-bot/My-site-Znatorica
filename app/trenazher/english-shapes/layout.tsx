import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Формы по-английски — тренажёр для детей',
  description: 'Интерактивный тренажёр английских названий геометрических форм для детей: Circle, Square, Triangle, Star, Heart и другие.',
  alternates: { canonical: '/trenazher/english-shapes' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
