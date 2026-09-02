import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Площадь и периметр — тренажёр для 3 класса',
  description:
    'Вычисли площадь и периметр прямоугольника и квадрата по картинке с размерами сторон. 10 раундов с вариантами ответов для учеников 3 класса.',
  alternates: { canonical: '/trenazher/ploshchad-perimetr-3klass' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
