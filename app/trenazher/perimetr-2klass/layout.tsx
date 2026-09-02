import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Периметр — тренажёр для 2 класса',
  description:
    'Посчитай периметр прямоугольника и квадрата по сторонам и выбери верный ответ из вариантов. Тренажёр по математике для 2 класса.',
  alternates: { canonical: '/trenazher/perimetr-2klass' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
