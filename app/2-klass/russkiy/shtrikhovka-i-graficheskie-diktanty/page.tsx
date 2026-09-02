import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';

export const metadata = {
  title: 'Штриховка и графические диктанты — 2 класс',
  description: 'Отрабатываем точность и аккуратность письма: штриховка в разных направлениях и графический диктант посложнее.',
  alternates: { canonical: '/2-klass/russkiy/shtrikhovka-i-graficheskie-diktanty' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '2 класс', url: '/2-klass' },
  { name: 'Русский язык', url: '/2-klass' },
  { name: 'Штриховка и графические диктанты', url: '/2-klass/russkiy/shtrikhovka-i-graficheskie-diktanty' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Штриховка и графические диктанты',
  description: 'Развитие точности и аккуратности письма во 2 классе',
  url: '/2-klass/russkiy/shtrikhovka-i-graficheskie-diktanty',
  educationalLevel: '2 класс начальной школы',
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
          <Link href="/2-klass" className="text-orange hover:underline">2 класс</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Штриховка и графические диктанты</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-4">Штриховка и графические диктанты</h1>
        <p className="text-gray-400 mb-8">
          Ко 2 классу почерк уже формируется — эти упражнения помогают сделать линии ровнее, а руку — увереннее.
        </p>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <Link href="/generator/graficheskiy-diktant" className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</Link>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Штриховка в разных направлениях</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Три вида штриховки</h3>
              <p className="text-gray-300 mb-4">
                Во 2 классе стоит потренировать все три направления линий — это разные группы мышц руки.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <div className="text-center">
                  <svg width="90" height="90" viewBox="0 0 90 90" className="bg-black/40 rounded-lg">
                    <rect x="10" y="10" width="70" height="70" fill="none" stroke="#F97316" strokeWidth="2" />
                    <clipPath id="v"><rect x="12" y="12" width="66" height="66" /></clipPath>
                    <g clipPath="url(#v)" stroke="#F97316" strokeWidth="2">
                      {Array.from({ length: 9 }).map((_, i) => <line key={i} x1={i * 9} y1="0" x2={i * 9} y2="90" />)}
                    </g>
                  </svg>
                  <p className="text-sm text-gray-400 mt-2">вертикально</p>
                </div>
                <div className="text-center">
                  <svg width="90" height="90" viewBox="0 0 90 90" className="bg-black/40 rounded-lg">
                    <rect x="10" y="10" width="70" height="70" fill="none" stroke="#F97316" strokeWidth="2" />
                    <clipPath id="h"><rect x="12" y="12" width="66" height="66" /></clipPath>
                    <g clipPath="url(#h)" stroke="#F97316" strokeWidth="2">
                      {Array.from({ length: 9 }).map((_, i) => <line key={i} x1="0" y1={i * 9} x2="90" y2={i * 9} />)}
                    </g>
                  </svg>
                  <p className="text-sm text-gray-400 mt-2">горизонтально</p>
                </div>
                <div className="text-center">
                  <svg width="90" height="90" viewBox="0 0 90 90" className="bg-black/40 rounded-lg">
                    <rect x="10" y="10" width="70" height="70" fill="none" stroke="#F97316" strokeWidth="2" />
                    <clipPath id="d"><rect x="12" y="12" width="66" height="66" /></clipPath>
                    <g clipPath="url(#d)" stroke="#F97316" strokeWidth="2">
                      {Array.from({ length: 14 }).map((_, i) => <line key={i} x1={i * 13 - 90} y1="0" x2={i * 13} y2="90" />)}
                    </g>
                  </svg>
                  <p className="text-sm text-gray-400 mt-2">по диагонали</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Графический диктант посложнее</h3>
              <p className="text-gray-300 mb-3">
                Во 2 классе диктанты уже длиннее и включают несколько поворотов подряд — важно не сбиться со счёта клеточек.
              </p>
              <div className="p-4 bg-orange/10 rounded text-center text-xl tracking-widest">
                ➡️➡️ ⬇️⬇️⬇️ ⬅️⬅️⬅️⬅️ ⬆️⬆️ ➡️➡️
              </div>
              <p className="text-gray-300 text-base mt-3">
                «2 вправо → 3 вниз → 4 влево → 2 вверх → 2 вправо» — попробуй нарисовать эту фигуру в тетради и посмотри, что получится.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange/20 to-violet/20 border border-orange rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Как заниматься дома</h3>
          <p className="text-gray-300 mb-6">
            Если ребёнок сбивается со счёта — не страшно, просто начните заново с более короткой инструкции.
            Точность важнее длины диктанта.
          </p>
          <Link href="/generator/graficheskiy-diktant" className="btn-primary text-lg px-8 py-4 inline-block">🎮 Открыть генератор диктантов</Link>
        </div>
      </div>
    </div>
  );
}
