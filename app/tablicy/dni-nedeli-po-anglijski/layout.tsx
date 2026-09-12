import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Дни недели по-английски — таблица с переводом и транскрипцией',
  description:
    'Таблица 7 дней недели на английском языке с переводом и транскрипцией для детей 6–9 лет: от Monday до Sunday.',
  alternates: { canonical: '/tablicy/dni-nedeli-po-anglijski' },
};

export default function EnglishWeekdaysTableLayout({ children }: { children: React.ReactNode }) {
  return children;
}
