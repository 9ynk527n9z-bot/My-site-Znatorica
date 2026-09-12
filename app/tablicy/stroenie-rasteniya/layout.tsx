import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Строение растения — таблица с картинкой для 1–3 класса',
  description: 'Наглядная таблица строения цветкового растения: корень, стебель, лист, цветок, плод и семя.',
  alternates: { canonical: '/tablicy/stroenie-rasteniya' },
};

export default function PlantStructureLayout({ children }: { children: React.ReactNode }) {
  return children;
}
