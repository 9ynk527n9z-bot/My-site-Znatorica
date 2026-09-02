import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Деление с остатком — тренажёр для 3 класса',
  description:
    'Реши 10 примеров на деление двузначных чисел с остатком, выбирая правильный ответ из вариантов. Тренажёр для отработки навыка деления с остатком.',
  alternates: { canonical: '/trenazher/delenie-s-ostatkom' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
