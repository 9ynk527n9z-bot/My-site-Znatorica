import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Найди лишнее — тренажёр логики для дошкольников',
  description: 'Интерактивный тренажёр «Найди лишнее»: по форме, цвету и размеру. Развивает логическое мышление у дошкольников.',
  alternates: { canonical: '/trenazher/naydi-lishnee' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
