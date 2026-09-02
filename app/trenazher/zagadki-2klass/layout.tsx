import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Загадки — тренажёр для 2 класса',
  description:
    'Викторина из 10 раундов с загадками повышенной сложности на метафорах: нужно прочитать загадку и выбрать правильный ответ из четырёх картинок.',
  alternates: { canonical: '/trenazher/zagadki-2klass' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
