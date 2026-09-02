import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Флеш-карточки — генератор карточек для печати и вырезания',
  description:
    'Флеш-карточки для печати: русский и английский алфавит, числа, словарные слова 1–4 класс. Карточки для детей распечатать и вырезать по пунктирной линии. Печать, PDF, Word, PNG.',
  alternates: { canonical: '/generator/fleshkarty' },
};

export default function FleshkartyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="generator" />
      {children}
    </>
  );
}
