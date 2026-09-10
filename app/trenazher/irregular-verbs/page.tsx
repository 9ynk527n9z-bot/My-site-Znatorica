import Link from 'next/link';
import TrainerGate from '@/components/TrainerGate';
import PageJsonLd from '@/components/PageJsonLd';
import PageAbout from '@/components/PageAbout';
import ShareButtons from '@/components/ShareButtons';

export const metadata = {
  title: 'Неправильные глаголы английского — тренажёр',
  description: 'Бесплатный интерактивный тренажёр неправильных глаголов английского языка.',
  alternates: { canonical: '/trenazher/irregular-verbs' },
};

export default function IrregularVerbsTrainerPage() {
  return (
    <div className="bg-[#28134f] min-h-screen">
      <PageJsonLd metadata={metadata} section="trenazher" />
      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4 flex items-center justify-between">
        <div>
          <Link href="/trenazher" className="text-orange hover:underline text-sm">
            ← Все тренажеры
          </Link>
          <h1 className="text-2xl font-bold mt-2">🇬🇧 Неправильные глаголы</h1>
        </div>
      </div>

      <TrainerGate type="trainer:irregular-verbs">
        <div className="w-full h-[calc(100vh-100px)]">
          <iframe
            src="/irregular-verbs.html"
            className="w-full h-full border-none"
            title="Неправильные глаголы"
            sandbox="allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
          />
        </div>
      </TrainerGate>

      <div className="max-w-6xl mx-auto px-6 pb-10 text-center">
        <ShareButtons
          text="Неправильные глаголы английского учим с озвучкой на Знаторике — попробуйте тоже:"
          url="https://znatorica.ru/trenazher/irregular-verbs"
          trackKey="irregular-verbs"
        />
      </div>

      <PageAbout route="/trenazher/irregular-verbs" />
    </div>
  );
}
