import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Части тела по-английски — таблица с транскрипцией',
  description: '11 частей тела на английском языке с транскрипцией и переводом: head, eyes, ears, nose, hand. Готовый лист для печати, PDF, Word и PNG.',
  alternates: { canonical: '/tablicy/chasti-tela-po-anglijski' },
};

export default function BodyPartsTableLayout({ children }: { children: React.ReactNode }) {
  return children;
}
