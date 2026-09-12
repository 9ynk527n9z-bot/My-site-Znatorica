import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Цепь питания — наглядная таблица для 2–3 класса',
  description: 'Наглядная цепь питания для уроков окружающего мира: солнце, трава, кузнечик, лягушка и аист.',
  alternates: { canonical: '/tablicy/tsep-pitaniya' },
};

export default function FoodChainLayout({ children }: { children: React.ReactNode }) {
  return children;
}
