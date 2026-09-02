import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Члены предложения — тренажёр для 4 класса',
  description:
    'Определи, каким членом предложения является выделенное слово: подлежащее, сказуемое, дополнение, определение или обстоятельство. 10 раундов для учеников 4 класса.',
  alternates: { canonical: '/trenazher/sintaksis-4klass' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
