import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Аналогии — тренажёр логики для 1 класса',
  description:
    'Найди пару по тому же правилу: 10 раундов с картинками и словами на понимание аналогий для первоклассников.',
  alternates: { canonical: '/trenazher/analogii-1klass' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
