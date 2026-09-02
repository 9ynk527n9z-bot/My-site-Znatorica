import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Деление — тренажёр устного счёта для 2 класса',
  description:
    'Реши 10 примеров на деление без остатка и выбери верный ответ из вариантов. Тренажёр для отработки устного деления с наглядными группами предметов.',
  alternates: { canonical: '/trenazher/delenie' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
