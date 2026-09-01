import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';

export const metadata = {
  title: 'Классика — теория и тренажёр для 4 класса',
  description: 'Знакомство с великими произведениями русской литературы для четвероклассников.',
  alternates: { canonical: '/4-klass/literatura/klassika' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '4 класс', url: '/4-klass' },
  { name: 'Литература', url: '/4-klass/literatura' },
  { name: 'Классика', url: '/4-klass/literatura/klassika' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Классика',
  description: 'Классическая русская литература для 4 класса',
  url: '/4-klass/literatura/klassika',
  educationalLevel: '4 класс начальной школы',
});

export default function KlassikaPage() {
  return (
    <div className="bg-black min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResource) }} />

      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4">
        <div className="max-w-6xl mx-auto flex gap-2 text-sm">
          <Link href="/" className="text-orange hover:underline">Главная</Link>
          <span className="text-gray-400">/</span>
          <Link href="/4-klass" className="text-orange hover:underline">4 класс</Link>
          <span className="text-gray-400">/</span>
          <Link href="/4-klass/literatura" className="text-orange hover:underline">Литература</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Классика</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Классика</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">📋 Шпаргалка</button>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Великие писатели и их произведения</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Что такое классика?</h3>
              <p className="text-gray-300">
                Классикой называют произведения, которые остаются интересными и важными спустя много лет после написания — их читают уже несколько поколений.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Авторы, с которыми стоит познакомиться</h3>
              <p className="text-gray-300 mb-4">
                В 4 классе часто изучают сказки Пушкина, рассказы Толстого, произведения Чехова и других русских классиков.
              </p>
              <div className="flex gap-3 flex-wrap text-sm font-bold">
                <span className="bg-orange/20 px-3 py-1 rounded">А. С. Пушкин</span>
                <span className="bg-orange/20 px-3 py-1 rounded">Л. Н. Толстой</span>
                <span className="bg-orange/20 px-3 py-1 rounded">И. А. Крылов</span>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Почему это важно читать?</h3>
              <p className="text-gray-300">
                Классические произведения учат добру, справедливости и помогают лучше понимать людей и мир вокруг.
              </p>
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
