import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Одежда по-английски — интерактивный тренажёр для детей',
  description:
    'Бесплатный интерактивный тренажёр английских слов на тему одежды: слово, транскрипция и озвучка британским произношением для детей 4–7 лет.',
  alternates: { canonical: '/trenazher/english-clothes' },
};

export default function EnglishClothesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
