import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Состав числа — тренажёр «домики»',
  description:
    'Реши 10 задач-«домиков»: найди недостающее слагаемое числа от 5 до 10. Тренажёр помогает быстро осваивать состав чисел в пределах десятка.',
  alternates: { canonical: '/trenazher/sostav-chisla' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
