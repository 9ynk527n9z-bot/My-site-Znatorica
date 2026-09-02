import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Времена года — окружающий мир для детей 4–5 лет',
  description: 'Учимся различать зиму, весну, лето и осень по главным признакам каждого времени года.',
  alternates: { canonical: '/4-5-let/okruzhayushchiy/vremena-goda' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: 'Дошкольники 4–5', url: '/4-5-let' },
  { name: 'Окружающий мир', url: '/4-5-let' },
  { name: 'Времена года', url: '/4-5-let/okruzhayushchiy/vremena-goda' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Времена года',
  description: 'Различение времён года по основным признакам',
  url: '/4-5-let/okruzhayushchiy/vremena-goda',
  educationalLevel: 'Дошкольное образование, 4–5 лет',
});

export default function VremenaGodaPage() {
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
          <span className="text-white">Времена года</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Времена года</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <Link href="/trenazher/vremena-goda" className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</Link>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Четыре времени года</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">❄️ Зима</h3>
              <p className="text-gray-300">Холодно, идёт снег, деревья без листьев. Мы надеваем шубу и шапку, катаемся на санках.</p>
            </div>
            <div>
              <h3 className="font-bold text-orange mb-2">🌷 Весна</h3>
              <p className="text-gray-300">Снег тает, появляются первые цветы и листья, птицы возвращаются из тёплых стран.</p>
            </div>
            <div>
              <h3 className="font-bold text-orange mb-2">☀️ Лето</h3>
              <p className="text-gray-300">Тепло или жарко, много зелени и цветов, можно купаться и есть много фруктов и ягод.</p>
            </div>
            <div>
              <h3 className="font-bold text-orange mb-2">🍂 Осень</h3>
              <p className="text-gray-300">Листья становятся жёлтыми и красными и опадают, часто идёт дождь, птицы улетают в тёплые страны.</p>
            </div>
          </div>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Попробуй сам</h2>
          <div className="space-y-4 text-lg">
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">🍂🍁 Жёлтые листья падают с деревьев. Какое это время года?</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">Осень</p>
              </details>
            </div>
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">⛄❄️ На улице лежит снег, а на окне — морозные узоры. Какое это время года?</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">Зима</p>
              </details>
            </div>
          </div>
        </div>

        <TopicQuiz topic="4-5-let/okruzhayushchiy/vremena-goda" />
      </div>
    </div>
  );
}
