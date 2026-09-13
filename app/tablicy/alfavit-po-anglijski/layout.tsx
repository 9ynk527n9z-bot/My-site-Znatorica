import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Английский алфавит — таблица с транскрипцией для печати',
  description: 'Все 26 букв английского алфавита с произношением и словом-примером на каждую букву. Цветной и чёрно-белый лист для печати, PDF, Word и PNG.',
  alternates: { canonical: '/tablicy/alfavit-po-anglijski' },
};

export default function EnglishAlphabetTableLayout({ children }: { children: React.ReactNode }) {
  return children;
}
