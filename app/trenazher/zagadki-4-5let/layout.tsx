import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Загадки для малышей 4–5 лет',
  description:
    'Прочитай загадку и выбери правильную картинку из четырёх вариантов. Игра развивает логику и словарный запас у детей 4–5 лет.',
  alternates: { canonical: '/trenazher/zagadki-4-5let' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
