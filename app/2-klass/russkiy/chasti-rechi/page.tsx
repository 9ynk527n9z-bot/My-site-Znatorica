import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';

export const metadata = {
  title: 'Части речи — теория и тренажёр для 2 класса',
  description: 'Существительные, глаголы и прилагательные для второклассников.',
  alternates: { canonical: '/2-klass/russkiy/chasti-rechi' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '2 класс', url: '/2-klass' },
  { name: 'Русский язык', url: '/2-klass/russkiy' },
  { name: 'Части речи', url: '/2-klass/russkiy/chasti-rechi' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Части речи',
  description: 'Существительные, глаголы и прилагательные для 2 класса',
  url: '/2-klass/russkiy/chasti-rechi',
  educationalLevel: '2 класс начальной школы',
});

export default function ChastiRechiPage() {
  return (
    <div className="bg-black min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResource) }} />

      <div className="bg-[#0A0812] border-b border-[#2D2350] px-6 py-4">
        <div className="max-w-6xl mx-auto flex gap-2 text-sm">
          <Link href="/" className="text-orange hover:underline">Главная</Link>
          <span className="text-gray-400">/</span>
          <Link href="/2-klass" className="text-orange hover:underline">2 класс</Link>
          <span className="text-gray-400">/</span>
          <Link href="/2-klass/russkiy" className="text-orange hover:underline">Русский язык</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Части речи</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Части речи</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">📋 Шпаргалка</button>
        </div>

        <div className="bg-[#16102A] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Существительное, глагол, прилагательное</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Имя существительное</h3>
              <p className="text-gray-300">
                Отвечает на вопрос «кто?» или «что?». Обозначает предмет: собака, книга, дождь.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Глагол</h3>
              <p className="text-gray-300">
                Отвечает на вопрос «что делать?» или «что сделать?». Обозначает действие: бежать, читать, прыгнуть.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Имя прилагательное</h3>
              <p className="text-gray-300 mb-4">
                Отвечает на вопрос «какой?». Обозначает признак предмета: красивый, быстрый, синий.
              </p>
              <div className="p-4 bg-orange/10 rounded">
                Пример: <span className="text-orange font-bold">Красивая</span> (прилаг.) <span className="text-violet font-bold">птица</span> (сущ.) <span className="text-green-400 font-bold">летит</span> (глагол).
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange/20 to-violet/20 border border-orange rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Готов тренироваться?</h3>
          <p className="text-gray-300 mb-6">Нажми на кнопку ниже и начни интерактивный тренажер</p>
          <button className="btn-primary text-lg px-8 py-4">🎮 Открыть тренажер</button>
        </div>
      </div>
    </div>
  );
}
