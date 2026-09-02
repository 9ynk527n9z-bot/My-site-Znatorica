import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Виды предложений — тренажёр для 2 класса',
  description:
    'Определи вид предложения по цели высказывания: повествовательное, вопросительное или побудительное. 10 раундов с мгновенной проверкой ответа.',
  alternates: { canonical: '/trenazher/predlozhenie-2klass' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
