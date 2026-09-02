import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Разбор слова по составу — тренажёр для 3 класса',
  description:
    'Находи приставку, корень, суффикс и окончание в словах: считай количество морфем и выбирай верный вариант ответа. 10 раундов.',
  alternates: { canonical: '/trenazher/razbor-sostav-3klass' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
