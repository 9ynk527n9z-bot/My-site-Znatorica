import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Спряжение глаголов — таблица I и II спряжения',
  description:
    'Таблица спряжения глаголов для 3–4 класса: личные окончания I и II спряжения, как определить спряжение по неопределённой форме, глаголы-исключения.',
  alternates: { canonical: '/tablicy/spryazhenie-glagolov' },
};

export default function SpryazhenieTableLayout({ children }: { children: React.ReactNode }) {
  return children;
}
