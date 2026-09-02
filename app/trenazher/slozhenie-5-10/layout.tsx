import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Сложение в пределах 10 — тренажёр для 1 класса',
  description:
    'Реши примеры на сложение чисел в пределах 10 с наглядными картинками и выбором ответа. Тренажёр для первоклассников.',
  alternates: { canonical: '/trenazher/slozhenie-5-10' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
