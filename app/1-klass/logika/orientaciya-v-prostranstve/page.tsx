import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Ориентация в пространстве — логика для 1 класса',
  description: 'Учимся понимать «лево», «право», «между», «за», «перед» и читать простые схемы и планы.',
  alternates: { canonical: '/1-klass/logika/orientaciya-v-prostranstve' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '1 класс', url: '/1-klass' },
  { name: 'Логика и мышление', url: '/1-klass' },
  { name: 'Ориентация в пространстве', url: '/1-klass/logika/orientaciya-v-prostranstve' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Ориентация в пространстве',
  description: 'Понимание пространственных понятий: лево, право, между, за, перед',
  url: '/1-klass/logika/orientaciya-v-prostranstve',
  educationalLevel: '1 класс начальной школы',
});

export default function OrientaciyaPage() {
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
          <span className="text-white">Ориентация в пространстве</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Ориентация в пространстве</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">📋 Шпаргалка</button>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Слова, которые описывают расположение</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 1: Лево и право</h3>
              <p className="text-gray-300">
                Возьми в правую руку карандаш — это твоя правая сторона. Всё, что с этой стороны — справа от тебя.
                А что с другой стороны — слева.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 2: Перед, за, между, над, под</h3>
              <p className="text-gray-300">Эти слова описывают, где находится предмет по отношению к другим.</p>
              <div className="mt-4 p-4 bg-orange/10 rounded">
                <p className="text-2xl mb-1">🐱 🐶 🐰</p>
                <p className="text-gray-300 text-base">Собака — между кошкой и зайцем. Кошка — перед собакой. Заяц — за собакой.</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 3: Читаем простую схему</h3>
              <p className="text-gray-300">
                Если нарисовать клетки и обозначить направление стрелкой, можно описать путь: «два шага вправо, один шаг вниз».
                Это основа того, что в школе называют координатной сеткой.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Попробуй сам</h2>
          <div className="space-y-4 text-lg">
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">На полке стоят игрушки: 🚗 🧸 ⚽️. Что находится между машинкой и мячом?</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">Плюшевый мишка 🧸 — он в середине ряда.</p>
              </details>
            </div>
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">Ты стоишь лицом к доске. Где твоя правая рука — со стороны окна или со стороны двери, если окно у тебя справа?</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">Со стороны окна — раз окно уже справа, значит, правая рука смотрит именно туда.</p>
              </details>
            </div>
          </div>
        </div>

        <TopicQuiz topic="1-klass/logika/orientaciya-v-prostranstve" />
      </div>
    </div>
  );
}
