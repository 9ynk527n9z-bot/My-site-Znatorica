import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Математическая раскраска — генератор для печати',
  description:
    'Математическая раскраска онлайн: ребёнок решает пример на сложение и вычитание в пределах 10 или 20, по ответу определяет цвет и закрашивает клетку — так проявляется картинка (звезда, сердечко, ёлочка). Печать, PDF, Word, PNG.',
  alternates: { canonical: '/generator/matematicheskaya-raskraska' },
};

export default function MatematicheskayaRaskraskaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="generator" />
      {children}
    </>
  );
}
