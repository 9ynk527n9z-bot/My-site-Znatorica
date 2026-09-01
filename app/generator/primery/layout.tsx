import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Генератор примеров по математике',
  description: 'Создавайте примеры по математике на сложение, вычитание и умножение с нужным диапазоном чисел. Печать и скачивание PDF.',
  alternates: { canonical: '/generator/primery' },
};

export default function GeneratorPrimeryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
