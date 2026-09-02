import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Правила безопасности — тренажёр для 1 класса',
  description:
    'Интерактивная игра из 10 ситуаций про дорогу, огонь, электричество и незнакомых людей: ребёнок выбирает правильный вариант поведения.',
  alternates: { canonical: '/trenazher/bezopasnost-1klass' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
