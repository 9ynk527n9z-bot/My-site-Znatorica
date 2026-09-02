import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Угадай слово — игра на угадывание букв',
  description: 'Отгадай загаданное слово по буквам, пока не кончились жизни. Весёлая игра для тренировки словарного запаса.',
  alternates: { canonical: '/trenazher/ugaday-slovo' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
