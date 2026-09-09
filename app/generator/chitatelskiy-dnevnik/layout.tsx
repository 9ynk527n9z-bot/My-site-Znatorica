import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Читательский дневник — распечатать шаблон, 1–5 класс',
  description:
    'Красивый читательский дневник для распечатки: обложка, страницы для каждой книги и сводная таблица прочитанного. Для 1–2 и 3–5 класса. Печать, PDF, Word, PNG, формат А4.',
  alternates: { canonical: '/generator/chitatelskiy-dnevnik' },
};

export default function ChitatelskiyDnevnikLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="generator" />
      {children}
    </>
  );
}
