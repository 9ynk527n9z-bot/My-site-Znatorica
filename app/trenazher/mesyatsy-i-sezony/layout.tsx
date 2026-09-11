import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Месяцы и времена года — тренажёр',
  description:
    'Месяцы и времена года — тренажёр для детей 6–7 лет и учеников 1–2 класса: определи сезон по названию месяца и картинке.',
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
