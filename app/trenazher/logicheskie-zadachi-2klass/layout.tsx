import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Логические задачи — тренажёр для 2 класса',
  description:
    'Реши 10 логических задач на сравнение, простой счёт, закономерности и «кто есть кто». Развивает логическое мышление второклассника.',
  alternates: { canonical: '/trenazher/logicheskie-zadachi-2klass' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
