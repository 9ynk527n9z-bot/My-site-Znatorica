import Link from 'next/link';
import TrainerGate from '@/components/TrainerGate';

export const metadata = {
  title: 'Цвета — интерактивный тренажёр для изучения цветов',
  description: 'Бесплатный интерактивный тренажёр «Цвета»: учимся различать и называть цвета в игровой форме для детей 4–7 лет.',
  alternates: { canonical: '/trenazher/colors' },
};

export default function ColorsTrainerPage() {
  return (
    <div className="bg-black min-h-screen">
      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4 flex items-center justify-between">
        <div>
          <Link href="/trenazher" className="text-orange hover:underline text-sm">
            ← Все тренажеры
          </Link>
          <h1 className="text-2xl font-bold mt-2">🌈 Цвета</h1>
        </div>
      </div>

      <TrainerGate type="trainer:colors">
        <div className="w-full h-[calc(100vh-100px)]">
          <iframe
            src="/color-trainer.html"
            className="w-full h-full border-none"
            title="Цвета"
            sandbox="allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
          />
        </div>
      </TrainerGate>
    </div>
  );
}
