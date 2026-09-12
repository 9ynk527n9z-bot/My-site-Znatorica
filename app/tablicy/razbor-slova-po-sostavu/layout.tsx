import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Разбор слова по составу — таблица условных обозначений',
  description:
    'Таблица морфемного разбора для 2–3 класса: приставка, корень, суффикс, окончание — условные значки и пример разбора слова.',
  alternates: { canonical: '/tablicy/razbor-slova-po-sostavu' },
};

export default function WordCompositionTableLayout({ children }: { children: React.ReactNode }) {
  return children;
}
