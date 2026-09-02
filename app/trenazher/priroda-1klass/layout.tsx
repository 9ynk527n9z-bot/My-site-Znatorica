import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Живая и неживая природа — тренажёр для 1 класса',
  description:
    'Тренажёр учит различать живую и неживую природу: ребёнок смотрит на картинку и определяет, живой это объект или неживой. 10 раундов для 1 класса.',
  alternates: { canonical: '/trenazher/priroda-1klass' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
