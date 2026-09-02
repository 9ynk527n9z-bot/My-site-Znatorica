import Link from 'next/link';
import TrainerGate from '@/components/TrainerGate';
import PageJsonLd from '@/components/PageJsonLd';
import PageAbout from '@/components/PageAbout';

export const metadata = {
  title: 'Английские слова — интерактивный тренажёр',
  description: 'Бесплатный интерактивный тренажёр английских слов по темам для детей.',
  alternates: { canonical: '/trenazher/english-words' },
};

export default function EnglishWordsTrainerPage() {
  return (
    <div className="bg-black min-h-screen">
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

      <PageAbout route="/trenazher/english-words" />
    </div>
  );
}
