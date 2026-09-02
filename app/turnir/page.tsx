import Link from 'next/link';
import { getTournamentTracks } from '@/lib/tournament';
import { breadcrumbJsonLd } from '@/lib/seo';

export const metadata = {
  title: 'Турнир Знаторики — бесплатная викторина с именным дипломом',
  description: 'Пройди турнир по своему классу и предмету бесплатно, а результат можно оформить в виде именного диплома.',
  alternates: { canonical: '/turnir' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: 'Турнир Знаторики', url: '/turnir' },
]);

export default function TournamentPage() {
  const tracks = getTournamentTracks();
  const byGrade = new Map<string, typeof tracks>();
  for (const t of tracks) {
    if (!byGrade.has(t.gradeLabel)) byGrade.set(t.gradeLabel, []);
    byGrade.get(t.gradeLabel)!.push(t);
  }

  return (
    <div className="min-h-screen py-20 px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">🏆 Турнир Знаторики</h1>
        <p className="text-center text-white/75 mb-2">
          Пройди викторину по своему классу и предмету — бесплатно, без ограничений
        </p>
        <p className="text-center text-white/50 text-sm mb-12">
          По желанию можно получить именной диплом с результатом — бесплатно
        </p>

        <div className="space-y-10">
          {Array.from(byGrade.entries()).map(([gradeLabel, list]) => (
            <div key={gradeLabel}>
              <h2 className="text-2xl font-bold mb-4 text-[#FFD43B]">{gradeLabel}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {list.map((track) => (
                  <Link
                    key={track.id}
                    href={`/turnir/${track.id}`}
                    className="card hover:border-white/50 transition-colors group"
                  >
                    <h3 className="text-lg font-bold group-hover:text-orange">{track.subjectLabel}</h3>
                    <p className="text-white/60 text-sm">Начать турнир →</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
