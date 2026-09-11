import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Артикли a/an — тренажёр для 2–4 класса',
  description:
    'Тренажёр английского языка для 2–4 класса: выбери артикль a или an и правильную форму множественного числа. 10 вопросов с проверкой.',
  alternates: { canonical: '/trenazher/angliyskiy-artikli' },
};

export default function AngliyskiyArtikliLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
