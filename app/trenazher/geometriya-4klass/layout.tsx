import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Периметр и площадь — тренажёр для 4 класса',
  description:
    'Тренажёр на нахождение периметра и площади прямоугольника и квадрата по картинке с размерами сторон. 10 раундов с выбором ответа для 4 класса.',
  alternates: { canonical: '/trenazher/geometriya-4klass' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
