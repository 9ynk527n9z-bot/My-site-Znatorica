import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Графический диктант по клеточкам — генератор для распечатки',
  description: 'Создавайте графические диктанты по клеточкам: ребёнок ведёт линию по инструкциям и получает рисунок. Печать, PDF, Word, PNG.',
  alternates: { canonical: '/generator/graficheskiy-diktant' },
};

export default function GraficheskiyDiktantLayout({ children }: { children: React.ReactNode }) {
  return children;
}
