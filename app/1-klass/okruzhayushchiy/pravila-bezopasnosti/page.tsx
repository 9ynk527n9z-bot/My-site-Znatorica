import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Правила безопасности — окружающий мир для 1 класса',
  description: 'Учимся правилам безопасного поведения на дороге, дома и при общении с незнакомыми людьми.',
  alternates: { canonical: '/1-klass/okruzhayushchiy/pravila-bezopasnosti' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '1 класс', url: '/1-klass' },
  { name: 'Окружающий мир', url: '/1-klass' },
  { name: 'Правила безопасности', url: '/1-klass/okruzhayushchiy/pravila-bezopasnosti' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Правила безопасности',
  description: 'Основные правила безопасного поведения для первоклассника',
  url: '/1-klass/okruzhayushchiy/pravila-bezopasnosti',
  educationalLevel: '1 класс начальной школы',
});

export default function PravilaBezopasnostiPage() {
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
          <span className="text-white">Правила безопасности</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Правила безопасности</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <Link
            href="/trenazher/bezopasnost-1klass"
            className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors"
          >
            🎮 Тренажер
          </Link>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Как беречь себя</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">🚦 На дороге</h3>
              <p className="text-gray-300">
                Переходи дорогу только на пешеходном переходе, посмотрев сначала налево, потом направо.
                На светофоре переходи только на зелёный свет.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">🔥 Огонь</h3>
              <p className="text-gray-300">
                Никогда не играй со спичками и зажигалками. Если увидел пожар — сразу зови взрослых
                или звони по номеру 101.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">🚪 Дома одному</h3>
              <p className="text-gray-300">
                Не открывай дверь незнакомым людям, даже если они говорят, что пришли от мамы или папы.
                Не рассказывай незнакомцам, что ты дома один.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">🧑‍🤝‍🧑 Незнакомые люди</h3>
              <p className="text-gray-300">
                Не садись в машину к незнакомым людям и не бери у них подарки, даже если они говорят,
                что знают твоих родителей. Об этом сразу нужно рассказать взрослым, которым доверяешь.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Попробуй сам</h2>
          <div className="space-y-4 text-lg">
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">Ты подошёл к пешеходному переходу. Что нужно сделать перед тем, как перейти дорогу?</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">Посмотреть налево, потом направо, и убедиться, что машин нет или они остановились.</p>
              </details>
            </div>
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">Незнакомый человек звонит в дверь и говорит, что пришёл от мамы. Что делать?</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">Не открывать дверь и позвонить маме, чтобы проверить, правда ли это.</p>
              </details>
            </div>
          </div>
        </div>

        <TopicQuiz topic="1-klass/okruzhayushchiy/pravila-bezopasnosti" />
      </div>
    </div>
  );
}
