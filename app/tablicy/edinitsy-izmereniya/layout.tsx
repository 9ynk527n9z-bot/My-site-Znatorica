import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Единицы измерения — таблица для 2–4 класса',
  description: 'Таблица единиц длины, массы, времени и площади для 2–4 класса. Соотношения величин и примеры перевода для печати и скачивания.',
  alternates: { canonical: '/tablicy/edinitsy-izmereniya' },
};

export default function MeasurementUnitsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
