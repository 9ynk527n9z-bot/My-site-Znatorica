import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Неправильные глаголы английского — таблица с переводом',
  description:
    'Таблица 62 неправильных глаголов английского языка: три формы (base, past, participle) и перевод. Готовый лист для распечатки и повторения.',
  alternates: { canonical: '/tablicy/nepravilnye-glagoly' },
};

export default function IrregularVerbsTableLayout({ children }: { children: React.ReactNode }) {
  return children;
}
