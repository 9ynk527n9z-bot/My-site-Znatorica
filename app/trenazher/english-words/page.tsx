import Link from 'next/link';
import TrainerGate from '@/components/TrainerGate';
import PageJsonLd from '@/components/PageJsonLd';
import PageAbout from '@/components/PageAbout';
import ShareButtons from '@/components/ShareButtons';

export const metadata = {
  title: 'Английские слова — интерактивный тренажёр',
  description: 'Английские слова по темам для детей: карточки с озвучкой, фразы с пропусками, быстрый тест и идиомы с переводом и объяснением.',
  alternates: { canonical: '/trenazher/english-words' },
};

export default function EnglishWordsTrainerPage() {
  return (
    <div className="bg-[#28134f] min-h-screen">
      <PageJsonLd metadata={metadata} section="trenazher" />
      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4 flex items-center justify-between">
        <div>
          <Link href="/trenazher" className="text-orange hover:underline text-sm">
            ← Все тренажеры
          </Link>
          <h1 className="text-2xl font-bold mt-2">🇬🇧 Английские слова</h1>
        </div>
      </div>

      <TrainerGate type="trainer:english-words">
        <div className="w-full h-[calc(100vh-100px)]">
          <iframe
            src="/english-words.html"
            className="w-full h-full border-none"
            title="Английские слова"
            sandbox="allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
          />
        </div>
      </TrainerGate>

      <div className="max-w-6xl mx-auto px-6 pb-10 text-center">
        <ShareButtons
          text="Английские слова учим с озвучкой на Знаторике — попробуйте тоже:"
          url="https://znatorica.ru/trenazher/english-words"
          trackKey="english-words"
        />
      </div>

      <PageAbout route="/trenazher/english-words" />
    </div>
  );
}
