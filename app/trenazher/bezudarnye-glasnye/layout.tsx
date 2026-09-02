import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Безударные гласные — тренажёр для 2 класса',
  description:
    'Вставь пропущенную букву и подбери проверочное слово. Тренажёр отрабатывает правило безударной гласной в корне слова.',
  alternates: { canonical: '/trenazher/bezudarnye-glasnye' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
