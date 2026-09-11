import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Верно или неверно — математика, 2–3 класс',
  description:
    'Устный счёт для 2–3 класса: проверь равенства на сложение, вычитание, умножение и деление и определи, верны они или нет.',
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
