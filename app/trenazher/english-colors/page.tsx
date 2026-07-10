import Link from 'next/link';
import TrackPageView from '@/components/TrackPageView';

export const metadata = {
  title: 'Цвета на английском — интерактивный тренажёр',
  description: 'Учим цвета на английском языке: режимы «Цвета», «Карточки» и «Квиз» для детей 4–7 лет.',
  alternates: { canonical: '/trenazher/english-colors' },
};

export default function EnglishColorsTrainerPage() {
  return (
    <div className="bg-black min-h-screen">
      <TrackPageView type="trainer:english-colors" />
      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4 flex items-center justify-between">
        <div>
          <Link href="/trenazher" className="text-orange hover:underline text-sm">
            ← Все тренажеры
          </Link>
          <h1 className="text-2xl font-bold mt-2">🇬🇧 Цвета на английском</h1>
        </div>
      </div>

      <div className="w-full h-[calc(100vh-100px)]">
        <iframe
          src="/colors-app.html"
          className="w-full h-full border-none"
          title="Цвета на английском"
          sandbox="allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
        />
      </div>
    </div>
  );
}
