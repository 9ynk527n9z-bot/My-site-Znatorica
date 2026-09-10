import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Примеры по математике для 1, 2, 3 и 4 класса — распечатать',
  description: 'Выберите класс — диапазон чисел и действия подберутся автоматически: 1 класс до 20, 2–3 класс до 100, 4 класс до 1000. Печать и скачивание PDF с ответами.',
  alternates: { canonical: '/generator/primery-po-klassam' },
};

export default function GeneratorPrimeryPoKlassamLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="generator" />
      {children}
    </>
  );
}
