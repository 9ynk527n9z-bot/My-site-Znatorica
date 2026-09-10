import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Транспорт по-английски — игра «Найди пару» для детей',
  description:
    'Бесплатная игра-тренажёр английских слов на тему транспорта: находи пару «слово — картинка» и запоминай CAR, BUS, PLANE, TRAIN и другие слова. Для детей 4–7 лет.',
  alternates: { canonical: '/trenazher/english-transport' },
};

export default function EnglishTransportLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
