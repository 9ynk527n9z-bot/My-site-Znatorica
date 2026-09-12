import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Органы чувств человека — таблица для 1–2 класса',
  description: 'Наглядная таблица органов чувств человека: глаза, уши, нос, язык и кожа. Для уроков окружающего мира в 1–2 классах.',
  alternates: { canonical: '/tablicy/organy-chuvstv' },
};

export default function SenseOrgansLayout({ children }: { children: React.ReactNode }) {
  return children;
}
