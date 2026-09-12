import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Домашние и дикие животные — таблица для распечатки',
  description:
    'Таблица домашних и диких животных для дошкольников и 1–2 класса: 20 животных с картинками, разделённых на две группы.',
  alternates: { canonical: '/tablicy/domashnie-i-dikie-zhivotnye' },
};

export default function AnimalsTableLayout({ children }: { children: React.ReactNode }) {
  return children;
}
