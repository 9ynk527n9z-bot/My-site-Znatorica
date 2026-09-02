import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Спряжение глаголов — тренажёр для 3 класса',
  description:
    'Тренажёр учит определять спряжение глаголов: прочитай глагол в неопределённой форме и выбери I или II спряжение. 10 раундов для 3 класса.',
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
