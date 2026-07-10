import Link from 'next/link';
import TrainerGate from '@/components/TrainerGate';

export const metadata = {
  title: 'Азбука — интерактивный тренажёр для изучения букв',
  description: 'Бесплатный интерактивный тренажёр «Азбука»: изучаем буквы русского алфавита в игровой форме для детей 4–7 лет.',
  alternates: { canonical: '/trenazher/azbuky' },
};

export default function AzbukyTrainerPage() {
  return (
    <div className="bg-black min-h-screen">
      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4 flex items-center justify-between">
        <div>
          <Link href="/trenazher" className="text-orange hover:underline text-sm">
            ← Все тренажеры
          </Link>
          <h1 className="text-2xl font-bold mt-2">🅰️ Азбука</h1>
        </div>
      </div>

      <TrainerGate type="trainer:azbuky">
        <div className="w-full h-[calc(100vh-100px)]">
          <iframe
            src="/alphabet-app.html"
            className="w-full h-full border-none"
            title="Азбука"
            sandbox="allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
          />
        </div>
      </TrainerGate>
    </div>
  );
}
