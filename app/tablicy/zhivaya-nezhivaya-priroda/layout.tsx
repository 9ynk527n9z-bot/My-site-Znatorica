import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Живая и неживая природа — таблица для 1–2 класса',
  description: 'Наглядная таблица с примерами живой и неживой природы для уроков окружающего мира в 1–2 классах.',
  alternates: { canonical: '/tablicy/zhivaya-nezhivaya-priroda' },
};

export default function LivingNonlivingNatureLayout({ children }: { children: React.ReactNode }) {
  return children;
}
