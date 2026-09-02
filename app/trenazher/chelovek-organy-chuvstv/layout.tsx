import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Органы чувств и организм человека — тренажёр',
  description:
    'Викторина про органы чувств и организм человека: глаза, уши, нос, сердце, лёгкие, мозг и другие органы. Учит понимать, какой орган за что отвечает.',
  alternates: { canonical: '/trenazher/chelovek-organy-chuvstv' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
