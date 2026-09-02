import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Стили речи — тренажёр для 4 класса',
  description:
    'Определи по отрывку текста стиль речи: разговорный, художественный или деловой. Тренажёр по русскому языку для 4 класса.',
  alternates: { canonical: '/trenazher/stili-rechi-4klass' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
