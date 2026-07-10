import Link from 'next/link';
import TrackPageView from '@/components/TrackPageView';

export const metadata = {
  title: 'Числа — интерактивный тренажёр для изучения цифр',
  description: 'Бесплатный интерактивный тренажёр «Числа»: изучаем цифры и счёт в игровой форме для детей 4–7 лет.',
  alternates: { canonical: '/trenazher/numbers' },
};

export default function NumbersTrainerPage() {
  return (
    <div className="bg-black min-h-screen">
      <TrackPageView type="trainer:numbers" />
      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4 flex items-center justify-between">
        <div>
          <Link href="/trenazher" className="text-orange hover:underline text-sm">
            ← Все тренажеры
          </Link>
          <h1 className="text-2xl font-bold mt-2">1️⃣ Числа</h1>
        </div>
      </div>

      <div className="w-full h-[calc(100vh-100px)]">
        <iframe
          src="/numbers-app.html"
          className="w-full h-full border-none"
          title="Числа"
          sandbox="allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
        />
      </div>
    </div>
  );
}
