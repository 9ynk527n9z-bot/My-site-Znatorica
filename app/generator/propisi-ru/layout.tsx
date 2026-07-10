import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Генератор прописей — русский алфавит',
  description: 'Создавайте прописи русских букв для обводки и самостоятельного письма. Выбор заглавных и строчных букв.',
  alternates: { canonical: '/generator/propisi-ru' },
};

export default function PropisiRuLayout({ children }: { children: React.ReactNode }) {
  return children;
}
