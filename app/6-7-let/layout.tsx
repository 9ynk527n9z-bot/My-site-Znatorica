import type { Metadata } from 'next';
import CmsTopicsSection from '@/components/CmsTopicsSection';

export const metadata: Metadata = {
  title: 'Дошкольники 6–7 лет — подготовка к школе',
  description:
    'Подготовка к школе для детей 6–7 лет: счёт до 20, сложение и вычитание, чтение и письмо. Теория, тренажёры и шпаргалки.',
  alternates: { canonical: '/6-7-let' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <CmsTopicsSection segment="6-7-let" />
    </>
  );
}
