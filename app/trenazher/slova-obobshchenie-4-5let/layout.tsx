import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Назови одним словом — тренажёр для детей 4-5 лет',
  description:
    'Игра с озвучкой на обобщающие слова: ребёнок смотрит на три картинки и выбирает подходящее общее слово — фрукты, овощи, животные, мебель, посуда, одежда, транспорт или игрушки.',
  alternates: { canonical: '/trenazher/slova-obobshchenie-4-5let' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
