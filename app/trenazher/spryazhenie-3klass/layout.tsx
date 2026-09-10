import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Спряжение глаголов — тренажёр для 4 класса',
  description:
    'Тренажёр по I и II спряжению глаголов: 10 раундов с глаголами в неопределённой форме для 4 класса.',
  alternates: { canonical: '/trenazher/spryazhenie-3klass' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
