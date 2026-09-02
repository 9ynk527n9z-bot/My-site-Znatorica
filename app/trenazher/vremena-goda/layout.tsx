import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Времена года — тренажёр для детей 4-5 лет',
  description:
    'Определи, к какому времени года относится картинка или явление природы: зима, весна, лето или осень. Тренажёр об окружающем мире для детей 4-5 лет.',
  alternates: { canonical: '/trenazher/vremena-goda' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
