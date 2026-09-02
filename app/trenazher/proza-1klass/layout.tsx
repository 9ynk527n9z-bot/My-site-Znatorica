import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Читай и понимай — проза для 1 класса',
  description:
    'Прочитай короткий рассказ и ответь на вопрос по тексту. Тренажёр развивает навык осознанного чтения у первоклассников.',
  alternates: { canonical: '/trenazher/proza-1klass' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
