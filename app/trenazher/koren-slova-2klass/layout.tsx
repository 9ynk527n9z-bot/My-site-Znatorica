import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Корень слова — тренажёр для 2 класса',
  description:
    'Найди лишнее слово среди четырёх и определи корень однокоренных слов. Тренажёр развивает навык подбора родственных слов для учеников 2 класса.',
  alternates: { canonical: '/trenazher/koren-slova-2klass' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
