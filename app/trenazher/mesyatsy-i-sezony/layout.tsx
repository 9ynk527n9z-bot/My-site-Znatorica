import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Месяцы и времена года — тренажёр',
  description:
    'Бесплатный интерактивный тренажёр «Месяцы и времена года» для дошкольников 6–7 лет и учеников 1–2 класса: месяц с картинкой-подсказкой, нужно угадать время года.',
  alternates: { canonical: '/trenazher/mesyatsy-i-sezony' },
};

export default function MesyatsyISezonyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
