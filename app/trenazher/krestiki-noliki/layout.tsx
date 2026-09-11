import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Крестики-нолики — играй против компьютера',
  description:
    'Крестики-нолики против компьютера: построй три своих знака в ряд раньше соперника. Игра тренирует внимание и умение планировать ход.',
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
