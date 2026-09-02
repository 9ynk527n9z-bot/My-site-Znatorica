import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Расписание уроков — распечатать шаблон для школьника',
  description:
    'Красивый шаблон расписания уроков на неделю: впиши имя, класс и предметы и распечатай расписание уроков для школьника. Печать, PDF, Word, PNG, формат А4.',
  alternates: { canonical: '/generator/raspisanie-urokov' },
};

export default function RaspisanieUrokovLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="generator" />
      {children}
    </>
  );
}
