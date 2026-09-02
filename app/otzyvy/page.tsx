import type { Metadata } from 'next';
import { db } from '@/lib/db';
import { breadcrumbJsonLd } from '@/lib/seo';
import FeedbackForm from '@/components/FeedbackForm';

// Список отзывов меняется по мере модерации — рендерим динамически.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Отзывы',
  description: 'Отзывы родителей и учеников о платформе Знаторика. Оставьте свой отзыв — он появится на сайте после проверки модератором.',
  alternates: { canonical: '/otzyvy' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: 'Отзывы', url: '/otzyvy' },
]);

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default async function OtzyvyPage() {
  const feedback = await db.feedback.findMany({
    where: { status: 'approved' },
    orderBy: { createdAt: 'desc' },
    take: 100,
    select: { id: true, name: true, message: true, rating: true, createdAt: true },
  });

  const rated = feedback.filter((item) => item.rating);
  const aggregateRatingJsonLd =
    rated.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Знаторика',
          url: 'https://znatorica.ru',
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: (rated.reduce((sum, item) => sum + (item.rating || 0), 0) / rated.length).toFixed(1),
            reviewCount: rated.length,
          },
          review: rated.slice(0, 20).map((item) => ({
            '@type': 'Review',
            author: { '@type': 'Person', name: item.name || 'Аноним' },
            reviewRating: { '@type': 'Rating', ratingValue: item.rating },
            reviewBody: item.message,
            datePublished: item.createdAt.toISOString(),
          })),
        }
      : null;

  return (
    <div className="min-h-screen py-20 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      {aggregateRatingJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingJsonLd) }}
        />
      )}
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">💬 Отзывы</h1>
        <p className="text-white/80 text-center mb-12">
          Мнения родителей и учеников о Знаторике. Все отзывы проходят проверку модератором перед
          публикацией.
        </p>

        <div className="mb-14">
          <FeedbackForm />
        </div>

        {feedback.length === 0 ? (
          <p className="text-center text-white/60">
            Пока нет опубликованных отзывов. Будьте первым — оставьте свой выше!
          </p>
        ) : (
          <div className="space-y-6">
            {feedback.map((item) => (
              <div key={item.id} className="card">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold">{item.name || 'Аноним'}</span>
                  <span className="text-xs text-white/50">{formatDate(item.createdAt)}</span>
                </div>
                {item.rating && (
                  <div className="text-orange mb-2" aria-label={`Оценка ${item.rating} из 5`}>
                    {'★'.repeat(item.rating)}
                    <span className="text-white/25">{'★'.repeat(5 - item.rating)}</span>
                  </div>
                )}
                <p className="text-white/85 whitespace-pre-wrap">{item.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
