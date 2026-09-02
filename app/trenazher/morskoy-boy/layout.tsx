import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Морской бой — найди и потопи корабли',
  description:
    'Найди и потопи все корабли компьютера по координатам. Игра развивает логику и учит читать координаты.',
  alternates: { canonical: '/trenazher/morskoy-boy' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
