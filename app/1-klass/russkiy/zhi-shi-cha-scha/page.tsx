import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Жи-ши, ча-ща, чу-щу — русский язык для 1 класса',
  description: 'Учим главное орфографическое правило первого класса: после Ж, Ш пишем И, после Ч, Щ пишем А и У. Правило нужно запомнить — оно не проверяется ударением.',
  alternates: { canonical: '/1-klass/russkiy/zhi-shi-cha-scha' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '1 класс', url: '/1-klass' },
  { name: 'Русский язык', url: '/1-klass' },
  { name: 'Жи-ши, ча-ща, чу-щу', url: '/1-klass/russkiy/zhi-shi-cha-scha' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Жи-ши, ча-ща, чу-щу',
  description: 'Орфографическое правило написания сочетаний жи-ши, ча-ща, чу-щу',
  url: '/1-klass/russkiy/zhi-shi-cha-scha',
  educationalLevel: '1 класс начальной школы',
});

export default function ZhiShiChaSchaPage() {
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
          <span className="text-white">Жи-ши, ча-ща, чу-щу</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Жи-ши, ча-ща, чу-щу</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <Link
            href="/trenazher/zhi-shi-cha-scha"
            className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors"
          >
            🎮 Тренажер
          </Link>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-2">Правило нужно запомнить</h2>
          <p className="text-gray-300 mb-6">
            Обычно, чтобы правильно написать безударную гласную, мы подбираем проверочное слово, где эта гласная
            становится ударной. Но с сочетаниями <b className="text-orange">жи-ши</b>, <b className="text-orange">ча-ща</b> и{' '}
            <b className="text-orange">чу-щу</b> так не получится — здесь работает не проверка ударением, а
            словарное правило, которое нужно просто выучить наизусть.
          </p>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Правило 1: жи-ши → всегда пишем И</h3>
              <p className="text-gray-300">
                После букв <b>Ж</b> и <b>Ш</b> никогда не пишется буква <b>Ы</b> — только <b>И</b>, даже если
                слышится звук [ы].
              </p>
              <div className="mt-4 p-4 bg-orange/10 rounded">
                <p className="text-2xl mb-1">
                  маш<b className="text-orange">И</b>на, ж<b className="text-orange">И</b>знь, лыж<b className="text-orange">И</b>
                </p>
                <p className="text-gray-300 text-base">Пишем И, хотя слышим что-то похожее на «маш<b>Ы</b>на».</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Правило 2: ча-ща → всегда пишем А</h3>
              <p className="text-gray-300">
                После букв <b>Ч</b> и <b>Щ</b> никогда не пишется буква <b>Я</b> — только <b>А</b>.
              </p>
              <div className="mt-4 p-4 bg-orange/10 rounded">
                <p className="text-2xl mb-1">
                  ч<b className="text-orange">А</b>шка, рощ<b className="text-orange">А</b>, туч<b className="text-orange">А</b>
                </p>
                <p className="text-gray-300 text-base">Пишем А, а не Я — даже если по звучанию кажется, что нужна Я.</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Правило 3: чу-щу → всегда пишем У</h3>
              <p className="text-gray-300">
                После букв <b>Ч</b> и <b>Щ</b> никогда не пишется буква <b>Ю</b> — только <b>У</b>.
              </p>
              <div className="mt-4 p-4 bg-orange/10 rounded">
                <p className="text-2xl mb-1">
                  ч<b className="text-orange">У</b>до, щ<b className="text-orange">У</b>ка, ч<b className="text-orange">У</b>лки
                </p>
                <p className="text-gray-300 text-base">Пишем У, а не Ю.</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Почему так?</h3>
              <p className="text-gray-300">
                Звуки [ж] и [ш] в русском языке всегда твёрдые, а звуки [ч] и [щ] — всегда мягкие. Раньше в
                некоторых словах эти звуки могли произноситься иначе, и написание закрепилось историческое —
                поэтому сегодня оно не подчиняется общему правилу проверки ударением, а просто запоминается.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Попробуй сам</h2>
          <div className="space-y-4 text-lg">
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">Как правильно: «маш_на» — И или Ы?</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">Машина — после Ш всегда пишем И.</p>
              </details>
            </div>
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">Как правильно: «ч_шка» — А или Я?</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">Чашка — после Ч всегда пишем А.</p>
              </details>
            </div>
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">Как правильно: «щ_ка» — У или Ю?</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">Щука — после Щ всегда пишем У.</p>
              </details>
            </div>
          </div>
        </div>

        <TopicQuiz topic="1-klass/russkiy/zhi-shi-cha-scha" />
      </div>
    </div>
  );
}
