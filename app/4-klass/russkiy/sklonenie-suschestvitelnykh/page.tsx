import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';

export const metadata = {
  title: 'Склонение существительных — русский язык для 4 класса',
  description: 'Учимся определять падеж существительного по вопросу и понимать, зачем меняется окончание слова.',
  alternates: { canonical: '/4-klass/russkiy/sklonenie-suschestvitelnykh' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '4 класс', url: '/4-klass' },
  { name: 'Русский язык', url: '/4-klass' },
  { name: 'Склонение существительных', url: '/4-klass/russkiy/sklonenie-suschestvitelnykh' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Склонение существительных',
  description: 'Определение падежа существительного по вопросу',
  url: '/4-klass/russkiy/sklonenie-suschestvitelnykh',
  educationalLevel: '4 класс начальной школы',
});

const CASES = [
  { name: 'Именительный', question: 'кто? что?', example: 'книга' },
  { name: 'Родительный', question: 'кого? чего?', example: 'книги' },
  { name: 'Дательный', question: 'кому? чему?', example: 'книге' },
  { name: 'Винительный', question: 'кого? что?', example: 'книгу' },
  { name: 'Творительный', question: 'кем? чем?', example: 'книгой' },
  { name: 'Предложный', question: 'о ком? о чём?', example: 'о книге' },
];

export default function SklonenieSuschPage() {
  return (
    <div className="bg-black min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResource) }} />

      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4">
        <div className="max-w-6xl mx-auto flex gap-2 text-sm">
          <Link href="/" className="text-orange hover:underline">Главная</Link>
          <span className="text-gray-400">/</span>
          <Link href="/4-klass" className="text-orange hover:underline">4 класс</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Склонение существительных</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Склонение существительных</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">📋 Шпаргалка</button>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Шесть падежей русского языка</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 1: Слово меняет окончание по падежам</h3>
              <p className="text-gray-300">
                Одно и то же существительное выглядит по-разному в зависимости от его роли в предложении.
                Всего в русском языке 6 падежей.
              </p>
            </div>

            <div className="grid gap-2">
              {CASES.map((c) => (
                <div key={c.name} className="flex justify-between items-center p-3 bg-black/40 rounded">
                  <span className="font-bold text-orange">{c.name}</span>
                  <span className="text-gray-400 text-sm">{c.question}</span>
                  <span className="font-mono">{c.example}</span>
                </div>
              ))}
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 2: Как определить падеж</h3>
              <p className="text-gray-300">
                Задай вопрос от главного слова к существительному — на какой вопрос отвечает слово,
                тот падеж и используется.
              </p>
              <div className="mt-4 p-4 bg-orange/10 rounded">
                <p className="mb-1">«Я читаю книгу» — читаю (кого? что?) книгу → винительный падеж</p>
                <p>«Я говорю о книге» — говорю (о ком? о чём?) о книге → предложный падеж</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Попробуй сам</h2>
          <div className="space-y-4 text-lg">
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">Определи падеж слова «сестре» в предложении «Я подарил подарок сестре».</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">Дательный падеж — подарил (кому?) сестре.</p>
              </details>
            </div>
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">Определи падеж слова «карандашом» в предложении «Я рисую карандашом».</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">Творительный падеж — рисую (чем?) карандашом.</p>
              </details>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange/20 to-violet/20 border border-orange rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Готов тренироваться?</h3>
          <p className="text-gray-300 mb-6">
            Если сомневаешься между родительным и винительным падежом — попробуй заменить существительное на
            слово «стена»: у неё винительный и именительный падежи звучат по-разному, и легче различить вопрос.
          </p>
          <button className="btn-primary text-lg px-8 py-4">🎮 Открыть тренажер</button>
        </div>
      </div>
    </div>
  );
}
