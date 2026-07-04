import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';

export const metadata = {
  title: 'Предложение — теория и тренажёр для 2 класса',
  description: 'Структура предложения: главные члены и виды предложений для второклассников.',
  alternates: { canonical: '/2-klass/russkiy/predlozhenie' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '2 класс', url: '/2-klass' },
  { name: 'Русский язык', url: '/2-klass/russkiy' },
  { name: 'Предложение', url: '/2-klass/russkiy/predlozhenie' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Предложение',
  description: 'Структура предложения для 2 класса',
  url: '/2-klass/russkiy/predlozhenie',
  educationalLevel: '2 класс начальной школы',
});

export default function PredlozheniePage() {
  return (
    <div className="bg-black min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResource) }} />

      <div className="bg-[#0A0812] border-b border-[#2D2350] px-6 py-4">
        <div className="max-w-6xl mx-auto flex gap-2 text-sm">
          <Link href="/" className="text-orange hover:underline">Главная</Link>
          <span className="text-gray-400">/</span>
          <Link href="/2-klass" className="text-orange hover:underline">2 класс</Link>
          <span className="text-gray-400">/</span>
          <Link href="/2-klass/russkiy" className="text-orange hover:underline">Русский язык</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Предложение</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Предложение</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">📋 Шпаргалка</button>
        </div>

        <div className="bg-[#16102A] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Из чего состоит предложение</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Главные члены предложения</h3>
              <p className="text-gray-300">
                В каждом предложении есть подлежащее (кто или что) и сказуемое (что делает). Это его главные члены.
              </p>
              <div className="mt-4 p-4 bg-orange/10 rounded">
                <span className="text-orange font-bold">Собака</span> (подлежащее) <span className="text-violet font-bold">лает</span> (сказуемое).
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Виды предложений по цели высказывания</h3>
              <ul className="text-gray-300 space-y-2 list-disc list-inside">
                <li><span className="font-bold">Повествовательное</span> — рассказывает о чём-то: «Идёт дождь.»</li>
                <li><span className="font-bold">Вопросительное</span> — задаёт вопрос: «Идёт дождь?»</li>
                <li><span className="font-bold">Побудительное</span> — просит или приказывает: «Закрой окно!»</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Слова в предложении связаны по смыслу</h3>
              <p className="text-gray-300">
                Слова в предложении не стоят просто так — они связаны друг с другом и вместе выражают одну мысль.
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
