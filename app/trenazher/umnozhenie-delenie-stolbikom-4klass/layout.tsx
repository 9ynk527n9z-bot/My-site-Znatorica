import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Умножение и деление столбиком — тренажёр для 4 класса',
  description:
    'Тренажёр на умножение трёхзначных чисел на однозначные и деление без остатка, как при вычислениях столбиком. 10 раундов с выбором ответа для 4 класса.',
  alternates: { canonical: '/trenazher/umnozhenie-delenie-stolbikom-4klass' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
