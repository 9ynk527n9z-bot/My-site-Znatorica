import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Римские цифры — таблица от 1 до 20 и правило записи',
  description:
    'Таблица римских цифр от 1 до 20 с примерами для 3–5 класса: обозначения I, V, X, L, C, D, M и правило сложения-вычитания.',
  alternates: { canonical: '/tablicy/rimskie-cifry' },
};

export default function RomanNumeralsTableLayout({ children }: { children: React.ReactNode }) {
  return children;
}
