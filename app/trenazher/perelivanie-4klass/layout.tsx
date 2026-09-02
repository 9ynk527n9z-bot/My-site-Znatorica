import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Задачи на переливание — тренажёр для 4 класса',
  description:
    'Реши 10 логических задач на переливание воды между сосудами без делений: развивает логическое мышление у учеников 4 класса.',
  alternates: { canonical: '/trenazher/perelivanie-4klass' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
