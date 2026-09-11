import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Одушевлённые и неодушевлённые — 1–2 класс',
  description:
    'Тренажёр по русскому языку для 1–2 класса: определи, одушевлённое или неодушевлённое существительное перед тобой.',
  alternates: { canonical: '/trenazher/odushevlennye-neodushevlennye' },
};

export default function OdushevlennyeNeodushevlennyeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
