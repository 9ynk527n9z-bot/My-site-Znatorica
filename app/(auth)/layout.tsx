import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Вход в аккаунт',
  alternates: { canonical: '/login' },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
