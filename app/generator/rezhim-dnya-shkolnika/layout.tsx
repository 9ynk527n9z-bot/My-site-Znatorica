import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Режим дня школьника — распечатать шаблон',
  description:
    'Готовый распорядок дня школьника с рекомендованным временем сна, учёбы и отдыха для 1–4 и 5–9 класса. Можно отредактировать под свой день и распечатать. Печать, PDF, Word, PNG, формат А4.',
  alternates: { canonical: '/generator/rezhim-dnya-shkolnika' },
};

export default function RezhimDnyaShkolnikaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="generator" />
      {children}
    </>
  );
}
