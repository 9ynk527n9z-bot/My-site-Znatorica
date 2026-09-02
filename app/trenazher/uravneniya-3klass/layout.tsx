import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Уравнения — тренажёр для 3 класса',
  description:
    'Найди неизвестное x в простых уравнениях на сложение, вычитание, умножение и деление: 10 раундов для учеников 3 класса.',
  alternates: { canonical: '/trenazher/uravneniya-3klass' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
