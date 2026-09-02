import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Диалоги и вежливые ответы — тренажёр для детей 6-7 лет',
  description:
  'Игра из 10 раундов: ребёнок читает реплику собеседника и выбирает самый вежливый ответ из четырёх вариантов.',
  alternates: { canonical: '/trenazher/dialogi-6-7let' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
