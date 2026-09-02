import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Ударение в слове — тренажёр для 1 класса',
  description:
    'Изучай ударные гласные в словах с озвучкой и играй в игру «Найди ударение»: послушай слово и укажи ударный слог. 10 раундов с проверкой.',
  alternates: { canonical: '/trenazher/udarenie' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
