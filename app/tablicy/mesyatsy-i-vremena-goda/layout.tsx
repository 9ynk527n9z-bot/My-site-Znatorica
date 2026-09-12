import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Месяцы и времена года — таблица для распечатки',
  description:
    'Таблица 12 месяцев по временам года для дошкольников и 1–2 класса: зима, весна, лето, осень с наглядными значками.',
  alternates: { canonical: '/tablicy/mesyatsy-i-vremena-goda' },
};

export default function MonthsSeasonsTableLayout({ children }: { children: React.ReactNode }) {
  return children;
}
