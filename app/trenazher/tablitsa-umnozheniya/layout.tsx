import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Таблица умножения — тренажёр в 4 режимах для 2-4 класса',
  description:
    'Интерактивный тренажёр таблицы умножения для 2–4 класса: режим изучения таблицы, тренировка, игра на время и поиск множителя.',
  alternates: { canonical: '/trenazher/tablitsa-umnozheniya' },
};

export default function MultiplicationTableLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
