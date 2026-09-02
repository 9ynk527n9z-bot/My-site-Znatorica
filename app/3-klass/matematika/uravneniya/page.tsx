import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Уравнения — теория и тренажёр для 3 класса',
  description: 'Учимся находить неизвестное число x в простых уравнениях на сложение, вычитание, умножение и деление.',
  alternates: { canonical: '/3-klass/matematika/uravneniya' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '3 класс', url: '/3-klass' },
  { name: 'Математика', url: '/3-klass' },
  { name: 'Уравнения', url: '/3-klass/matematika/uravneniya' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Уравнения',
  description: 'Простые уравнения на одно действие для 3 класса',
  url: '/3-klass/matematika/uravneniya',
  educationalLevel: '3 класс начальной школы',
});

export default function UravneniyaPage() {
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
          <Link href="/3-klass" className="text-orange hover:underline">Математика</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Уравнения</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Уравнения</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <Link href="/trenazher/uravneniya-3klass" className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</Link>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Что такое уравнение</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Уравнение и неизвестное</h3>
              <p className="text-gray-300">
                Уравнение — это равенство, в котором одно число неизвестно. Неизвестное число обозначают буквой <span className="font-bold text-white">x</span> («икс»). Решить уравнение — значит найти, чему равен x.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Как найти x при сложении</h3>
              <p className="text-gray-300 mb-4">
                Чтобы найти неизвестное слагаемое, нужно из суммы вычесть известное слагаемое.
              </p>
              <div className="p-4 bg-orange/10 rounded">
                <p className="mb-2"><span className="font-bold">x + 8 = 15</span></p>
                <p className="text-gray-300">x = 15 − 8</p>
                <p className="text-white font-bold">x = 7</p>
                <p className="text-gray-400 text-sm mt-2">Проверка: 7 + 8 = 15 ✓</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Как найти x при вычитании</h3>
              <p className="text-gray-300 mb-4">
                Если неизвестно уменьшаемое — к разности прибавляем вычитаемое. Если неизвестно вычитаемое — из уменьшаемого вычитаем разность.
              </p>
              <div className="p-4 bg-orange/10 rounded">
                <p className="mb-2"><span className="font-bold">x − 5 = 12</span> (неизвестно уменьшаемое)</p>
                <p className="text-gray-300">x = 12 + 5</p>
                <p className="text-white font-bold">x = 17</p>
                <p className="text-gray-400 text-sm mt-2">Проверка: 17 − 5 = 12 ✓</p>
              </div>
              <div className="p-4 bg-orange/10 rounded mt-4">
                <p className="mb-2"><span className="font-bold">20 − x = 12</span> (неизвестно вычитаемое)</p>
                <p className="text-gray-300">x = 20 − 12</p>
                <p className="text-white font-bold">x = 8</p>
                <p className="text-gray-400 text-sm mt-2">Проверка: 20 − 8 = 12 ✓</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Как найти x при умножении</h3>
              <p className="text-gray-300 mb-4">
                Чтобы найти неизвестный множитель, нужно произведение разделить на известный множитель.
              </p>
              <div className="p-4 bg-orange/10 rounded">
                <p className="mb-2"><span className="font-bold">x × 4 = 24</span></p>
                <p className="text-gray-300">x = 24 ÷ 4</p>
                <p className="text-white font-bold">x = 6</p>
                <p className="text-gray-400 text-sm mt-2">Проверка: 6 × 4 = 24 ✓</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Как найти x при делении</h3>
              <p className="text-gray-300 mb-4">
                Если неизвестно делимое — умножаем частное на делитель. Если неизвестен делитель — делимое делим на частное.
              </p>
              <div className="p-4 bg-orange/10 rounded">
                <p className="mb-2"><span className="font-bold">x ÷ 3 = 7</span> (неизвестно делимое)</p>
                <p className="text-gray-300">x = 7 × 3</p>
                <p className="text-white font-bold">x = 21</p>
                <p className="text-gray-400 text-sm mt-2">Проверка: 21 ÷ 3 = 7 ✓</p>
              </div>
              <div className="p-4 bg-orange/10 rounded mt-4">
                <p className="mb-2"><span className="font-bold">18 ÷ x = 6</span> (неизвестен делитель)</p>
                <p className="text-gray-300">x = 18 ÷ 6</p>
                <p className="text-white font-bold">x = 3</p>
                <p className="text-gray-400 text-sm mt-2">Проверка: 18 ÷ 3 = 6 ✓</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Как проверить решение</h3>
              <p className="text-gray-300">
                Подставь найденное число вместо x в исходное уравнение и посчитай. Если получилось верное равенство — уравнение решено правильно.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange/20 to-violet/20 border border-orange rounded-lg p-8 text-center mb-8">
          <h3 className="text-2xl font-bold mb-4">Готов тренироваться?</h3>
          <p className="text-gray-300 mb-6">Нажми на кнопку ниже и начни интерактивный тренажер</p>
          <Link href="/trenazher/uravneniya-3klass" className="btn-primary text-lg px-8 py-4 inline-block">🎮 Открыть тренажер</Link>
        </div>

        <TopicQuiz topic="3-klass/matematika/uravneniya" />
      </div>
    </div>
  );
}
