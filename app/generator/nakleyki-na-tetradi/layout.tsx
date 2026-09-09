import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Наклейки для тетрадей и учебников — шаблон',
  description:
    'Впиши имя ученика и класс один раз — получи наклейки для подписи тетрадей и учебников сразу по всем предметам. Русский, математика, окружающий мир, английский и другие. Печать, PDF, Word, PNG, формат А4.',
  alternates: { canonical: '/generator/nakleyki-na-tetradi' },
};

export default function NakleykiLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="generator" />
      {children}
    </>
  );
}
