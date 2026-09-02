import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Комбинаторика — тренажёр для 3 класса',
  description:
    'Реши 10 задач на подсчёт вариантов: правило умножения и перестановки. Тренажёр по комбинаторике для 3 класса.',
  alternates: { canonical: '/trenazher/kombinatorika-3klass' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
