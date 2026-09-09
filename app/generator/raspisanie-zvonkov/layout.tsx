import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Расписание звонков — распечатать шаблон для школы',
  description:
    'Расписание звонков для школы или класса: задай время начала уроков, длительность урока и перемен — и получишь готовую таблицу. Печать, PDF, Word, PNG, формат А4.',
  alternates: { canonical: '/generator/raspisanie-zvonkov' },
};

export default function RaspisanieZvonkovLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="generator" />
      {children}
    </>
  );
}
