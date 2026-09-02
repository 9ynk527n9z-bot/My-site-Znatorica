import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Задачи на взвешивание — тренажёр для 3 класса',
  description:
    'Реши 10 задач на чашечные весы: найди фальшивую монету за наименьшее число взвешиваний или определи вес предмета по равновесию весов.',
  alternates: { canonical: '/trenazher/vzveshivanie-3klass' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
