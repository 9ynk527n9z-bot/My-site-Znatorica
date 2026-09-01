import Link from 'next/link';
import TrainerGate from '@/components/TrainerGate';

export const metadata = {
  title: 'Умножение — интерактивный тренажёр таблицы умножения',
  description: 'Бесплатный интерактивный тренажёр таблицы умножения для учеников 2–3 класса.',
  alternates: { canonical: '/trenazher/multiplication' },
};

export default function MultiplicationTrainerPage() {
  return (
    <div className="bg-black min-h-screen">
      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4 flex items-center justify-between">
        <div>
          <Link href="/trenazher" className="text-orange hover:underline text-sm">
            ← Все тренажеры
          </Link>
          <h1 className="text-2xl font-bold mt-2">✖️ Умножение</h1>
        </div>
      </div>

      <TrainerGate type="trainer:multiplication">
        <div className="w-full h-[calc(100vh-100px)]">
          <iframe
            src="/multiplication-app.html"
            className="w-full h-full border-none"
            title="Умножение"
            sandbox="allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
          />
        </div>
      </TrainerGate>
    </div>
  );
}
