import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Животные по-английски — тренажёр слов',
  description:
    'Карточки с названиями животных на английском языке: транскрипция, перевод и произношение вслух. Помогает запомнить новые слова и правильное звучание.',
  alternates: { canonical: '/trenazher/english-animals' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
