import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Одежда по-английски — тренажёр для детей',
  description:
    'Тренажёр английских слов на тему одежды для детей 4–7 лет: название предмета, транскрипция, перевод и английская озвучка.',
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
