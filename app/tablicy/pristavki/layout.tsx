import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Приставки — таблица при-/пре-, без-/бес-, раз-/рас-',
  description:
    'Таблица приставок русского языка для 3–4 класса: неизменяемые приставки за-, на-, под-, различение при-/пре-, правило написания на з/с.',
  alternates: { canonical: '/tablicy/pristavki' },
};

export default function PristavkiTableLayout({ children }: { children: React.ReactNode }) {
  return children;
}
