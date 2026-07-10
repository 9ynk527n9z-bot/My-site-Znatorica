import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Генератор кроссвордов по темам',
  description: 'Создавайте кроссворды на русском языке по темам: еда, животные, насекомые, цветы, одежда, спорт. Слова и подсказки собираются автоматически.',
  alternates: { canonical: '/generator/krossvordy' },
};

export default function KrossvordyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
