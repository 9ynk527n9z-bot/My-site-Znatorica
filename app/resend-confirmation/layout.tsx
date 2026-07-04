import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Повторная отправка кода подтверждения',
  robots: { index: false, follow: false },
};

export default function ResendConfirmationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
