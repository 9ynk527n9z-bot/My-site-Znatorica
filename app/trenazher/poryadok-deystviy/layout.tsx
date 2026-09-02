import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Порядок действий — тренажёр для 4 класса',
  description:
    'Реши 10 примеров с несколькими действиями и скобками, применяя правило порядка вычислений: умножение и деление раньше сложения и вычитания.',
  alternates: { canonical: '/trenazher/poryadok-deystviy' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
