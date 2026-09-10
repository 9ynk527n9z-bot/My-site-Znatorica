import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Вход',
  description: 'Войдите в свой аккаунт Знаторики.',
  alternates: { canonical: '/login' },
  robots: { index: false, follow: true },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
