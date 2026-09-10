import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Раздели на группы — сортировка по двум столбикам',
  description:
    'Интерактивная сортировка карточек по двум категориям: фрукты и овощи, дикие и домашние животные, командный и индивидуальный спорт — или впиши свои категории под урок. Играй на сайте или скачай как отдельное приложение, работает без интернета.',
  alternates: { canonical: '/generator/razdeli-na-gruppy' },
};

export default function SortGroupsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="generator" />
      {children}
    </>
  );
}
