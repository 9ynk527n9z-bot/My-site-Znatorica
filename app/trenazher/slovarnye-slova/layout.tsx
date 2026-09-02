import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Словарные слова — интерактивный тренажёр, 1–4 класс',
  description: 'Интерактивный тренажёр словарных слов по классам (1–4): режим тренировки и режим на время. Проверка сразу на экране.',
  alternates: { canonical: '/trenazher/slovarnye-slova' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
