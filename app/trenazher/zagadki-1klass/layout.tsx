import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Загадки — тренажёр для 1 класса',
  description:
    'Отгадай загадку и выбери правильный ответ из четырёх картинок: 10 раундов без повторов для первоклассников.',
  alternates: { canonical: '/trenazher/zagadki-1klass' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
