import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Жи-ши, ча-ща, чу-щу — тренажёр для 1 класса',
  description:
    'Вставляй пропущенную букву в слова на правило жи-ши, ча-ща, чу-щу — эти сочетания нужно запомнить, они не проверяются ударением. 10 раундов.',
  alternates: { canonical: '/trenazher/zhi-shi-cha-scha' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
