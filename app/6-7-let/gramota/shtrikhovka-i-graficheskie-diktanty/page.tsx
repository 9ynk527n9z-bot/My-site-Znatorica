import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';

export const metadata = {
  title: 'Штриховка и графические диктанты — 6–7 лет',
  description: 'Готовим руку к письму перед школой: штриховка в разных направлениях и графический диктант из нескольких шагов.',
  alternates: { canonical: '/6-7-let/gramota/shtrikhovka-i-graficheskie-diktanty' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: 'Дошкольники 6–7', url: '/6-7-let' },
  { name: 'Грамота', url: '/6-7-let' },
  { name: 'Штриховка и графические диктанты', url: '/6-7-let/gramota/shtrikhovka-i-graficheskie-diktanty' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Штриховка и графические диктанты',
  description: 'Подготовка руки к письму перед школой',
  url: '/6-7-let/gramota/shtrikhovka-i-graficheskie-diktanty',
  educationalLevel: 'Дошкольное образование, 6–7 лет',
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
          <Link href="/6-7-let" className="text-orange hover:underline">Дошкольники 6–7</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Штриховка и графические диктанты</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-4">Штриховка и графические диктанты</h1>
        <p className="text-gray-400 mb-8">
          Перед школой рука должна быть уже достаточно уверенной — эти упражнения последний раз тренируют её
          перед настоящими прописями.
        </p>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <Link href="/generator/graficheskiy-diktant" className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</Link>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Что важно перед школой</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Штриховка в разных направлениях</h3>
              <p className="text-gray-300 mb-4">
                К школе ребёнок должен уверенно штриховать в любом направлении — вертикально, горизонтально
                и по диагонали, не поворачивая при этом тетрадь.
              </p>
              <div className="flex justify-center">
                <svg width="130" height="130" viewBox="0 0 130 130" className="bg-black/40 rounded-lg p-2">
                  <path d="M65 10 L120 65 L65 120 L10 65 Z" fill="none" stroke="#F97316" strokeWidth="3" />
                  <clipPath id="dm"><path d="M65 12 L118 65 L65 118 L12 65 Z" /></clipPath>
                  <g clipPath="url(#dm)" stroke="#F97316" strokeWidth="2">
                    {Array.from({ length: 13 }).map((_, i) => <line key={i} x1={i * 11 - 40} y1="0" x2={i * 11} y2="130" />)}
                  </g>
                </svg>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Более длинный графический диктант</h3>
              <p className="text-gray-300 mb-3">
                Перед школой диктант может состоять уже из 5-6 шагов подряд — это тренирует не только руку,
                но и внимание, умение слушать инструкцию до конца.
              </p>
              <div className="p-4 bg-orange/10 rounded text-center text-xl tracking-widest">
                ➡️➡️➡️ ⬇️⬇️ ⬅️⬅️ ⬇️⬇️ ➡️➡️➡️ ⬆️⬆️⬆️⬆️
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Проверь себя: держишь ли карандаш правильно</h3>
              <p className="text-gray-300">
                Перед школой стоит проверить хват карандаша — тремя пальцами, не зажимая слишком сильно.
                Неправильный хват заметно замедляет письмо в первом классе и его сложно переучивать позже.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange/20 to-violet/20 border border-orange rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Готов тренироваться?</h3>
          <p className="text-gray-300 mb-6">
            Если рука уже уверенно справляется с этими упражнениями — можно переходить к настоящим прописям букв.
          </p>
          <Link href="/generator/graficheskiy-diktant" className="btn-primary text-lg px-8 py-4 inline-block">🎮 Открыть генератор диктантов</Link>
        </div>
      </div>
    </div>
  );
}
