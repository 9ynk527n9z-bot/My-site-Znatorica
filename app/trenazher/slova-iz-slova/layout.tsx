import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Слова из слова — найди спрятанные слова',
  description: 'Найди маленькие слова, спрятанные в одном большом слове. Тренирует внимание и словарный запас.',
  alternates: { canonical: '/trenazher/slova-iz-slova' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
