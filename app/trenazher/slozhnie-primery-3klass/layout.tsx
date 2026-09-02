import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Сложные примеры в два действия — тренажёр для 3 класса',
  description:
    'Реши 10 примеров в два действия с числами в пределах 100: сложение, вычитание, умножение и деление по порядку слева направо.',
  alternates: { canonical: '/trenazher/slozhnie-primery-3klass' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
