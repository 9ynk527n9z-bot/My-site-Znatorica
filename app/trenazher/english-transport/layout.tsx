import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Транспорт по-английски — игра «Найди пару» для детей',
  description:
    'Игра-тренажёр английских слов на тему транспорта для детей 4–7 лет: находи пары «слово — картинка» и запоминай названия.',
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
