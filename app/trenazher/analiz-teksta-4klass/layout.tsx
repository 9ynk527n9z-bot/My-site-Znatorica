import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Анализ текста — тема и главная мысль для 4 класса',
  description:
    'Тренажёр учит находить тему и главную мысль текста: ученик читает короткий текст и выбирает верный ответ из вариантов. Для учеников 4 класса.',
  alternates: { canonical: '/trenazher/analiz-teksta-4klass' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
