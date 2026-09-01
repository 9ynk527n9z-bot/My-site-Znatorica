import Link from 'next/link';
import { getPublishedArticles, type ContentArticle } from '@/lib/content';
import { breadcrumbJsonLd } from '@/lib/seo';

// Статьи берутся из БД (правятся через админку) — рендерим динамически.
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Статьи для родителей — актуально в 2026 году',
  description:
    'Экранное время, ВПР-2026, подготовка к школе, мотивация к учёбе — практические статьи для родителей детей 4–11 лет.',
  alternates: { canonical: '/dlya-roditeley' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: 'Для родителей', url: '/dlya-roditeley' },
]);

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number);
  const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
  ];
  return `${day} ${months[month - 1]} ${year}`;
}

// Разделы подобраны под реальные поисковые формулировки родителей и объединяют
// узкие теги статей (`tag`) в более крупные, понятные категории.
const SECTIONS: { title: string; emoji: string; tags: string[] }[] = [
  { title: 'Подготовка к школе', emoji: '🎒', tags: ['Дошкольная подготовка'] },
  { title: 'Учёба: чтение, счёт и письмо', emoji: '📚', tags: ['Учёба и навыки', 'Тревожные сигналы'] },
  { title: 'Возрастные особенности развития ребёнка', emoji: '🧒', tags: ['Возрастные особенности'] },
  { title: 'Адаптация к детскому саду и школе', emoji: '🏫', tags: ['Адаптация', 'Переходный период'] },
  {
    title: 'Режим дня, сон и мотивация',
    emoji: '⏰',
    tags: ['Режим дня', 'Мотивация и режим', 'Здоровье и режим', 'Каникулы'],
  },
  { title: 'Домашние задания, оценки и ВПР', emoji: '📝', tags: ['Домашние задания', 'ВПР и оценки', 'Школа и закон'] },
  { title: 'Технологии и безопасность', emoji: '📱', tags: ['Технологии и безопасность'] },
  { title: 'Организация учёбы', emoji: '🗂️', tags: ['Организация учёбы'] },
  { title: 'Способности и таланты', emoji: '🌟', tags: ['Способности и таланты'] },
  { title: 'Эмоции и воспитание', emoji: '💛', tags: ['Эмоции и воспитание'] },
  { title: 'Здоровье школьника', emoji: '🩺', tags: ['Здоровье школьника'] },
  { title: 'Буллинг и общение со сверстниками', emoji: '🤝', tags: ['Буллинг и общение'] },
  { title: 'Развитие и досуг', emoji: '🎨', tags: ['Развитие и досуг'] },
  { title: 'Деньги и обязанности', emoji: '💰', tags: ['Деньги и обязанности'] },
  { title: 'Форматы обучения', emoji: '🏫', tags: ['Форматы обучения'] },
];

function ArticleCard({ article }: { article: ContentArticle }) {
  return (
    <Link
      href={`/dlya-roditeley/${article.slug}`}
      className="card block hover:border-white/50 transition-colors group !p-4"
    >
      <div className="flex items-center gap-2 mb-2 text-xs text-white/50">
        <span>{formatDate(article.date)}</span>
        <span>·</span>
        <span>{article.readTime}</span>
      </div>
      <h3 className="text-lg font-bold mb-1 group-hover:text-orange leading-snug">{article.title}</h3>
      <p className="text-white/70 text-sm line-clamp-2">{article.description}</p>
    </Link>
  );
}

export default async function DlyaRoditeleyPage() {
  const articles = await getPublishedArticles();

  return (
    <div className="min-h-screen py-20 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">👪 Для родителей</h1>
        <p className="text-center text-white/75 mb-16">
          Практические статьи о школе, режиме и подготовке — актуальные на 2026 год
        </p>

        <div className="space-y-14">
          {SECTIONS.map((section) => {
            const sectionArticles = articles.filter((a) => section.tags.includes(a.tag));
            if (sectionArticles.length === 0) return null;
            return (
              <div key={section.title}>
                <h2 className="text-2xl font-bold mb-6">
                  {section.emoji} {section.title}
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sectionArticles.map((article) => (
                    <ArticleCard key={article.slug} article={article} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
