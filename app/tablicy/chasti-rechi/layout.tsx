import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Части речи — таблица для 2–4 класса',
  description: 'Таблица частей речи для начальной школы: значение, вопросы и примеры существительного, прилагательного, глагола, местоимения, наречия, числительного и предлога.',
  alternates: { canonical: '/tablicy/chasti-rechi' },
};

export default function PartsOfSpeechTableLayout({ children }: { children: React.ReactNode }) {
  return children;
}
