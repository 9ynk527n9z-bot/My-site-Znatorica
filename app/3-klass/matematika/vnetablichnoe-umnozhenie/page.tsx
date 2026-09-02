import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Внетабличное умножение и деление — теория и тренажёр для 3 класса',
  description:
    'Учимся умножать двузначное число на однозначное и делить методом подбора: приёмы, примеры с разбором по шагам и тренажёр для 3 класса.',
  alternates: { canonical: '/3-klass/matematika/vnetablichnoe-umnozhenie' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '3 класс', url: '/3-klass' },
  { name: 'Математика', url: '/3-klass' },
  { name: 'Внетабличное умножение и деление', url: '/3-klass/matematika/vnetablichnoe-umnozhenie' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Внетабличное умножение и деление',
  description: 'Умножение двузначного числа на однозначное и деление методом подбора для 3 класса',
  url: '/3-klass/matematika/vnetablichnoe-umnozhenie',
  educationalLevel: '3 класс начальной школы',
});

export default function VnetablichnoeUmnozheniePage() {
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
          <span className="text-white">Внетабличное умножение и деление</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Внетабличное умножение и деление</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <Link
            href="/trenazher/vnetablichnoe-umnozhenie-3klass"
            className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors"
          >
            🎮 Тренажер
          </Link>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Что такое внетабличное умножение и деление?</h2>

          <div className="space-y-6 text-lg">
            <div>
              <p className="text-gray-300">
                Таблица умножения помогает быстро умножать числа от 2 до 9 — например, 7 × 8 = 56.
                Но что делать, если нужно умножить двузначное число на однозначное — например,
                23 × 3? Такой пример уже нет в таблице умножения, поэтому его называют{' '}
                <strong className="text-white">внетабличным</strong>. Чтобы его решить, число
                раскладывают на разряды: десятки и единицы.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Приём разложения по разрядам (умножение)</h3>
              <p className="text-gray-300 mb-4">
                Чтобы умножить двузначное число на однозначное, раскладываем двузначное число на
                десятки и единицы, умножаем каждую часть отдельно, а потом складываем результаты.
              </p>
              <div className="p-4 bg-orange/10 rounded text-center font-mono text-xl">
                23 × 3 = (20 + 3) × 3 = 20 × 3 + 3 × 3 = 60 + 9 = 69
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Разбор примера 1: 23 × 3</h3>
              <ol className="list-decimal list-inside text-gray-300 space-y-1">
                <li>Раскладываем 23 на разряды: 23 = 20 + 3.</li>
                <li>Умножаем десятки на 3: 20 × 3 = 60.</li>
                <li>Умножаем единицы на 3: 3 × 3 = 9.</li>
                <li>Складываем результаты: 60 + 9 = 69.</li>
              </ol>
              <p className="text-gray-400 mt-2">Ответ: 23 × 3 = 69.</p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Разбор примера 2: 34 × 2</h3>
              <ol className="list-decimal list-inside text-gray-300 space-y-1">
                <li>Раскладываем 34 на разряды: 34 = 30 + 4.</li>
                <li>Умножаем десятки на 2: 30 × 2 = 60.</li>
                <li>Умножаем единицы на 2: 4 × 2 = 8.</li>
                <li>Складываем результаты: 60 + 8 = 68.</li>
              </ol>
              <p className="text-gray-400 mt-2">Ответ: 34 × 2 = 68.</p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Деление методом подбора с проверкой</h3>
              <p className="text-gray-300 mb-4">
                Чтобы разделить, например, 96 на 4, подбираем частное так, чтобы при умножении на
                делитель снова получилось делимое. Удобно подбирать частное по частям — сначала
                делить круглые десятки, а остаток доделить.
              </p>
              <div className="p-4 bg-orange/10 rounded text-center font-mono text-xl">
                96 ÷ 4: 96 = 80 + 16 → 80 ÷ 4 = 20, 16 ÷ 4 = 4 → 20 + 4 = 24
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Разбор примера 3: 96 ÷ 4</h3>
              <ol className="list-decimal list-inside text-gray-300 space-y-1">
                <li>Раскладываем делимое так, чтобы обе части легко делились на 4: 96 = 80 + 16.</li>
                <li>Делим первую часть: 80 ÷ 4 = 20.</li>
                <li>Делим вторую часть: 16 ÷ 4 = 4.</li>
                <li>Складываем частные: 20 + 4 = 24.</li>
                <li>Проверяем умножением: 24 × 4 = 96 — совпало с делимым, значит решили верно.</li>
              </ol>
              <p className="text-gray-400 mt-2">Ответ: 96 ÷ 4 = 24.</p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Разбор примера 4: 78 ÷ 6</h3>
              <ol className="list-decimal list-inside text-gray-300 space-y-1">
                <li>Раскладываем делимое: 78 = 60 + 18 (обе части делятся на 6 без остатка).</li>
                <li>Делим первую часть: 60 ÷ 6 = 10.</li>
                <li>Делим вторую часть: 18 ÷ 6 = 3.</li>
                <li>Складываем частные: 10 + 3 = 13.</li>
                <li>Проверяем умножением: 13 × 6 = 78 — верно.</li>
              </ol>
              <p className="text-gray-400 mt-2">Ответ: 78 ÷ 6 = 13.</p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Как проверить себя</h3>
              <p className="text-gray-300">
                Умножение и деление — взаимно обратные действия. Если умножил — можешь проверить
                делением (69 ÷ 3 = 23). Если разделил — проверяй умножением (частное × делитель
                должно снова дать делимое: 24 × 4 = 96). Если результат проверки не совпадает —
                значит, где-то ошибся в разложении, и стоит пересчитать заново.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange/20 to-violet/20 border border-orange rounded-lg p-8 text-center mb-8">
          <h3 className="text-2xl font-bold mb-4">Готов тренироваться?</h3>
          <p className="text-gray-300 mb-6">Нажми на кнопку ниже и начни интерактивный тренажер</p>
          <Link href="/trenazher/vnetablichnoe-umnozhenie-3klass" className="btn-primary text-lg px-8 py-4 inline-block">
            🎮 Открыть тренажер
          </Link>
        </div>

        <TopicQuiz topic="3-klass/matematika/vnetablichnoe-umnozhenie" />
      </div>
    </div>
  );
}
