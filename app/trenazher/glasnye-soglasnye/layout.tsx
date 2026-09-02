import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Гласная или согласная — тренажёр для 1 класса',
  description:
    'Определи по букве, гласная она или согласная: 10 раундов игры для первоклассников, изучающих русский алфавит.',
  alternates: { canonical: '/trenazher/glasnye-soglasnye' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
