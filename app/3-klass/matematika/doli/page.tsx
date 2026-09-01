import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';

export const metadata = {
  title: 'Доли и дроби — теория и тренажёр для 3 класса',
  description: 'Понимаем, что такое доли и дроби на простых примерах для третьеклассников.',
  alternates: { canonical: '/3-klass/matematika/doli' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '3 класс', url: '/3-klass' },
  { name: 'Математика', url: '/3-klass/matematika' },
  { name: 'Доли и дроби', url: '/3-klass/matematika/doli' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Доли и дроби',
  description: 'Основы дробей для 3 класса',
  url: '/3-klass/matematika/doli',
  educationalLevel: '3 класс начальной школы',
});

export default function DoliPage() {
  return (
    <div className="bg-black min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResource) }} />

      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4">
        <div className="max-w-6xl mx-auto flex gap-2 text-sm">
          <Link href="/" className="text-orange hover:underline">Главная</Link>
          <span className="text-gray-400">/</span>
          <Link href="/3-klass" className="text-orange hover:underline">3 класс</Link>
          <span className="text-gray-400">/</span>
          <Link href="/3-klass/matematika" className="text-orange hover:underline">Математика</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Доли и дроби</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Доли и дроби</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">📋 Шпаргалка</button>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Что такое доля целого?</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Доля — это часть целого</h3>
              <p className="text-gray-300">
                Если разрезать яблоко на 2 равные части, каждая часть — это половина, или 1/2 яблока. Если на 4 части — четверть, или 1/4.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Как записывается дробь</h3>
              <p className="text-gray-300 mb-4">
                Дробь состоит из двух чисел: сверху — сколько частей взяли, снизу — на сколько частей разделили целое.
              </p>
              <div className="p-4 bg-orange/10 rounded text-center">
                <span className="text-3xl font-bold">1/2</span> — одна вторая (половина)<br />
                <span className="text-3xl font-bold">1/4</span> — одна четвёртая (четверть)
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Сравнение долей</h3>
              <p className="text-gray-300">
                Чем больше частей, на которые разделили целое, тем меньше каждая доля. 1/2 больше, чем 1/4 — половина пирога больше четверти пирога.
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
