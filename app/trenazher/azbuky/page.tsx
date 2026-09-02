import Link from 'next/link';
import TrainerGate from '@/components/TrainerGate';
import PageJsonLd from '@/components/PageJsonLd';
import PageAbout from '@/components/PageAbout';

export const metadata = {
  title: 'Английский алфавит (игра) — интерактивный тренажёр A-Z',
  description: 'Бесплатный интерактивный тренажёр английского алфавита A-Z: буква, слово, картинка и транскрипция в игровой форме для детей 4–7 лет.',
  alternates: { canonical: '/trenazher/azbuky' },
};

export default function AzbukyTrainerPage() {
  return (
    <div className="bg-black min-h-screen">
      <PageJsonLd metadata={metadata} section="trenazher" />
      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4 flex items-center justify-between">
        <div>
          <Link href="/trenazher" className="text-orange hover:underline text-sm">
            ← Все тренажеры
          </Link>
          <h1 className="text-2xl font-bold mt-2">🇬🇧 Английский алфавит (игра)</h1>
        </div>
      </div>

      <TrainerGate type="trainer:azbuky">
        <div className="w-full h-[calc(100vh-100px)]">
          <iframe
            src="/alphabet-app.html"
            className="w-full h-full border-none"
            title="Английский алфавит"
            sandbox="allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
          />
        </div>
      </TrainerGate>

      <PageAbout route="/trenazher/azbuky" />
    </div>
  );
}
