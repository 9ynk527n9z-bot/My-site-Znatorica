import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Солнечная система — таблица с планетами для 4 класса',
  description: 'Наглядная таблица Солнечной системы: Солнце и восемь планет по порядку. Материал по окружающему миру для 4 класса.',
  alternates: { canonical: '/tablicy/solnechnaya-sistema' },
};

export default function SolarSystemLayout({ children }: { children: React.ReactNode }) {
  return children;
}
