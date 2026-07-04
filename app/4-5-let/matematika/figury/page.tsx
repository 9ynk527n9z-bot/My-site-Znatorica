import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';

export const metadata = {
  title: 'Геометрические фигуры — теория и тренажёр для детей 4–5 лет',
  description: 'Учим круг, квадрат, треугольник и прямоугольник в интерактивном тренажёре. Для детей 4-5 лет.',
  alternates: { canonical: '/4-5-let/matematika/figury' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: 'Дошкольники 4–5', url: '/4-5-let' },
  { name: 'Математика', url: '/4-5-let/matematika' },
  { name: 'Фигуры', url: '/4-5-let/matematika/figury' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Геометрические фигуры',
  description: 'Интерактивный тренажёр и теория по геометрическим фигурам',
  url: '/4-5-let/matematika/figury',
  educationalLevel: 'Дошкольное образование, 4–5 лет',
});

export default function FiguryPage() {
  return (
    <div className="bg-black min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResource) }}
      />
      <div className="bg-[#0A0812] border-b border-[#2D2350] px-6 py-4">
        <div className="max-w-6xl mx-auto flex gap-2 text-sm">
          <Link href="/" className="text-orange hover:underline">
            Главная
          </Link>
          <span className="text-gray-400">/</span>
          <Link href="/4-5-let" className="text-orange hover:underline">
            Дошкольники 4–5
          </Link>
          <span className="text-gray-400">/</span>
          <Link href="/4-5-let/matematika" className="text-orange hover:underline">
            Математика
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Фигуры</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Геометрические фигуры</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">
            📝 Теория
          </button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">
            🎮 Тренажер
          </button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">
            📋 Шпаргалка
          </button>
        </div>

        <div className="bg-[#16102A] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Какие бывают фигуры?</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Основные фигуры</h3>
              <p className="text-gray-300 mb-4">
                Вокруг нас много разных предметов. Все они имеют свою форму!
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#0A0812] p-6 rounded border border-[#2D2350]">
                  <div className="text-6xl text-center mb-4">⭕</div>
                  <h4 className="font-bold text-orange text-center">Круг</h4>
                  <p className="text-gray-400 text-sm text-center">Похож на мяч</p>
                </div>
                <div className="bg-[#0A0812] p-6 rounded border border-[#2D2350]">
                  <div className="text-6xl text-center mb-4">⬜</div>
                  <h4 className="font-bold text-orange text-center">Квадрат</h4>
                  <p className="text-gray-400 text-sm text-center">У него 4 стороны</p>
                </div>
                <div className="bg-[#0A0812] p-6 rounded border border-[#2D2350]">
                  <div className="text-6xl text-center mb-4">▲</div>
                  <h4 className="font-bold text-orange text-center">Треугольник</h4>
                  <p className="text-gray-400 text-sm text-center">Как крыша дома</p>
                </div>
                <div className="bg-[#0A0812] p-6 rounded border border-[#2D2350]">
                  <div className="text-6xl text-center mb-4">▭</div>
                  <h4 className="font-bold text-orange text-center">Прямоугольник</h4>
                  <p className="text-gray-400 text-sm text-center">Как окно</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange/20 to-violet/20 border border-orange rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Давай играть!</h3>
          <p className="text-gray-300 mb-6">
            Узнавай фигуры в интерактивном тренажере
          </p>
          <button className="btn-primary text-lg px-8 py-4">
            🎮 Открыть тренажер
          </button>
        </div>
      </div>
    </div>
  );
}
