import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Текстовые задачи для 1 класса — сложение и вычитание',
  description:
    'Тренажёр на решение простых текстовых задач на сложение и вычитание в пределах 10 с выбором ответа из вариантов. 10 раундов для 1 класса.',
  alternates: { canonical: '/trenazher/zadachi-1klass' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
