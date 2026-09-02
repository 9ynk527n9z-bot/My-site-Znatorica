import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Единицы измерения — теория и тренажёр для 4 класса',
  description: 'Перевод величин: длина (км, м, дм, см), масса (кг, г) и время (ч, мин, с) для четвероклассников.',
  alternates: { canonical: '/4-klass/matematika/edinitsy-izmereniya' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '4 класс', url: '/4-klass' },
  { name: 'Математика', url: '/4-klass' },
  { name: 'Единицы измерения', url: '/4-klass/matematika/edinitsy-izmereniya' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Единицы измерения',
  description: 'Перевод величин длины, массы и времени для 4 класса',
  url: '/4-klass/matematika/edinitsy-izmereniya',
  educationalLevel: '4 класс начальной школы',
});

export default function EdinitsyIzmereniyaPage() {
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
          <span className="text-white">Единицы измерения</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Единицы измерения</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <Link href="/trenazher/edinitsy-izmereniya-4klass" className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</Link>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Длина</h2>
          <p className="text-gray-300 mb-4">
            Чтобы измерять длину, используют километры, метры, дециметры и сантиметры. Чтобы перейти от крупной единицы к мелкой — умножаем, а от мелкой к крупной — делим.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <div className="p-4 bg-orange/10 rounded text-lg font-bold text-center">1 км = 1000 м</div>
            <div className="p-4 bg-orange/10 rounded text-lg font-bold text-center">1 м = 10 дм</div>
            <div className="p-4 bg-orange/10 rounded text-lg font-bold text-center">1 м = 100 см</div>
          </div>
          <div className="p-4 bg-orange/10 rounded text-lg font-bold text-center mb-4">1 дм = 10 см</div>
          <p className="text-gray-300">
            Пример: <span className="text-white font-bold">3 км = 3 × 1000 = 3000 м</span>. А если нужно наоборот: <span className="text-white font-bold">500 см = 500 : 100 = 5 м</span>.
          </p>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Масса</h2>
          <p className="text-gray-300 mb-4">
            Массу измеряют в тоннах, килограммах и граммах. Соотношение то же самое: 1000 более мелких единиц составляют 1 более крупную.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div className="p-4 bg-orange/10 rounded text-lg font-bold text-center">1 т = 1000 кг</div>
            <div className="p-4 bg-orange/10 rounded text-lg font-bold text-center">1 кг = 1000 г</div>
          </div>
          <p className="text-gray-300">
            Пример: <span className="text-white font-bold">4 кг = 4 × 1000 = 4000 г</span>. А если наоборот: <span className="text-white font-bold">2000 г = 2000 : 1000 = 2 кг</span>.
          </p>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Время</h2>
          <p className="text-gray-300 mb-4">
            Время измеряют в сутках, часах, минутах и секундах. Здесь единицы связаны не через 10 или 1000, а через 24 и 60 — это важно запомнить.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <div className="p-4 bg-orange/10 rounded text-lg font-bold text-center">1 сутки = 24 ч</div>
            <div className="p-4 bg-orange/10 rounded text-lg font-bold text-center">1 ч = 60 мин</div>
            <div className="p-4 bg-orange/10 rounded text-lg font-bold text-center">1 мин = 60 с</div>
          </div>
          <p className="text-gray-300">
            Пример: <span className="text-white font-bold">2 ч = 2 × 60 = 120 мин</span>. А если наоборот: <span className="text-white font-bold">180 с = 180 : 60 = 3 мин</span>.
          </p>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Составные величины</h2>
          <p className="text-gray-300 mb-4">
            Иногда величину записывают в двух единицах сразу — тогда переводим каждую часть отдельно и складываем.
          </p>
          <div className="p-4 bg-orange/10 rounded text-lg font-bold text-center">
            3 км 200 м = 3000 м + 200 м = 3200 м
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange/20 to-violet/20 border border-orange rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Готов тренироваться?</h3>
          <p className="text-gray-300 mb-6">Нажми на кнопку ниже и начни интерактивный тренажер</p>
          <Link href="/trenazher/edinitsy-izmereniya-4klass" className="btn-primary text-lg px-8 py-4 inline-block">
            🎮 Открыть тренажер
          </Link>
        </div>

        <TopicQuiz topic="4-klass/matematika/edinitsy-izmereniya" />
      </div>
    </div>
  );
}
