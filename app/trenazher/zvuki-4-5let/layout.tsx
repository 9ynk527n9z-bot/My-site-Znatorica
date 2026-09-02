import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Звуки — с какого звука начинается слово',
  description:
    'Послушай слово с картинкой и угадай, с какого звука оно начинается. Игра для детей 4–5 лет на развитие фонематического слуха.',
  alternates: { canonical: '/trenazher/zvuki-4-5let' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
