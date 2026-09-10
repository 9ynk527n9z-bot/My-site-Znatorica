import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Одушевлённые и неодушевлённые — 1–2 класс',
  description:
    'Бесплатный интерактивный тренажёр по русскому языку: определи, одушевлённое или неодушевлённое существительное перед тобой. Для детей 1-2 класса.',
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
