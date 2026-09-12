import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Английские числительные 1–20 — таблица с транскрипцией',
  description:
    'Таблица английских числительных от 1 до 20 с транскрипцией для детей 5–9 лет: готовый лист для печати и повторения.',
  alternates: { canonical: '/tablicy/anglijskie-chislitelnye' },
};

export default function EnglishNumbersTableLayout({ children }: { children: React.ReactNode }) {
  return children;
}
