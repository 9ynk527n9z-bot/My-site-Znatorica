import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Части речи — тренажёр для 4 класса',
  description:
    'Определи часть речи слова: существительное, глагол, прилагательное, наречие, местоимение, предлог или числительное. 10 раундов на уровень 4 класса.',
  alternates: { canonical: '/trenazher/chasti-rechi-4klass' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
