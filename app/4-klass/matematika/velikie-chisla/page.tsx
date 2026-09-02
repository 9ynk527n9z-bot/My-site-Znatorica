import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Большие числа — теория и тренажёр для 4 класса',
  description: 'Числа от 1000 и больше: тысячи, разряды и классы чисел для четвероклассников.',
  alternates: { canonical: '/4-klass/matematika/velikie-chisla' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '4 класс', url: '/4-klass' },
  { name: 'Математика', url: '/4-klass' },
  { name: 'Большие числа', url: '/4-klass/matematika/velikie-chisla' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Большие числа',
  description: 'Числа от 1000 и больше для 4 класса',
  url: '/4-klass/matematika/velikie-chisla',
  educationalLevel: '4 класс начальной школы',
});

export default function VelikieChislaPage() {
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
          <Link href="/4-klass" className="text-orange hover:underline">Математика</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Большие числа</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Большие числа</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <Link href="/trenazher/velikie-chisla" className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</Link>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Тысячи и классы чисел</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Класс единиц и класс тысяч</h3>
              <p className="text-gray-300">
                Большие числа удобно читать, разбивая их на группы по три цифры справа налево. Каждая группа — это класс: класс единиц, класс тысяч, класс миллионов.
              </p>
              <div className="mt-4 p-4 bg-orange/10 rounded text-xl font-bold text-center">
                34 578 = 34 тысячи 578
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Как читать большие числа</h3>
              <p className="text-gray-300">
                Читай числа по классам: сначала сколько миллионов (если есть), потом сколько тысяч, потом единицы. Пробел между классами помогает не запутаться.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Сравнение больших чисел</h3>
              <p className="text-gray-300">
                Чем больше цифр в числе, тем оно больше (если нет ведущих нулей). Если количество цифр одинаковое — сравнивай слева направо, разряд за разрядом.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange/20 to-violet/20 border border-orange rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Готов тренироваться?</h3>
          <p className="text-gray-300 mb-6">Нажми на кнопку ниже и начни интерактивный тренажер</p>
          <Link href="/trenazher/velikie-chisla" className="btn-primary text-lg px-8 py-4 inline-block">
            🎮 Открыть тренажер
          </Link>
        </div>

        <TopicQuiz topic="4-klass/matematika/velikie-chisla" />
      </div>
    </div>
  );
}
