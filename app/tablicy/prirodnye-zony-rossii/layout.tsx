import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Природные зоны России — таблица для 4 класса',
  description: 'Наглядная таблица природных зон России: расположение, климат, растения и животные. Материал по окружающему миру для 4 класса.',
  alternates: { canonical: '/tablicy/prirodnye-zony-rossii' },
};

export default function NaturalZonesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
