import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Природные явления — тренажёр для детей 6-7 лет',
  description:
    'Викторина из 10 раундов: по подсказке нужно угадать природное явление — дождь, снег, грозу, радугу и другие — из четырёх вариантов.',
  alternates: { canonical: '/trenazher/prirodnye-yavleniya-6-7let' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
