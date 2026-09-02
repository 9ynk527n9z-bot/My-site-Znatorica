import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Задачи на движение — тренажёр для 4 класса',
  description:
    'Тренажёр на решение задач по формуле S = v × t: найди расстояние, скорость или время по условию задачи. 10 раундов с выбором ответа для 4 класса.',
  alternates: { canonical: '/trenazher/skorost-vremya-rasstoyanie-4klass' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
