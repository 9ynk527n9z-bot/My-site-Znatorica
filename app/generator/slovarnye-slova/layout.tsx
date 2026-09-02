import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Словарные слова 1–4 класс — генератор карточек «вставь букву»',
  description: 'Словарные слова по классам (1–4): упражнение «вставь пропущенную букву» или список для заучивания. Печать, PDF, Word.',
  alternates: { canonical: '/generator/slovarnye-slova' },
};

export default function SlovarnyeSlovaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="generator" />
      {children}
    </>
  );
}
