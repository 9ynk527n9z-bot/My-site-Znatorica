import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Русский алфавит — тренажёр для детей 4–5 лет',
  description:
    'Интерактивное изучение русского алфавита с озвучкой букв и слов, плюс игра «Угадай букву»: услышь слово и выбери, с какой буквы оно начинается.',
  alternates: { canonical: '/trenazher/russkiy-alfavit' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
