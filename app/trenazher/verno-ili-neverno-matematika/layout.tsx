import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Верно или неверно — математика, 2–3 класс',
  description:
    'Бесплатный тренажёр устного счёта для детей 2–3 класса: на экране появляется математическое утверждение (сложение, вычитание, умножение, деление) — нужно быстро решить, верно оно или нет.',
  alternates: { canonical: '/trenazher/verno-ili-neverno-matematika' },
};

export default function VernoIliNevernoMatematikaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
