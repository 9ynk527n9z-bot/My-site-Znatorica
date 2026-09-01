import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Генератор задач по математике — 3 и 4 класс, с решением',
  description: 'Текстовые задачи по математике для 3 и 4 класса с готовым решением и ответом: сложение, вычитание, умножение, деление. Печать, PDF, Word.',
  alternates: { canonical: '/generator/zadachi' },
};

export default function ZadachiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
