import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Назови одним словом — тренажёр для детей 4-5 лет',
  description:
    'Обобщающие слова для детей 4–5 лет: посмотри на три картинки и выбери общую группу — фрукты, животные, мебель, транспорт или другую.',
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
