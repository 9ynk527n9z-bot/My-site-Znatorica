import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';

export const metadata = {
  title: 'Задачи на взвешивание — логика для 3 класса',
  description: 'Учимся находить фальшивую монету или предмет с помощью весов за минимальное число взвешиваний.',
  alternates: { canonical: '/3-klass/logika/zadachi-na-vzveshivanie' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '3 класс', url: '/3-klass' },
  { name: 'Логика и мышление', url: '/3-klass' },
  { name: 'Задачи на взвешивание', url: '/3-klass/logika/zadachi-na-vzveshivanie' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Задачи на взвешивание',
  description: 'Логические задачи на поиск предмета с помощью весов',
  url: '/3-klass/logika/zadachi-na-vzveshivanie',
  educationalLevel: '3 класс начальной школы',
});

export default function VzveshivaniePage() {
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
          <span className="text-white">Задачи на взвешивание</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Задачи на взвешивание</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">📋 Шпаргалка</button>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Как найти фальшивую монету весами</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Условие</h3>
              <p className="text-gray-300">
                Есть чашечные весы без гирь — они просто показывают, какая чаша легче. Есть 3 одинаковые
                на вид монеты, но одна из них фальшивая и легче настоящих. Как найти её за одно взвешивание?
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 1: Раздели монеты на группы</h3>
              <p className="text-gray-300">
                Положи по одной монете на каждую чашу весов, а третью отложи в сторону.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 2: Посмотри на результат</h3>
              <p className="text-gray-300">
                Если весы показали, что одна чаша легче — фальшивая монета там. Если чаши в равновесии —
                значит, фальшивая монета осталась в стороне, которую ты не взвешивал.
              </p>
              <div className="mt-4 p-4 bg-orange/10 rounded">
                <p>⚖️ Весы в равновесии → фальшивая монета — та, что отложена в сторону</p>
                <p>⚖️ Весы не в равновесии → фальшивая монета — на более лёгкой чаше</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Попробуй сам</h2>
          <div className="space-y-4 text-lg">
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">
                Есть 8 монет, одна из них фальшивая и легче остальных. Как найти её за 2 взвешивания?
              </p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать решение</summary>
                <p className="text-gray-300 mt-2">
                  Раздели монеты на три группы: 3, 3 и 2. Взвесь группы по 3 монеты друг против друга.
                  Если они равны — фальшивая в группе из 2 монет: взвесь их друг против друга, лёгкая и есть фальшивая.
                  Если одна из групп по 3 легче — фальшивая там: возьми любые 2 монеты из этой группы,
                  взвесь их друг против друга (третью отложи) — так же, как в примере выше.
                </p>
              </details>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange/20 to-violet/20 border border-orange rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Готов тренироваться?</h3>
          <p className="text-gray-300 mb-6">
            Главный приём таких задач — делить предметы на группы так, чтобы каждое взвешивание давало
            максимум новой информации.
          </p>
          <button className="btn-primary text-lg px-8 py-4">🎮 Открыть тренажер</button>
        </div>
      </div>
    </div>
  );
}
