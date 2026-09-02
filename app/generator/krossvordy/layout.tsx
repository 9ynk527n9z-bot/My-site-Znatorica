import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Генератор кроссвордов для начальной школы — по темам, с ответами',
  description: 'Создавайте кроссворды на русском языке по темам: еда, животные, насекомые, цветы, одежда, спорт. Слова и подсказки собираются автоматически.',
  alternates: { canonical: '/generator/krossvordy' },
};

export default function KrossvordyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="generator" />
      {children}
    </>
  );
}
