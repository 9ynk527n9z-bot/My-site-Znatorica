import Link from 'next/link';
import { TRAINER_SEO_CONTENT } from '@/lib/trainer-seo-content';

export default function TrainerSeoSummary({ type }: { type: string }) {
  const content = TRAINER_SEO_CONTENT[type];
  if (!content) return null;

  return (
    <section className="no-print max-w-3xl mx-auto px-6 pt-6" aria-label={`О тренажёре «${content.heading}»`}>
      <div className="rounded-xl border border-violet-400/30 bg-white/5 px-5 py-4">
        <h2 className="text-lg font-bold text-white mb-2">Как проходит тренировка</h2>
        <p className="text-gray-300 leading-relaxed">{content.summary}</p>
        {content.guidance && <p className="mt-3 text-gray-300 leading-relaxed">{content.guidance}</p>}
        {content.related && content.related.length > 0 && (
          <nav className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm" aria-label="Материалы по теме">
            {content.related.map((item) => (
              <Link key={item.href} href={item.href} className="font-bold text-orange hover:underline">
                {item.label} →
              </Link>
            ))}
          </nav>
        )}
      </div>
    </section>
  );
}
