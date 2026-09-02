import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Змейка с числами — собирай по порядку',
  description:
    'Веди змейку по полю и собирай числа по возрастанию — от 1 и дальше. Тренирует счёт и реакцию.',
  alternates: { canonical: '/trenazher/zmeyka-s-chislami' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
