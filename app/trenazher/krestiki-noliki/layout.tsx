import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Крестики-нолики — играй против компьютера',
  description:
    'Классическая игра крестики-нолики против компьютера: три в ряд быстрее соперника. Бесплатная игра для детей.',
  alternates: { canonical: '/trenazher/krestiki-noliki' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
