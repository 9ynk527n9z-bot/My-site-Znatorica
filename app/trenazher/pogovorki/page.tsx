import Link from 'next/link';
import TrackPageView from '@/components/TrackPageView';

export const metadata = {
  title: 'Поговорки и пословицы — тренажёр',
  description: 'Бесплатный интерактивный тренажёр русских поговорок и пословиц для детей.',
  alternates: { canonical: '/trenazher/pogovorki' },
};

export default function PogovorkiTrainerPage() {
  return (
    <div className="bg-black min-h-screen">
      <TrackPageView type="trainer:pogovorki" />
      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4 flex items-center justify-between">
        <div>
          <Link href="/trenazher" className="text-orange hover:underline text-sm">
            ← Все тренажеры
          </Link>
          <h1 className="text-2xl font-bold mt-2">📖 Поговорки</h1>
        </div>
      </div>

      <div className="w-full h-[calc(100vh-100px)]">
        <iframe
          src="/pogovorki.html"
          className="w-full h-full border-none"
          title="Поговорки"
          sandbox="allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
        />
      </div>
    </div>
  );
}
