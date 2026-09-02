import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Пересказ по картинкам — тренажёр для 6–7 лет',
  description:
    'Собери историю из перемешанных карточек в правильном порядке. Игра развивает связную речь и понимание последовательности событий у детей 6–7 лет.',
  alternates: { canonical: '/trenazher/pereskaz-6-7let' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
