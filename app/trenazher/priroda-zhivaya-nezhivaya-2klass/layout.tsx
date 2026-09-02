import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Живая и неживая природа — тренажёр для 2 класса',
  description:
    'Определи, живая или неживая природа перед тобой: 10 раундов с картинками для второклассников по окружающему миру.',
  alternates: { canonical: '/trenazher/priroda-zhivaya-nezhivaya-2klass' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
