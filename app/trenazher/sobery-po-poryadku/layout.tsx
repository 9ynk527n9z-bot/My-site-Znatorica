import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Собери по порядку — тренажёр сортировки для дошкольников',
  description: 'Интерактивный тренажёр «Собери по порядку»: расставь фигуры от маленькой к большой. Развивает логику у дошкольников.',
  alternates: { canonical: '/trenazher/sobery-po-poryadku' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
