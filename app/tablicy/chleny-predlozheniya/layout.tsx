import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Члены предложения — таблица с вопросами и подчёркиванием',
  description:
    'Таблица членов предложения для 3–4 класса: подлежащее, сказуемое, дополнение, определение, обстоятельство — вопросы и условное подчёркивание.',
  alternates: { canonical: '/tablicy/chleny-predlozheniya' },
};

export default function SentenceMembersTableLayout({ children }: { children: React.ReactNode }) {
  return children;
}
