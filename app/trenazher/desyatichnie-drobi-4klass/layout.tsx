import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Десятичные дроби — тренажёр для 4 класса',
  description:
    'Сравнение и сложение десятичных дробей в пределах 10: 10 раундов с автоматической проверкой для учеников 4 класса.',
  alternates: { canonical: '/trenazher/desyatichnie-drobi-4klass' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
