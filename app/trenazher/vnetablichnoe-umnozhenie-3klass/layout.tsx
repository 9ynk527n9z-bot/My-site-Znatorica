import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Внетабличное умножение и деление — тренажёр для 3 класса',
  description:
    'Реши примеры на умножение двузначного числа на однозначное и деление без остатка. Тренажёр по математике для 3 класса.',
  alternates: { canonical: '/trenazher/vnetablichnoe-umnozhenie-3klass' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
