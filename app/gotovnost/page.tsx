import Link from 'next/link';
import type { Metadata } from 'next';
import { breadcrumbJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Готов ли ребёнок к школе? — бесплатные тесты по классам',
  description:
    'Бесплатные тесты готовности к школе и к переходу в следующий класс — с заданиями для ребёнка и вопросами для родителя. От поступления в 1 класс до перехода в 5-й.',
  alternates: { canonical: '/gotovnost' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: 'Готов ли ребёнок к школе?', url: '/gotovnost' },
]);

const TESTS = [
  { href: '/gotovnost-k-shkole', emoji: '🎒', label: 'К 1 классу' },
  { href: '/gotovnost-k-2-klassu', emoji: '📗', label: 'Ко 2 классу' },
  { href: '/gotovnost-k-3-klassu', emoji: '📘', label: 'К 3 классу' },
  { href: '/gotovnost-k-4-klassu', emoji: '📙', label: 'К 4 классу' },
  { href: '/gotovnost-k-5-klassu', emoji: '🎓', label: 'К 5 классу' },
];

export default function GotovnostHubPage() {
  return (
    <div className="bg-black min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4">
        <div className="max-w-4xl mx-auto flex gap-2 text-sm flex-wrap">
          <Link href="/" className="text-orange hover:underline">Главная</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Готов ли ребёнок к школе?</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-3">📋 Готов ли ребёнок к школе?</h1>
        <p className="text-gray-400 mb-10 max-w-2xl">
          Выбери тест по классу, в который переходит ребёнок. Задания на знания и вопросы
          о самостоятельности — результат сразу, подробный разбор по желанию.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {TESTS.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="card flex flex-col items-center text-center gap-1 hover:border-orange/60 hover:-translate-y-1 transition-all !p-4"
            >
              <span className="text-3xl">{t.emoji}</span>
              <span className="font-bold text-white text-sm">{t.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
