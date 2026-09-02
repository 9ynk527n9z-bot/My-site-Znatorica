import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Склонение существительных — тренажёр для 4 класса',
  description:
    'Определяй склонение существительного (1, 2 или 3) по начальной форме слова. 10 раундов с мгновенной проверкой ответа.',
  alternates: { canonical: '/trenazher/sklonenie-4klass' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
