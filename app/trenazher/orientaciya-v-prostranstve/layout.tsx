import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Ориентация в пространстве — сверху, снизу, слева, справа',
  description:
    'Игра с картинками учит определять, где находится предмет: сверху, снизу, слева или справа от другого предмета. Развивает пространственное мышление у детей.',
  alternates: { canonical: '/trenazher/orientaciya-v-prostranstve' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
