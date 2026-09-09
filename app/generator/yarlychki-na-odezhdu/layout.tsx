import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Ярлычки на одежду и обувь для сада и школы — шаблон',
  description:
    'Впиши имя ребёнка один раз — получи ярлычки для подписи курток, шапок, варежек, обуви и рюкзака. Пригодится в детский сад, школу и лагерь, чтобы вещи не терялись. Печать, PDF, Word, PNG, формат А4.',
  alternates: { canonical: '/generator/yarlychki-na-odezhdu' },
};

export default function YarlychkiLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="generator" />
      {children}
    </>
  );
}
