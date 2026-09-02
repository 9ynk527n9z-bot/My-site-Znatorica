import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Генератор анаграмм для начальной школы — по темам, с подсказками',
  description: 'Создавайте анаграммы по темам: еда, животные, насекомые, цветы, одежда, спорт. Буквы перемешаны — разгадай слово по подсказке.',
  alternates: { canonical: '/generator/anagrammy' },
};

export default function AnagrammyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="generator" />
      {children}
    </>
  );
}
