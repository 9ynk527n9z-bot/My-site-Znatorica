import Link from 'next/link';
import TrainerGate from '@/components/TrainerGate';

export const metadata = {
  title: 'Формы и цвета — интерактивный тренажёр',
  description: 'Бесплатный интерактивный тренажёр форм и цветов для дошкольников.',
  alternates: { canonical: '/trenazher/shapes-colors' },
};

export default function ShapesColorsTrainerPage() {
  return (
    <div className="bg-black min-h-screen">
      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4 flex items-center justify-between">
        <div>
          <Link href="/trenazher" className="text-orange hover:underline text-sm">
            ← Все тренажеры
          </Link>
          <h1 className="text-2xl font-bold mt-2">🔷 Формы и цвета</h1>
        </div>
      </div>

      <TrainerGate type="trainer:shapes-colors">
        <div className="w-full h-[calc(100vh-100px)]">
          <iframe
            src="/shapes-colors.html"
            className="w-full h-full border-none"
            title="Формы и цвета"
            sandbox="allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
          />
        </div>
      </TrainerGate>
    </div>
  );
}
