import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Круговорот воды в природе — таблица для 2–3 класса',
  description: 'Наглядная таблица со схемой круговорота воды в природе: испарение, конденсация, осадки и возвращение воды.',
  alternates: { canonical: '/tablicy/krugovorot-vody' },
};

export default function WaterCycleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
