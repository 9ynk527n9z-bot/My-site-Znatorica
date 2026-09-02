import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Чем закончилась история — тренажёр для 6-7 лет',
  description:
    'Прочитай начало короткой истории и выбери логичный конец из вариантов ответа. Тренажёр развивает понимание причинно-следственных связей и речь у детей 6-7 лет.',
  alternates: { canonical: '/trenazher/rasskazy-6-7let' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
