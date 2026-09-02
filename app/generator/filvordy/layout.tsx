import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Генератор филвордов — найди слова в сетке букв',
  description: 'Создавайте филворды по темам: еда, животные, насекомые, цветы, одежда, спорт. Слова спрятаны в сетке по горизонтали, вертикали и диагонали.',
  alternates: { canonical: '/generator/filvordy' },
};

export default function FilvordyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="generator" />
      {children}
    </>
  );
}
