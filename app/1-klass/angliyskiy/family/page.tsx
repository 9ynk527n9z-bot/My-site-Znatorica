import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import { ENGLISH_FAMILY } from '@/lib/english-family';
import ListenButton from '@/components/ListenButton';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Семья по-английски — английский язык для 1 класса',
  description: 'Первые английские слова о семье: mother, father, sister и другие — с переводом, транскрипцией и озвучкой.',
  alternates: { canonical: '/1-klass/angliyskiy/family' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '1 класс', url: '/1-klass' },
  { name: 'Английский язык', url: '/1-klass' },
  { name: 'Семья', url: '/1-klass/angliyskiy/family' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Семья по-английски',
  description: 'Первые английские слова о семье для 1 класса',
  url: '/1-klass/angliyskiy/family',
  educationalLevel: '1 класс начальной школы',
});

function findWord(word: string) {
  return ENGLISH_FAMILY.find((w) => w.word === word)!;
}

function WordCard({ word }: { word: string }) {
  const w = findWord(word);
  return (
    <div className="bg-black/40 rounded-lg p-3 flex items-center gap-3">
      <span className="text-3xl flex-shrink-0">{w.emoji}</span>
      <div className="flex-1 min-w-0">
        <div className="font-bold">
          {w.word} <span className="text-white/40 text-sm font-normal">{w.transcription}</span>
        </div>
        <div className="text-white/70 text-sm">{w.translation}</div>
      </div>
      <ListenButton text={w.word} label="🔊" />
    </div>
  );
}

const CLOSE_FAMILY = ['Family', 'Mother', 'Father', 'Sister', 'Brother', 'Baby'];
const OTHER_RELATIVES = ['Grandmother', 'Grandfather', 'Son', 'Daughter', 'Aunt', 'Uncle'];

export default function FamilyAngliyskiyPage() {
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
          <Link href="/1-klass" className="text-orange hover:underline">Английский язык</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Семья</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">👪 Семья по-английски (Family)</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <Link href="/trenazher/english-family" className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</Link>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Учим первые 12 слов о семье</h2>
          <p className="text-gray-300 mb-6">
            Нажимай на 🔊, чтобы услышать, как слово звучит по-английски, и повторяй вслух — так слово
            запоминается быстрее и правильнее, чем при простом чтении.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-orange mb-3">Мама, папа и дети</h3>
              <div className="grid sm:grid-cols-2 gap-2">
                {CLOSE_FAMILY.map((w) => <WordCard key={w} word={w} />)}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-3">Бабушка, дедушка и другие родственники</h3>
              <div className="grid sm:grid-cols-2 gap-2">
                {OTHER_RELATIVES.map((w) => <WordCard key={w} word={w} />)}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Как запоминать</h3>
              <p className="text-gray-300">
                Учи слова маленькими группами по 4-5 штук, а не все сразу. Проговаривай слово вслух,
                слушай озвучку и представляй лицо этого члена семьи — так работает и слух, и зрение, и речь одновременно.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Попробуй сам</h2>
          <div className="space-y-4 text-lg">
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">Как по-английски «мама»?</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">Mother.</p>
              </details>
            </div>
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">Что значит слово «Uncle»?</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">Дядя.</p>
              </details>
            </div>
          </div>
        </div>

        <TopicQuiz topic="1-klass/angliyskiy/family" />
      </div>
    </div>
  );
}
