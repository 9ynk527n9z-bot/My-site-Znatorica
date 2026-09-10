import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Примеры на сложение и вычитание до 20 — распечатать с ответами',
  description: 'Генератор примеров на сложение и вычитание в пределах 20 для 1 класса, включая переход через десяток. Печать и скачивание PDF, ответы скрыты по умолчанию.',
  alternates: { canonical: '/generator/primery-do-20' },
};

export default function GeneratorPrimeryDo20Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="generator" />
      {children}
    </>
  );
}
