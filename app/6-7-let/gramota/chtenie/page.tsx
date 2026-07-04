import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';

export const metadata = {
  title: 'Чтение — теория и тренажёр для детей 6–7 лет',
  description: 'Текстовые задания для чтения и понимания прочитанного. Для детей 6-7 лет.',
  alternates: { canonical: '/6-7-let/gramota/chtenie' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: 'Дошкольники 6–7', url: '/6-7-let' },
  { name: 'Грамота', url: '/6-7-let/gramota' },
  { name: 'Чтение', url: '/6-7-let/gramota/chtenie' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Чтение',
  description: 'Обучение чтению и пониманию текста для детей 6-7 лет',
  url: '/6-7-let/gramota/chtenie',
  educationalLevel: 'Дошкольное образование, 6–7 лет',
});

export default function ChteniePage() {
  return (
    <div className="bg-black min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResource) }} />

      <div className="bg-[#0A0812] border-b border-[#2D2350] px-6 py-4">
        <div className="max-w-6xl mx-auto flex gap-2 text-sm">
          <Link href="/" className="text-orange hover:underline">Главная</Link>
          <span className="text-gray-400">/</span>
          <Link href="/6-7-let" className="text-orange hover:underline">Дошкольники 6–7</Link>
          <span className="text-gray-400">/</span>
          <Link href="/6-7-let/gramota" className="text-orange hover:underline">Грамота</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Чтение</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Чтение</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">📋 Шпаргалка</button>
        </div>

        <div className="bg-[#16102A] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">От слогов к предложениям</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 1: Читаем слова целиком</h3>
              <p className="text-gray-300">
                Ты уже умеешь читать слоги. Теперь соединяй их в слова: КО-Т = КОТ, МА-МА = МАМА.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 2: Читаем короткие предложения</h3>
              <p className="text-gray-300 mb-4">
                Предложение — это законченная мысль. Оно начинается с большой буквы и заканчивается точкой.
              </p>
              <div className="p-4 bg-orange/10 rounded text-xl">
                Кот спит. Мама варит суп.
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 3: Понимаем прочитанное</h3>
              <p className="text-gray-300">
                Прочитав текст, попробуй ответить на вопросы: о ком или о чём текст? Что произошло?
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
