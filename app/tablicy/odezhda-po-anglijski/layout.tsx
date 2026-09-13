import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Одежда по-английски — таблица слов с транскрипцией',
  description: '20 предметов одежды и аксессуаров на английском с транскрипцией и переводом: shirt, dress, shoes, hat. Лист для печати, PDF, Word и PNG.',
  alternates: { canonical: '/tablicy/odezhda-po-anglijski' },
};

export default function ClothesTableLayout({ children }: { children: React.ReactNode }) {
  return children;
}
