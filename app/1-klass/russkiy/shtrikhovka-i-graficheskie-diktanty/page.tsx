import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';

export const metadata = {
  title: 'Штриховка и графические диктанты — 1 класс',
  description: 'Тренируем руку перед письмом: правила штриховки фигур и рисование по клеточкам под диктовку направлений.',
  alternates: { canonical: '/1-klass/russkiy/shtrikhovka-i-graficheskie-diktanty' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '1 класс', url: '/1-klass' },
  { name: 'Русский язык', url: '/1-klass' },
  { name: 'Штриховка и графические диктанты', url: '/1-klass/russkiy/shtrikhovka-i-graficheskie-diktanty' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Штриховка и графические диктанты',
  description: 'Развитие мелкой моторики и точности движений руки перед письмом',
  url: '/1-klass/russkiy/shtrikhovka-i-graficheskie-diktanty',
  educationalLevel: '1 класс начальной школы',
});

export default function ShtrikhovkaPage() {
  return (
    <div className="bg-black min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResource) }} />

      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4">
        <div className="max-w-6xl mx-auto flex gap-2 text-sm">
          <Link href="/" className="text-orange hover:underline">Главная</Link>
          <span className="text-gray-400">/</span>
          <Link href="/1-klass" className="text-orange hover:underline">1 класс</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Штриховка и графические диктанты</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-4">Штриховка и графические диктанты</h1>
        <p className="text-gray-400 mb-8">
          Прежде чем красиво писать буквы, руке нужно научиться уверенно вести линию — эти упражнения тренируют
          именно это, без букв и цифр.
        </p>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">📋 Шпаргалка</button>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Штриховка: как правильно</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Правило 1: Линии не выходят за контур</h3>
              <p className="text-gray-300">
                Штриховка — это когда фигуру закрашивают не сплошь, а параллельными линиями внутри контура,
                не выходя за его границы.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Правило 2: Одно направление</h3>
              <p className="text-gray-300">
                Все линии внутри одной фигуры проводятся в одном направлении — например, все сверху вниз
                или все слева направо, но не вперемешку.
              </p>
            </div>

            <div className="flex justify-center">
              <svg width="160" height="160" viewBox="0 0 160 160" className="bg-black/40 rounded-lg p-2">
                <circle cx="80" cy="80" r="70" fill="none" stroke="#F97316" strokeWidth="3" />
                <clipPath id="circleClip">
                  <circle cx="80" cy="80" r="68" />
                </clipPath>
                <g clipPath="url(#circleClip)" stroke="#F97316" strokeWidth="2">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <line key={i} x1={i * 11} y1="0" x2={i * 11} y2="160" />
                  ))}
                </g>
              </svg>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Правило 3: Не торопись</h3>
              <p className="text-gray-300">
                Расстояние между линиями старайся делать одинаковым — это тренирует не скорость, а точность
                движения руки, что важнее для будущего почерка.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Графический диктант: рисуем по клеточкам</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Как это работает</h3>
              <p className="text-gray-300">
                Взрослый диктует направления и количество клеточек, а ребёнок ведёт карандаш по тетради в клетку,
                не отрывая руки. Если следовать инструкции точно, в конце получается узнаваемый рисунок.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Пример инструкции</h3>
              <p className="text-gray-300 mb-3">
                «3 клетки вправо → 2 клетки вниз → 3 клетки влево → 2 клетки вверх» — если начать с любой точки
                и повторить эти шаги, получится прямоугольник.
              </p>
              <div className="p-4 bg-orange/10 rounded text-center text-2xl tracking-widest">
                ➡️➡️➡️ ⬇️⬇️ ⬅️⬅️⬅️ ⬆️⬆️
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange/20 to-violet/20 border border-orange rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Как заниматься дома</h3>
          <p className="text-gray-300 mb-6">
            Возьмите обычную тетрадь в клетку. Начните с простых фигур (квадрат, прямоугольник, «лесенка»),
            и только потом переходите к более сложным рисункам — котёнку, кораблику, домику.
          </p>
          <Link href="/generator/graficheskiy-diktant" className="btn-primary text-lg px-8 py-4 inline-block">🎮 Открыть генератор диктантов</Link>
        </div>
      </div>
    </div>
  );
}
