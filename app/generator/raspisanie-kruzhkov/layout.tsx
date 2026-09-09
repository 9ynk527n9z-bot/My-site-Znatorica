import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Расписание кружков и секций — распечатать шаблон',
  description:
    'Шаблон расписания кружков и секций на неделю, включая выходные: впиши название и время каждого занятия и распечатай. Печать, PDF, Word, PNG, формат А4.',
  alternates: { canonical: '/generator/raspisanie-kruzhkov' },
};

export default function RaspisanieKruzhkovLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="generator" />
      {children}
    </>
  );
}
