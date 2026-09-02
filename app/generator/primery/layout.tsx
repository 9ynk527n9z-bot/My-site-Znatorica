import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Генератор примеров по математике с ответами — до 10, до 100, до 1000',
  description: 'Создавайте примеры по математике на сложение, вычитание и умножение с нужным диапазоном чисел. Печать и скачивание PDF.',
  alternates: { canonical: '/generator/primery' },
};

export default function GeneratorPrimeryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="generator" />
      {children}
    </>
  );
}
