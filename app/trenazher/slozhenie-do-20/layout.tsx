import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Сложение и вычитание в пределах 20 — тренажёр для 1 класса',
  description:
    'Реши примеры на сложение и вычитание с переходом через десяток в пределах 20 и выбери верный ответ. Тренажёр по математике для 1 класса.',
  alternates: { canonical: '/trenazher/slozhenie-do-20' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
