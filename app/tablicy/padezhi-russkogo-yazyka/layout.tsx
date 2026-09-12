import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Падежи русского языка — таблица для 3–4 класса',
  description: 'Таблица падежей русского языка: вопросы, предлоги и пример склонения существительного. Цветной и чёрно-белый лист для печати, PDF, Word и PNG.',
  alternates: { canonical: '/tablicy/padezhi-russkogo-yazyka' },
};

export default function CasesTableLayout({ children }: { children: React.ReactNode }) {
  return children;
}
