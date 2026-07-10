import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicTabs from '@/components/TopicTabs';
import GraphicDictationTrainer from '@/components/trainers/GraphicDictationTrainer';

export const metadata = {
  title: 'Штриховка и графические диктанты — для детей 4–5 лет',
  description: 'Простые упражнения для тренировки руки перед письмом: обводка по точкам, штриховка простых фигур, первый графический диктант.',
  alternates: { canonical: '/4-5-let/gramota/shtrikhovka-i-graficheskie-diktanty' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: 'Дошкольники 4–5', url: '/4-5-let' },
  { name: 'Грамота', url: '/4-5-let' },
  { name: 'Штриховка и графические диктанты', url: '/4-5-let/gramota/shtrikhovka-i-graficheskie-diktanty' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Штриховка и графические диктанты',
  description: 'Развитие мелкой моторики руки перед письмом для детей 4–5 лет',
  url: '/4-5-let/gramota/shtrikhovka-i-graficheskie-diktanty',
  educationalLevel: 'Дошкольное образование, 4–5 лет',
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
          <Link href="/4-5-let" className="text-orange hover:underline">Дошкольники 4–5</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Штриховка и графические диктанты</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-4">Штриховка и графические диктанты</h1>
        <p className="text-gray-400 mb-8">
          В 4–5 лет рука ещё слабая для письма букв, но уже готова к простым упражнениям, которые её тренируют.
        </p>

        <TopicTabs
          theory={
            <>
              <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold mb-6">С чего начать в этом возрасте</h2>

                <div className="space-y-6 text-lg">
                  <div>
                    <h3 className="font-bold text-orange mb-2">Шаг 1: Обводка по точкам</h3>
                    <p className="text-gray-300">
                      Самое первое упражнение — провести линию, соединяя точки по контуру простой фигуры (круг, квадрат, солнышко).
                      Это учит вести карандаш плавно, не отрывая от бумаги.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-orange mb-2">Шаг 2: Штриховка одной фигуры</h3>
                    <p className="text-gray-300">
                      Дальше — раскрасить простую фигуру не сплошным цветом, а прямыми линиями внутри контура,
                      не выходя за его границы.
                    </p>
                    <div className="flex justify-center mt-4">
                      <svg width="120" height="120" viewBox="0 0 120 120" className="bg-black/40 rounded-lg p-2">
                        <rect x="15" y="15" width="90" height="90" rx="12" fill="none" stroke="#F97316" strokeWidth="3" />
                        <clipPath id="sq"><rect x="17" y="17" width="86" height="86" rx="10" /></clipPath>
                        <g clipPath="url(#sq)" stroke="#F97316" strokeWidth="2">
                          {Array.from({ length: 11 }).map((_, i) => <line key={i} x1="0" y1={i * 11} x2="120" y2={i * 11} />)}
                        </g>
                      </svg>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-orange mb-2">Шаг 3: Первый графический диктант — совсем короткий</h3>
                    <p className="text-gray-300 mb-3">
                      В этом возрасте достаточно 2-3 шага, не больше. Например: «2 клетки вправо, 2 клетки вниз».
                    </p>
                    <div className="p-4 bg-orange/10 rounded text-center text-2xl tracking-widest">
                      ➡️➡️ ⬇️⬇️
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange/20 to-violet/20 border border-orange rounded-lg p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Как заниматься дома</h3>
                <p className="text-gray-300">
                  Занимайтесь совсем недолго — 5-10 минут за раз. В этом возрасте важнее регулярность, чем объём:
                  лучше понемногу каждый день, чем одно долгое занятие раз в неделю.
                </p>
              </div>
            </>
          }
          trainer={<GraphicDictationTrainer />}
        />
      </div>
    </div>
  );
}
