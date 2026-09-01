import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Счёт предметов — генератор заданий для дошкольников и 1 класса',
  description: 'Задания «посчитай и напиши число»: счёт фигурок до 5 и до 10 для дошкольников и 1 класса. Печать, PDF, Word, PNG.',
  alternates: { canonical: '/generator/schet-predmetov' },
};

export default function SchetPredmetovLayout({ children }: { children: React.ReactNode }) {
  return children;
}
