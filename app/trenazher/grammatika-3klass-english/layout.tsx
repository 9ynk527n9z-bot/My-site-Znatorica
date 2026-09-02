import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Английская грамматика — тренажёр для 3 класса',
  description:
    'Тренажёр на вставку пропущенного слова в предложении: глагол to be (am/is/are), окончания -s/-es в Present Simple и множественное число существительных.',
  alternates: { canonical: '/trenazher/grammatika-3klass-english' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
