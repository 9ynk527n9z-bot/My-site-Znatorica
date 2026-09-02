import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Скорочтение — тренажёр скорости чтения',
  description:
    'Прочитай текст на время и узнай свою скорость чтения в словах в минуту. Тексты подобраны по уровню сложности для 1–4 классов.',
  alternates: { canonical: '/trenazher/skorochtenie' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
