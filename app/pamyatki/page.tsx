import { PAMYATKI } from '@/lib/pamyatki';
import { breadcrumbJsonLd } from '@/lib/seo';

export const metadata = {
  title: 'Памятки для родителей первоклассников — бесплатно',
  description: 'Бесплатные печатные памятки для родителей первоклассников: чек-лист готовности к 1 классу, что купить, режим дня, адаптация и безопасность. Скачивай без регистрации.',
  alternates: { canonical: '/pamyatki' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: 'Памятки для родителей первоклассников', url: '/pamyatki' },
]);

export default function PamyatkiPage() {
  return (
    <div className="min-h-screen py-20 px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">Памятки для родителей первоклассников</h1>
        <p className="text-center text-white/75 mb-12">
          Бесплатные печатные памятки — скачивай и распечатывай без регистрации
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {PAMYATKI.map((p) => (
            <div key={p.slug} className="card flex flex-col">
              <span className="text-4xl mb-3">{p.emoji}</span>
              <h2 className="text-xl font-bold mb-2">{p.title}</h2>
              <p className="text-white/70 text-sm mb-6 flex-1">{p.description}</p>
              <a
                href={`/pamyatki/${p.fileName}`}
                download
                className="btn-primary text-center"
              >
                📥 Скачать бесплатно
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
