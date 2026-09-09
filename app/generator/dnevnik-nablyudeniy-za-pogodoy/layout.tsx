import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Дневник наблюдений за погодой — шаблон для школы',
  description:
    'Готовая таблица для ежедневных наблюдений за погодой по окружающему миру: температура, осадки, облачность и ветер. Впиши имя, класс и дату начала — числа и дни недели заполнятся сами. Печать, PDF, Word, PNG, формат А4.',
  alternates: { canonical: '/generator/dnevnik-nablyudeniy-za-pogodoy' },
};

export default function DnevnikPogodyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="generator" />
      {children}
    </>
  );
}
