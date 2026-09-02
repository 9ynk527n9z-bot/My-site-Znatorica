import Link from 'next/link';
import { breadcrumbJsonLd } from '@/lib/seo';
import TrainerQuotaBanner from '@/components/TrainerQuotaBanner';
import { GAMES } from '@/lib/games';

export const metadata = {
  title: 'Игры для детей',
  description: 'Игровые тренажёры для детей 4–11 лет: крестики-нолики, судоку, морской бой, змейка с числами, угадай слово и другие — бесплатно, прямо в браузере.',
  alternates: { canonical: '/igry' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: 'Игры', url: '/igry' },
]);

export default function GamesPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      <div className="border-b border-white/15 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="text-orange hover:underline text-sm mb-4 inline-block">
            ← Назад
          </Link>
          <h1 className="text-5xl font-bold mb-4">🎮 Игры</h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Все игровые тренажёры сайта в одном месте — без теории, сразу играть. Бесплатно, прямо в браузере.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-8 px-6">
        <TrainerQuotaBanner />
      </div>

      <div className="max-w-6xl mx-auto py-12 px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {GAMES.map((game) => (
            <Link
              key={game.id}
              href={game.url}
              className="group card hover:border-white/50 transition-all text-center !p-4"
            >
              <div className="text-4xl mb-2">{game.icon}</div>
              <h3 className="text-sm font-bold mb-1 group-hover:text-orange leading-snug">{game.name}</h3>
              <p className="text-white/60 text-xs line-clamp-2">{game.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
