import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Тело человека — тренажёр для детей 6-7 лет',
  description:
    'Назови части тела и ответь, для чего нужен каждый орган: глаза, уши, сердце, лёгкие. Тренажёр об окружающем мире для детей 6-7 лет.',
  alternates: { canonical: '/trenazher/telo-cheloveka' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
