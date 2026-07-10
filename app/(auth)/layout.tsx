import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Вход в аккаунт',
  description: 'Войдите в личный кабинет Знаторики, чтобы отслеживать прогресс и получить доступ без ограничений.',
  alternates: { canonical: '/login' },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
