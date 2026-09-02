import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Логические задачи с таблицами — тренажёр для 4 класса',
  description:
    'Реши 10 задач на логику по типу «кто есть кто»: читай условие, исключай невозможные варианты и находи единственно верный ответ.',
  alternates: { canonical: '/trenazher/logicheskie-tablitsy-4klass' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
