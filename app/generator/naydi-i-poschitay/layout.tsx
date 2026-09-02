import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Найди и посчитай — задания на счёт для печати',
  description:
    'Задания «найди и посчитай»: на листе вразброс перемешаны животные, фрукты, транспорт или фигуры — найди и сосчитай, сколько каждого вида. Печать, PDF, Word, PNG.',
  alternates: { canonical: '/generator/naydi-i-poschitay' },
};

export default function NaydiIPoschitayLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="generator" />
      {children}
    </>
  );
}
