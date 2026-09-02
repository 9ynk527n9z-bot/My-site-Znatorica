import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Числовая пирамида — генератор математических головоломок',
  description: 'Печатные числовые пирамиды: сложи два соседних числа снизу, чтобы получить число выше, и заполни пирамиду до вершины. Для дошкольников и 1–4 класса.',
  alternates: { canonical: '/generator/chislovaya-piramida' },
};

export default function ChislovayaPiramidaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="generator" />
      {children}
    </>
  );
}
