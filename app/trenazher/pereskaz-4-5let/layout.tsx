import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Пересказ по картинкам — тренажёр для детей 4-5 лет',
  description:
    'Игра для развития связной речи: ребёнок расставляет перемешанные карточки истории по порядку от начала до конца.',
  alternates: { canonical: '/trenazher/pereskaz-4-5let' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
