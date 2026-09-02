import type { Metadata } from 'next';

// Персональная страница диплома участника — в индексе ей делать нечего
// (уникальна для каждого ребёнка, в sitemap не входит).
export const metadata: Metadata = {
  title: 'Диплом участника турнира',
  robots: { index: false, follow: false },
};

export default function DiplomLayout({ children }: { children: React.ReactNode }) {
  return children;
}
