import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Знаки препинания — тренажёр для 1 класса',
  description:
    'Выбери верный знак в конце предложения — точку, вопросительный или восклицательный знак. Тренажёр по пунктуации для 1 класса.',
  alternates: { canonical: '/trenazher/punktuaciya-1klass' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
