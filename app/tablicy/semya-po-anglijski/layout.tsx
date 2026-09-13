import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Семья по-английски — таблица слов с транскрипцией',
  description: 'Члены семьи на английском языке с транскрипцией и переводом: mother, father, sister, brother, grandmother. Лист для печати, PDF, Word и PNG.',
  alternates: { canonical: '/tablicy/semya-po-anglijski' },
};

export default function FamilyTableLayout({ children }: { children: React.ReactNode }) {
  return children;
}
