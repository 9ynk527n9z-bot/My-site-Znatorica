import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';

export const metadata = {
  title: 'Синтаксис — теория и тренажёр для 4 класса',
  description: 'Анализ предложений: члены предложения и словосочетания для четвероклассников.',
  alternates: { canonical: '/4-klass/russkiy/sintaksis' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '4 класс', url: '/4-klass' },
  { name: 'Русский язык', url: '/4-klass/russkiy' },
  { name: 'Синтаксис', url: '/4-klass/russkiy/sintaksis' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Синтаксис',
  description: 'Синтаксис предложения для 4 класса',
  url: '/4-klass/russkiy/sintaksis',
  educationalLevel: '4 класс начальной школы',
});

export default function SintaksisPage() {
  return (
    <div className="bg-black min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResource) }} />

      <div className="bg-[#0A0812] border-b border-[#2D2350] px-6 py-4">
        <div className="max-w-6xl mx-auto flex gap-2 text-sm">
          <Link href="/" className="text-orange hover:underline">Главная</Link>
          <span className="text-gray-400">/</span>
          <Link href="/4-klass" className="text-orange hover:underline">4 класс</Link>
          <span className="text-gray-400">/</span>
          <Link href="/4-klass/russkiy" className="text-orange hover:underline">Русский язык</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Синтаксис</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Синтаксис</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">📋 Шпаргалка</button>
        </div>

        <div className="bg-[#16102A] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Разбираем предложение по членам</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Главные и второстепенные члены</h3>
              <p className="text-gray-300">
                Подлежащее и сказуемое — главные члены. Всё остальное (дополнение, определение, обстоятельство) — второстепенные, они поясняют главные.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Словосочетание</h3>
              <p className="text-gray-300 mb-4">
                Словосочетание — это два слова, связанные по смыслу: «красивый цветок», «быстро бежать». В отличие от предложения, оно не выражает законченную мысль.
              </p>
              <div className="p-4 bg-orange/10 rounded">
                Предложение: «Красивый цветок распустился весной.»<br />
                Словосочетания: красивый цветок, распустился весной
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Зачем разбирать предложение?</h3>
              <p className="text-gray-300">
                Разбор по членам помогает понять структуру языка и грамотно расставлять знаки препинания в более сложных предложениях.
              </p>
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
