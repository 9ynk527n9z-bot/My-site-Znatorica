import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'График дежурств по классу — создать и распечатать',
  description:
    'Создайте график дежурств по классу: введите список учеников, выберите даты и количество дежурных. Готовый шаблон для печати и PDF.',
  alternates: { canonical: '/generator/grafik-dezhurstv' },
};

export default function GrafikDezhurstvLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="generator" />
      {children}
    </>
  );
}
