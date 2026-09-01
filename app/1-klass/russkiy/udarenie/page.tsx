import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Ударение в слове — русский язык для 1 класса',
  description: 'Учимся находить ударный слог в слове и понимать, почему ударение важно для правильного письма.',
  alternates: { canonical: '/1-klass/russkiy/udarenie' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '1 класс', url: '/1-klass' },
  { name: 'Русский язык', url: '/1-klass' },
  { name: 'Ударение в слове', url: '/1-klass/russkiy/udarenie' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Ударение в слове',
  description: 'Определение ударного слога в слове',
  url: '/1-klass/russkiy/udarenie',
  educationalLevel: '1 класс начальной школы',
});

export default function UdarenyePage() {
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
          <span className="text-white">Ударение в слове</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Ударение в слове</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">📋 Шпаргалка</button>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Что такое ударение</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 1: Один слог произносим сильнее</h3>
              <p className="text-gray-300">
                В каждом слове с двумя и более слогами один слог выделяется — произносится немного громче и дольше остальных.
                Это и есть ударение.
              </p>
              <div className="mt-4 p-4 bg-orange/10 rounded">
                <p className="text-2xl mb-1">м<b className="text-orange">А</b>ма</p>
                <p className="text-gray-300 text-base">Ударный слог — «ма» (первый), гласная «а» звучит сильнее.</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 2: Как найти ударение</h3>
              <p className="text-gray-300">
                Хороший способ — «позвать» слово или спросить его удивлённо. Например, если позвать «Ма-ма!»,
                сама интонация покажет, какой слог сильнее.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 3: Ударение меняет смысл слова</h3>
              <p className="text-gray-300">
                Иногда одно и то же написание слова читается по-разному в зависимости от ударения, и слово меняет значение.
              </p>
              <div className="mt-4 p-4 bg-orange/10 rounded">
                <p className="text-xl">
                  з<b className="text-orange">А</b>мок (на двери) — з<b className="text-orange">а</b>м<b className="text-orange">О</b>к (дворец)
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Попробуй сам</h2>
          <div className="space-y-4 text-lg">
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">На какой слог падает ударение в слове «молоко»?</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">На последний слог: молок<b>О</b>.</p>
              </details>
            </div>
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">На какой слог падает ударение в слове «карандаш»?</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">На последний слог: карандаш (ударная «а» в «даш»).</p>
              </details>
            </div>
          </div>
        </div>

        <TopicQuiz topic="1-klass/russkiy/udarenie" />
      </div>
    </div>
  );
}
