import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';

export const metadata = {
  title: 'Пунктуация — теория и тренажёр для 1 класса',
  description: 'Знаки препинания в конце предложения для первоклассников.',
  alternates: { canonical: '/1-klass/russkiy/punktuaciya' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '1 класс', url: '/1-klass' },
  { name: 'Русский язык', url: '/1-klass/russkiy' },
  { name: 'Пунктуация', url: '/1-klass/russkiy/punktuaciya' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Пунктуация',
  description: 'Знаки препинания в конце предложения для 1 класса',
  url: '/1-klass/russkiy/punktuaciya',
  educationalLevel: '1 класс начальной школы',
});

export default function PunktuaciyaPage() {
  return (
    <div className="bg-black min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResource) }} />

      <div className="bg-[#0A0812] border-b border-[#2D2350] px-6 py-4">
        <div className="max-w-6xl mx-auto flex gap-2 text-sm">
          <Link href="/" className="text-orange hover:underline">Главная</Link>
          <span className="text-gray-400">/</span>
          <Link href="/1-klass" className="text-orange hover:underline">1 класс</Link>
          <span className="text-gray-400">/</span>
          <Link href="/1-klass/russkiy" className="text-orange hover:underline">Русский язык</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Пунктуация</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Пунктуация</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">📋 Шпаргалка</button>
        </div>

        <div className="bg-[#16102A] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Знаки препинания в конце предложения</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Точка</h3>
              <p className="text-gray-300">
                Ставится в конце обычного предложения, когда мы просто о чём-то рассказываем.
              </p>
              <div className="mt-2 p-3 bg-orange/10 rounded">Сегодня хорошая погода.</div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Вопросительный знак</h3>
              <p className="text-gray-300">
                Ставится, когда предложение задаёт вопрос.
              </p>
              <div className="mt-2 p-3 bg-orange/10 rounded">Который час?</div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Восклицательный знак</h3>
              <p className="text-gray-300">
                Ставится, когда предложение произносится с сильным чувством — радостью, удивлением, просьбой.
              </p>
              <div className="mt-2 p-3 bg-orange/10 rounded">Как здорово!</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange/20 to-violet/20 border border-orange rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Готов тренироваться?</h3>
          <p className="text-gray-300 mb-6">Нажми на кнопку ниже и начни интерактивный тренажер</p>
          <button className="btn-primary text-lg px-8 py-4">🎮 Открыть тренажер</button>
        </div>
      </div>
    </div>
  );
}
