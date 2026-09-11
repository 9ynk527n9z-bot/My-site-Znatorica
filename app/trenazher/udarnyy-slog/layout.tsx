import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Ударный слог — тренажёр для 2 класса',
  description:
    'Ударный слог — тренажёр для 2 класса: определи ударение в слове, разбитом на слоги, и проверь себя. 10 слов за занятие.',
  alternates: { canonical: '/trenazher/udarnyy-slog' },
};

export default function UdarnyySlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
