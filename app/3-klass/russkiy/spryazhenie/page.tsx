import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Спряжение — теория и тренажёр для 3 класса',
  description: 'Глаголы и их формы: спряжение для третьеклассников.',
  alternates: { canonical: '/3-klass/russkiy/spryazhenie' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '3 класс', url: '/3-klass' },
  { name: 'Русский язык', url: '/3-klass' },
  { name: 'Спряжение', url: '/3-klass/russkiy/spryazhenie' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Спряжение',
  description: 'Спряжение глаголов для 3 класса',
  url: '/3-klass/russkiy/spryazhenie',
  educationalLevel: '3 класс начальной школы',
});

export default function SpryazheniePage() {
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
          <Link href="/3-klass" className="text-orange hover:underline">Русский язык</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Спряжение</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Спряжение</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <Link
            href="/trenazher/spryazhenie-3klass"
            className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors"
          >
            🎮 Тренажер
          </Link>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Как изменяются глаголы</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Что такое спряжение?</h3>
              <p className="text-gray-300">
                Спряжение — это изменение глагола по лицам и числам: я иду, ты идёшь, он идёт, мы идём.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Два типа спряжения</h3>
              <p className="text-gray-300 mb-4">
                В русском языке глаголы делятся на I и II спряжение — они отличаются окончаниями.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-orange/10 p-4 rounded">
                  <p className="font-bold text-orange mb-2">I спряжение</p>
                  <p className="text-gray-300 text-sm">он читает, они читают</p>
                </div>
                <div className="bg-violet/10 p-4 rounded">
                  <p className="font-bold text-violet mb-2">II спряжение</p>
                  <p className="text-gray-300 text-sm">он говорит, они говорят</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Как определить спряжение</h3>
              <p className="text-gray-300 mb-4">
                Поставь глагол в неопределённую форму (отвечает на вопрос «что делать?») и посмотри на окончание:
              </p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-violet/10 p-4 rounded">
                  <p className="font-bold text-violet mb-2">II спряжение</p>
                  <p className="text-gray-300 text-sm">оканчивается на -ить: говорить, строить</p>
                </div>
                <div className="bg-orange/10 p-4 rounded">
                  <p className="font-bold text-orange mb-2">I спряжение</p>
                  <p className="text-gray-300 text-sm">все остальные: читать, идти, петь</p>
                </div>
              </div>
              <p className="text-gray-300">
                Это правило работает, только если окончание глагола безударное — поэтому его и используют:
                там, где на слух не различить «-ешь» или «-ишь», смотрим на неопределённую форму.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Глаголы-исключения</h3>
              <p className="text-gray-300 mb-4">
                11 глаголов не подчиняются правилу «-ить = II спряжение»: они относятся ко II спряжению,
                хотя в неопределённой форме оканчиваются не на -ить, а на -ать/-еть.
              </p>
              <div className="bg-violet/10 p-4 rounded mb-4">
                <p className="text-gray-300 text-sm mb-2">
                  На -ать (4 слова): <b>гнать, держать, дышать, слышать</b>
                </p>
                <p className="text-gray-300 text-sm">
                  На -еть (7 слов): <b>видеть, ненавидеть, зависеть, терпеть, вертеть, обидеть, смотреть</b>
                </p>
              </div>
              <div className="mt-4 p-4 bg-orange/10 rounded">
                <p className="text-gray-300 text-sm italic">
                  Гнать, держать, смотреть и видеть, дышать, слышать, ненавидеть,<br />
                  и зависеть, и вертеть, и обидеть, и терпеть.<br />
                  Вы запомните, друзья, их на «-е» спрягать нельзя.
                </p>
              </div>
              <p className="text-gray-300 mt-4">
                Есть и обратное исключение — глаголы <b>брить</b> и <b>стелить</b> оканчиваются на -ить,
                но относятся к I спряжению: он бре<b>ет</b>, они бре<b>ют</b>; он стел<b>ет</b>, они стел<b>ют</b>.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Зачем это знать?</h3>
              <p className="text-gray-300">
                Знание спряжения помогает правильно писать безударные окончания глаголов, где легко ошибиться.
              </p>
            </div>
          </div>
        </div>

        <TopicQuiz topic="3-klass/russkiy/spryazhenie" />
      </div>
    </div>
  );
}
