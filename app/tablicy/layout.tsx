import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Учебные таблицы для начальной школы — скачать и распечатать',
  description: 'Бесплатные учебные таблицы по математике и русскому языку для 1–4 класса: таблица умножения, состав числа, падежи и части речи.',
  alternates: { canonical: '/tablicy' },
};

export default function TablesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
