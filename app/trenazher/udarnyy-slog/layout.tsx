import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Ударный слог — тренажёр для 2 класса',
  description:
    'Бесплатный интерактивный тренажёр для 2 класса: определи ударный слог в слове, разбитом по слогам, и проверь себя — 10 слов за раунд.',
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
