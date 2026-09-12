import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Домашние и дикие животные по-английски — с транскрипцией',
  description:
    'Таблица 20 домашних и диких животных на английском языке с транскрипцией для детей 6–9 лет: Domestic Animals и Wild Animals.',
  alternates: { canonical: '/tablicy/zhivotnye-po-anglijski' },
};

export default function EnglishAnimalsTableLayout({ children }: { children: React.ReactNode }) {
  return children;
}
