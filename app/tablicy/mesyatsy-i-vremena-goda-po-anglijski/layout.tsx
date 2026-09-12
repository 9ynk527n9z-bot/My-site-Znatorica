import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Months and Seasons — месяцы и времена года по-английски',
  description:
    'Таблица 12 месяцев и 4 времён года на английском языке с переводом и транскрипцией для детей 6–9 лет.',
  alternates: { canonical: '/tablicy/mesyatsy-i-vremena-goda-po-anglijski' },
};

export default function EnglishMonthsSeasonsTableLayout({ children }: { children: React.ReactNode }) {
  return children;
}
