import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Математическая лесенка — примеры по возрастающей сложности',
  description:
    'Поднимайся по лесенке из 10 примеров — чем выше ступенька, тем сложнее. Игра на счёт с несгораемыми уровнями.',
  alternates: { canonical: '/trenazher/matematicheskaya-lesenka' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
