import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Список вещей в школу — чек-лист для распечатки',
  description:
    'Чек-лист вещей в школу для 1, 2–4 и 5–9 класса: канцелярия, форма, портфель. Убери лишнее, добавь своё и распечатай, чтобы отмечать вещи галочкой при сборе. Печать, PDF, Word, PNG, формат А4.',
  alternates: { canonical: '/generator/spisok-v-shkolu' },
};

export default function SpisokVShkoluLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="generator" />
      {children}
    </>
  );
}
