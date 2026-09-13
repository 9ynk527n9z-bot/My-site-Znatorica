import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Школьные принадлежности по-английски — таблица слов',
  description: '20 школьных слов на английском языке с транскрипцией и переводом: book, pen, pencil, ruler, notebook. Лист для печати, PDF, Word и PNG.',
  alternates: { canonical: '/tablicy/shkolnye-prinadlezhnosti-po-anglijski' },
};

export default function SchoolThingsTableLayout({ children }: { children: React.ReactNode }) {
  return children;
}
